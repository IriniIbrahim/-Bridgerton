//for 3d
import * as THREE from 'three';

let camera, scene, renderer;
let mesh;

init();
animate();

function init() {
	const canvas = document.getElementById("canvas");
	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 800;
	scene = new THREE.Scene();
	const texture = new THREE.TextureLoader().load('img/queensplit.jpg');
	// texture.encoding = THREE.sRGBEncoding; // Use lowercase 's' in 'sRGBEncoding'
	const geometry = new THREE.BoxGeometry(250, 200, 250);
	const material = new THREE.MeshBasicMaterial({ map: texture });
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = 10;
	mesh.position.y = 20;
	scene.add(mesh);
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xf0dfaf);
	document.body.appendChild(renderer.domElement);
	window.addEventListener('resize', onWindowResize);
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

// for audio
const btn = document.querySelector(".btn");
const audio = document.querySelector("audio");
const visualizer = document.querySelector(".visualizer");
btn.addEventListener("click", (e) => {
	ctx.resume();
	audio.paused ? audio.play() : audio.pause();
	btn.classList.toggle("btn-play");
	btn.classList.toggle("btn-pause");
});
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new window.AudioContext();
ctx.suspend();
const analyser = ctx.createAnalyser();
const source = ctx.createMediaElementSource(audio);
source.connect(analyser);
source.connect(ctx.destination);
analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
let elements = [];
for (let i = 0; i < bufferLength; i++) {
	const element = document.createElement("span");
	element.classList.add("element");
	elements.push(element);
	visualizer.appendChild(element);
}
const clamp = (num, min, max) => {
	if (num >= max) return max;
	if (num <= min) return min;
	return num;
};
const update = () => {
	requestAnimationFrame(update);
	analyser.getByteFrequencyData(dataArray);
	for (let i = 0; i < bufferLength; i++) {
		let item = dataArray[i];
		item = item > 150 ? item / 1.5 : item * 1.5;
		elements[i].style.transform = `rotateZ(${i * (360 / bufferLength)
			}deg) translate(-50%, ${clamp(item, 100, 150)}px)`;
	}
};
update();

//for scroll animation
AOS.init();
