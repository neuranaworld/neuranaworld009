/**
 * @file datamodel.js
 * @description Hiyerarşik oyun nesneleri sistemi (Roblox DataModel benzeri)
 * @author NeuranaWorld Team
 * @created 2025-12-05
 */

/**
 * Temel nesne sınıfı - Tüm oyun nesnelerinin atası
 */
export class Instance {
    constructor(name = "Instance") {
        this.name = name;
        this.className = this.constructor.name;
        this.parent = null;
        this.children = [];
        this.properties = {};
        this._object3D = null; // Three.js nesnesi (varsa)

        // Unique ID
        this.id = `${this.className}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Alt nesne ekle
     */
    addChild(child) {
        if (!(child instanceof Instance)) {
            console.error('Child must be an Instance');
            return;
        }

        // Eski parent'tan kaldır
        if (child.parent) {
            child.parent.removeChild(child);
        }

        child.parent = this;
        this.children.push(child);

        console.log(`➕ ${child.name} added to ${this.name}`);
        return child;
    }

    /**
     * Alt nesne kaldır
     */
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
            child.parent = null;
            console.log(`➖ ${child.name} removed from ${this.name}`);
        }
    }

    /**
     * İsme göre alt nesne bul
     */
    findFirstChild(name) {
        return this.children.find(child => child.name === name);
    }

    /**
     * Tüm alt nesneleri al
     */
    getChildren() {
        return [...this.children];
    }

    /**
     * Tipi kontrol et
     */
    isA(className) {
        return this.className === className || this instanceof eval(className);
    }

    /**
     * Nesneyi yok et
     */
    destroy() {
        // Önce tüm çocukları yok et
        [...this.children].forEach(child => child.destroy());

        // Parent'tan kaldır
        if (this.parent) {
            this.parent.removeChild(this);
        }

        // Three.js nesnesini kaldır
        if (this._object3D && this._object3D.parent) {
            this._object3D.parent.remove(this._object3D);
        }

        console.log(`🗑️ ${this.name} destroyed`);
    }

    /**
     * JSON'a serialize et
     */
    serialize() {
        return {
            className: this.className,
            name: this.name,
            properties: { ...this.properties },
            children: this.children.map(child => child.serialize())
        };
    }
}

/**
 * Workspace - Ana oyun dünyası
 */
export class Workspace extends Instance {
    constructor() {
        super("Workspace");
        this.gravity = -9.81;
    }
}

/**
 * Part - 3D nesne (küp, küre vb.)
 */
export class Part extends Instance {
    constructor(name = "Part") {
        super(name);

        // Transform özellikleri
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.size = { x: 4, y: 1, z: 2 };

        // Görünüm özellikleri
        this.color = { r: 108, g: 92, b: 231 }; // Mor
        this.material = "Plastic";
        this.transparency = 0;

        // Fizik özellikleri
        this.anchored = false;
        this.canCollide = true;
    }

    /**
     * 3D mesh oluştur
     */
    createMesh(scene) {
        // Geometry
        const geometry = new THREE.BoxGeometry(
            this.size.x,
            this.size.y,
            this.size.z
        );

        // Material
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(
                this.color.r / 255,
                this.color.g / 255,
                this.color.b / 255
            ),
            metalness: this.material === "Metal" ? 0.8 : 0.3,
            roughness: this.material === "Plastic" ? 0.7 : 0.4,
            transparent: this.transparency > 0,
            opacity: 1 - this.transparency
        });

        // Mesh
        this._object3D = new THREE.Mesh(geometry, material);
        this._object3D.name = this.name;
        this._object3D.userData.instance = this; // Instance referansı

        // Transform uygula
        this.updateTransform();

        // Sahneye ekle
        scene.add(this._object3D);

        console.log(`🎨 Mesh created for ${this.name}`);
        return this._object3D;
    }

    /**
     * Transform'u güncelle
     */
    updateTransform() {
        if (!this._object3D) return;

        this._object3D.position.set(
            this.position.x,
            this.position.y,
            this.position.z
        );

        this._object3D.rotation.set(
            this.rotation.x * Math.PI / 180,
            this.rotation.y * Math.PI / 180,
            this.rotation.z * Math.PI / 180
        );

        this._object3D.scale.set(
            this.size.x / 4, // Base size 4
            this.size.y / 1, // Base size 1
            this.size.z / 2  // Base size 2
        );
    }

    /**
     * Renk değiştir
     */
    setColor(r, g, b) {
        this.color = { r, g, b };
        if (this._object3D) {
            this._object3D.material.color.setRGB(r / 255, g / 255, b / 255);
        }
    }

    /**
     * Serialize
     */
    serialize() {
        const data = super.serialize();
        data.properties = {
            position: this.position,
            rotation: this.rotation,
            size: this.size,
            color: this.color,
            material: this.material,
            transparency: this.transparency,
            anchored: this.anchored,
            canCollide: this.canCollide
        };
        return data;
    }
}

/**
 * DataModel - Ana veri yöneticisi
 */
export class DataModel {
    constructor(scene) {
        this.scene = scene; // Three.js scene
        this.game = new Instance("game");
        this.workspace = new Workspace();
        this.game.addChild(this.workspace);

        // Selection sistemi
        this.selectedObject = null;

        // Event callbacks
        this.onSelectionChanged = null;
        this.onHierarchyChanged = null;

        console.log('📊 DataModel initialized');
    }

    /**
     * Part oluştur ve workspace'e ekle
     */
    createPart(name = "Part", position = { x: 0, y: 2, z: 0 }) {
        const part = new Part(name);
        part.position = position;

        // Workspace'e ekle
        this.workspace.addChild(part);

        // 3D mesh oluştur
        part.createMesh(this.scene);

        // Event tetikle
        if (this.onHierarchyChanged) {
            this.onHierarchyChanged();
        }

        console.log(`✨ Created ${name} at (${position.x}, ${position.y}, ${position.z})`);
        return part;
    }

    /**
     * Nesne seç
     */
    selectObject(instance) {
        // Önceki seçimi temizle
        if (this.selectedObject && this.selectedObject._object3D) {
            // Outline kaldır (gelecekte)
        }

        this.selectedObject = instance;

        // Yeni seçimi vurgula
        if (instance && instance._object3D) {
            // Outline ekle (gelecekte)
        }

        // Event tetikle
        if (this.onSelectionChanged) {
            this.onSelectionChanged(instance);
        }

        console.log(`🎯 Selected: ${instance ? instance.name : 'None'}`);
    }

    /**
     * Nesneyi sil
     */
    deleteObject(instance) {
        if (!instance) return;

        // Seçiliyse seçimi kaldır
        if (this.selectedObject === instance) {
            this.selectObject(null);
        }

        instance.destroy();

        // Event tetikle
        if (this.onHierarchyChanged) {
            this.onHierarchyChanged();
        }
    }

    /**
     * Sahneyi temizle
     */
    clear() {
        // Tüm Part'ları yok et
        [...this.workspace.children].forEach(child => {
            child.destroy();
        });

        // Event tetikle
        if (this.onHierarchyChanged) {
            this.onHierarchyChanged();
        }

        console.log('🗑️ Scene cleared');
    }

    /**
     * JSON'a serialize et
     */
    save() {
        return this.game.serialize();
    }

    /**
     * JSON'dan yükle
     */
    load(data) {
        // Implement later
        console.log('📥 Load not implemented yet');
    }
}
