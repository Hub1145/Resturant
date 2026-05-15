import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

class Scene3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        this.initLights();
        this.initSphere();
        this.initParticles();
        this.animate();

        window.addEventListener('resize', () => this.onWindowResize());
    }

    initLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(10, 10, 10);
        this.scene.add(spotLight);

        const pointLight = new THREE.PointLight(0x3b82f6, 1);
        pointLight.position.set(-10, -10, -10);
        this.scene.add(pointLight);
    }

    initSphere() {
        const geometry = new THREE.SphereGeometry(1.5, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            roughness: 0,
            metalness: 1,
            wireframe: true
        });
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
    }

    initParticles() {
        const count = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 15;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        if (this.sphere) {
            this.sphere.rotation.x = time * 0.2;
            this.sphere.rotation.y = time * 0.3;
            const scale = 1 + Math.sin(time) * 0.1;
            this.sphere.scale.set(scale, scale, scale);
        }

        if (this.particles) {
            this.particles.rotation.y = time * 0.05;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Scene3D('canvas-container');
});
