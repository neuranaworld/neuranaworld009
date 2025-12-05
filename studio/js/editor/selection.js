/**
 * @file selection.js
 * @description Viewport'ta mouse ile nesne seçme sistemi (Raycaster)
 * @author NeuranaWorld Team
 * @created 2025-12-05
 */

export class SelectionManager {
    constructor(renderer, dataModel) {
        this.renderer = renderer;
        this.dataModel = dataModel;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Multi-selection
        this.selectedObjects = [];
        this.isMultiSelectMode = false;

        // Selection outline
        this.outlinePass = null;
        this.selectedMeshes = [];

        // Event listeners
        this.setupEventListeners();

        console.log('🎯 Selection Manager initialized');
    }

    /**
     * Event listener'ları ayarla
     */
    setupEventListeners() {
        const canvas = this.renderer.canvas;

        // Mouse click
        canvas.addEventListener('click', (e) => this.onMouseClick(e));

        // Mouse move (hover preview)
        canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Keyboard
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    /**
     * Mouse koordinatlarını normalize et (-1 to +1)
     */
    getNormalizedMouseCoords(event) {
        const rect = this.renderer.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    /**
     * Mouse click event
     */
    onMouseClick(event) {
        // Normalize mouse coordinates
        this.getNormalizedMouseCoords(event);

        // Raycasting
        this.raycaster.setFromCamera(this.mouse, this.renderer.camera);

        // Sadece Part nesnelerini kontrol et
        const selectableObjects = this.getSelectableObjects();
        const intersects = this.raycaster.intersectObjects(selectableObjects, false);

        if (intersects.length > 0) {
            const clickedMesh = intersects[0].object;
            const instance = clickedMesh.userData.instance;

            if (instance) {
                if (this.isMultiSelectMode) {
                    // Multi-selection
                    this.toggleSelection(instance);
                } else {
                    // Single selection
                    this.selectSingle(instance);
                }

                console.log(`🎯 Selected: ${instance.name}`);
            }
        } else {
            // Boş alana tıklandı
            if (!this.isMultiSelectMode) {
                this.clearSelection();
            }
        }
    }

    /**
     * Mouse move event (hover preview)
     */
    onMouseMove(event) {
        // Gelecekte hover highlight için kullanılabilir
        this.getNormalizedMouseCoords(event);
    }

    /**
     * Keyboard events
     */
    onKeyDown(event) {
        // Ctrl tuşu - multi-select mode
        if (event.ctrlKey || event.metaKey) {
            this.isMultiSelectMode = true;
        }

        // Delete tuşu - seçili nesneleri sil
        if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault();
            this.deleteSelected();
        }

        // Escape - seçimi temizle
        if (event.key === 'Escape') {
            this.clearSelection();
        }
    }

    onKeyUp(event) {
        if (!event.ctrlKey && !event.metaKey) {
            this.isMultiSelectMode = false;
        }
    }

    /**
     * Seçilebilir nesneleri al (sadece Part'lar)
     */
    getSelectableObjects() {
        const objects = [];
        this.renderer.scene.traverse((obj) => {
            if (obj.isMesh && obj.userData.instance) {
                // Instance varsa ve Part ise
                const instance = obj.userData.instance;
                if (instance.className === 'Part') {
                    objects.push(obj);
                }
            }
        });
        return objects;
    }

    /**
     * Tek nesne seç
     */
    selectSingle(instance) {
        // Önceki seçimi temizle
        this.clearSelection();

        // Yeni seçim
        this.selectedObjects = [instance];
        this.dataModel.selectObject(instance);
        this.updateOutline();
    }

    /**
     * Multi-selection toggle
     */
    toggleSelection(instance) {
        const index = this.selectedObjects.indexOf(instance);

        if (index > -1) {
            // Zaten seçili - kaldır
            this.selectedObjects.splice(index, 1);
        } else {
            // Ekle
            this.selectedObjects.push(instance);
        }

        // DataModel'e son seçileni bildir
        if (this.selectedObjects.length > 0) {
            this.dataModel.selectObject(this.selectedObjects[this.selectedObjects.length - 1]);
        } else {
            this.dataModel.selectObject(null);
        }

        this.updateOutline();
    }

    /**
     * Seçimi temizle
     */
    clearSelection() {
        this.selectedObjects = [];
        this.dataModel.selectObject(null);
        this.updateOutline();
        console.log('🎯 Selection cleared');
    }

    /**
     * Selection outline güncelle
     */
    updateOutline() {
        // Eski outline'ları temizle
        this.selectedMeshes.forEach(mesh => {
            if (mesh.material.emissive) {
                mesh.material.emissive.setHex(0x000000);
            }
        });
        this.selectedMeshes = [];

        // Yeni outline'lar ekle
        this.selectedObjects.forEach(instance => {
            if (instance._object3D) {
                const mesh = instance._object3D;

                // Emissive glow ekle
                if (mesh.material.emissive) {
                    mesh.material.emissive.setHex(0x007acc); // Mavi glow
                }

                this.selectedMeshes.push(mesh);
            }
        });
    }

    /**
     * Seçili nesneleri sil
     */
    deleteSelected() {
        if (this.selectedObjects.length === 0) return;

        // Kopyasını al (array değişeceği için)
        const toDelete = [...this.selectedObjects];

        toDelete.forEach(instance => {
            console.log(`🗑️ Deleting: ${instance.name}`);
            this.dataModel.deleteObject(instance);
        });

        this.selectedObjects = [];
        this.updateOutline();

        // Console message
        if (window.NeuranaStudio && window.NeuranaStudio.addConsoleMessage) {
            window.NeuranaStudio.addConsoleMessage(
                `🗑️ ${toDelete.length} nesne silindi`,
                'warning'
            );
        }
    }

    /**
     * Seçili nesnelerin sayısını al
     */
    getSelectionCount() {
        return this.selectedObjects.length;
    }

    /**
     * Seçili nesneleri al
     */
    getSelectedObjects() {
        return [...this.selectedObjects];
    }
}
