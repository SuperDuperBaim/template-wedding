# PRD: Sistem Undangan Digital Universal
## Tema: White Elegant Wedding

**Versi:** 2.0  
**Tanggal:** 20 September 2026  
**Status:** Draft

---

# 1. OVERVIEW

Platform undangan digital universal untuk pernikahan berbasis HTML, CSS, dan Vanilla JavaScript.

Sistem dirancang sebagai template reusable yang dapat digunakan berulang kali untuk berbagai klien. Data setiap pasangan dipisahkan ke dalam file `data.js`, sehingga informasi pernikahan dapat diganti tanpa mengubah struktur HTML dan CSS utama.

Konsep visual menggunakan pendekatan:

- White
- Minimal
- Elegant
- Sacred
- Romantic
- Timeless
- Editorial wedding invitation

Website harus terasa seperti undangan pernikahan premium yang diterjemahkan ke dalam bentuk digital, bukan seperti dashboard atau landing page dengan banyak efek dekoratif.

## Tujuan

1. Setup undangan baru kurang dari 30 menit.
2. Data klien dapat diganti melalui `data.js`.
3. Design tetap konsisten untuk setiap klien.
4. Template mudah dimodifikasi.
5. Website ringan dan cepat dimuat.
6. Responsive untuk desktop dan mobile.
7. Deploy dapat dilakukan secara langsung ke shared hosting.
8. Visual memiliki kesan elegan dan sakral tanpa dekorasi berlebihan.

---

# 2. TARGET USER

## 2.1 Admin / Editor Klien

Admin atau developer yang mengelola undangan.

### Akses

Membuka folder proyek secara lokal atau melalui server.

### Aktivitas

- Mengubah nama mempelai.
- Mengubah nama tamu.
- Mengubah tanggal.
- Mengubah informasi acara.
- Mengubah rekening.
- Mengubah nomor WhatsApp.
- Mengubah kutipan.
- Mengubah gambar jika tersedia.

### Hasil

Website otomatis menampilkan data terbaru tanpa perlu mengubah struktur HTML dan CSS.

---

## 2.2 Tamu Undangan

Tamu mengakses undangan melalui URL.

Contoh:

`?to=NamaTamu`

### Tamu dapat melihat:

- Cover undangan.
- Nama mempelai.
- Nama tamu.
- Kutipan.
- Profil mempelai.
- Countdown.
- Informasi acara.
- Lokasi acara.
- Informasi amplop digital.
- QRIS jika tersedia.
- Tombol RSVP melalui WhatsApp.

### Interaksi

- Membuka undangan.
- Membuka Google Maps.
- Menyalin nomor rekening.
- Membuka QRIS.
- Menghubungi WhatsApp.
- Membuka Instagram mempelai jika tersedia.

---

## 2.3 Developer / Tim Teknis

### Aktivitas

- Duplicate template.
- Mengubah `data.js`.
- Mengganti asset.
- Deploy ke hosting.
- Melakukan maintenance.
- Melakukan hotfix CSS/JavaScript.

---

# 3. STRUKTUR FILE

```text
undangan-universal/
│
├── index.html
├── data.js
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── assets/
    ├── qris.jpg
    ├── bride.jpg
    ├── groom.jpg
    └── ...
```

Struktur dapat disederhanakan apabila file CSS dan JavaScript tetap berada pada root project.

Struktur minimum:

```text
undangan-universal/
├── index.html
├── data.js
├── style.css
├── script.js
└── assets/
```

---

# 4. FITUR UTAMA

# 4.1 Cover / Opening Section

Cover merupakan bagian pertama yang dilihat oleh tamu.

## Informasi

- Salam pembuka.
- Nama tamu.
- Nama mempelai.
- Kutipan atau kalimat pendek.
- Tanggal pernikahan.
- Tombol untuk membuka undangan.

## Contoh struktur visual

```text
THE WEDDING OF

REZA
&
SARAH

25 OCTOBER 2026

Kepada Yth.
Budi Santoso

[ BUKA UNDANGAN ]
```

## Prinsip desain

