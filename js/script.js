// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a material that reacts to light for the walls
const greyMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x808080,  // Grey color
  roughness: 0.7,  // Slightly rough to show lighting interaction
  metalness: 0.5   // Slight metalness for light reflection
});

// Create the geometry for the walls (a large rectangular shape)
const wallWidth = 100;  // Width of each wall
const wallHeight = 50;  // Height of the wall
const wallGeometry = new THREE.PlaneGeometry(wallWidth, wallHeight);  // Plane for the wall

// Create the walls and apply the gray material
const leftWall = new THREE.Mesh(wallGeometry, greyMaterial);
leftWall.position.x = -50;  // Position it to the left
leftWall.rotation.y = Math.PI / 2;  // Rotate to face the camera
scene.add(leftWall);

const middleWall = new THREE.Mesh(wallGeometry, greyMaterial);
middleWall.position.z = -50;  // Move it back to the center
scene.add(middleWall);

const rightWall = new THREE.Mesh(wallGeometry, greyMaterial);
rightWall.position.x = 50;  // Position it to the right
rightWall.rotation.y = -Math.PI / 2;  // Rotate to face the camera
scene.add(rightWall);

// Add front and back walls to enclose the room
const frontWall = new THREE.Mesh(wallGeometry, greyMaterial);
frontWall.position.z = 50;  // Position it to the front
scene.add(frontWall);

const backWall = new THREE.Mesh(wallGeometry, greyMaterial);
backWall.position.z = -50;  // Position it at the back
backWall.rotation.y = Math.PI;  // Rotate to face the other direction
scene.add(backWall);

// Add a ceiling to the room
const ceilingGeometry = new THREE.PlaneGeometry(100, 100);
const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.7, metalness: 0.2 });
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;  // Rotate to lay flat on the top
ceiling.position.y = 25;  // Position it at the top
scene.add(ceiling);

// Add a floor to simulate the ground of the room
const floorGeometry = new THREE.PlaneGeometry(100, 100);  // Large floor to cover the room
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.7, metalness: 0.2 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;  // Rotate to lay flat on the ground
floor.position.y = -2;  // Position it slightly below the walls
scene.add(floor);

// Lighting setup: Adding light sources that affect textures
// 1. Ambient Light: Soft light that evenly illuminates the scene
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);  // Soft ambient light
scene.add(ambientLight);

// 2. Directional Light: Simulates sunlight, casting shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

// 3. Point Light: A moving point light that emits light in all directions
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 5, 10);
scene.add(pointLight);

// Set background color to improve texture visibility
scene.background = new THREE.Color(0xaaaaaa);  // Light gray background

// Set camera position to view the room
camera.position.set(0, 5, 15);

// Load textures for the balls
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('assets/textures/Wood092.png');  // Wood texture
const brickTexture = textureLoader.load('assets/textures/Bricks094.png');  // Brick texture
const metalTexture = textureLoader.load('assets/textures/Metal049A.png');  // Metal texture

// Use MeshStandardMaterial for realistic lighting effects
const woodMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
const brickMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });
const metalMaterial = new THREE.MeshStandardMaterial({ map: metalTexture });

// Create balls (spheres) and place them randomly (close, medium, far)
const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);  // Small spheres

// Ball 1 (Close to camera) with wood texture
const closeBall = new THREE.Mesh(sphereGeometry, woodMaterial);
closeBall.position.set(5, 1, -5);  // Close ball
closeBall.rotation.y = Math.PI / 1;  // Slight rotation to hide texture on the back
scene.add(closeBall);

// Ball 2 (Medium distance) with brick texture
const mediumBall = new THREE.Mesh(sphereGeometry, brickMaterial);
mediumBall.position.set(-20, 5, -30);  // Medium ball
mediumBall.rotation.y = Math.PI / 6;  // Slight rotation to hide texture on the back
scene.add(mediumBall);

// Ball 3 (Far distance) with metal texture
const farBall = new THREE.Mesh(sphereGeometry, metalMaterial);
farBall.position.set(0, 3, -50);  // Far ball
farBall.rotation.y = Math.PI / 3;  // Slight rotation to hide texture on the back
scene.add(farBall);

// Function to make the balls always face the camera
function updateBallOrientation() {
  // Make the balls face the camera (billboarding)
  closeBall.lookAt(-100, 0, 0);
  mediumBall.lookAt(-100, 0, 0);
  farBall.lookAt(-100, 0, 0);
}

// Animation loop to move the point light around
let angle = 0;  // Used to animate the point light around the room

function animate() {
  requestAnimationFrame(animate);

  // Animate the point light moving in a circular path
  angle += 0.01;
  pointLight.position.set(30 * Math.cos(angle), 5, 30 * Math.sin(angle));

  // Update the orientation of the balls to always face the camera
  updateBallOrientation();

  // Render the scene from the camera's perspective
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
