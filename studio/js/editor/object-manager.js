/**
 * @file object-manager.js
 * @description Nesne ekleme, silme, kopyalama işlemleri
 * @author NeuranaWorld Team
 * @created 2025-12-05
 */

export class ObjectManager {
    constructor(dataModel) {
        this.dataModel = dataModel;
        this.objectCounter = 1;

        console.log('📦 Object Manager initialized');
    }

    /**
     * Yeni Part oluştur
     */
    createPart(name = null, position = null) {
        // Varsayılan isim
        if (!name) {
            name = `Part${this.objectCounter++}`;
        }

        // Varsayılan pozisyon (kamera önü veya origin)
        if (!position) {
            position = { x: 0, y: 2, z: 0 };
        }

        // Part oluştur
        const part = this.dataModel.createPart(name, position);

        // Console message
        if (window.NeuranaStudio && window.NeuranaStudio.addConsoleMessage) {
            window.NeuranaStudio.addConsoleMessage(
                `✨ ${name} oluşturuldu`,
                'success'
            );
        }

        console.log(`✨ Created ${name} at`, position);
        return part;
    }

    /**
     * Seçili nesneyi kopyala (Duplicate)
     */
    duplicateSelected() {
        const selected = this.dataModel.selectedObject;

        if (!selected) {
            console.warn('No object selected to duplicate');
            return null;
        }

        if (selected.className !== 'Part') {
            console.warn('Only Parts can be duplicated');
            return null;
        }

        // Yeni isim
        const newName = `${selected.name}_Copy`;

        // Pozisyon (biraz offset)
        const offset = 2;
        const newPosition = {
            x: selected.position.x + offset,
            y: selected.position.y,
            z: selected.position.z + offset
        };

        // Yeni Part oluştur
        const duplicate = this.dataModel.createPart(newName, newPosition);

        // Özellikleri kopyala
        duplicate.rotation = { ...selected.rotation };
        duplicate.size = { ...selected.size };
        duplicate.setColor(selected.color.r, selected.color.g, selected.color.b);
        duplicate.material = selected.material;
        duplicate.transparency = selected.transparency;
        duplicate.anchored = selected.anchored;
        duplicate.canCollide = selected.canCollide;

        // Transform uygula
        duplicate.updateTransform();

        // Yeni nesneyi seç
        this.dataModel.selectObject(duplicate);

        // Console message
        if (window.NeuranaStudio && window.NeuranaStudio.addConsoleMessage) {
            window.NeuranaStudio.addConsoleMessage(
                `📋 ${selected.name} kopyalandı → ${newName}`,
                'success'
            );
        }

        console.log(`📋 Duplicated ${selected.name} → ${newName}`);
        return duplicate;
    }

    /**
     * Seçili nesneyi sil
     */
    deleteSelected(confirm = false) {
        const selected = this.dataModel.selectedObject;

        if (!selected) {
            console.warn('No object selected to delete');
            return false;
        }

        // Workspace silinemez
        if (selected.className === 'Workspace') {
            if (window.NeuranaStudio && window.NeuranaStudio.addConsoleMessage) {
                window.NeuranaStudio.addConsoleMessage(
                    '⚠️ Workspace silinemez!',
                    'warning'
                );
            }
            return false;
        }

        // Onay iste (opsiyonel)
        if (confirm) {
            const confirmed = window.confirm(`"${selected.name}" silinecek. Emin misiniz?`);
            if (!confirmed) return false;
        }

        const objectName = selected.name;
        this.dataModel.deleteObject(selected);

        // Console message
        if (window.NeuranaStudio && window.NeuranaStudio.addConsoleMessage) {
            window.NeuranaStudio.addConsoleMessage(
                `🗑️ ${objectName} silindi`,
                'warning'
            );
        }

        console.log(`🗑️ Deleted ${objectName}`);
        return true;
    }

    /**
     * Spesifik türde nesne oluştur
     */
    createObject(type, options = {}) {
        switch (type) {
            case 'Part':
                return this.createPart(options.name, options.position);

            case 'Model':
                // Gelecekte: Model container
                console.warn('Model creation not implemented yet');
                return null;

            case 'Script':
                // Gelecekte: Script instance
                console.warn('Script creation not implemented yet');
                return null;

            default:
                console.error(`Unknown object type: ${type}`);
                return null;
        }
    }

    /**
     * Tüm nesneleri temizle (workspace hariç)
     */
    clearAll(confirm = true) {
        if (confirm) {
            const confirmed = window.confirm('Tüm nesneler silinecek. Emin misiniz?');
            if (!confirmed) return false;
        }

        this.dataModel.clear();

        // Console message
        if (window.NeuranaStudio && window.NeuranaStudio.addConsoleMessage) {
            window.NeuranaStudio.addConsoleMessage(
                '🗑️ Tüm nesneler silindi',
                'warning'
            );
        }

        console.log('🗑️ All objects cleared');
        return true;
    }

    /**
     * İstatistik bilgileri
     */
    getStats() {
        const workspace = this.dataModel.workspace;
        const partCount = workspace.children.filter(c => c.className === 'Part').length;
        const totalObjects = workspace.children.length;

        return {
            parts: partCount,
            total: totalObjects
        };
    }
}