- Background dominan putih atau off-white.
- Nama mempelai menjadi focal point.
- Typography serif digunakan untuk nama.
- Informasi tambahan menggunakan sans-serif.
- Spacing luas.
- Tidak menggunakan card berlebihan.
- Tidak menggunakan gradient mencolok.
- Tidak menggunakan particle.
- Tidak menggunakan emoji.
- Tidak menggunakan ornamen bergerak secara agresif.

---

# 4.2 Personalized Greeting

Nama tamu diambil dari URL parameter.

Contoh:

```text
?to=Budi%20Santoso
```

Website menampilkan:

```text
Kepada Yth.

Budi Santoso
```

Jika parameter tidak tersedia:

```text
Tamu Undangan
```

## Data

```javascript
namaTamuFallback: "Tamu Undangan"
```

---

# 4.3 Opening Invitation

Setelah tombol "Buka Undangan" ditekan, halaman utama ditampilkan.

Tombol tidak perlu menggunakan efek berlebihan.

### Button Style

- Border tipis.
- Background putih atau warna accent yang sangat lembut.
- Typography uppercase.
- Letter spacing kecil.
- Hover transition sederhana.
- Tidak menggunakan glow.
- Tidak menggunakan bounce.
- Tidak menggunakan scale berlebihan.

---

# 4.4 Quote / Wedding Statement

Bagian quote digunakan untuk menampilkan kutipan agama atau kutipan universal.

Contoh:

```text
"Suami istri sejati..."

— Slokantara
```

## Prinsip desain

Quote tidak menggunakan card besar.

Gunakan:

- Typography serif.
- Garis dekoratif tipis.
- Whitespace luas.
- Text alignment center.

## Data

```javascript
keteranganQuote: {
    teks: "Suami istri sejati...",
    sumber: "Slokantara"
}
```

Kutipan dapat disesuaikan dengan agama atau konsep pernikahan masing-masing klien.

---

# 4.5 Profil Mempelai

Menampilkan informasi kedua mempelai.

## Desktop

Dua kolom.

```text
THE GROOM                 THE BRIDE

REZA RAHADIAN             SARAH WIJAYANTO
S.Kom.                    S.E.

Putra dari ...            Putri dari ...

Instagram                 Instagram
```

## Mobile

Menjadi satu kolom.

## Data

```javascript
pria: {
    namaLengkap: "Reza Rahadian, S.Kom.",
    putraDari: "Putra dari Bapak Budi & Ibu Ani",
    instagram: "https://instagram.com/reza",
    foto: "assets/groom.jpg"
},

wanita: {
    namaLengkap: "Sarah Wijayanto, S.E.",
    putriDari: "Putri dari Bapak ... & Ibu ...",
    instagram: "https://instagram.com/sarah",
    foto: "assets/bride.jpg"
}
```

## Visual

Jika foto tersedia:

- Foto menjadi elemen utama.
- Rasio foto konsisten.
- Border sangat tipis atau tanpa border.
- Tidak menggunakan frame dekoratif berlebihan.
- Tidak menggunakan avatar emoji.

Jika foto tidak tersedia:

- Gunakan placeholder sederhana.
- Tidak menggunakan emoji.

---

# 4.6 Countdown

Countdown menunjukkan waktu menuju acara.

## Format

```text
COUNTING DOWN TO OUR DAY

035        12        48        21
DAYS      HOURS     MINUTES    SECONDS
```

## Prinsip desain

Countdown bukan floating card.

Hindari:

- Floating card.
- Efek antigravity.
- Particle.
- Shadow besar.
- Animasi angka berlebihan.

Gunakan typography sebagai elemen utama.

Angka:

- Besar.
- Serif atau font display.
- Weight medium.
- Spacing lega.

Label:

- Sans-serif.
- Ukuran kecil.
- Uppercase.
- Letter spacing.

## Data

```javascript
tanggalCountdown: "2026-10-25T09:00:00"
```

Countdown diperbarui setiap detik.

---

# 4.7 Jadwal Acara

Sistem mendukung lebih dari satu acara.

Contoh:

- Akad / pemberkatan.
- Resepsi.
- Acara tambahan.

## Data

