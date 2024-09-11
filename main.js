import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 0, 100 );
controls.update();


function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

animate()


// Criando geometria de um plano (BufferGeometry)
const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);  // 32 segmentos para suavidade
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true});
// const material = new THREE.ShaderMaterial({
//   uniforms: {
//     uGridSize: { value: 10.0 }, // Quantidade de quadrados na grade
//     uLineWidth: { value: 0.05 }, // Largura das linhas
//   },
//   vertexShader: `
//     varying vec2 vUv;
//     void main() {
//       vUv = uv;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
//   `,
//   fragmentShader: `
//     uniform float uGridSize;
//     uniform float uLineWidth;
//     varying vec2 vUv;

//     void main() {
//       vec2 grid = fract(vUv * uGridSize); // Coordenadas para o grid
//       vec2 line = step(uLineWidth, grid) * step(uLineWidth, 1.0 - grid); // Desenha as linhas
//       float border = line.x * line.y; // Multiplicação das linhas verticais e horizontais
//       gl_FragColor = vec4(vec3(1.0 - border), 1.0); // Cor do grid (linhas pretas no fundo branco)
//     }
//   `
// });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Acessando o buffer de posição dos vértices
const positionAttribute = geometry.attributes.position;
const vertex = new THREE.Vector3();

// // Aplicando uma curva senoidal aos vértices
// for (let i = 0; i < positionAttribute.count; i++) {
  
//   vertex.fromBufferAttribute(positionAttribute, i);
//   if(i <= positionAttribute.count/5+13){
    
//     let curveAmount = 0;  
//     vertex.z = curveAmount;
//     // Modificando o eixo Z
//     positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
//   }else if(i >= positionAttribute.count/5*4-14){
   
//     let curveAmount = 0
//     vertex.z = curveAmount;
//     positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
//   }else{
//     let curveAmount = (vertex.y)*(vertex.y)-21
//     vertex.z = curveAmount;
//     positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
//   }
// }

// Aplicando uma curva senoidal aos vértices
for (let i = 0; i <= positionAttribute.count/5+1; i++) {
  vertex.fromBufferAttribute(positionAttribute, i);
  let curveAmount = 0;  
  vertex.z = curveAmount;
  // Modificando o eixo Z
  positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
}
// for (let i = 0; i < positionAttribute.count/3*2; i++) {
//   vertex.fromBufferAttribute(positionAttribute, i);
//   let curveAmount = 0;  
//   vertex.z = curveAmount;
//   // Modificando o eixo Z
//   positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
// }

let curveAmount = -.5
let curveAmountY = .3
for(let i = Math.floor(positionAttribute.count/5)+14; i <= positionAttribute.count/5*4-14; i+=33){
  
  for(let j = i; j < i+33 ; j++){
    console.log(j)
    vertex.fromBufferAttribute(positionAttribute, j);
    vertex.z = curveAmount;
    positionAttribute.setXYZ(j, vertex.x, vertex.y+curveAmountY, vertex.z)
  }
  curveAmount-=.5
  curveAmountY+=.3
}


// // Criando um cubo mais alongado e fino, com profundidade tridimensional
// const boxGeometry = new THREE.BoxGeometry(0.5, 15, .5, 32, 32, 1); // Cubo 3D vertical (alongado no eixo Y)
// const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);

// // Posicionando o cubo
// box.position.set(0, 0, .2);  // No centro, um pouco acima do plano curvado
// scene.add(box);

// // Curvando o cubo em formato de "V" no eixo Y, mantendo o aspecto 3D
// const boxPositionAttribute = boxGeometry.attributes.position;

// // Manipulando os vértices do cubo para curvar o eixo Y
// for (let i = 0; i < boxPositionAttribute.count; i++) {
//   vertex.fromBufferAttribute(boxPositionAttribute, i);
  
//   console.log( Math.abs(vertex.y))
//   // Para criar o formato "V", curvamos o eixo Z com base no eixo Y (curva no meio)
//   const distanceFromCenter = Math.abs(vertex.y);

//   // Curvando mais o centro
//   if (distanceFromCenter < 1.5) {
//     const curveAmount = -50;  // Curva em "V" no eixo Y
//     vertex.z += curveAmount;  // Modificando o eixo Z apenas no centro do cubo
//   }
  

//   // Definindo a nova posição do vértice
//   boxPositionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
// }

// // Atualizando a geometria do cubo
// boxPositionAttribute.needsUpdate = true;








// Atualizando a geometria
positionAttribute.needsUpdate = true;

// Posição da câmera
camera.position.z = 15;


