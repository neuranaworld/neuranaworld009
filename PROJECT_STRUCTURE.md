# 📁 NeuranaWorld Studio - Proje Yapısı

## 🌳 Dosya ve Klasör Organizasyonu

```
neuranaworld009/
│
├── 📄 index.html                    # Ana menü sayfası
├── 📄 style.css                     # Ana menü stilleri
├── 📄 script.js                     # Ana menü JavaScript
├── 📄 README.md                     # Proje açıklaması
├── 📄 ROADMAP.md                    # Geliştirme yol haritası
├── 📄 PROJECT_STRUCTURE.md          # Bu dosya
│
├── 📁 studio/                       # 🎬 STUDIO ANA DİZİNİ
│   │
│   ├── 📄 index.html               # Studio ana sayfası (editör)
│   │
│   ├── 📁 css/                     # 🎨 STUDIO STİLLERİ
│   │   ├── main.css                # Ana stil dosyası
│   │   ├── editor.css              # Editör panelleri stilleri
│   │   ├── ui-components.css       # UI bileşenleri (button, panel vb.)
│   │   ├── viewport.css            # 3D/2D viewport stilleri
│   │   └── themes/                 # Tema dosyaları
│   │       ├── dark.css
│   │       └── light.css
│   │
│   ├── 📁 js/                      # 💻 STUDIO JAVASCRIPT MODÜLLERI
│   │   │
│   │   ├── 📁 core/                # ⚙️ ÇEKIRDEK SİSTEMLER
│   │   │   ├── engine.js           # Ana oyun motoru (başlatma, döngü)
│   │   │   ├── renderer.js         # Render yöneticisi (3D/2D)
│   │   │   ├── datamodel.js        # DataModel (sahne yönetimi)
│   │   │   ├── physics.js          # Fizik motoru wrapper
│   │   │   ├── input.js            # Input sistemi (klavye, mouse)
│   │   │   ├── audio.js            # Ses sistemi
│   │   │   └── events.js           # Event sistemi
│   │   │
│   │   ├── 📁 editor/              # 📝 EDİTÖR BİLEŞENLERİ
│   │   │   ├── viewport.js         # 3D/2D viewport kontrolü
│   │   │   ├── hierarchy.js        # Sahne hiyerarşisi paneli
│   │   │   ├── properties.js       # Özellikler paneli
│   │   │   ├── gizmo.js            # Transform gizmos (move, rotate, scale)
│   │   │   ├── camera-controls.js  # Kamera kontrolleri (orbit, pan, zoom)
│   │   │   ├── selection.js        # Nesne seçim sistemi
│   │   │   └── asset-manager.js    # Asset yöneticisi
│   │   │
│   │   ├── 📁 scripting/           # 📜 BETİK SİSTEMİ
│   │   │   ├── lua-vm.js           # Lua VM wrapper (fengari)
│   │   │   ├── api.js              # Motor API (game.Workspace vb.)
│   │   │   ├── script-editor.js    # Monaco editor entegrasyonu
│   │   │   ├── debugger.js         # Debugger sistemi
│   │   │   ├── console.js          # Output konsolu
│   │   │   └── sandbox.js          # Sandbox güvenlik
│   │   │
│   │   ├── 📁 ui/                  # 🎛️ UI BİLEŞENLERİ
│   │   │   ├── toolbar.js          # Üst toolbar (Play, Stop, Save)
│   │   │   ├── menubar.js          # Menü barı (File, Edit, View)
│   │   │   ├── panels.js           # Panel sistemi (dockable)
│   │   │   ├── modal.js            # Modal dialog'lar
│   │   │   ├── notifications.js    # Bildirim sistemi
│   │   │   └── contextmenu.js      # Sağ tık menüsü
│   │   │
│   │   ├── 📁 utils/               # 🔧 YARDIMCI FONKSİYONLAR
│   │   │   ├── math.js             # Matematik yardımcıları
│   │   │   ├── serialization.js    # JSON serialize/deserialize
│   │   │   ├── loader.js           # Asset yükleme
│   │   │   └── helpers.js          # Genel yardımcılar
│   │   │
│   │   └── 📄 main.js              # Ana entry point
│   │
│   ├── 📁 assets/                  # 🎨 STATİK VARLIKLAR
│   │   ├── 📁 icons/               # İkonlar
│   │   │   ├── toolbar/
│   │   │   ├── objects/
│   │   │   └── file-types/
│   │   ├── 📁 textures/            # Dokular
│   │   │   ├── default/
│   │   │   └── materials/
│   │   ├── 📁 models/              # 3D modeller
│   │   │   ├── primitives/         # Temel şekiller
│   │   │   └── characters/         # Karakter modelleri
│   │   ├── 📁 sounds/              # Sesler
│   │   └── 📁 fonts/               # Fontlar
│   │
│   └── 📁 lib/                     # 📚 DIŞ KÜTÜPHANELER
│       ├── three.min.js            # Three.js (3D rendering)
│       ├── cannon.min.js           # Cannon.js (fizik)
│       ├── fengari-web.js          # Fengari (Lua VM)
│       └── monaco-editor/          # Monaco Editor
│
├── 📁 server/                       # 🖥️ BACKEND SERVİSLERİ (İleride)
│   ├── 📁 api/                     # REST API endpoints
│   │   ├── projects.js
│   │   ├── assets.js
│   │   └── users.js
│   ├── 📁 auth/                    # Kimlik doğrulama
│   │   └── auth.js
│   └── 📁 storage/                 # Depolama servisi
│       └── s3-client.js
│
└── 📁 docs/                         # 📖 DOKÜMANTASYON
    ├── API.md                       # API referansı
    ├── CONTRIBUTING.md              # Katkı kılavuzu
    ├── TUTORIALS.md                 # Tutorial'lar
    └── ARCHITECTURE.md              # Mimari açıklaması

```