```javascript
acara: [
    {
        judul: "Pemberkatan",
        tanggal: "Minggu, 25 Oktober 2026",
        jam: "09.00 - 11.00 WIB",
        tempat: "Gereja Katedral Jakarta",
        alamatLengkap: "Jl. Katedral No.7B, Jakarta Pusat",
        linkMaps: "https://goo.gl/maps/xyz"
    }
]
```

## Visual

Event tidak menggunakan card dengan efek floating.

Gunakan layout editorial.

Contoh:

```text
AKAD

MINGGU
25 OKTOBER 2026

09.00 - 11.00 WIB

Gereja Katedral Jakarta
Jl. Katedral No.7B
Jakarta Pusat

[ LIHAT LOKASI ]
```

Jika terdapat dua acara, masing-masing dibuat sebagai blok yang terpisah dengan divider tipis.

---

# 4.8 Divider dan Ornamen

Ornamen digunakan secukupnya.

## Diperbolehkan

- Garis horizontal tipis.
- Border tipis.
- Botanical line-art sederhana.
- Bentuk geometris sederhana.
- Initial pasangan.
- Small typographic ornament.

## Tidak digunakan

- Emoji.
- Sticker.
- Particle.
- Confetti.
- Floating flowers.
- Ornamen random.
- 3D object.
- AI-generated decorative illustration.
- Glow.
- Neon.
- Blob shape.

Ornamen hanya berfungsi sebagai pendukung visual, bukan focal point.

---

# 4.9 Amplop Digital

Bagian untuk memberikan informasi rekening dan QRIS.

## Informasi

- Nama bank.
- Nomor rekening.
- Nama pemilik rekening.
- Tombol copy.
- QRIS jika tersedia.

## Contoh

```text
AMPLop DIGITAL

Untuk keluarga dan sahabat
yang ingin memberikan tanda kasih,
kami menyediakan:

BCA

123456789

a.n. Reza Rahadian

[ SALIN NOMOR ]
```

Jika QRIS tersedia:

```text
QRIS

[ QR CODE ]

a.n. Reza Rahadian
```

## Visual

Bagian rekening boleh menggunakan card minimal.

Card harus:

- Background putih.
- Border tipis.
- Radius kecil atau sedang.
- Shadow sangat halus.
- Tidak menggunakan floating animation.
- Tidak menggunakan hover lift besar.

---

# 4.10 Copy Rekening

Tombol copy menggunakan:

```javascript
navigator.clipboard.writeText(text)
```

Setelah berhasil, tampilkan feedback sederhana.

Contoh:

```text
Nomor rekening berhasil disalin
```

Feedback tidak menggunakan popup besar.

---

# 4.11 RSVP

RSVP menggunakan WhatsApp.

## Button

```text
KONFIRMASI KEHADIRAN
```

## Template pesan

```text
Halo, saya [NamaTamu] ingin konfirmasi
kehadiran di acara pernikahan
[PriaNama] & [WanitaNama].
```

## Data

```javascript
nomorWhatsAppAdmin: "6281234567890"
```

---

# 5. DESIGN SYSTEM

# 5.1 Design Direction

Nama design direction:

```text
WHITE ELEGANT WEDDING
```

Keyword:

```text
Clean
Elegant
Sacred
Romantic
Minimal
Timeless
Editorial
Soft
Premium
```

Website harus terasa seperti:

```text
Premium printed wedding invitation
        +
Modern editorial website
```

Bukan:

```text
Generic AI landing page
```

---

# 5.2 Color Palette

Gunakan warna yang sangat terbatas.

```css
:root {
    --color-background: #FCFBF8;
    --color-surface: #FFFFFF;
    --color-text: #292725;
    --color-text-soft: #77716B;
    --color-border: #E7E2DC;
    --color-accent: #B69B6B;
    --color-accent-soft: #F3EEE6;
}
```

## Penjelasan

### Background

```text
#FCFBF8
```

Putih hangat untuk menghindari tampilan terlalu steril.

### Surface

```text
#FFFFFF
```

Digunakan untuk area card atau elemen yang membutuhkan kontras.

### Text

```text
#292725
```

Hitam natural, bukan hitam absolut.

### Secondary Text

```text
#77716B
```

