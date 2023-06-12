import * as THREE from 'three';

let camera, scene, renderer;
let mesh;

init();
animate();

function init() {
	const paragraph = document.createElement('p');
	paragraph.textContent = 'a combination of a historical truth which is to say that the past is more diverse than we tend to see on screen, and we tend to accept in our popular imagination. But it’s also a fictionalizing, asking what history might look like under certain different circumstances.';
	document.body.appendChild(paragraph);
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 500;

	scene = new THREE.Scene();

	const texture = new THREE.TextureLoader().load('img/queensplit.jpg');
	texture.colorSpace = THREE.SRGBColorSpace;

	const geometry = new THREE.BoxGeometry(250, 200, 250);
	const material = new THREE.MeshBasicMaterial({ map: texture });

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = 10;
	mesh.position.y = 20;

	scene.add(mesh);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xffffff);
	document.body.appendChild(renderer.domElement);
	document.body.style.backgroundImage = "url('img/wallpaperx.jpg')";
	document.body.style.backgroundSize = "cover";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.appendChild(renderer.domElement);
	window.addEventListener('resize', onWindowResize);
	const paragraph2 = document.createElement('p');
	paragraph2.textContent = 'a combination of a historical truth which is to say that the past is more diverse than we tend to see on screen, and we tend to accept in our popular imagination. But it’s also a fictionalizing, asking what history might look like under certain different circumstances.';
	document.body.appendChild(paragraph2);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

	requestAnimationFrame(animate);

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;

	renderer.render(scene, camera);

}

