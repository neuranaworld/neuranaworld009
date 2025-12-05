/**
 * @file renderer.js
 * @description 3D rendering sistemi - Three.js wrapper
 * @author NeuranaWorld Team
 * @created 2025-12-05
 */

export class Renderer {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.canvas = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.controls = null;

        console.log('🎨 Renderer initialized');
    }

    /**
     * Renderer'ı başlat
     */
    async init() {
        // Canvas'ı al
        this.canvas = document.getElementById(this.canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas element not found: ${this.canvasId}`);
        }

        // Three.js renderer oluştur
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: false
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Sahne oluştur
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);
        this.scene.fog = new THREE.Fog(0x1a1a1a, 50, 100);

        // Kamera oluştur
        this.createCamera();

        // OrbitControls ekle
        await this.loadOrbitControls();

        // Resize event
        window.addEventListener('resize', () => this.onResize());

        console.log('✅ Renderer ready');
    }

    /**
     * Kamera oluştur
     */
    createCamera() {
        const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(8, 6, 8);
        this.camera.lookAt(0, 0, 0);
    }

    /**
     * OrbitControls yükle
     */
    async loadOrbitControls() {
        try {
            // OrbitControls'u dinamik import et (CDN'den)
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/three@0.150.0/examples/js/controls/OrbitControls.js';

            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });

            // OrbitControls oluştur
            this.controls = new THREE.OrbitControls(this.camera, this.canvas);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.screenSpacePanning = false;
            this.controls.minDistance = 2;
            this.controls.maxDistance = 50;
            this.controls.maxPolarAngle = Math.PI / 2;

            console.log('✅ OrbitControls loaded');
        } catch (error) {
            console.warn('⚠️ OrbitControls failed to load:', error);
        }
    }

    /**
     * Render yap
     */
    render() {
        if (this.controls) {
            this.controls.update();
        }
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Pencere boyutu değiştiğinde
     */
    onResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    /**
     * Sahneye nesne ekle
     */
    add(object) {
        this.scene.add(object);
    }

    /**
     * Sahneden nesne çıkar
     */
    remove(object) {
        this.scene.remove(object);
    }
}
