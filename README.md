# White Elegant Wedding — Digital Invitation Template

Template undangan digital universal premium bertema **White Elegant Wedding** (Versi 2.0). Dibuat menggunakan HTML5, CSS3 murni (Vanilla CSS), dan Vanilla JavaScript murni tanpa framework, sehingga sangat cepat dimuat, ringan, dan siap di-deploy ke shared hosting manapun.

---

## 💎 Filosofi Desain

- **Gaya:** Minimalist, Editorial, Sacred, Romantic, Timeless.
- **Warna Pokok:** Warm White (`#FCFBF8`), Surface White (`#FFFFFF`), Soft Charcoal (`#292725`), Neutral Soft (`#77716B`), Champagne Gold (`#B69B6B`).
- **Tipografi:** *Cormorant Garamond* (Serif Editorial) & *Inter* (Sans-serif Modern).
- **Prinsip:** *"Less decoration, more emotion"* — Tidak menggunakan emoji, tanpa efek antigravity/kartu melayang berlebihan, tanpa glow neon, dan tanpa partikel.

---

## 📂 Struktur File

```text
template 1/
├── index.html        # Struktur semantik HTML
├── data.js           # SATU-SATUNYA file data klien (Edit disini!)
├── style.css         # Styling & design system token
├── script.js         # Logika interaktif, countdown, clipboard, audio
├── README.md         # Dokumentasi template
└── assets/           # Foto dan grafis klien
    ├── groom.jpg     # Foto mempelai pria
    ├── bride.jpg     # Foto mempelai wanita
    ├── qris.jpg      # Gambar barcode QRIS (opsional)
    └── og-image.jpg  # Banner preview media sosial WhatsApp/FB
```

---

## ⚡ Alur Setup Klien Baru (< 30 Menit)

### Langkah 1: Gandakan Folder Template
Salin folder template ini untuk klien baru, misalnya: `klien-reza-sarah/`.

### Langkah 2: Ganti Data Klien di `data.js`
Buka file `data.js` dan sesuaikan nilainya:
- `panggilanPria` & `panggilanWanita`
- `tanggalPernikahanDisplay`
- `salamPembuka` (misal: "Om Swastiastu", "Assalamu'alaikum Wr. Wb.", atau "The Wedding of")
- `kutipanTeks` & `kutipanSumber`
- Detail lengkap `pria` dan `wanita` (nama lengkap + gelar, putra/putri dari, instagram)
- `tanggalCountdown` (format: `YYYY-MM-DDTHH:mm:ss`)
- Array `acara` (bisa 1, 2, atau lebih acara: Akad/Pemberkatan, Resepsi, dll beserta link Google Maps)
- Array `rekening` (daftar bank, nomor rekening, atas nama, dan QRIS)
- `nomorWhatsAppAdmin` (nomor WhatsApp dengan format internasional tanpa tanda +, contoh `6281234567890`)

### Langkah 3: Perbarui Aset Gambar di Folder `assets/`
Ganti file gambar di folder `assets/` dengan foto klien asli:
- `groom.jpg` (Rasio vertikal portrait 3:4)
- `bride.jpg` (Rasio vertikal portrait 3:4)
- `qris.jpg` (Rasio 1:1)
- `og-image.jpg` (Rasio 16:9 untuk preview link sharing)

### Langkah 4: Uji Coba Personalized URL
Buka file `index.html` di browser dengan menambahkan parameter nama tamu:
```text
index.html?to=Budi%20Santoso
```
Halaman cover akan otomatis menampilkan:
> **Kepada Yth. Bapak/Ibu/Saudara/i**  
> **Budi Santoso**

Dan pesan konfirmasi WhatsApp RSVP akan otomatis terisi dengan nama tamu tersebut.

---

## 🚀 Deployment ke Server

1. Unggah seluruh isi folder ke web server / hosting Anda (misal cPanel `public_html/klien-reza-sarah/`).
2. Tautan undangan siap disebarkan:
   ```text
   https://domain-anda.com/klien-reza-sarah/?to=NamaTamu
   ```

---

## 📋 Fitur yang Tersedia

1. **Cover Overlay Eksklusif** dengan tombol buka undangan beranimasi halus.
2. **Personalized Greeting** dinamis dari URL parameter `?to=...`.
3. **Pemberkatan / Akad & Resepsi** dengan link langsung ke Google Maps.
4. **Countdown Timer Presisi** hingga detik pelaksanaan acara.
5. **Amplop Digital & Copy Clipboard Otomatis** dengan status "Tersalin".
6. **QRIS Integration** siap pakai.
7. **RSVP WhatsApp Terintegrasi** dengan format pesan otomatis.
8. **Ambient Music Player** dengan tombol play/pause minimalis.
9. **Navigasi Bawah Minimalis** dengan scroll spy aktif.
10. **Aksesibilitas & Keringanan Beban** (mendukung `prefers-reduced-motion` dan tanpa dependensi library eksternal).