Untuk informasi pendukung.

### Border

```text
#E7E2DC
```

Garis sangat lembut.

### Accent

```text
#B69B6B
```

Soft champagne gold.

Accent tidak boleh mendominasi halaman.

---

# 5.3 Typography

Gunakan kombinasi serif dan sans-serif.

## Primary Serif

Contoh:

```text
Cormorant Garamond
```

Digunakan untuk:

- Nama mempelai.
- Heading besar.
- Quote.
- Angka countdown.
- Judul tertentu.

## Sans-serif

Contoh:

```text
Inter
```

Digunakan untuk:

- Body text.
- Button.
- Label.
- Informasi tanggal.
- Informasi acara.

## Typography Rules

Heading:

```text
Serif
Weight: 500-600
```

Body:

```text
Sans-serif
Weight: 400
Line-height: 1.7-1.8
```

Label:

```text
Sans-serif
Uppercase
Letter-spacing: 0.12em - 0.18em
```

---

# 5.4 Spacing

Gunakan whitespace sebagai bagian utama dari desain.

```css
--section-space: 96px;
--section-space-mobile: 72px;

--container-width: 1100px;

--content-padding: 24px;
--content-padding-mobile: 20px;
```

Tidak semua area harus dipenuhi oleh elemen visual.

Whitespace harus menjadi bagian dari estetika.

---

# 5.5 Border

Border sangat tipis.

```css
border: 1px solid var(--color-border);
```

Hindari:

- Border tebal.
- Border gradient.
- Border glowing.

---

# 5.6 Border Radius

Gunakan radius secukupnya.

```css
border-radius: 4px;
```

atau:

```css
border-radius: 8px;
```

Jangan menggunakan radius ekstrem untuk card utama.

Pill hanya digunakan jika memang diperlukan.

---

# 5.7 Shadow

Shadow harus hampir tidak terasa.

Contoh:

```css
box-shadow: 0 8px 30px rgba(40, 35, 30, 0.05);
```

Tidak menggunakan shadow berat.

---

# 6. ANIMATION & MOTION

Animasi harus terasa seperti bagian dari website premium, bukan efek demonstrasi.

## Diperbolehkan

- Fade in.
- Fade up sangat ringan.
- Image reveal.
- Smooth scrolling.
- Button transition.
- Countdown update.

## Durasi

```text
300ms - 700ms
```

## Easing

Gunakan easing yang lembut.

Contoh:

```css
transition:
    opacity 0.5s ease,
    transform 0.5s ease;
```

## Tidak digunakan

- Antigravity.
- Floating cards.
- Random particle.
- Bouncing element.
- Excessive parallax.
- Continuous movement.
- Rotating decoration.
- Floating emoji.
- Confetti animation.

---

# 7. INTERACTIVE STATES

## Button Hover

Button hanya berubah secara subtle.

Normal:

```text
border + white background
```

Hover:

```text
background accent-soft
```

Tidak perlu scale atau glow.

---

## Link Hover

Link dapat menggunakan underline transition sederhana.

---

## Copy Button

Setelah diklik:

```text
SALIN NOMOR
```

berubah menjadi:

```text
TERSALIN
```

kemudian kembali setelah beberapa detik.

---

# 8. RESPONSIVE DESIGN

Breakpoint utama:

```text
640px
```

Layout harus nyaman pada:

- 320px
- 375px
- 390px
- 414px
- 768px
- 1024px
- Desktop

## Mobile

Prioritas:

1. Typography.
2. Readability.
3. Spacing.
4. Touch target.
5. Image size.

Tidak boleh ada:

- Horizontal overflow.
- Text terpotong.
- Button terlalu kecil.
- Countdown keluar layar.

---

# 9. NAVIGATION

Website tidak menggunakan navbar desktop yang kompleks.

Undangan harus terasa seperti sebuah pengalaman membaca.

Jika diperlukan navigation:

```text
Home
Mempelai
Acara
Amplop
RSVP
```

Navigation dibuat minimal.

Untuk mobile dapat menggunakan:

- Sticky bottom navigation sederhana, atau
- Single menu button.

Jangan membuat navbar seperti website company profile.

---

