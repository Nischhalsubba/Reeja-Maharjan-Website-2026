import { loadCached } from '../core/loader';

export const loadThree = async () =>
  loadCached('engine:three', async () => {
    const THREE = await import('three');
    return THREE;
  });

export const runThreeMiniScene = async (target: HTMLElement): Promise<void> => {
  const THREE = await loadThree();
  target.innerHTML = '';

  const width = Math.max(240, target.clientWidth || 280);
  const height = 180;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
  camera.position.z = 2.2;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  target.appendChild(renderer.domElement);

  const geometry = new THREE.IcosahedronGeometry(0.75, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x2f6e69, roughness: 0.3, metalness: 0.1 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(2, 2, 2);
  scene.add(keyLight);

  const fillLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(fillLight);

  let frames = 0;
  const animate = () => {
    mesh.rotation.x += 0.008;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    frames += 1;
    if (frames < 350) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};
