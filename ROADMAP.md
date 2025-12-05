# 🚀 NeuranaWorld Studio - Geliştirme Yol Haritası

## 📋 Genel Bakış
NeuranaWorld Studio, profesyonel seviyede 2D ve 3D oyun geliştirme platformudur. Bu doküman, sistemin sıralı geliştirme planını içerir.

---

## 🎯 FAZ 1: TEMEL ALTYAPI (4-6 Hafta)

### 1.1 Proje Yapısı ve Mimari (1 Hafta)
**Durum:** 🔄 Devam Ediyor
- [x] Ana menü NeuranaWorldStudio butonu eklendi
- [ ] Dosya ve klasör organizasyonu
- [ ] Modüler mimari tasarımı
- [ ] Bağımlılık yönetimi (package.json)
- [ ] Build sistemi kurulumu (Webpack/Vite)
- [ ] Geliştirme ortamı ayarları

**Dosya Yapısı:**
```
neuranaworld009/
├── index.html              # Ana menü
├── style.css               # Ana menü stilleri
├── script.js               # Ana menü script
├── studio/                 # Studio ana dizini
│   ├── index.html         # Studio ana sayfası
│   ├── css/               # Studio CSS dosyaları
│   │   ├── main.css
│   │   ├── editor.css
│   │   └── ui-components.css
│   ├── js/                # Studio JavaScript modülleri
│   │   ├── core/          # Çekirdek sistemler
│   │   │   ├── engine.js
│   │   │   ├── renderer.js
│   │   │   └── datamodel.js
│   │   ├── editor/        # Editör bileşenleri
│   │   │   ├── viewport.js
│   │   │   ├── hierarchy.js
│   │   │   └── properties.js
│   │   ├── scripting/     # Betik sistemi
│   │   │   ├── lua-vm.js
│   │   │   └── api.js
│   │   └── ui/            # UI bileşenleri
│   │       ├── toolbar.js
│   │       └── panels.js
│   ├── assets/            # Statik varlıklar
│   │   ├── icons/
│   │   ├── textures/
│   │   └── models/
│   └── lib/               # Dış kütüphaneler
│       ├── three.min.js   # 3D rendering
│       ├── lua.vm.js      # Lua VM
│       └── monaco-editor/ # Kod editörü
├── server/                 # Backend servisleri
│   ├── api/
│   ├── auth/
│   └── storage/
└── docs/                   # Dokümantasyon
    ├── ROADMAP.md
    └── API.md
```

### 1.2 Rendering Sistemi (2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Three.js entegrasyonu (3D)
- [ ] 2D Canvas renderer
- [ ] Viewport sistemi
- [ ] Kamera kontrolleri (orbit, pan, zoom)
- [ ] Grid ve axis helpers
- [ ] Temel geometriler (küp, küre, düzlem)
- [ ] Temel materyal sistemi
- [ ] Işıklandırma (ambient, directional, point)
- [ ] Gölgelendirme

**Teknik Detaylar:**
- **3D Engine:** Three.js r150+
- **2D Engine:** HTML5 Canvas API
- **Render Modu:** WebGL 2.0
- **FPS Target:** 60 FPS

### 1.3 DataModel ve Sahne Yönetimi (1-2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Hiyerarşik DataModel yapısı
- [ ] Nesne ağacı (Scene → Objects → Components)
- [ ] Nesne oluşturma/silme/kopyalama
- [ ] Parent-child ilişkileri
- [ ] Transform sistemi (position, rotation, scale)
- [ ] Property sistemi
- [ ] Serialization (JSON)
- [ ] Undo/Redo sistemi

**Veri Yapısı:**
```javascript
{
  "Workspace": {
    "Part": {
      "Position": [0, 10, 0],
      "Rotation": [0, 0, 0],
      "Size": [4, 1, 2],
      "Material": "Plastic",
      "Color": [255, 0, 0]
    }
  }
}
```

---

## 🎯 FAZ 2: EDİTÖR ARAYÜZÜ (3-4 Hafta)

### 2.1 Temel UI Bileşenleri (2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Ana editör penceresi
- [ ] Menü barı (File, Edit, View, Tools)
- [ ] Toolbar (Play, Stop, Save vb.)
- [ ] Explorer/Hiyerarşi paneli
- [ ] Properties/Özellikler paneli
- [ ] Viewport paneli
- [ ] Output/Konsol paneli
- [ ] Dockable panel sistemi
- [ ] Tema sistemi (Light/Dark mode)

**UI Framework:** Custom + CSS Grid/Flexbox

### 2.2 Viewport ve Nesne Manipülasyonu (1-2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Gizmo sistemi (Move, Rotate, Scale)
- [ ] Snap to grid
- [ ] Multi-selection
- [ ] Bounding box gösterimi
- [ ] Raycasting (mouse picking)
- [ ] Focus on object (F tuşu)
- [ ] Kamera presets (Front, Side, Top)

### 2.3 Asset Manager (1 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Asset kütüphanesi paneli
- [ ] Dosya yükleme (drag & drop)
- [ ] Thumbnail önizleme
- [ ] Asset kategorileri
- [ ] Arama ve filtreleme
- [ ] Import/Export

