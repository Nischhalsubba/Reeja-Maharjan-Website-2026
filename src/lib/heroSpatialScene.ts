import * as THREE from 'three';

const SCENE_SELECTOR = '[data-hero-scene]';
const CANVAS_SELECTOR = '[data-hero-canvas]';

const canUseWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

const buildNodeGeometry = (count = 84): THREE.BufferGeometry => {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / Math.max(1, count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index;
    const scale = 2.46 + Math.sin(index * 1.73) * 0.08;

    positions[index * 3] = Math.cos(theta) * radius * scale;
    positions[index * 3 + 1] = y * scale;
    positions[index * 3 + 2] = Math.sin(theta) * radius * scale;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.computeBoundingSphere();
  return geometry;
};

export const initHeroSpatialScene = (): (() => void) => {
  const root = document.querySelector<HTMLElement>(SCENE_SELECTOR);
  const canvas = root?.querySelector<HTMLCanvasElement>(CANVAS_SELECTOR);
  if (!root || !canvas || root.dataset.sceneInitialized === 'true') return () => undefined;

  root.dataset.sceneInitialized = 'true';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canUseWebGL()) {
    root.dataset.sceneFallback = 'true';
    return () => undefined;
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
    return () => undefined;
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0, 0, 7.4);

  const spatialGroup = new THREE.Group();
  spatialGroup.rotation.set(-0.18, 0.35, 0.08);
  scene.add(spatialGroup);

  const shellGeometry = new THREE.IcosahedronGeometry(2.45, 2);
  const shellMaterial = new THREE.MeshBasicMaterial({
    color: 0x0d8d96,
    transparent: true,
    opacity: 0.055,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const shell = new THREE.Mesh(shellGeometry, shellMaterial);
  spatialGroup.add(shell);

  const edgeGeometry = new THREE.EdgesGeometry(shellGeometry, 18);
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0x52d0cf,
    transparent: true,
    opacity: 0.34,
    depthWrite: false
  });
  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
  spatialGroup.add(edges);

  const nodeGeometry = buildNodeGeometry();
  const nodeMaterial = new THREE.PointsMaterial({
    color: 0xe8ffff,
    size: 0.052,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.78,
    depthWrite: false
  });
  const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
  spatialGroup.add(nodes);

  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x2db9bd,
    transparent: true,
    opacity: 0.12,
    wireframe: true,
    depthWrite: false
  });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.018, 6, 144), ringMaterial);
  ringA.rotation.set(Math.PI / 2.4, 0.12, 0.3);
  spatialGroup.add(ringA);

  const ringBMaterial = ringMaterial.clone();
  ringBMaterial.opacity = 0.08;
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(3.25, 0.012, 6, 144), ringBMaterial);
  ringB.rotation.set(0.45, Math.PI / 2.2, -0.2);
  spatialGroup.add(ringB);

  const coreGeometry = new THREE.SphereGeometry(0.17, 24, 24);
  const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xff8066 });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  spatialGroup.add(core);

  const pointerTarget = new THREE.Vector2(0, 0);
  const rotationTarget = new THREE.Vector2(0, 0);
  const clock = new THREE.Clock();
  let frameId = 0;
  let isVisible = true;
  let isDocumentVisible = !document.hidden;
  let disposed = false;

  const resize = (): void => {
    const rect = root.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
  };

  const render = (): void => {
    renderer.render(scene, camera);
  };

  const tick = (): void => {
    if (disposed) return;
    frameId = window.requestAnimationFrame(tick);
    if (!isVisible || !isDocumentVisible) return;

    const delta = Math.min(clock.getDelta(), 0.05);
    spatialGroup.rotation.y += delta * 0.075;
    rotationTarget.set(pointerTarget.y * 0.16 - 0.18, pointerTarget.x * 0.2 + 0.35);
    spatialGroup.rotation.x = THREE.MathUtils.lerp(spatialGroup.rotation.x, rotationTarget.x, 0.035);
    spatialGroup.rotation.y = THREE.MathUtils.lerp(spatialGroup.rotation.y, rotationTarget.y, 0.018);
    core.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.2) * 0.08);
    render();
  };

  const handlePointer = (event: PointerEvent): void => {
    const rect = root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerTarget.set(
      THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1),
      THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
    );
  };

  const resetPointer = (): void => pointerTarget.set(0, 0);
  const handleVisibility = (): void => {
    isDocumentVisible = !document.hidden;
    if (isDocumentVisible) clock.start();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible) clock.start();
    },
    { threshold: 0.05 }
  );
  visibilityObserver.observe(root);

  if (!reducedMotion) {
    root.addEventListener('pointermove', handlePointer, { passive: true });
    root.addEventListener('pointerleave', resetPointer, { passive: true });
  }
  document.addEventListener('visibilitychange', handleVisibility);

  resize();
  root.dataset.sceneReady = 'true';

  if (reducedMotion) render();
  else tick();

  return () => {
    if (disposed) return;
    disposed = true;
    window.cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    root.removeEventListener('pointermove', handlePointer);
    root.removeEventListener('pointerleave', resetPointer);
    document.removeEventListener('visibilitychange', handleVisibility);

    shellGeometry.dispose();
    shellMaterial.dispose();
    edgeGeometry.dispose();
    edgeMaterial.dispose();
    nodeGeometry.dispose();
    nodeMaterial.dispose();
    ringA.geometry.dispose();
    ringB.geometry.dispose();
    ringMaterial.dispose();
    ringBMaterial.dispose();
    coreGeometry.dispose();
    coreMaterial.dispose();
    renderer.dispose();
    root.removeAttribute('data-scene-ready');
    root.removeAttribute('data-scene-initialized');
  };
};
