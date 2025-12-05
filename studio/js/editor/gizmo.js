/**
 * @file gizmo.js
 * @description Transform Gizmo sistemi (Move, Rotate, Scale)
 * @author NeuranaWorld Team
 * @created 2025-12-05
 */

export class GizmoManager {
    constructor(renderer, dataModel) {
        this.renderer = renderer;
        this.dataModel = dataModel;
        this.transformControls = null;
        this.currentMode = 'translate'; // translate, rotate, scale
        this.isEnabled = true;

        // Şu anda gizmo'nun bağlı olduğu nesne
        this.attachedObject = null;

        // Initialize
        this.init();

        console.log('🎨 Gizmo Manager initialized');
    }

    /**
     * Gizmo'yu başlat
     */
    async init() {
        // TransformControls'u yükle
        await this.loadTransformControls();

        // Gizmo oluştur
        this.createGizmo();

        // Event'leri ayarla
        this.setupEvents();
    }

    /**
     * TransformControls'u CDN'den yükle
     */
    async loadTransformControls() {
        return new Promise((resolve, reject) => {
            if (window.TransformControls) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/three@0.150.0/examples/js/controls/TransformControls.js';
            script.onload = () => {
                console.log('✅ TransformControls loaded');
                resolve();
            };
            script.onerror = () => {
                console.error('❌ Failed to load TransformControls');
                reject();
            };
            document.head.appendChild(script);
        });
    }

    /**
     * Gizmo'yu oluştur
     */
    createGizmo() {
        // TransformControls oluştur
        this.transformControls = new THREE.TransformControls(
            this.renderer.camera,
            this.renderer.canvas
        );

        // Başlangıç modu
        this.transformControls.setMode(this.currentMode);

        // Sahneye ekle
        this.renderer.scene.add(this.transformControls);

        console.log('🎨 Transform gizmo created');
    }

    /**
     * Event'leri ayarla
     */
    setupEvents() {
        // Transform değiştiğinde
        this.transformControls.addEventListener('change', () => {
            this.onTransformChange();
        });

        // Gizmo ile etkileşim başladığında (OrbitControls'u devre dışı bırak)
        this.transformControls.addEventListener('dragging-changed', (event) => {
            if (this.renderer.controls) {
                this.renderer.controls.enabled = !event.value;
            }
        });

        // Gizmo'dan ayrılmadan önce son değerleri kaydet
        this.transformControls.addEventListener('mouseUp', () => {
            this.onTransformEnd();
        });
    }

    /**
     * Gizmo'yu bir nesneye bağla
     */
    attach(object3D) {
        if (!object3D) {
            this.detach();
            return;
        }

        this.attachedObject = object3D;
        this.transformControls.attach(object3D);
        console.log(`🎨 Gizmo attached to ${object3D.name}`);
    }

    /**
     * Gizmo'yu ayır
     */
    detach() {
        if (this.transformControls.object) {
            this.transformControls.detach();
            this.attachedObject = null;
            console.log('🎨 Gizmo detached');
        }
    }

    /**
     * Transform modu değiştir
     */
    setMode(mode) {
        if (['translate', 'rotate', 'scale'].includes(mode)) {
            this.currentMode = mode;
            this.transformControls.setMode(mode);
            console.log(`🎨 Gizmo mode: ${mode}`);
        }
    }

    /**
     * Gizmo'yu aktif/pasif yap
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
        this.transformControls.enabled = enabled;
        this.transformControls.visible = enabled;
    }

    /**
     * Transform değiştiğinde (anlık)
     */
    onTransformChange() {
        if (!this.attachedObject) return;

        // Instance'ı bul
        const instance = this.attachedObject.userData.instance;
        if (!instance || instance.className !== 'Part') return;

        // Three.js'den Instance'a değerleri kopyala
        this.syncToInstance(instance);

        // Render tetikle (zaten otomatik render loop var ama emin olalım)
        this.renderer.render();
    }

