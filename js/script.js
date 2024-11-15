// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('assets/textures/wood_floor.jpg');
const brickTexture = textureLoader.load('assets/textures/brick_wall.jpg');
const metalTexture = textureLoader.load('assets/textures/metal_plate.jpg');

// Create a floor with wood texture
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Create a wall with brick texture
const wallGeometry = new THREE.PlaneGeometry(50, 20);
const wallMaterial = new THREE.MeshPhongMaterial({ map: brickTexture });
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(0, 10, -25);
scene.add(wall);

// Add a metallic sphere
const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ map: metalTexture, metalness: 0.9, roughness: 0.2 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(5, 3, 0);
scene.add(sphere);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Set camera position
camera.position.z = 30;

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
