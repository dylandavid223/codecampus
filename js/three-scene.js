// Three.js 3D Background Scene
let scene, camera, renderer, particles, orb;

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(renderer.domElement);
    
    // Create particle system
    createParticles();
    
    // Create central orb
    createCentralOrb();
    
    // Set camera position
    camera.position.z = 15;
    
    // Start animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const posArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.5
    });
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

function createCentralOrb() {
    const orbGeometry = new THREE.SphereGeometry(2, 32, 32);
    const orbMaterial = new THREE.MeshBasicMaterial({
        color: 0x3333ff,
        transparent: true,
        opacity: 0.2
    });
    
    orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Animate particles
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
    }
    
    // Animate orb
    if (orb) {
        orb.rotation.x += 0.005;
        orb.rotation.y += 0.008;
    }
    
    // Render scene
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initThreeJS };
}