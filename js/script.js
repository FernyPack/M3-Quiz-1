// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the textures (Wood, Bricks, and Metal)
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('assets/textures/Wood092.png');
const brickTexture = textureLoader.load('assets/textures/Bricks094.png');
const metalTexture = textureLoader.load('assets/textures/Metal049A.png');

// Ensure textures have transparency (if needed for circular textures)
woodTexture.wrapS = THREE.RepeatWrapping;
woodTexture.wrapT = THREE.RepeatWrapping;
woodTexture.repeat.set(1, 1);  // Don't stretch the texture

brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set(1, 1);

metalTexture.wrapS = THREE.RepeatWrapping;
metalTexture.wrapT = THREE.RepeatWrapping;
metalTexture.repeat.set(1, 1);

// Set the textures to be transparent (if needed)
woodTexture.transparent = true;
brickTexture.transparent = true;
metalTexture.transparent = true;

// Create sphere geometries (radius = 2 for better fit of textures)
const sphereGeometry = new THREE.SphereBufferGeometry(2, 64, 64);  // Smooth geometry for texture mapping

// Use MeshStandardMaterial for better shading
const woodMaterial = new THREE.MeshStandardMaterial({ map: woodTexture, transparent: true });
const brickMaterial = new THREE.MeshStandardMaterial({ map: brickTexture, transparent: true });
const metalMaterial = new THREE.MeshStandardMaterial({ map: metalTexture, transparent: true });

// Create meshes for each sphere
const woodSphere = new THREE.Mesh(sphereGeometry, woodMaterial);
const brickSphere = new THREE.Mesh(sphereGeometry, brickMaterial);
const metalSphere = new THREE.Mesh(sphereGeometry, metalMaterial);

// Position the spheres with space between them
woodSphere.position.set(-4, 0, 0);
brickSphere.position.set(0, 0, 0);
metalSphere.position.set(4, 0, 0);

// Add spheres to the scene
scene.add(woodSphere);
scene.add(brickSphere);
scene.add(metalSphere);

// Add ambient light to softly illuminate the room
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);  // Soft ambient light (darker)
scene.add(ambientLight);

// Add directional light to simulate light coming from above (like ceiling light)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // Directional light (like sunlight)
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

// Add point light to create a more room-like atmosphere
const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);  // Point light for more focus on objects
pointLight.position.set(0, 5, 10);  // Light source above the center
scene.add(pointLight);

// Add a floor to simulate the ground of the room
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.5 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = - Math.PI / 2;  // Rotate to lay flat on the ground
floor.position.y = -2;  // Position it below the spheres
scene.add(floor);

// Add walls to simulate the room boundaries
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.7 });

// Back Wall
const backWallGeometry = new THREE.PlaneGeometry(100, 50);
const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
backWall.position.z = -50;
backWall.rotation.y = Math.PI;
scene.add(backWall);

// Left Wall
const leftWallGeometry = new THREE.PlaneGeometry(50, 50);
const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
leftWall.position.x = -50;
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

// Right Wall
const rightWallGeometry = new THREE.PlaneGeometry(50, 50);
const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
rightWall.position.x = 50;
rightWall.rotation.y = -Math.PI / 2;
scene.add(rightWall);

// Set background color for better visibility of the textures
scene.background = new THREE.Color(0xaaaaaa);  // Light gray background to simulate room lighting

// Set the camera position to see the entire scene
camera.position.set(0, 5, 15);

// Animation loop to rotate the spheres and render the scene
function animate() {
  requestAnimationFrame(animate);

  // Rotate the spheres for a dynamic effect
  woodSphere.rotation.y += 0.01;
  brickSphere.rotation.y += 0.01;
  metalSphere.rotation.y += 0.01;

  // Render the scene from the camera's perspective
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