    /**
     * Transform bittiğinde (final değerler)
     */
    onTransformEnd() {
        if (!this.attachedObject) return;

        const instance = this.attachedObject.userData.instance;
        if (!instance) return;

        // Son değerleri kaydet
        this.syncToInstance(instance);

        // Console message
        if (window.NeuranaStudio && window.NeuranaStudio.addConsoleMessage) {
            window.NeuranaStudio.addConsoleMessage(
                `📐 ${instance.name} transform güncellendi`,
                'info'
            );
        }

        console.log(`📐 Transform updated for ${instance.name}:`, {
            position: instance.position,
            rotation: instance.rotation,
            size: instance.size
        });
    }

    /**
     * Three.js mesh'ten Instance'a değerleri senkronize et
     */
    syncToInstance(instance) {
        if (!this.attachedObject) return;

        // Position
        instance.position.x = parseFloat(this.attachedObject.position.x.toFixed(2));
        instance.position.y = parseFloat(this.attachedObject.position.y.toFixed(2));
        instance.position.z = parseFloat(this.attachedObject.position.z.toFixed(2));

        // Rotation (radians to degrees)
        instance.rotation.x = parseFloat((this.attachedObject.rotation.x * 180 / Math.PI).toFixed(2));
        instance.rotation.y = parseFloat((this.attachedObject.rotation.y * 180 / Math.PI).toFixed(2));
        instance.rotation.z = parseFloat((this.attachedObject.rotation.z * 180 / Math.PI).toFixed(2));

        // Scale (update size based on scale)
        if (this.currentMode === 'scale') {
            // Base size'lar: 4, 1, 2
            instance.size.x = parseFloat((this.attachedObject.scale.x * 4).toFixed(2));
            instance.size.y = parseFloat((this.attachedObject.scale.y * 1).toFixed(2));
            instance.size.z = parseFloat((this.attachedObject.scale.z * 2).toFixed(2));
        }

        // UI'ı güncelle (Properties panel)
        if (this.dataModel.onSelectionChanged) {
            // Sadece values'ları güncelle, tam selection event'i tetikleme
            // Bu sayede hierarchy'de seçim değişmez
            this.updatePropertiesPanel(instance);
        }
    }

    /**
     * Properties panelini güncelle (selection değiştirmeden)
     */
    updatePropertiesPanel(instance) {
        // Properties panelindeki input değerlerini güncelle
        const inputs = document.querySelectorAll('.property-row input');
        inputs.forEach(input => {
            const label = input.previousElementSibling?.textContent;
            const group = input.closest('.property-group')?.querySelector('.property-group-title')?.textContent;

            if (group === 'Position') {
                if (label === 'X') input.value = instance.position.x;
                if (label === 'Y') input.value = instance.position.y;
                if (label === 'Z') input.value = instance.position.z;
            } else if (group === 'Rotation') {
                if (label === 'X') input.value = instance.rotation.x;
                if (label === 'Y') input.value = instance.rotation.y;
                if (label === 'Z') input.value = instance.rotation.z;
            } else if (group === 'Size') {
                if (label === 'X') input.value = instance.size.x;
                if (label === 'Y') input.value = instance.size.y;
                if (label === 'Z') input.value = instance.size.z;
            }
        });
    }

    /**
     * Keyboard shortcuts
     */
    handleKeyboard(key) {
        switch (key) {
            case 'w':
            case 'W':
                this.setMode('translate');
                return true;
            case 'e':
            case 'E':
                this.setMode('rotate');
                return true;
            case 'r':
            case 'R':
                this.setMode('scale');
                return true;
            default:
                return false;
        }
    }

    /**
     * Mevcut modu al
     */
    getMode() {
        return this.currentMode;
    }

    /**
     * Dispose (temizlik)
     */
    dispose() {
        this.detach();
        this.renderer.scene.remove(this.transformControls);
        this.transformControls.dispose();
    }
}
