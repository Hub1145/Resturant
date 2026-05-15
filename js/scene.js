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
        this.initElements();
        this.animate();

        window.addEventListener('resize', () => this.onWindowResize());
    }

    initLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffa500, 1);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);
    }

    initElements() {
        // Floating organic 'spice' particles for a warm atmosphere
        this.elements = [];
        const geometry = new THREE.IcosahedronGeometry(0.1, 0);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffa500,
            roughness: 0.5,
            metalness: 0.2
        });

        for (let i = 0; i < 40; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            mesh.scale.setScalar(Math.random() * 2 + 0.5);

            this.elements.push({
                mesh,
                speed: Math.random() * 0.01 + 0.005,
                rotSpeed: Math.random() * 0.02
            });
            this.scene.add(mesh);
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        this.elements.forEach(el => {
            el.mesh.rotation.x += el.rotSpeed;
            el.mesh.rotation.y += el.rotSpeed;
            el.mesh.position.y += Math.sin(time + el.mesh.position.x) * 0.002;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Scene3D('canvas-container');
});
