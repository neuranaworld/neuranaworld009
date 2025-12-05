/**
 * @file engine.js
 * @description Ana oyun motoru - render döngüsü ve sistem yönetimi
 * @author NeuranaWorld Team
 * @created 2025-12-05
 */

import { Renderer } from './renderer.js';

export class Engine {
    constructor() {
        this.renderer = null;
        this.isRunning = false;
        this.isPaused = false;
        this.clock = new THREE.Clock();
        this.fpsCounter = document.getElementById('fps');
        this.frameCount = 0;
        this.lastFpsUpdate = 0;

        console.log('⚙️ Engine initialized');
    }

    /**
     * Motoru başlat
     */
    async init() {
        try {
            // Renderer'ı oluştur
            this.renderer = new Renderer('viewport');
            await this.renderer.init();

            // Test sahnesini oluştur
            this.createTestScene();

            console.log('✅ Engine started successfully');
            return true;
        } catch (error) {
            console.error('❌ Engine initialization failed:', error);
            return false;
        }
    }

    /**
     * Test sahnesi oluştur
     */
    createTestScene() {
        // Test küpü ekle
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({
            color: 0x6c5ce7,
            metalness: 0.3,
            roughness: 0.4
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.name = 'TestCube';
        this.renderer.scene.add(cube);

        // Işıklandırma
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.renderer.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        this.renderer.scene.add(directionalLight);

        // Grid ve Axis helpers
        const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
        this.renderer.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(5);
        this.renderer.scene.add(axesHelper);

        console.log('🎨 Test scene created');
    }

    /**
     * Render döngüsünü başlat
     */
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.isPaused = false;
        this.animate();
        console.log('▶️ Render loop started');
    }

    /**
     * Durdur
     */
    pause() {
        this.isPaused = true;
        console.log('⏸️ Engine paused');
    }

    /**
     * Devam et
     */
    resume() {
        this.isPaused = false;
        console.log('▶️ Engine resumed');
    }

    /**
     * Tamamen durdur
     */
    stop() {
        this.isRunning = false;
        this.isPaused = false;
        console.log('⏹️ Engine stopped');
    }

    /**
     * Ana render döngüsü
     */
    animate() {
        if (!this.isRunning) return;

        requestAnimationFrame(() => this.animate());

        if (this.isPaused) return;

        const delta = this.clock.getDelta();

        // Basit animasyon: Küpü döndür
        const cube = this.renderer.scene.getObjectByName('TestCube');
        if (cube) {
            cube.rotation.x += delta * 0.5;
            cube.rotation.y += delta * 0.7;
        }

        // Render
        this.renderer.render();

        // FPS counter güncelle
        this.updateFPS(delta);
    }

    /**
     * FPS sayacını güncelle
     */
    updateFPS(delta) {
        this.frameCount++;
        this.lastFpsUpdate += delta;

        if (this.lastFpsUpdate >= 0.5) {
            const fps = Math.round(this.frameCount / this.lastFpsUpdate);
            if (this.fpsCounter) {
                this.fpsCounter.textContent = fps;
            }
            this.frameCount = 0;
            this.lastFpsUpdate = 0;
        }
    }

    /**
     * Pencere boyutu değiştiğinde
     */
    onResize() {
        if (this.renderer) {
            this.renderer.onResize();
        }
    }
}