# 10. PAGE FLOW

Urutan halaman:

```text
1. COVER
      ↓
2. OPEN INVITATION
      ↓
3. QUOTE / WEDDING STATEMENT
      ↓
4. COUPLE
      ↓
5. COUNTDOWN
      ↓
6. EVENT
      ↓
7. DIGITAL ENVELOPE
      ↓
8. RSVP
      ↓
9. FOOTER
```

---

# 11. FOOTER

Footer sangat minimal.

Contoh:

```text
REZA & SARAH

25 OCTOBER 2026

With love,
Reza & Sarah
```

Jika ingin mencantumkan credit:

```text
Digital Invitation by Ananda Ibrahim
```

dapat diletakkan kecil di bagian paling bawah.

---

# 12. DATA.JS STRUCTURE

```javascript
const weddingData = {

    // Cover
    panggilanPria: "Reza",
    panggilanWanita: "Sarah",

    namaTamuFallback: "Tamu Undangan",

    salamPembuka: "Om Swastiastu",

    // Quote
    kutipanTeks: "Suami istri sejati...",
    kutipanSumber: "Slokantara",

    // Groom
    pria: {
        namaLengkap: "Reza Rahadian, S.Kom.",
        putraDari: "Putra dari Bapak Budi & Ibu Ani",
        instagram: "https://instagram.com/reza",
        foto: "assets/groom.jpg"
    },

    // Bride
    wanita: {
        namaLengkap: "Sarah Wijayanto, S.E.",
        putriDari: "Putri dari Bapak ... & Ibu ...",
        instagram: "https://instagram.com/sarah",
        foto: "assets/bride.jpg"
    },

    // Countdown
    tanggalCountdown: "2026-10-25T09:00:00",

    // Events
    acara: [
        {
            judul: "Pemberkatan",
            tanggal: "Minggu, 25 Oktober 2026",
            jam: "09.00 - 11.00 WIB",
            tempat: "Gereja Katedral Jakarta",
            alamatLengkap: "Jl. Katedral No.7B, Jakarta Pusat",
            linkMaps: "https://goo.gl/maps/xyz"
        }
    ],

    // Bank Accounts
    rekening: [
        {
            bank: "BCA",
            nomor: "123456789",
            atasNama: "Reza Rahadian"
        },
        {
            bank: "QRIS",
            nomor: "-",
            atasNama: "Reza Rahadian",
            qrImage: "assets/qris.jpg"
        }
    ],

    // RSVP
    nomorWhatsAppAdmin: "6281234567890"
};
```

---

# 13. JAVASCRIPT FUNCTIONALITY

## 13.1 Data Binding

Data berasal dari:

```javascript
weddingData
```

HTML tidak perlu diedit setiap kali ada klien baru.

---

## 13.2 URL Parameter

```javascript
const params = new URLSearchParams(window.location.search);

const namaTamu =
    params.get("to") ||
    weddingData.namaTamuFallback;
```

Nama tamu kemudian ditampilkan pada cover.

---

## 13.3 Countdown

Countdown menggunakan:

```javascript
setInterval()
```

Interval:

```text
1000ms
```

Target:

```javascript
weddingData.tanggalCountdown
```

Output:

```text
DAYS
HOURS
MINUTES
SECONDS
```

---

## 13.4 Dynamic Event Rendering

Event dirender menggunakan:

```javascript
weddingData.acara.forEach()
```

Jumlah event tidak dibatasi.

---

## 13.5 Dynamic Bank Rendering

Rekening dirender menggunakan:

```javascript
weddingData.rekening.forEach()
```

Jika object memiliki:

```javascript
qrImage
```

maka bagian QRIS ditampilkan.

Jika tidak ada, QRIS section disembunyikan.

---

## 13.6 Copy to Clipboard

```javascript
navigator.clipboard.writeText(nomorRekening);
```

Setelah berhasil, tampilkan feedback sederhana.

---

## 13.7 WhatsApp RSVP

```javascript
const pesan =
    `Halo, saya ${namaTamu} ingin konfirmasi ` +
    `kehadiran di acara pernikahan ` +
    `${weddingData.panggilanPria} & ` +
    `${weddingData.panggilanWanita}.`;

const link =
    `https://wa.me/${weddingData.nomorWhatsAppAdmin}` +
    `?text=${encodeURIComponent(pesan)}`;
