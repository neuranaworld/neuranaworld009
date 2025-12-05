/**
 * @file ui-manager.js
 * @description UI panellerini yönetir (Hierarchy, Properties)
 * @author NeuranaWorld Team
 * @created 2025-12-05
 */

export class UIManager {
    constructor(dataModel) {
        this.dataModel = dataModel;

        // Panel elementleri
        this.hierarchyPanel = document.querySelector('#hierarchy-panel .panel-content');
        this.propertiesPanel = document.querySelector('#properties-panel .panel-content');

        // DataModel event'lerini dinle
        this.dataModel.onHierarchyChanged = () => this.updateHierarchy();
        this.dataModel.onSelectionChanged = (obj) => this.updateProperties(obj);

        // İlk güncelleme
        this.updateHierarchy();

        console.log('🎛️ UI Manager initialized');
    }

    /**
     * Hierarchy panelini güncelle
     */
    updateHierarchy() {
        if (!this.hierarchyPanel) return;

        // Panel içeriğini temizle
        this.hierarchyPanel.innerHTML = '';

        // Tree view oluştur
        const treeView = document.createElement('div');
        treeView.className = 'tree-view';

        // Workspace'i ekle
        const workspaceItem = this.createTreeItem(this.dataModel.workspace, 0);
        treeView.appendChild(workspaceItem);

        this.hierarchyPanel.appendChild(treeView);
    }

    /**
     * Tree item oluştur (recursive)
     */
    createTreeItem(instance, level = 0) {
        const item = document.createElement('div');
        item.className = 'tree-item';
        item.style.paddingLeft = `${level * 16 + 8}px`;

        // Icon
        const icon = document.createElement('span');
        icon.className = 'tree-icon';
        icon.textContent = this.getIcon(instance.className);

        // Label
        const label = document.createElement('span');
        label.className = 'tree-label';
        label.textContent = instance.name;

        item.appendChild(icon);
        item.appendChild(label);

        // Click event
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dataModel.selectObject(instance);

            // Visual feedback
            document.querySelectorAll('.tree-item').forEach(el => {
                el.classList.remove('selected');
            });
            item.classList.add('selected');
        });

        // Container oluştur
        const container = document.createElement('div');
        container.appendChild(item);

        // Alt nesneleri ekle
        if (instance.children.length > 0) {
            instance.children.forEach(child => {
                const childItem = this.createTreeItem(child, level + 1);
                container.appendChild(childItem);
            });
        }

        return container;
    }

    /**
     * Sınıf ismine göre icon getir
     */
    getIcon(className) {
        const icons = {
            'Workspace': '📦',
            'Part': '🔲',
            'Script': '📜',
            'Model': '🎁'
        };
        return icons[className] || '📄';
    }

    /**
     * Properties panelini güncelle
     */
    updateProperties(instance) {
        if (!this.propertiesPanel) return;

        // Panel içeriğini temizle
        this.propertiesPanel.innerHTML = '';

        if (!instance) {
            // Hiçbir şey seçili değil
            const empty = document.createElement('div');
            empty.className = 'properties-empty';
            empty.innerHTML = '<p>Nesne seçin</p>';
            this.propertiesPanel.appendChild(empty);
            return;
        }

        // Başlık
        const header = document.createElement('div');
        header.className = 'properties-header';
        header.innerHTML = `
            <h3>${instance.name}</h3>
            <p class="class-name">${instance.className}</p>
        `;
        this.propertiesPanel.appendChild(header);

        // Part özellikleri
        if (instance.className === 'Part') {
            this.addPartProperties(instance);
        }

        console.log(`📝 Properties updated for ${instance.name}`);
    }

    /**
     * Part properties ekle
     */
    addPartProperties(part) {
        // Position
        this.addPropertyGroup('Position', {
            'X': { value: part.position.x, type: 'number', onChange: (val) => {
                part.position.x = parseFloat(val);
                part.updateTransform();
            }},
            'Y': { value: part.position.y, type: 'number', onChange: (val) => {
                part.position.y = parseFloat(val);
                part.updateTransform();
            }},
            'Z': { value: part.position.z, type: 'number', onChange: (val) => {
                part.position.z = parseFloat(val);
                part.updateTransform();
            }}
        });

        // Rotation
        this.addPropertyGroup('Rotation', {
            'X': { value: part.rotation.x, type: 'number', onChange: (val) => {
                part.rotation.x = parseFloat(val);
                part.updateTransform();
            }},
            'Y': { value: part.rotation.y, type: 'number', onChange: (val) => {
                part.rotation.y = parseFloat(val);
                part.updateTransform();
            }},
            'Z': { value: part.rotation.z, type: 'number', onChange: (val) => {
                part.rotation.z = parseFloat(val);
                part.updateTransform();
            }}
        });

        // Size
        this.addPropertyGroup('Size', {
            'X': { value: part.size.x, type: 'number', onChange: (val) => {
                part.size.x = parseFloat(val);
                part.updateTransform();
            }},
            'Y': { value: part.size.y, type: 'number', onChange: (val) => {
                part.size.y = parseFloat(val);
                part.updateTransform();
            }},
            'Z': { value: part.size.z, type: 'number', onChange: (val) => {
                part.size.z = parseFloat(val);
                part.updateTransform();
            }}
        });

        // Color
        this.addPropertyGroup('Color', {
            'R': { value: part.color.r, type: 'number', min: 0, max: 255, onChange: (val) => {
                part.setColor(parseInt(val), part.color.g, part.color.b);
            }},
            'G': { value: part.color.g, type: 'number', min: 0, max: 255, onChange: (val) => {
                part.setColor(part.color.r, parseInt(val), part.color.b);
            }},
            'B': { value: part.color.b, type: 'number', min: 0, max: 255, onChange: (val) => {
                part.setColor(part.color.r, part.color.g, parseInt(val));
            }}
        });
    }

    /**
     * Property group ekle
     */
    addPropertyGroup(title, properties) {
        const group = document.createElement('div');
        group.className = 'property-group';

        const groupTitle = document.createElement('div');
        groupTitle.className = 'property-group-title';
        groupTitle.textContent = title;
        group.appendChild(groupTitle);

        Object.entries(properties).forEach(([key, prop]) => {
            const row = document.createElement('div');
            row.className = 'property-row';

            const label = document.createElement('label');
            label.textContent = key;

            const input = document.createElement('input');
            input.type = prop.type || 'text';
            input.value = prop.value;
            if (prop.min !== undefined) input.min = prop.min;
            if (prop.max !== undefined) input.max = prop.max;
            input.step = prop.step || (prop.type === 'number' ? '0.1' : null);

            input.addEventListener('input', (e) => {
                if (prop.onChange) {
                    prop.onChange(e.target.value);
                }
            });

            row.appendChild(label);
            row.appendChild(input);
            group.appendChild(row);
        });

        this.propertiesPanel.appendChild(group);
    }
}
