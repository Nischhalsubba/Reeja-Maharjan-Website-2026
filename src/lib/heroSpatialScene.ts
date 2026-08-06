import { gsap } from 'gsap';
import * as THREE from 'three';

const SCENE_SELECTOR = '[data-hero-scene]';
const CANVAS_SELECTOR = '[data-hero-canvas]';

const canUseWebGL2 = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2'));
  } catch {
    return false;
  }
};

const createThreadCurve = (): THREE.CatmullRomCurve3 =>
  new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-2.75, -3.1, 0.05),
      new THREE.Vector3(-2.45, -2.1, 0.18),
      new THREE.Vector3(-1.95, -0.95, -0.08),
      new THREE.Vector3(-1.15, 0.12, 0.16),
      new THREE.Vector3(-0.2, 0.48, -0.05),
      new THREE.Vector3(0.72, 0.2, 0.12),
      new THREE.Vector3(1.35, 1.18, 0.03),
      new THREE.Vector3(2.15, 2.08, -0.12),
      new THREE.Vector3(2.8, 2.58, 0.08)
    ],
    false,
    'centripetal',
    0.45
  );

export const initHeroSpatialScene = (): (() => void) => {
  const root = document.querySelector<HTMLElement>(SCENE_SELECTOR);
  const canvas = root?.querySelector<HTMLCanvasElement>(CANVAS_SELECTOR);
  if (!root || !canvas || root.dataset.sceneInitialized === 'true') return () => undefined;

  root.dataset.sceneInitialized = 'true';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const lowEndDevice = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 2;

  if (!canUseWebGL2() || lowEndDevice) {
    root.dataset.sceneFallback = 'true';
    return () => root.removeAttribute('data-scene-initialized');
  }

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch {
    root.dataset.sceneFallback = 'true';
    return () => root.removeAttribute('data-scene-initialized');
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.set(0, 0, 8.8);

  const group = new THREE.Group();
  group.rotation.set(-0.025, -0.08, 0.035);
  scene.add(group);

  const curve = createThreadCurve();
  const threadGeometry = new THREE.TubeGeometry(curve, 180, 0.028, 8, false);
  const threadUniforms = {
    uColor: { value: new THREE.Color('#8c2f39') },
    uReveal: { value: reducedMotion ? 1 : 0 },
    uOpacity: { value: 0.92 }
  };

  const threadMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: threadUniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uReveal;
      uniform float uOpacity;
      varying vec2 vUv;

      void main() {
        if (vUv.x > uReveal) discard;
        float tail = smoothstep(0.0, 0.045, vUv.x);
        float head = 1.0 - smoothstep(max(0.0, uReveal - 0.055), uReveal, vUv.x);
        float alpha = tail * mix(0.72, 1.0, head) * uOpacity;
        gl_FragColor = vec4(uColor, alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
  });

  const thread = new THREE.Mesh(threadGeometry, threadMaterial);
  group.add(thread);

  const markerGeometry = new THREE.SphereGeometry(0.07, 16, 16);
  const markerMaterial = new THREE.MeshBasicMaterial({
    color: 0xd9b56d,
    transparent: true,
    opacity: reducedMotion ? 0.92 : 0
  });
  const markerPositions = [0, 0.34, 0.67, 1].map((position) => curve.getPointAt(position));
  const markers = new THREE.InstancedMesh(markerGeometry, markerMaterial, markerPositions.length);
  const markerObject = new THREE.Object3D();
  markerPositions.forEach((position, index) => {
    markerObject.position.copy(position);
    markerObject.updateMatrix();
    markers.setMatrixAt(index, markerObject.matrix);
  });
  markers.instanceMatrix.needsUpdate = true;
  group.add(markers);

  let disposed = false;
  let isVisible = true;
  let revealed = reducedMotion;
  const render = (): void => {
    if (!disposed) renderer.render(scene, camera);
  };

  const resize = (): void => {
    const rect = root.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    group.scale.setScalar(width < 520 ? 0.9 : 1);
    render();
  };

  const revealTimeline = gsap.timeline({
    paused: true,
    defaults: { overwrite: 'auto' },
    onUpdate: render
  });
  revealTimeline
    .to(threadUniforms.uReveal, { value: 1, duration: 1.05, ease: 'power2.inOut' })
    .to(markerMaterial, { opacity: 0.92, duration: 0.3, ease: 'power2.out' }, 0.64);

  const reveal = (): void => {
    if (revealed || disposed) return;
    revealed = true;
    if (reducedMotion) {
      threadUniforms.uReveal.value = 1;
      markerMaterial.opacity = 0.92;
      render();
      return;
    }
    revealTimeline.play();
  };

  const handlePointer = (event: PointerEvent): void => {
    if (!finePointer || reducedMotion || !isVisible) return;
    const rect = root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    const y = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    gsap.to(group.rotation, {
      x: -0.025 + y * 0.035,
      y: -0.08 + x * 0.055,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
      onUpdate: render
    });
  };

  const resetPointer = (): void => {
    if (reducedMotion) return;
    gsap.to(group.rotation, {
      x: -0.025,
      y: -0.08,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto',
      onUpdate: render
    });
  };

  const handleVisibility = (): void => {
    if (document.hidden) revealTimeline.pause();
    else if (isVisible && revealed && revealTimeline.progress() < 1) revealTimeline.resume();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (!isVisible) revealTimeline.pause();
      else if (!document.hidden && revealed && revealTimeline.progress() < 1) revealTimeline.resume();
    },
    { threshold: 0.04 }
  );
  visibilityObserver.observe(root);

  root.addEventListener('pointermove', handlePointer, { passive: true });
  root.addEventListener('pointerleave', resetPointer, { passive: true });
  document.addEventListener('visibilitychange', handleVisibility);
  root.addEventListener('care-ledger:reveal-thread', reveal, { once: true });

  resize();
  root.dataset.sceneReady = 'true';
  const revealFallbackTimer = window.setTimeout(reveal, 420);

  return () => {
    if (disposed) return;
    disposed = true;
    window.clearTimeout(revealFallbackTimer);
    revealTimeline.kill();
    gsap.killTweensOf(group.rotation);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    root.removeEventListener('pointermove', handlePointer);
    root.removeEventListener('pointerleave', resetPointer);
    root.removeEventListener('care-ledger:reveal-thread', reveal);
    document.removeEventListener('visibilitychange', handleVisibility);

    threadGeometry.dispose();
    threadMaterial.dispose();
    markerGeometry.dispose();
    markerMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    root.removeAttribute('data-scene-ready');
    root.removeAttribute('data-scene-initialized');
  };
};