```

---

# 14. ACCESSIBILITY

Minimum accessibility:

- Semantic HTML.
- Heading hierarchy benar.
- Button menggunakan `<button>`.
- Link menggunakan `<a>`.
- Image memiliki `alt`.
- Contrast text cukup.
- Touch target mobile cukup besar.
- Tidak mengandalkan warna saja untuk menyampaikan informasi.
- Animasi dapat dikurangi melalui `prefers-reduced-motion`.

Contoh:

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

---

# 15. PERFORMANCE

Website harus ringan.

## Prioritas

- Vanilla HTML.
- Vanilla CSS.
- Vanilla JavaScript.
- Tidak menggunakan framework besar.
- Tidak menggunakan library yang tidak diperlukan.
- Compress gambar.
- Gunakan WebP jika memungkinkan.
- Lazy-load gambar yang tidak berada di initial viewport.
- Minify CSS dan JS untuk production jika diperlukan.

---

# 16. SEO & SOCIAL SHARING

Minimum metadata:

```html
<title>Reza & Sarah — Wedding Invitation</title>

<meta
    name="description"
    content="The wedding invitation of Reza & Sarah."
>
```

Open Graph:

```html
<meta property="og:title" content="Reza & Sarah — Wedding Invitation">

<meta
    property="og:description"
    content="Wedding invitation of Reza & Sarah."
>

<meta
    property="og:image"
    content="assets/og-image.jpg"
>
```

Jika memungkinkan, informasi pasangan dapat digunakan secara dinamis melalui JavaScript.

---

# 17. BROWSER COMPATIBILITY

Target:

- Chrome
- Firefox
- Safari
- Edge
- Chrome Android
- Safari iOS

Target browser:

```text
Latest 2 versions
```

Tidak mendukung Internet Explorer.

---

# 18. WORKFLOW SETUP KLIEN BARU

## Step 1 — Duplicate Template

```text
undangan-universal/
        ↓
klien-nama/
```

## Step 2 — Edit data.js

Update:

- Nama pria.
- Nama wanita.
- Nama tamu fallback.
- Quote.
- Foto.
- Tanggal.
- Acara.
- Rekening.
- QRIS.
- WhatsApp.

## Step 3 — Upload Assets

```text
assets/
├── groom.jpg
├── bride.jpg
├── qris.jpg
└── og-image.jpg
```

## Step 4 — Test Local

```text
index.html
```

Test personalized URL:

```text
index.html?to=Budi%20Santoso
```

## Step 5 — Deploy

```text
public_html/
└── klien-nama/
    ├── index.html
    ├── data.js
    ├── style.css
    ├── script.js
    └── assets/
```

## Step 6 — Final Test

Pastikan:

- Cover muncul.
- Nama tamu benar.
- Nama mempelai benar.
- Countdown berjalan.
- Acara tampil.
- Maps dapat dibuka.
- Rekening dapat dicopy.
- QRIS muncul jika tersedia.
- WhatsApp RSVP bekerja.
- Mobile responsive.

---

# 19. DEPLOYMENT

Server:

```text
Shared Hosting anandaibrahimhs.web.id
```

Directory:

```text
public_html/
└── klien-[nama]/
    ├── index.html
    ├── data.js
    ├── style.css
    ├── script.js
    └── assets/
        └── ...