---

## 📋 DOSYA AÇIKLAMALARI

### 🎬 Studio Ana Dizini

#### **studio/index.html**
```html
<!-- Studio'nun ana HTML yapısı -->
- Editör layout'u
- Panel container'ları
- Viewport canvas
- Script dependencies
```

#### **studio/css/**
- **main.css:** Global stiller, reset, layout
- **editor.css:** Panel stilleri, grid sistemi
- **ui-components.css:** Button, input, select vb.
- **viewport.css:** 3D/2D viewport stilleri
- **themes/:** Açık/koyu tema dosyaları

---

### 💻 JavaScript Modülleri

#### **core/ - Çekirdek Sistemler**

| Dosya | Sorumluluk | Bağımlılıklar |
|-------|-----------|---------------|
| `engine.js` | Ana oyun döngüsü, başlatma | Three.js, Cannon.js |
| `renderer.js` | 3D/2D rendering yönetimi | Three.js |
| `datamodel.js` | Sahne hiyerarşisi, nesneler | - |
| `physics.js` | Fizik simülasyonu | Cannon.js |
| `input.js` | Klavye/mouse olayları | - |
| `audio.js` | Ses yönetimi | Web Audio API |
| `events.js` | Event bus sistemi | - |

**Örnek Kullanım:**
```javascript
// engine.js
import { Renderer } from './renderer.js';
import { DataModel } from './datamodel.js';
import { Physics } from './physics.js';

class Engine {
    constructor() {
        this.renderer = new Renderer();
        this.dataModel = new DataModel();
        this.physics = new Physics();
    }

    start() {
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.physics.update();
        this.renderer.render(this.dataModel.scene);
    }
}
```

#### **editor/ - Editör Bileşenleri**

| Dosya | Sorumluluk | UI Element |
|-------|-----------|-----------|
| `viewport.js` | 3D sahne görüntüleme | Canvas |
| `hierarchy.js` | Nesne ağacı | TreeView |
| `properties.js` | Nesne özellikleri | Property Grid |
| `gizmo.js` | Transform araçları | 3D Gizmo |
| `camera-controls.js` | Kamera hareketi | - |
| `selection.js` | Nesne seçimi | - |
| `asset-manager.js` | Asset kütüphanesi | Grid View |

**Örnek Kullanım:**
```javascript
// viewport.js
export class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.renderer = new THREE.WebGLRenderer({canvas});
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
```

#### **scripting/ - Betik Sistemi**

| Dosya | Sorumluluk | Teknoloji |
|-------|-----------|-----------|
| `lua-vm.js` | Lua çalıştırma | Fengari |
| `api.js` | Motor API | Custom |
| `script-editor.js` | Kod editörü | Monaco |
| `debugger.js` | Hata ayıklama | Custom |
| `console.js` | Log sistemi | Custom |
| `sandbox.js` | Güvenlik | Custom |

**API Örneği:**
```javascript
// api.js - Motor API tanımı
export const GameAPI = {
    Workspace: {
        FindFirstChild: (name) => { /* ... */ },
        GetChildren: () => { /* ... */ }
    },
    RunService: {
        Heartbeat: new Event(),
        Stepped: new Event()
    }
};
```

#### **ui/ - UI Bileşenleri**

| Dosya | Sorumluluk | UI Type |
|-------|-----------|---------|
| `toolbar.js` | Üst araç barı | Horizontal Bar |
| `menubar.js` | Menü barı | Dropdown Menu |
| `panels.js` | Dockable paneller | Panel System |
| `modal.js` | Dialog'lar | Modal |
| `notifications.js` | Bildirimler | Toast |
| `contextmenu.js` | Sağ tık | Context Menu |