---

## 🎯 FAZ 3: BETİK SİSTEMİ (4-5 Hafta)

### 3.1 Lua VM Entegrasyonu (2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Lua VM (fengari-web veya wasmoon)
- [ ] Sandbox ortamı
- [ ] Script nesnesi tanımı
- [ ] Script-DataModel bağlantısı
- [ ] Hata yakalama sistemi
- [ ] Temel API (print, warn, error)

**Lua Kütüphanesi:** Fengari (Lua 5.3 in JS)

### 3.2 Oyun Motoru API'si (2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Workspace API
- [ ] Part API (Position, Rotation, Size)
- [ ] Events sistemi (Touch, Click, CollisionEnter)
- [ ] RunService (Heartbeat, Stepped)
- [ ] TweenService (animasyonlar)
- [ ] Input sistemi (Mouse, Keyboard)
- [ ] Camera API
- [ ] Sound API

**API Örneği:**
```lua
local part = game.Workspace.Part
part.Position = Vector3.new(0, 10, 0)
part.Color = Color3.fromRGB(255, 0, 0)

part.Touched:Connect(function(otherPart)
    print("Temas!")
end)
```

### 3.3 Script Editörü (1-2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Monaco Editor entegrasyonu
- [ ] Syntax highlighting (Lua)
- [ ] Autocomplete (IntelliSense)
- [ ] Error underlining
- [ ] Code folding
- [ ] Multiple scripts desteği
- [ ] Script paneli (açık scriptler)

---

## 🎯 FAZ 4: PLAY MODE & FİZİK (3-4 Hafta)

### 4.1 Play/Stop Sistemi (1 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Play butonu
- [ ] Stop butonu
- [ ] Pause butonu
- [ ] Sahne kopyalama
- [ ] Script başlatma
- [ ] Simülasyon modu
- [ ] Editör kilitleme
- [ ] Oyun görünümü

### 4.2 Fizik Motoru (2-3 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Fizik motoru seçimi (Cannon.js/Ammo.js)
- [ ] RigidBody bileşeni
- [ ] Collider bileşeni (Box, Sphere, Mesh)
- [ ] Yerçekimi
- [ ] Çarpışma algılama
- [ ] Fizik materyalleri (friction, restitution)
- [ ] Kinematic/Static mod
- [ ] Collision events

**Fizik Engine:** Cannon.js (başlangıç için)

### 4.3 Oyuncu Sistemi (1 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Varsayılan karakter modeli
- [ ] Spawn point
- [ ] Character controller
- [ ] Kamera-karakter bağlantısı
- [ ] Input handling (WASD, Space)
- [ ] First-person / Third-person mod

---

## 🎯 FAZ 5: DEBUGGER & PERFORMANS (3-4 Hafta)

### 5.1 Gerçek Zamanlı Debugger (2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Breakpoint sistemi
- [ ] Step Into/Over/Out
- [ ] Call stack görüntüleme
- [ ] Variable inspector
- [ ] Watch expressions
- [ ] Pause/Resume
- [ ] Exception yakalama
- [ ] Console integration

### 5.2 Output & Log Sistemi (1 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Output paneli
- [ ] Log seviyeleri (Info, Warning, Error)
- [ ] Zaman damgası
- [ ] Script kaynağı gösterimi
- [ ] Filtreleme
- [ ] Arama
- [ ] Script'e atlama (çift tık)
- [ ] Log export

### 5.3 Profiler (1-2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] CPU profiler
- [ ] GPU profiler
- [ ] Memory profiler
- [ ] FPS göstergesi
- [ ] Frame time grafiği
- [ ] Call tree
- [ ] Hotspot detection

---

## 🎯 FAZ 6: YAYINLAMA & SÜRÜM KONTROLÜ (2-3 Hafta)

### 6.1 Proje Yönetimi (1 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Save/Load projesi
- [ ] Auto-save
- [ ] Cloud storage entegrasyonu
- [ ] Proje şablonları
- [ ] Export (standalone HTML)

### 6.2 Publish Sistemi (1-2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Publish butonu
- [ ] Versiyonlama
- [ ] Version history
- [ ] Rollback
- [ ] Metadata (isim, açıklama, thumbnail)
- [ ] Public/Private ayarı

### 6.3 Asset Lisanslama (1 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Sahiplik sistemi
- [ ] Erişim izinleri (Private, Friends, Public)
- [ ] Değiştirilebilirlik kontrolü
- [ ] Fork/Copy sistemi
- [ ] Lisans türleri

---

## 🎯 FAZ 7: İLERİ SEVİYE ÖZELLİKLER (4-6 Hafta)

### 7.1 2D Oyun Desteği (2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] 2D Canvas renderer
- [ ] Sprite sistemi
- [ ] Tilemap editor
- [ ] 2D Physics (Box2D)
- [ ] Sprite animation
- [ ] Particle sistem (2D)

### 7.2 Gelişmiş 3D Özellikler (2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Custom shaderlar
- [ ] Post-processing effects
- [ ] Particle system (3D)
- [ ] Terrain editor
- [ ] Skybox
- [ ] Water/Ocean shader
- [ ] LOD (Level of Detail)