```

URL:

```text
https://anandaibrahimhs.web.id/klien-[nama]/
```

Personalized URL:

```text
https://anandaibrahimhs.web.id/klien-[nama]/?to=NamaTamu
```

---

# 20. MAINTENANCE

## Design Hotfix

1. Edit CSS.
2. Upload CSS.
3. Clear cache jika diperlukan.
4. Test seluruh halaman.

## Data Update

1. Edit `data.js`.
2. Upload.
3. Test.
4. Share link kembali jika diperlukan.

Cache busting dapat digunakan:

```text
style.css?v=timestamp
```

atau:

```text
data.js?v=timestamp
```

---

# 21. CONTENT GUIDELINES

## 21.1 Nama Tamu

Format:

```text
?to=Budi%20Santoso
```

Fallback:

```text
Tamu Undangan
```

Nama tamu digunakan pada:

- Cover.
- RSVP WhatsApp.

---

## 21.2 Quote

Quote dapat berupa:

- Kutipan agama.
- Ayat.
- Sloka.
- Kutipan universal.
- Kalimat pribadi pasangan.

Sumber harus ditampilkan jika quote memiliki sumber.

---

## 21.3 Tanggal

Format:

```text
Minggu, 25 Oktober 2026
```

Jam:

```text
09.00 - 11.00 WIB
```

Countdown:

```text
2026-10-25T09:00:00
```

---

# 22. DESIGN DO & DON'T

## DO

- Gunakan whitespace.
- Gunakan typography sebagai visual utama.
- Gunakan serif elegant.
- Gunakan sans-serif untuk informasi.
- Gunakan soft champagne sebagai accent.
- Gunakan border tipis.
- Gunakan shadow sangat halus.
- Gunakan animasi sederhana.
- Gunakan foto asli jika tersedia.
- Pertahankan konsistensi spacing.
- Prioritaskan mobile experience.

## DON'T

- Jangan gunakan emoji.
- Jangan gunakan emoji sebagai icon.
- Jangan gunakan particle.
- Jangan gunakan floating cards.
- Jangan gunakan antigravity animation.
- Jangan gunakan glow.
- Jangan gunakan neon.
- Jangan gunakan gradient berlebihan.
- Jangan gunakan glassmorphism.
- Jangan gunakan card pada setiap section.
- Jangan menggunakan shadow berat.
- Jangan menggunakan hover lift berlebihan.
- Jangan membuat semua elemen bergerak.
- Jangan menggunakan ornamen random.
- Jangan menggunakan ilustrasi AI generik.
- Jangan membuat website terasa seperti dashboard.
- Jangan membuat desain terlalu ramai.

---

# 23. VISUAL HIERARCHY

Prioritas visual:

```text
1. Nama pasangan
        ↓
2. Foto pasangan
        ↓
3. Informasi pernikahan
        ↓
4. Tanggal dan lokasi
        ↓
5. Countdown
        ↓
6. Detail acara
        ↓
7. Amplop digital
        ↓
