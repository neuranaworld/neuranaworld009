/**
 * @file main.js
 * @description NeuranaWorld Studio - Ana giriş noktası
 * @author NeuranaWorld Team
 * @created 2025-12-05
 */

import { Engine } from './core/engine.js';
import { UIManager } from './ui/ui-manager.js';
import { SelectionManager } from './editor/selection.js';

// Global instances
let engine = null;
let uiManager = null;
let selectionManager = null;

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

        // Otomatik başlat
        engine.start();

        // UI event'lerini bağla
        setupUIEvents();

        addConsoleMessage('✅ Studio başarıyla yüklendi!', 'success');
        addConsoleMessage('💡 İpucu: Viewport\'ta nesnelere tıklayarak seçebilirsiniz', 'info');
    } else {
        addConsoleMessage('❌ Studio başlatılamadı!', 'error');
    }
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
    });

    console.log('⌨️ UI events bağlandı');
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
    addConsoleMessage
};