### 7.3 Multiplayer Altyapısı (2-3 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] Client-Server mimarisi
- [ ] WebSocket bağlantısı
- [ ] Remote Events/Functions
- [ ] Replication sistemi
- [ ] Local server test
- [ ] Network profiler

### 7.4 UI Sistemi (Oyun İçi) (1-2 Hafta)
**Durum:** ⏳ Bekliyor
- [ ] GUI nesneleri (Button, Label, Frame)
- [ ] Layout sistemi
- [ ] Event handling
- [ ] UI Editor
- [ ] Responsive design
- [ ] Animation

---

## 🎯 FAZ 8: POLİSAJ & OPTİMİZASYON (2-3 Hafta)

### 8.1 Performans Optimizasyonu
**Durum:** ⏳ Bekliyor
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Asset compression
- [ ] Memory leak fixes
- [ ] Render optimizasyonu
- [ ] Bundle size azaltma

### 8.2 Kullanıcı Deneyimi
**Durum:** ⏳ Bekliyor
- [ ] Tutorial/Onboarding
- [ ] Tooltips
- [ ] Keyboard shortcuts
- [ ] Context menus
- [ ] Drag & drop iyileştirmeleri
- [ ] Accessibility

### 8.3 Dokümantasyon
**Durum:** ⏳ Bekliyor
- [ ] API referansı
- [ ] Başlangıç kılavuzu
- [ ] Video tutoriallar
- [ ] Örnek projeler
- [ ] Community wiki

---

## 📊 GENEL İLERLEME

| Faz | Özellik | Durum | Tahmini Süre | Öncelik |
|-----|---------|-------|--------------|---------|
| FAZ 1 | Temel Altyapı | 🔄 %10 | 4-6 hafta | 🔴 Kritik |
| FAZ 2 | Editör Arayüzü | ⏳ %0 | 3-4 hafta | 🔴 Kritik |
| FAZ 3 | Betik Sistemi | ⏳ %0 | 4-5 hafta | 🔴 Kritik |
| FAZ 4 | Play Mode & Fizik | ⏳ %0 | 3-4 hafta | 🟡 Yüksek |
| FAZ 5 | Debugger | ⏳ %0 | 3-4 hafta | 🟡 Yüksek |
| FAZ 6 | Yayınlama | ⏳ %0 | 2-3 hafta | 🟡 Yüksek |
| FAZ 7 | İleri Özellikler | ⏳ %0 | 4-6 hafta | 🟢 Orta |
| FAZ 8 | Polisaj | ⏳ %0 | 2-3 hafta | 🟢 Orta |

**Toplam Tahmini Süre:** 25-35 hafta (6-9 ay)

---

## 🛠️ TEKNOLOJİ STACK

### Frontend
- **HTML5, CSS3, JavaScript (ES6+)**
- **Three.js** - 3D rendering
- **Canvas API** - 2D rendering
- **Monaco Editor** - Code editor
- **Fengari/Wasmoon** - Lua VM

### Physics
- **Cannon.js** - 3D physics
- **Box2D (planck.js)** - 2D physics

### Backend (İleride)
- **Node.js + Express**
- **WebSocket (Socket.io)**
- **MongoDB** - Database
- **AWS S3** - Asset storage

### Build Tools
- **Vite/Webpack** - Bundler
- **ESLint** - Linter
- **Prettier** - Code formatter

---

## 📌 ÖNCELİKLENDİRME PRENSİPLERİ

1. **MVP First:** Önce çalışan minimum ürünü tamamla
2. **Modüler Geliştirme:** Her modül bağımsız test edilebilir olmalı
3. **Kullanıcı Geri Bildirimi:** Her fazda kullanıcı testleri yap
4. **Performans:** Her zaman performansı göz önünde bulundur
5. **Dokümantasyon:** Kod yazarken dokümante et

---

## 🎯 SONRAKİ ADIMLAR

### Hemen Şimdi
1. ✅ Ana menüye Studio butonu eklendi
2. 🔄 Proje klasör yapısını oluştur
3. ⏳ Three.js entegrasyonu başlat
4. ⏳ Basit viewport oluştur

### Bu Hafta
1. Temel 3D sahne (küp render etme)
2. Kamera kontrolleri
3. Grid sistemi
4. Basit UI layout

### Bu Ay
1. FAZ 1'i tamamla (Temel Altyapı)
2. FAZ 2'ye başla (Editör Arayüzü)

---

## 📝 NOTLAR

- **Modülerlik:** Her sistem ayrı dosyalarda olacak
- **Performans:** 60 FPS hedefi
- **Ölçeklenebilirlik:** Büyük sahneler için optimize edilmeli
- **Cross-platform:** Web tabanlı, tüm platformlarda çalışmalı
- **Açık Kaynak Hazır:** Mümkünse açık kaynak kütüphaneler kullan

---

**Son Güncelleme:** 2025-12-05
**Versiyon:** 1.0.0
**Durum:** 🚀 Geliştirme Başladı
