/**
 * @file main.js
 * @description NeuranaWorld Studio - Ana giriş noktası
 * @author NeuranaWorld Team
 * @created 2025-12-05
 */

import { Engine } from './core/engine.js';
import { UIManager } from './ui/ui-manager.js';
import { SelectionManager } from './editor/selection.js';
import { GizmoManager } from './editor/gizmo.js';
import { ObjectManager } from './editor/object-manager.js';

// Global instances
let engine = null;
let uiManager = null;
let selectionManager = null;
let gizmoManager = null;
let objectManager = null;

/**
 * Studio'yu başlat
 */
async function initStudio() {
    console.log('🚀 NeuranaWorld Studio başlatılıyor...');

    // Engine oluştur
    engine = new Engine();

    // Engine'i başlat
    const success = await engine.init();

    if (success) {
        // UI Manager oluştur
        uiManager = new UIManager(engine.dataModel);

        // Selection Manager oluştur
        selectionManager = new SelectionManager(engine.renderer, engine.dataModel);

        // Gizmo Manager oluştur
        gizmoManager = new GizmoManager(engine.renderer, engine.dataModel);
        await gizmoManager.init();

        // Object Manager oluştur
        objectManager = new ObjectManager(engine.dataModel);

        // Selection ile Gizmo'yu bağla
        connectSelectionToGizmo();

        // Otomatik başlat
        engine.start();

        // UI event'lerini bağla
        setupUIEvents();

        addConsoleMessage('✅ Studio başarıyla yüklendi!', 'success');
        addConsoleMessage('💡 İpucu: Viewport\'ta nesnelere tıklayarak seçebilirsiniz', 'info');
        addConsoleMessage('💡 W/E/R: Move/Rotate/Scale', 'info');
    } else {
        addConsoleMessage('❌ Studio başlatılamadı!', 'error');
    }
}

/**
 * Selection ile Gizmo'yu bağla
 */
function connectSelectionToGizmo() {
    // DataModel selection değiştiğinde gizmo'yu güncelle
    const originalOnSelectionChanged = engine.dataModel.onSelectionChanged;

    engine.dataModel.onSelectionChanged = (instance) => {
        // Original callback'i çağır (UI Manager için)
        if (originalOnSelectionChanged) {
            originalOnSelectionChanged(instance);
        }

        // Gizmo'yu seçili nesneye bağla
        if (instance && instance._object3D) {
            gizmoManager.attach(instance._object3D);
        } else {
            gizmoManager.detach();
        }
    };

    console.log('🔗 Selection & Gizmo connected');
}

/**
 * UI event'lerini ayarla
 */
function setupUIEvents() {
    // Play butonu
    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', () => {
        engine.start();
        playBtn.disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('stopBtn').disabled = false;
        addConsoleMessage('▶️ Play modu başlatıldı', 'info');
    });

    // Pause butonu
    const pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.addEventListener('click', () => {
        if (engine.isPaused) {
            engine.resume();
            pauseBtn.textContent = 'Pause';
            addConsoleMessage('▶️ Devam ediliyor', 'info');
        } else {
            engine.pause();
            pauseBtn.querySelector('.label').textContent = 'Resume';
            addConsoleMessage('⏸️ Duraklatıldı', 'warning');
        }
    });

    // Stop butonu
    const stopBtn = document.getElementById('stopBtn');
    stopBtn.addEventListener('click', () => {
        engine.stop();
        playBtn.disabled = false;
        pauseBtn.disabled = true;
        stopBtn.disabled = true;
        addConsoleMessage('⏹️ Play modu durduruldu', 'info');
    });

    // Save butonu
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener('click', () => {
        addConsoleMessage('💾 Proje kaydediliyor...', 'info');
        setTimeout(() => {
            addConsoleMessage('✅ Proje kaydedildi!', 'success');
        }, 500);
    });

    // Gizmo mode butonları
    const moveBtn = document.getElementById('moveBtn');
    const rotateBtn = document.getElementById('rotateBtn');
    const scaleBtn = document.getElementById('scaleBtn');

    moveBtn.addEventListener('click', () => {
        setGizmoMode('translate', moveBtn);
    });

    rotateBtn.addEventListener('click', () => {
        setGizmoMode('rotate', rotateBtn);
    });

    scaleBtn.addEventListener('click', () => {
        setGizmoMode('scale', scaleBtn);
    });

    // Insert butonu
    const insertBtn = document.getElementById('insertBtn');
    const insertMenu = document.getElementById('insertMenu');

    insertBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleInsertMenu(insertBtn);
    });

    // Insert menu items
    insertMenu.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const objectType = item.dataset.objectType;
            handleInsertObject(objectType);
            hideInsertMenu();
        });
    });

    // Context menu
    setupContextMenu();

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // F5: Play
        if (e.key === 'F5') {
            e.preventDefault();
            playBtn.click();
        }
        // Escape: Stop
        if (e.key === 'Escape' && !stopBtn.disabled) {
            stopBtn.click();
        }
        // Ctrl+S: Save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveBtn.click();
        }
        // Ctrl+D: Duplicate
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            if (objectManager) {
                objectManager.duplicateSelected();
            }
        }

        // Gizmo shortcuts (W/E/R)
        if (gizmoManager) {
            if (e.key === 'w' || e.key === 'W') {
                setGizmoMode('translate', moveBtn);
            } else if (e.key === 'e' || e.key === 'E') {
                setGizmoMode('rotate', rotateBtn);
            } else if (e.key === 'r' || e.key === 'R') {
                setGizmoMode('scale', scaleBtn);
            }
        }
    });

    console.log('⌨️ UI events bağlandı');
}