8. RSVP
```

Tidak semua elemen harus memiliki visual weight yang sama.

Nama pasangan harus menjadi salah satu focal point terbesar.

---

# 24. RESPONSIVE LAYOUT

## Desktop

Container:

```text
max-width: 1100px
```

Profile:

```text
2 columns
```

Event:

```text
centered editorial layout
```

Countdown:

```text
4 columns
```

## Mobile

Profile:

```text
1 column
```

Countdown:

```text
2 columns
```

atau:

```text
4 columns dengan ukuran font lebih kecil
```

Event:

```text
1 column
```

Padding:

```text
20px
```

---

# 25. FINAL DESIGN PRINCIPLE

Undangan harus mengikuti prinsip:

> "Less decoration, more emotion."

Visual tidak perlu menunjukkan kemewahan melalui banyak efek.

Kemewahan ditunjukkan melalui:

- Typography.
- Whitespace.
- Proporsi.
- Fotografi.
- Detail kecil.
- Konsistensi.
- Warna yang lembut.
- Animasi yang tenang.

Hasil akhir harus terasa:

```text
WHITE
CLEAN
ELEGANT
SACRED
ROMANTIC
TIMELESS
```

dan bukan:

```text
BUSY
FLASHY
OVER-ANIMATED
GENERIC
AI-SLOP
```

---

# 26. OPTIONAL FUTURE FEATURES

Fitur berikut tidak wajib pada versi pertama.

## Gallery

- Pre-wedding.
- Wedding day.
- Family.

## Music

Audio background opsional.

Harus tetap menyediakan kontrol play/pause.

Tidak boleh autoplay tanpa pertimbangan browser policy.

## Guest Book

Form ucapan tamu.

Memerlukan backend/database.

## Social Sharing

Share URL ke WhatsApp atau social media.

## Multiple Language

```text
Indonesia
English
```

## Analytics

Optional:

- Unique visitor.
- Parameter `?to=`.
- RSVP click.
- WhatsApp click.

---

# 27. KNOWN LIMITATIONS

## 27.1 No Backend

Data bersifat statis.

Tidak ada database real-time.

Solusi future:

```text
API-connected version
```

## 27.2 QRIS Manual

QRIS masih berupa image.

Admin harus mengganti file:

```text
assets/qris.jpg
```

## 27.3 WhatsApp

Link RSVP bergantung pada perangkat pengguna.

Jika WhatsApp tidak tersedia, browser tetap dapat membuka link sesuai environment pengguna.

## 27.4 SEO

Data utama bersifat client-side.

Dynamic SEO dapat dikembangkan pada versi berikutnya.

## 27.5 Accessibility

Versi awal menggunakan accessibility dasar.

Improvement dapat dilakukan pada sprint berikutnya.

---

# 28. TESTING CHECKLIST

## Functional

- [ ] Cover tampil.
- [ ] Nama tamu dari `?to=` tampil.
- [ ] Fallback nama tamu berfungsi.
- [ ] Nama mempelai tampil.
- [ ] Quote tampil.
- [ ] Countdown berjalan.
- [ ] Countdown berhenti pada waktu yang tepat.
- [ ] Semua event dirender.
- [ ] Maps dapat dibuka.
- [ ] Semua rekening dirender.
- [ ] Copy rekening bekerja.
- [ ] Feedback copy tampil.
- [ ] QRIS muncul jika tersedia.
- [ ] QRIS tidak muncul jika tidak tersedia.
- [ ] Instagram link bekerja.
- [ ] RSVP WhatsApp menghasilkan pesan yang benar.

## Visual

- [ ] Background putih/off-white.
- [ ] Typography konsisten.
- [ ] Tidak ada emoji.
- [ ] Tidak ada particle.
- [ ] Tidak ada floating card.
- [ ] Tidak ada animasi berlebihan.
- [ ] Gold hanya digunakan sebagai accent.
- [ ] Shadow sangat subtle.
- [ ] Border konsisten.
- [ ] Spacing konsisten.
- [ ] Nama pasangan menjadi focal point.
- [ ] Tidak terlihat seperti dashboard.
- [ ] Tidak terlihat seperti template AI generik.
- [ ] Visual terasa elegant.
- [ ] Visual terasa clean.
- [ ] Visual terasa sacred.
- [ ] Visual terasa seperti wedding invitation premium.

## Browser

- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Edge Desktop
- [ ] Chrome Android
- [ ] Safari iOS

## Performance

- [ ] Tidak ada library yang tidak diperlukan.
- [ ] Gambar telah dioptimalkan.
- [ ] WebP digunakan jika memungkinkan.
- [ ] Tidak ada gambar berukuran berlebihan.
- [ ] Lazy loading digunakan untuk gambar non-critical.
- [ ] CSS tidak memiliki animasi berlebihan.
- [ ] JavaScript tidak menjalankan proses yang tidak diperlukan.
- [ ] Website dapat dibuka dengan cepat pada koneksi mobile.

---

# 29. VERSION HISTORY

| Versi | Tanggal | Perubahan |
|------|---------|-----------|
| 1.0 | 19/09/2026 | Initial release |
| 2.0 | 20/09/2026 | Redesign visual direction menjadi White Elegant Wedding; menghapus emoji, particle, antigravity, floating effects, dan dekorasi berlebihan |

---

# 30. CATATAN

Dokumen ini merupakan living document.

Perubahan fitur, struktur data, dan design system dapat dilakukan selama proses development selama tidak mengurangi fungsi utama sistem.

Prioritas utama versi 2.0:

1. Functionality tetap sederhana.
2. Template mudah digunakan ulang.
3. Website ringan.
4. Mobile-first experience.
5. Visual konsisten.
6. Tidak menggunakan emoji.
7. Tidak menggunakan dekorasi atau animasi yang membuat website terlihat seperti hasil AI-generated template.
8. Desain harus mempertahankan kesan putih, sederhana, elegan, sakral, dan bertema pernikahan.
