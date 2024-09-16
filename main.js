import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 0, 15 );
controls.update();


function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

animate()


// Criando geometria de um plano (BufferGeometry)
const geometry = new THREE.PlaneGeometry(10, 5, 16, 8);  // 32 segmentos para suavidade
const curveGeometry = new THREE.PlaneGeometry(10, 100, 16, 160)
//const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true});
const material = new THREE.ShaderMaterial({
  uniforms: {
    uGridSize: { value: 16.0 }, // Quantidade de quadrados na grade
    uLineWidth: { value: 0.05 }, // Largura das linhas
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uGridSize;
    uniform float uLineWidth;
    varying vec2 vUv;

    void main() {
      vec2 grid = fract(vUv * uGridSize); // Coordenadas para o grid
      vec2 line = step(uLineWidth, grid) * step(uLineWidth, 1.0 - grid); // Desenha as linhas
      float border = line.x * line.y; // Multiplicação das linhas verticais e horizontais
      gl_FragColor = vec4(vec3(1.0 - border), 1.0); // Cor do grid (linhas pretas no fundo branco)
    }
  `
});
const topPlane = new THREE.Mesh(geometry, material);
scene.add(topPlane);
topPlane.translateY(5)


const midTPlane = new THREE.Mesh(curveGeometry, material)
scene.add(midTPlane)
midTPlane.translateY(2.5)
midTPlane.translateZ(-50)
midTPlane.rotateX(1.57)




const midPlane = new THREE.Mesh(geometry, material)
scene.add(midPlane)
midPlane.translateZ(-100)


const midBPlane = new THREE.Mesh(curveGeometry, material)
scene.add(midBPlane)
midBPlane.translateY(-2.5)
midBPlane.translateZ(-50)
midBPlane.rotateX(-1.57)



const botPlane = new THREE.Mesh(geometry, material)
scene.add(botPlane)
botPlane.translateY(-5)












// Atualizando a geometria
positionAttribute.needsUpdate = true;