/**
 * Gizmo modunu değiştir ve buton stillerini güncelle
 */
function setGizmoMode(mode, activeButton) {
    if (!gizmoManager) return;

    gizmoManager.setMode(mode);

    // Buton stillerini güncelle
    document.querySelectorAll('.gizmo-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');

    // Console message
    const modeNames = {
        'translate': 'Move',
        'rotate': 'Rotate',
        'scale': 'Scale'
    };
    addConsoleMessage(`🎨 ${modeNames[mode]} modu aktif`, 'info');
}

/**
 * Insert menu göster/gizle
 */
function toggleInsertMenu(button) {
    const insertMenu = document.getElementById('insertMenu');
    const isVisible = insertMenu.classList.contains('show');

    if (isVisible) {
        hideInsertMenu();
    } else {
        // Position menu below button
        const rect = button.getBoundingClientRect();
        insertMenu.style.left = `${rect.left}px`;
        insertMenu.style.top = `${rect.bottom + 5}px`;
        insertMenu.classList.add('show');

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', hideInsertMenu, { once: true });
        }, 10);
    }
}

function hideInsertMenu() {
    document.getElementById('insertMenu').classList.remove('show');
}

/**
 * Nesne oluştur
 */
function handleInsertObject(type) {
    if (!objectManager) return;

    switch (type) {
        case 'Part':
            objectManager.createPart();
            break;
        case 'Model':
            addConsoleMessage('⚠️ Model henüz desteklenmiyor', 'warning');
            break;
        case 'Script':
            addConsoleMessage('⚠️ Script henüz desteklenmiyor', 'warning');
            break;
    }
}

/**
 * Context menu setup
 */
function setupContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    const hierarchyPanel = document.getElementById('hierarchy-panel');

    // Right-click on hierarchy items
    hierarchyPanel.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        // Check if clicked on tree item
        const treeItem = e.target.closest('.tree-item');
        if (!treeItem) return;

        // Show context menu
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.classList.add('show');

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', hideContextMenu, { once: true });
        }, 10);
    });

    // Context menu actions
    contextMenu.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            handleContextMenuAction(action);
            hideContextMenu();
        });
    });

    // Also close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideContextMenu();
            hideInsertMenu();
        }
    });
}

function hideContextMenu() {
    document.getElementById('contextMenu').classList.remove('show');
}

/**
 * Context menu actions
 */
function handleContextMenuAction(action) {
    if (!objectManager) return;

    const selected = engine.dataModel.selectedObject;
    if (!selected) return;

    switch (action) {
        case 'duplicate':
            objectManager.duplicateSelected();
            break;
        case 'delete':
            objectManager.deleteSelected(false); // No confirmation
            break;
        case 'rename':
            const newName = prompt('Yeni isim:', selected.name);
            if (newName && newName.trim()) {
                selected.name = newName.trim();
                uiManager.updateHierarchy();
                addConsoleMessage(`✏️ ${newName} olarak yeniden adlandırıldı`, 'info');
            }
            break;
    }
}

/**
 * Konsola mesaj ekle
 */
function addConsoleMessage(text, type = 'info') {
    const console = document.querySelector('.console');
    const message = document.createElement('div');
    message.className = `console-message ${type}`;

    const time = new Date().toLocaleTimeString('tr-TR');
    message.innerHTML = `
        <span class="time">[${time}]</span>
        <span class="text">${text}</span>
    `;

    console.appendChild(message);
    console.scrollTop = console.scrollHeight;
}

// Studio'yu başlat
window.addEventListener('DOMContentLoaded', () => {
    initStudio();
});

// Global erişim için export (debug amaçlı)
window.NeuranaStudio = {
    engine,
    uiManager,
    selectionManager,
    gizmoManager,
    objectManager,
    addConsoleMessage
};
