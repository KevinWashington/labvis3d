import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criando geometria de um plano (BufferGeometry)
const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);  // 32 segmentos para suavidade
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Acessando o buffer de posição dos vértices
const positionAttribute = geometry.attributes.position;
const vertex = new THREE.Vector3();

// Aplicando uma curva senoidal aos vértices
for (let i = 0; i < positionAttribute.count; i++) {
  vertex.fromBufferAttribute(positionAttribute, i);
  const curveAmount = Math.sin(vertex.x * Math.PI / 5);  // Função senoidal
  vertex.z = curveAmount;  // Modificando o eixo Z
  positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
}

// Atualizando a geometria
positionAttribute.needsUpdate = true;

// Posição da câmera
camera.position.z = 15;

// Função de render
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
