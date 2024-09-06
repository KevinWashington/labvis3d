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
const geometry = new THREE.PlaneGeometry(10, 20, 32, 64);  // 32 segmentos para suavidade
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Acessando o buffer de posição dos vértices
const positionAttribute = geometry.attributes.position;
const vertex = new THREE.Vector3();

// Aplicando uma curva senoidal aos vértices
for (let i = 0; i < positionAttribute.count; i++) {
  
  vertex.fromBufferAttribute(positionAttribute, i);
  
  if(i <= positionAttribute.count/3+10){
    
    let curveAmount = 4;  
    vertex.z = curveAmount;
    // Modificando o eixo Z
    positionAttribute.setXYZ(i, vertex.x, vertex.y-3, vertex.z);
  }else if(i >= positionAttribute.count/3*2-11){
   
    let curveAmount = 4
    vertex.z = curveAmount;
    positionAttribute.setXYZ(i, vertex.x, vertex.y+3, vertex.z)
  }else{
    
    let curveAmount = 1
    vertex.z = curveAmount;
    positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
  }
    
  
}

// Atualizando a geometria
positionAttribute.needsUpdate = true;

// Posição da câmera
camera.position.z = 15;