---

## 🔄 MODÜL İLİŞKİLERİ

```
main.js
  ├─→ core/engine.js
  │     ├─→ core/renderer.js
  │     │     └─→ lib/three.js
  │     ├─→ core/datamodel.js
  │     ├─→ core/physics.js
  │     │     └─→ lib/cannon.js
  │     └─→ core/input.js
  │
  ├─→ editor/viewport.js
  │     ├─→ editor/camera-controls.js
  │     └─→ editor/gizmo.js
  │
  ├─→ editor/hierarchy.js
  ├─→ editor/properties.js
  │
  ├─→ scripting/lua-vm.js
  │     └─→ lib/fengari-web.js
  ├─→ scripting/api.js
  └─→ scripting/script-editor.js
        └─→ lib/monaco-editor/
```

---

## 📦 MODÜL YÜKLEME STRATEJİSİ

### ES6 Modules
```javascript
// main.js
import { Engine } from './core/engine.js';
import { Viewport } from './editor/viewport.js';
import { Toolbar } from './ui/toolbar.js';

const engine = new Engine();
const viewport = new Viewport(document.getElementById('viewport'));
const toolbar = new Toolbar();

toolbar.on('play', () => engine.start());
toolbar.on('stop', () => engine.stop());
```

### Lazy Loading (İleride)
```javascript
// Sadece gerektiğinde yükle
async function openScriptEditor() {
    const { ScriptEditor } = await import('./scripting/script-editor.js');
    const editor = new ScriptEditor();
}
```

---

## 🎯 DOSYA BOYUTU HEDEFLERİ

| Dosya Tipi | Max Boyut | Neden |
|-----------|-----------|-------|
| JS Modülü | 500 satır | Okunabilirlik |
| CSS Dosyası | 1000 satır | Maintainability |
| JSON Config | 200 satır | Performans |

**Kural:** Eğer bir dosya çok büyürse, alt modüllere böl!

---

## 🔐 GÜVENLİK & EN İYİ UYGULAMALAR

### 1. Modül İzolasyonu
- Her modül sadece kendi işini yapmalı
- Sıkı bağımlılıklardan kaçın

### 2. Namespace Kullanımı
```javascript
// ❌ Kötü
function render() { }

// ✅ İyi
export class Renderer {
    render() { }
}
```

### 3. Dosya İsimlendirme
- **kebab-case:** `camera-controls.js`
- **PascalCase sınıflar:** `class CameraControls`
- **camelCase fonksiyonlar:** `function updateCamera()`

### 4. Yorum Standartları
```javascript
/**
 * Viewport kontrolcüsü
 * @class Viewport
 * @param {HTMLCanvasElement} canvas - Canvas element
 */
export class Viewport {
    /**
     * Sahneyi render et
     * @returns {void}
     */
    render() { }
}
```

---

## 🚀 GELİŞTİRME AKIŞI

### 1. Yeni Özellik Ekleme
```bash
# 1. Yeni branch oluştur
git checkout -b feature/physics-system

# 2. İlgili dosyaları oluştur
touch studio/js/core/physics.js

# 3. Kod yaz ve test et
# 4. Commit ve push
git add .
git commit -m "Add physics system"
git push origin feature/physics-system
```

### 2. Dosya Oluşturma Şablonu
```javascript
/**
 * @file physics.js
 * @description Fizik motoru wrapper
 * @author NeuranaWorld Team
 * @created 2025-12-05
 */

import * as CANNON from '../lib/cannon.min.js';

export class Physics {
    constructor() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);
    }

    update(deltaTime) {
        this.world.step(deltaTime);
    }
}
```

---

## 📊 MODÜL DURUMU

| Modül | Durum | Dosyalar | Satır |
|-------|-------|---------|-------|
| Core | ⏳ Başlanmadı | 0/7 | 0 |
| Editor | ⏳ Başlanmadı | 0/7 | 0 |
| Scripting | ⏳ Başlanmadı | 0/6 | 0 |
| UI | ⏳ Başlanmadı | 0/6 | 0 |
| Utils | ⏳ Başlanmadı | 0/4 | 0 |

---

## 🎓 SONUÇ

Bu yapı, **ölçeklenebilir**, **bakımı kolay** ve **profesyonel** bir proje organizasyonu sağlar.

**Temel Prensipler:**
1. ✅ Her modül bağımsız çalışabilmeli
2. ✅ Dosya boyutları kontrol altında
3. ✅ Net sorumluluk ayrımı
4. ✅ Kolay test edilebilir
5. ✅ İyi dokümante edilmiş

---

**Son Güncelleme:** 2025-12-05
**Durum:** 📁 Klasör yapısı oluşturuldu
