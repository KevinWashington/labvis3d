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
const geometry = new THREE.PlaneGeometry(10, 15, 32, 32);  // 32 segmentos para suavidade
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Acessando o buffer de posição dos vértices
const positionAttribute = geometry.attributes.position;
const vertex = new THREE.Vector3();

// Aplicando uma curva senoidal aos vértices
for (let i = 0; i < positionAttribute.count; i++) {
  
  vertex.fromBufferAttribute(positionAttribute, i);
  
  if(i <= positionAttribute.count/3-1){
    
    let curveAmount = 0;  
    vertex.z = curveAmount;
    // Modificando o eixo Z
    positionAttribute.setXYZ(i, vertex.x, vertex.y-2, vertex.z);
  }else if(i >= positionAttribute.count/3*2){
   
    let curveAmount = 0
    vertex.z = curveAmount;
    positionAttribute.setXYZ(i, vertex.x, vertex.y+2, vertex.z)
  }else{
    
    let curveAmount = -3
    vertex.z = curveAmount;
    positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
  }
}


// Criando um cubo mais alongado e fino, com profundidade tridimensional
const boxGeometry = new THREE.BoxGeometry(0.5, 15, .5, 32, 32, 1); // Cubo 3D vertical (alongado no eixo Y)
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

// Posicionando o cubo
box.position.set(0, 0, .2);  // No centro, um pouco acima do plano curvado
scene.add(box);

// Curvando o cubo em formato de "V" no eixo Y, mantendo o aspecto 3D
const boxPositionAttribute = boxGeometry.attributes.position;

// Manipulando os vértices do cubo para curvar o eixo Y
for (let i = 0; i < boxPositionAttribute.count; i++) {
  vertex.fromBufferAttribute(boxPositionAttribute, i);
  
  console.log( Math.abs(vertex.y))
  // Para criar o formato "V", curvamos o eixo Z com base no eixo Y (curva no meio)
  const distanceFromCenter = Math.abs(vertex.y);

  // Curvando mais o centro
  if (distanceFromCenter < 2) {
    const curveAmount = -3;  // Curva em "V" no eixo Y
    vertex.z += curveAmount;  // Modificando o eixo Z apenas no centro do cubo
  }else{
    vertex.y += 1.7 
  }
  

  // Definindo a nova posição do vértice
  boxPositionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
}

// Atualizando a geometria do cubo
boxPositionAttribute.needsUpdate = true;








// Atualizando a geometria
positionAttribute.needsUpdate = true;

// Posição da câmera
camera.position.z = 15;


