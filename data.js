/**
 * DATA KONFIGURASI UNDANGAN DIGITAL
 * Tema: White Elegant Wedding
 * 
 * Cukup ubah data di file ini untuk setiap klien baru.
 * Struktur HTML dan CSS tidak perlu diubah.
 */

const weddingData = {
    // -------------------------------------------------------------
    // 1. INFORMASI PASANGAN & COVER
    // -------------------------------------------------------------
    panggilanPria: "Reza",
    panggilanWanita: "Sarah",
    tanggalPernikahanDisplay: "25 Oktober 2026",
    
    namaTamuFallback: "Tamu Undangan",
    salamPembuka: "Om Swastiastu",
    
    // -------------------------------------------------------------
    // 2. KUTIPAN / WEDDING STATEMENT
    // -------------------------------------------------------------
    kutipanTeks: "Suami istri sejati adalah dua jiwa yang bersatu dalam cinta kasih suci, saling mendukung dan menjaga kehormatan demi kebahagiaan lahir dan batin yang abadi.",
    kutipanSumber: "Slokantara",

    // -------------------------------------------------------------
    // 3. PROFIL MEMPELAI
    // -------------------------------------------------------------
    pria: {
        panggilan: "Reza",
        namaLengkap: "Reza Rahadian, S.Kom.",
        putraDari: "Putra pertama dari Bapak Budi Santoso & Ibu Siti Aminah",
        instagram: "https://instagram.com/reza",
        instagramHandle: "@reza",
        foto: "assets/groom.jpg"
    },

    wanita: {
        panggilan: "Sarah",
        namaLengkap: "Sarah Wijayanto, S.E.",
        putriDari: "Putri kedua dari Bapak Hendra Wijaya & Ibu Ratna Dewi",
        instagram: "https://instagram.com/sarah",
        instagramHandle: "@sarah",
        foto: "assets/bride.jpg"
    },

    // -------------------------------------------------------------
    // 4. COUNTDOWN TARGET (Format ISO 8601: YYYY-MM-DDTHH:mm:ss)
    // -------------------------------------------------------------
    tanggalCountdown: "2026-09-24T09:00:00",

    // -------------------------------------------------------------
    // 5. DAFTAR JADWAL ACARA (Mendukung satu atau lebih acara)
    // -------------------------------------------------------------
    acara: [
        {
            judul: "Pemberkatan Nikah",
            tanggal: "Minggu, 25 Oktober 2026",
            jam: "09.00 - 11.00 WIB",
            tempat: "Gereja Katedral Jakarta",
            alamatLengkap: "Jl. Katedral No.7B, Pasar Baru, Kecamatan Sawah Besar, Jakarta Pusat",
            linkMaps: "https://maps.google.com/?q=Gereja+Katedral+Jakarta"
        },
        {
            judul: "Resepsi Pernikahan",
            tanggal: "Minggu, 25 Oktober 2026",
            jam: "18.30 - 21.30 WIB",
            tempat: "The Glass House Grand Ballroom",
            alamatLengkap: "Jl. MH Thamrin No. 28-30, Gondangdia, Menteng, Jakarta Pusat",
            linkMaps: "https://maps.google.com/?q=Jakarta"
        }
    ],

    // -------------------------------------------------------------
    // 6. INFORMASI AMPLOP DIGITAL & REKENING
    // -------------------------------------------------------------
    amplopPengantar: "Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, kami menyediakan amplop digital di bawah ini:",
    rekening: [
        {
            bank: "BCA",
            nomor: "8830192841",
            atasNama: "Reza Rahadian"
        },
        {
            bank: "Mandiri",
            nomor: "1370098234120",
            atasNama: "Sarah Wijayanto"
        }
    ],

    // -------------------------------------------------------------
    // 7. WISHES / UCAPAN & DOA
    // -------------------------------------------------------------
    wishes: [
        {
            nama: "Dimas & Maya",
            pesan: "Selamat menempuh hidup baru Reza & Sarah! Semoga selalu bahagia, rukun, dan saling melengkapi selamanya hingga kakek nenek.",
            waktu: "1 jam yang lalu"
        },
        {
            nama: "Keluarga Besar Sastro",
            pesan: "Semoga menjadi keluarga yang harmonis, senantiasa dilimpahkan berkah, rezeki, dan cinta suci.",
            waktu: "3 jam yang lalu"
        },
        {
            nama: "Budi & Amanda",
            pesan: "Happy wedding Reza & Sarah! Semoga cinta kalian berdua senantiasa tumbuh semakin kuat setiap harinya.",
            waktu: "5 jam yang lalu"
        },
        {
            nama: "Rian Firmansyah",
            pesan: "Selamat brother Reza! Akhirnya berlabuh ke pelaminan. Semoga langgeng dan sakinah mawaddah warahmah.",
            waktu: "6 jam yang lalu"
        },
        {
            nama: "Jessica Tan",
            pesan: "Wishing you both a lifetime of happiness, laughter, and endless love. Congratulations Sarah & Reza!",
            waktu: "8 jam yang lalu"
        },
        {
            nama: "Hendra & Keluarga",
            pesan: "Turut berbahagia atas pernikahan ananda berdua. Semoga menjadi keluarga yang teladan dan penuh keberkahan.",
            waktu: "1 hari yang lalu"
        },
        {
            nama: "Alumni SMA 1 Angkatan 15",
            pesan: "Selamat menempuh babak baru dalam hidup! Sukses selalu untuk Reza & Sarah.",
            waktu: "1 hari yang lalu"
        }
    ],

    // -------------------------------------------------------------
    // 8. GALERI FOTO PENGANTIN
    // Simpan foto-foto di folder: assets/gallery/
    // Gunakan nama file yang sudah ada di folder tersebut.
    // -------------------------------------------------------------
    galeri: {
        judul: "Our Gallery",
        subjudul: "Setiap momen bersama adalah kenangan terindah yang akan selalu kami jaga.",
        enabled: true,
        foto: [
            {
                src: "assets/gallery/photo-1.jpg",
                caption: "Pre-wedding di Bali"
            },
            {
                src: "assets/gallery/photo-2.jpg",
                caption: "Momen bahagia bersama"
            },
            {
                src: "assets/gallery/photo-3.jpg",
                caption: "Hari yang dinantikan"
            },
            {
                src: "assets/gallery/photo-4.jpg",
                caption: "Senyum yang tulus"
            },
            {
                src: "assets/gallery/photo-5.jpg",
                caption: "Cinta yang abadi"
            },
            {
                src: "assets/gallery/photo-6.jpg",
                caption: "Bersama selamanya"
            }
        ]
    },

    // -------------------------------------------------------------
    // 9. POPUP NOTIFIKASI UCAPAN (Fade Animation)
    // Atur detik muncul dan durasi tampil di sini:
    // -------------------------------------------------------------
    popupSlideUp: {
        enabled: true,
        detikMunculPertama: 3,   // Muncul pertama kali setelah X detik sejak undangan dibuka
        durasiTampilDetik: 9,    // Tampil lebih lama di layar (9 detik) sebelum memudar halus
        intervalDetik: 6,        // Jeda waktu (detik) untuk memunculkan popup ucapan berikutnya
        
        // Daftar ucapan yang akan bergantian muncul pada pop-up
        daftarUcapan: [
            { nama: "Dimas & Maya", pesan: "Selamat berbahagia Reza & Sarah! Semoga langgeng selamanya.", waktu: "Baru saja" },
            { nama: "Budi Santoso", pesan: "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.", waktu: "2 menit lalu" },
            { nama: "Sarah Wijaya", pesan: "Happy Wedding! Doa terbaik untuk kalian berdua.", waktu: "5 menit lalu" },
            { nama: "Keluarga Besar Sastro", pesan: "Selamat menempuh hidup baru, semoga selalu dilimpahi berkah.", waktu: "10 menit lalu" }
        ]
    },

    // -------------------------------------------------------------
    // 10. PENGATURAN TAMBAHAN
    // -------------------------------------------------------------
    musik: {
        enabled: true,
        src: "assets/Marry Your Daughter - Brian McKnight (Saxophone Cover by Desmond Amos).mp3"
    },

    footerCredit: "Digital Invitation by Ananda Ibrahim"
};

// Pastikan weddingData dapat diakses di lingkungan browser atau modul jika dibutuhkan
if (typeof module !== 'undefined' && module.exports) {
    module.exports = weddingData;
}
