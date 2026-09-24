/**
 * SCRIPT LOGIKA UTAMA UNDANGAN DIGITAL
 * Tema: White Elegant Wedding (PRD v2.0)
 * 
 * Sepenuhnya dinamis berbasis data dari data.js
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuNcfiPTIa5ZpxnYHGGmXnapy9kK_Y1Is",
    authDomain: "undangan-wedding-540d2.firebaseapp.com",
    projectId: "undangan-wedding-540d2",
    storageBucket: "undangan-wedding-540d2.firebasestorage.app",
    messagingSenderId: "571485525757",
    appId: "1:571485525757:web:544f0d8284ece4eabbd094"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    // Matikan browser scroll restoration agar tidak reload di posisi bawah
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // -------------------------------------------------------------
    // 1. DATA BINDING & INISIALISASI
    // -------------------------------------------------------------
    if (typeof weddingData === "undefined") {
        console.error("Objek weddingData tidak ditemukan. Pastikan data.js dimuat sebelum script.js.");
        return;
    }

    // Ekstraksi parameter URL ?to=NamaTamu
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("to");
    const namaTamu = (guestParam && guestParam.trim() !== "") 
        ? guestParam.trim() 
        : weddingData.namaTamuFallback;

    // Inisialisasi Meta Tag SEO
    const coupleDisplayName = `${weddingData.panggilanPria} & ${weddingData.panggilanWanita}`;
    document.title = `The Wedding of ${coupleDisplayName}`;
    
    const metaDesc = document.getElementById("meta-description");
    if (metaDesc) metaDesc.content = `Pernikahan ${coupleDisplayName}. Kami mengundang ${namaTamu} untuk merayakan hari bahagia kami.`;
    
    const ogTitle = document.getElementById("og-title");
    if (ogTitle) ogTitle.content = `The Wedding of ${coupleDisplayName}`;
    
    const ogDesc = document.getElementById("og-description");
    if (ogDesc) ogDesc.content = `Undangan pernikahan ${coupleDisplayName} untuk ${namaTamu}.`;

    // -------------------------------------------------------------
    // 2. BIND DATA COVER & MONOGRAM
    // -------------------------------------------------------------
    const coverSalam = document.getElementById("cover-salam");
    if (coverSalam) coverSalam.textContent = weddingData.salamPembuka || "THE WEDDING OF";

    const coverGroom = document.getElementById("cover-groom-name");
    if (coverGroom) coverGroom.textContent = weddingData.panggilanPria;

    const coverBride = document.getElementById("cover-bride-name");
    if (coverBride) coverBride.textContent = weddingData.panggilanWanita;

    const coverDate = document.getElementById("cover-date");
    if (coverDate) coverDate.textContent = weddingData.tanggalPernikahanDisplay;

    const coverGuestName = document.getElementById("cover-guest-name");
    if (coverGuestName) coverGuestName.textContent = namaTamu;

    // Header Monogram
    const heroMonogram = document.getElementById("hero-monogram");
    if (heroMonogram) {
        const initPria = weddingData.panggilanPria.charAt(0).toUpperCase();
        const initWanita = weddingData.panggilanWanita.charAt(0).toUpperCase();
        heroMonogram.innerHTML = `${initPria} &amp; ${initWanita}`;
    }

    const heroNames = document.getElementById("hero-names");
    if (heroNames) heroNames.innerHTML = `${weddingData.panggilanPria} &amp; ${weddingData.panggilanWanita}`;

    // -------------------------------------------------------------
    // 3. BIND DATA QUOTE
    // -------------------------------------------------------------
    const quoteText = document.getElementById("quote-text");
    if (quoteText && weddingData.kutipanTeks) {
        quoteText.textContent = `"${weddingData.kutipanTeks}"`;
    }

    const quoteSource = document.getElementById("quote-source");
    if (quoteSource && weddingData.kutipanSumber) {
        quoteSource.textContent = `— ${weddingData.kutipanSumber}`;
    }

    // -------------------------------------------------------------
    // 4. BIND DATA MEMPELAI
    // -------------------------------------------------------------
    // Groom
    const groomPhoto = document.getElementById("groom-photo");
    if (groomPhoto && weddingData.pria.foto) groomPhoto.src = weddingData.pria.foto;

    const groomFullName = document.getElementById("groom-fullname");
    if (groomFullName) groomFullName.textContent = weddingData.pria.namaLengkap;

    const groomParents = document.getElementById("groom-parents");
    if (groomParents) groomParents.textContent = weddingData.pria.putraDari;

    const groomIg = document.getElementById("groom-instagram");
    const groomIgLabel = document.getElementById("groom-instagram-label");
    if (groomIg && weddingData.pria.instagram) {
        groomIg.href = weddingData.pria.instagram;
        if (groomIgLabel) groomIgLabel.textContent = weddingData.pria.instagramHandle || "@instagram";
    }

    // Bride
    const bridePhoto = document.getElementById("bride-photo");
    if (bridePhoto && weddingData.wanita.foto) bridePhoto.src = weddingData.wanita.foto;

    const brideFullName = document.getElementById("bride-fullname");
    if (brideFullName) brideFullName.textContent = weddingData.wanita.namaLengkap;

    const brideParents = document.getElementById("bride-parents");
    if (brideParents) brideParents.textContent = weddingData.wanita.putriDari;

    const brideIg = document.getElementById("bride-instagram");
    const brideIgLabel = document.getElementById("bride-instagram-label");
    if (brideIg && weddingData.wanita.instagram) {
        brideIg.href = weddingData.wanita.instagram;
        if (brideIgLabel) brideIgLabel.textContent = weddingData.wanita.instagramHandle || "@instagram";
    }

    // -------------------------------------------------------------
    // 5. COUNTDOWN TIMER
    // -------------------------------------------------------------
    const cdDays = document.getElementById("cd-days");
    const cdHours = document.getElementById("cd-hours");
    const cdMinutes = document.getElementById("cd-minutes");
    const cdSeconds = document.getElementById("cd-seconds");

    function initCountdown() {
        if (!weddingData.tanggalCountdown) return;
        const targetDate = new Date(weddingData.tanggalCountdown).getTime();

        function updateTimer() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                if (cdDays) cdDays.textContent = "00";
                if (cdHours) cdHours.textContent = "00";
                if (cdMinutes) cdMinutes.textContent = "00";
                if (cdSeconds) cdSeconds.textContent = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (cdDays) cdDays.textContent = String(days).padStart(2, "0");
            if (cdHours) cdHours.textContent = String(hours).padStart(2, "0");
            if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, "0");
            if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, "0");
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }
    initCountdown();

    // -------------------------------------------------------------
    // 6. RENDER DAFTAR JADWAL ACARA (Multi-Event)
    // -------------------------------------------------------------
    const eventsContainer = document.getElementById("events-container");
    if (eventsContainer && Array.isArray(weddingData.acara)) {
        eventsContainer.innerHTML = "";
        weddingData.acara.forEach((item, index) => {
            const eventCard = document.createElement("div");
            eventCard.className = `event-block reveal-fade-up delay-${(index % 3) + 1}`;
            
            const eventNum = index + 1;
            eventCard.innerHTML = `
                <span class="event-tag">Event ${eventNum}</span>
                <h3 class="event-title">${escapeHtml(item.judul)}</h3>
                <div class="event-meta">
                    <div class="event-date">${escapeHtml(item.tanggal)}</div>
                    <div class="event-time">${escapeHtml(item.jam)}</div>
                </div>
                <div class="event-venue">${escapeHtml(item.tempat)}</div>
                <p class="event-address">${escapeHtml(item.alamatLengkap)}</p>
                <a href="${encodeURI(item.linkMaps)}" target="_blank" rel="noopener noreferrer" class="btn-secondary" aria-label="View Location of ${escapeHtml(item.judul)} on Google Maps">
                    <span>View Location</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                </a>
            `;
            eventsContainer.appendChild(eventCard);
        });
    }

    // -------------------------------------------------------------
    // 7. RENDER AMPLOP DIGITAL & COPY TO CLIPBOARD
    // -------------------------------------------------------------
    const bankCardsContainer = document.getElementById("bank-cards-container");
    const qrisContainer = document.getElementById("qris-container");
    const qrisImage = document.getElementById("qris-image");
    const qrisHolder = document.getElementById("qris-holder");
    const toastNotice = document.getElementById("toast-notice");

    if (bankCardsContainer && Array.isArray(weddingData.rekening)) {
        bankCardsContainer.innerHTML = "";

        weddingData.rekening.forEach((rek, index) => {
            // Jika rekening berupa QRIS
            if (rek.qrImage) {
                if (qrisContainer) {
                    qrisContainer.style.display = "block";
                    if (qrisImage) qrisImage.src = rek.qrImage;
                    if (qrisHolder) qrisHolder.textContent = `a.n. ${rek.atasNama}`;
                }
                return; // QRIS ditampilkan di container tersendiri
            }

            // Regular Bank Card
            const card = document.createElement("div");
            card.className = `bank-card reveal-fade-up delay-${(index % 2) + 1}`;
            card.innerHTML = `
                <span class="bank-badge">${escapeHtml(rek.bank)}</span>
                <div class="bank-number">${escapeHtml(rek.nomor)}</div>
                <p class="bank-holder">a.n. ${escapeHtml(rek.atasNama)}</p>
                <button type="button" class="btn-secondary btn-copy" data-account="${escapeHtml(rek.nomor)}" aria-label="Copy account number for ${escapeHtml(rek.bank)}">
                    <span>Copy Number</span>
                </button>
            `;
            bankCardsContainer.appendChild(card);
        });

        // Event listener untuk tombol copy
        document.querySelectorAll(".btn-copy").forEach((btn) => {
            btn.addEventListener("click", () => {
                const accountNum = btn.getAttribute("data-account");
                copyToClipboard(accountNum, btn);
            });
        });
    }

    function copyToClipboard(text, btnElement) {
        if (!text) return;

        const originalText = btnElement.querySelector("span")?.textContent || "Copy Number";

        function showSuccess() {
            if (btnElement.querySelector("span")) {
                btnElement.querySelector("span").textContent = "Copied!";
            }
            if (toastNotice) {
                toastNotice.textContent = "Account number copied to clipboard!";
                toastNotice.classList.add("show");
                setTimeout(() => {
                    toastNotice.classList.remove("show");
                }, 2500);
            }
            setTimeout(() => {
                if (btnElement.querySelector("span")) {
                    btnElement.querySelector("span").textContent = originalText;
                }
            }, 2500);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(showSuccess).catch(() => {
                fallbackCopy(text, showSuccess);
            });
        } else {
            fallbackCopy(text, showSuccess);
        }
    }

    function fallbackCopy(text, callback) {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = text;
        tempTextArea.style.position = "fixed";
        tempTextArea.style.top = "-9999px";
        tempTextArea.style.left = "-9999px";
        document.body.appendChild(tempTextArea);
        tempTextArea.focus();
        tempTextArea.select();
        try {
            document.execCommand("copy");
            if (callback) callback();
        } catch (err) {
            console.error("Gagal menyalin teks", err);
        }
        document.body.removeChild(tempTextArea);
    }

    // -------------------------------------------------------------
    // 8. WEDDING WISHES HANDLER (Max 50 Words + Pagination 5 items)
    // -------------------------------------------------------------
    const wishesForm = document.getElementById("wishes-form");
    const wishNameInput = document.getElementById("wish-name");
    const wishMsgInput = document.getElementById("wish-message");
    const wordCountSpan = document.getElementById("word-count");
    const wishesList = document.getElementById("wishes-list");
    const wishesPagination = document.getElementById("wishes-pagination");
    const MAX_WORDS = 50;
    const WISHES_PER_PAGE = 5;
    let currentWishPage = 1;

    // Auto-fill guest name if available from URL param
    if (wishNameInput && guestParam && guestParam.trim() !== "") {
        wishNameInput.value = guestParam.trim();
    }

    // Function to count words
    function getWordCount(text) {
        if (!text || text.trim() === "") return 0;
        return text.trim().split(/\s+/).filter(Boolean).length;
    }

    // Word counter listener
    if (wishMsgInput && wordCountSpan) {
        const counterWrapper = wordCountSpan.parentElement;

        wishMsgInput.addEventListener("input", () => {
            const count = getWordCount(wishMsgInput.value);
            wordCountSpan.textContent = count;

            if (count > MAX_WORDS) {
                if (counterWrapper) counterWrapper.classList.add("over-limit");
            } else {
                if (counterWrapper) counterWrapper.classList.remove("over-limit");
            }
        });
    }

    // Storage Key (Digunakan sebagai nama Collection di Firestore)
    const collectionName = `wishes_${weddingData.panggilanPria}_${weddingData.panggilanWanita}`.toLowerCase();
    
    let allWishes = []; // Menyimpan semua data dari Firestore

    // Format waktu untuk tampilan (e.g. "12 Okt 2026, 14:30")
    function formatDate(date) {
        if (!date) return "Baru saja";
        return date.toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    }

    // Mendengarkan perubahan data secara realtime dari Firestore
    const wishesQuery = query(collection(db, collectionName), orderBy("timestamp", "desc"));
    onSnapshot(wishesQuery, (snapshot) => {
        allWishes = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            allWishes.push({
                id: doc.id,
                nama: data.nama,
                pesan: data.pesan,
                waktu: data.timestamp ? formatDate(data.timestamp.toDate()) : "Baru saja"
            });
        });
        
        // Gabungkan dengan data statis dari data.js jika ada, lalu render
        const staticWishes = Array.isArray(weddingData.wishes) ? weddingData.wishes : [];
        allWishes = [...allWishes, ...staticWishes];
        
        // Tetap di halaman yang sama jika data berubah, kecuali jika baru diload
        renderWishes(currentWishPage);
    });

    // Render pagination controls (1 2 3 4 5...)
    function renderWishesPagination(totalPages, activePage) {
        if (!wishesPagination) return;
        if (totalPages <= 1) {
            wishesPagination.innerHTML = "";
            return;
        }

        let html = "";

        // Tombol Sebelumnya (<)
        html += `
            <button type="button" class="wish-page-btn wish-page-nav" data-page="${activePage - 1}" ${activePage === 1 ? "disabled" : ""} aria-label="Halaman sebelumnya">
                &lsaquo;
            </button>
        `;

        // Tombol Angka Halaman (1 2 3 4 5...)
        for (let i = 1; i <= totalPages; i++) {
            html += `
                <button type="button" class="wish-page-btn ${i === activePage ? "active" : ""}" data-page="${i}" aria-label="Halaman ${i}" ${i === activePage ? 'aria-current="page"' : ""}>
                    ${i}
                </button>
            `;
        }

        // Tombol Selanjutnya (>)
        html += `
            <button type="button" class="wish-page-btn wish-page-nav" data-page="${activePage + 1}" ${activePage === totalPages ? "disabled" : ""} aria-label="Halaman selanjutnya">
                &rsaquo;
            </button>
        `;

        wishesPagination.innerHTML = html;

        // Pasang event listener pada setiap tombol pagination
        wishesPagination.querySelectorAll(".wish-page-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const pageNum = parseInt(btn.getAttribute("data-page"), 10);
                if (pageNum && pageNum !== currentWishPage && pageNum >= 1 && pageNum <= totalPages) {
                    renderWishes(pageNum);
                }
            });
        });
    }

    // Render wishes list dengan batasan 5 item per halaman
    function renderWishes(targetPage) {
        if (!wishesList) return;
        if (typeof targetPage === "number") {
            currentWishPage = targetPage;
        }

        const totalWishes = allWishes.length;

        if (totalWishes === 0) {
            wishesList.innerHTML = `<p class="wishes-empty">Be the first to send wishes to ${weddingData.panggilanPria} &amp; ${weddingData.panggilanWanita}!</p>`;
            if (wishesPagination) wishesPagination.innerHTML = "";
            return;
        }

        const totalPages = Math.ceil(totalWishes / WISHES_PER_PAGE);
        if (currentWishPage > totalPages) currentWishPage = totalPages;
        if (currentWishPage < 1) currentWishPage = 1;

        const startIndex = (currentWishPage - 1) * WISHES_PER_PAGE;
        const endIndex = Math.min(startIndex + WISHES_PER_PAGE, totalWishes);
        const pagedWishes = allWishes.slice(startIndex, endIndex);

        wishesList.innerHTML = "";
        pagedWishes.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "wish-card";
            card.style.animationDelay = `${index * 0.05}s`;
            card.innerHTML = `
                <div class="wish-card-name">${escapeHtml(item.nama)}</div>
                <p class="wish-card-message">"${escapeHtml(item.pesan)}"</p>
                <div class="wish-card-time">${escapeHtml(item.waktu || "Baru saja")}</div>
            `;
            wishesList.appendChild(card);
        });

        renderWishesPagination(totalPages, currentWishPage);
    }

    // Initial render dipanggil saat snapshot firebase pertama kali masuk

    // Form submit listener
    if (wishesForm) {
        const btnSubmitWish = document.getElementById("btn-submit-wish");
        wishesForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = wishNameInput ? wishNameInput.value.trim() : "";
            const message = wishMsgInput ? wishMsgInput.value.trim() : "";
            const wordCount = getWordCount(message);

            if (!name) {
                alert("Please enter your name.");
                if (wishNameInput) wishNameInput.focus();
                return;
            }

            if (!message) {
                alert("Please enter your wishes.");
                if (wishMsgInput) wishMsgInput.focus();
                return;
            }

            if (wordCount > MAX_WORDS) {
                alert(`Your wishes cannot exceed ${MAX_WORDS} words (currently ${wordCount} words). Please shorten your message.`);
                if (wishMsgInput) wishMsgInput.focus();
                return;
            }

            // Ubah tombol menjadi status loading
            if (btnSubmitWish) {
                btnSubmitWish.disabled = true;
                btnSubmitWish.querySelector("span").textContent = "Sending...";
            }

            try {
                // Simpan ke Firestore
                await addDoc(collection(db, collectionName), {
                    nama: name,
                    pesan: message,
                    timestamp: serverTimestamp()
                });

                // Pindah ke halaman 1 agar ucapan terbaru terlihat
                currentWishPage = 1;

                // Reset form message (keep name if from URL)
                if (wishMsgInput) wishMsgInput.value = "";
                if (wordCountSpan) wordCountSpan.textContent = "0";
                if (wordCountSpan && wordCountSpan.parentElement) {
                    wordCountSpan.parentElement.classList.remove("over-limit");
                }
                if (!guestParam && wishNameInput) {
                    wishNameInput.value = "";
                }

                // Toast feedback
                if (toastNotice) {
                    toastNotice.textContent = "Thank you! Your wishes have been sent.";
                    toastNotice.classList.add("show");
                    setTimeout(() => {
                        toastNotice.classList.remove("show");
                    }, 3000);
                }
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Gagal mengirim ucapan. Pastikan koneksi internet Anda stabil dan coba lagi.");
            } finally {
                // Kembalikan tombol ke keadaan semula
                if (btnSubmitWish) {
                    btnSubmitWish.disabled = false;
                    btnSubmitWish.querySelector("span").textContent = "Send Wishes";
                }
            }
        });
    }

    // -------------------------------------------------------------
    // 9. FOOTER BINDING
    // -------------------------------------------------------------
    const footerNames = document.getElementById("footer-names");
    if (footerNames) footerNames.innerHTML = `${weddingData.panggilanPria} &amp; ${weddingData.panggilanWanita}`;

    const footerDate = document.getElementById("footer-date");
    if (footerDate) footerDate.textContent = weddingData.tanggalPernikahanDisplay.toUpperCase();

    const footerCredit = document.getElementById("footer-credit");
    if (footerCredit && weddingData.footerCredit) footerCredit.textContent = weddingData.footerCredit;

    // -------------------------------------------------------------
    // 10. BACKGROUND AUDIO CONTROLLER
    // -------------------------------------------------------------
    const audio = document.getElementById("bg-audio");
    const musicToggle = document.getElementById("music-toggle");
    const iconPlaying = document.getElementById("icon-music-playing");
    const iconMuted = document.getElementById("icon-music-muted");
    let isAudioPlaying = false;

    if (audio && weddingData.musik && weddingData.musik.enabled) {
        audio.src = weddingData.musik.src;

        if (musicToggle) {
            musicToggle.addEventListener("click", () => {
                if (isAudioPlaying) {
                    pauseAudio();
                } else {
                    playAudio();
                }
            });
        }
    } else if (musicToggle) {
        musicToggle.style.display = "none";
    }

    function playAudio() {
        if (!audio) return;
        audio.play().then(() => {
            isAudioPlaying = true;
            if (musicToggle) musicToggle.classList.add("playing");
            if (iconPlaying) iconPlaying.style.display = "block";
            if (iconMuted) iconMuted.style.display = "none";
        }).catch(err => {
            console.log("Audio autoplay prevented or failed:", err);
        });
    }

    function pauseAudio() {
        if (!audio) return;
        audio.pause();
        isAudioPlaying = false;
        if (musicToggle) musicToggle.classList.remove("playing");
        if (iconPlaying) iconPlaying.style.display = "none";
        if (iconMuted) iconMuted.style.display = "block";
    }

    // -------------------------------------------------------------
    // 11. COVER / OPEN INVITATION INTERACTION
    // -------------------------------------------------------------
    const cover = document.getElementById("cover");
    const btnOpenInvitation = document.getElementById("btn-open-invitation");
    const bottomNav = document.getElementById("bottom-nav");

    if (btnOpenInvitation && cover) {
        btnOpenInvitation.addEventListener("click", () => {
            // Hilangkan status locked pada body
            document.body.classList.remove("locked");
            cover.classList.add("hidden");

            // Tampilkan navigasi bawah
            if (bottomNav) {
                bottomNav.classList.remove("hidden");
            }

            // Putar audio jika aktif
            if (weddingData.musik && weddingData.musik.enabled) {
                playAudio();
            }

            // Pastikan scroll berada di posisi paling atas (0, 0) TANPA animasi scroll-up
            window.scrollTo(0, 0);
            if (window.__lenis) {
                window.__lenis.scrollTo(0, { immediate: true });
            }

            // Trigger popup slide up setelah transisi cover selesai
            // (Scroll reveal observer diinisialisasi otomatis oleh smooth-scroll.js saat cover ditutup)
            setTimeout(() => {
                initPopupSlideUp();
            }, 750);
        });
    }

    // -------------------------------------------------------------
    // 12. BOTTOM NAVIGATION SCROLL SPY
    // -------------------------------------------------------------
    const navLinks = document.querySelectorAll(".bottom-nav a");
    const sections = document.querySelectorAll("header[id], section[id]");

    window.addEventListener("scroll", () => {
        let currentSection = "home";
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }, { passive: true });

    // Helper: Escape HTML string to prevent XSS
    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // -------------------------------------------------------------
    // 13. RENDER GALERI FOTO PENGANTIN + LIGHTBOX
    // -------------------------------------------------------------
    const galleryGrid = document.getElementById("gallery-grid");
    const galleryTitle = document.getElementById("gallery-title");
    const gallerySubtitle = document.getElementById("gallery-subtitle");
    const lightboxOverlay = document.getElementById("lightbox-overlay");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    const lightboxCounter = document.getElementById("lightbox-counter");

    let galleryPhotos = [];
    let currentLightboxIndex = 0;

    // Bind judul dan subtitle galeri
    if (galleryTitle && weddingData.galeri && weddingData.galeri.judul) {
        galleryTitle.textContent = weddingData.galeri.judul;
    }
    if (gallerySubtitle && weddingData.galeri && weddingData.galeri.subjudul) {
        gallerySubtitle.textContent = weddingData.galeri.subjudul;
    }

    // Render gallery grid
    if (galleryGrid && weddingData.galeri && weddingData.galeri.enabled && Array.isArray(weddingData.galeri.foto)) {
        galleryPhotos = weddingData.galeri.foto;
        galleryGrid.innerHTML = "";

        galleryPhotos.forEach((foto, index) => {
            const item = document.createElement("div");
            item.className = `gallery-item reveal-zoom-in delay-${(index % 3) + 1}`;
            item.setAttribute("role", "button");
            item.setAttribute("tabindex", "0");
            item.setAttribute("aria-label", `Buka foto ${index + 1}: ${foto.caption || ""}`);

            // Cek apakah file foto tersedia (lazy load dengan fallback placeholder)
            const img = new Image();
            img.onload = () => {
                item.innerHTML = `
                    <img src="${escapeHtml(foto.src)}" alt="${escapeHtml(foto.caption || `Foto ${index + 1}`)}" loading="lazy">
                `;
            };

            img.onerror = () => {
                item.innerHTML = `
                    <div class="gallery-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span>Foto ${index + 1}</span>
                    </div>
                `;
                item.style.cursor = "default";
            };

            img.src = foto.src;

            // Placeholder sementara saat loading
            item.innerHTML = `
                <div class="gallery-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>Foto ${index + 1}</span>
                </div>
            `;

            // Click handler
            item.addEventListener("click", () => {
                const hasImg = item.querySelector("img");
                if (hasImg) openLightbox(index);
            });

            item.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const hasImg = item.querySelector("img");
                    if (hasImg) openLightbox(index);
                }
            });

            galleryGrid.appendChild(item);
        });
    }

    // Lightbox functions
    function openLightbox(index) {
        if (!lightboxOverlay || galleryPhotos.length === 0) return;
        currentLightboxIndex = index;
        updateLightboxContent();
        lightboxOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
        if (!lightboxOverlay) return;
        lightboxOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    function updateLightboxContent() {
        const foto = galleryPhotos[currentLightboxIndex];
        if (!foto) return;
        if (lightboxImg) {
            lightboxImg.src = foto.src;
            lightboxImg.alt = foto.caption || `Foto ${currentLightboxIndex + 1}`;
        }
        if (lightboxCaption) {
            lightboxCaption.textContent = foto.caption || "";
        }
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${galleryPhotos.length}`;
        }
    }

    function prevPhoto() {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
        updateLightboxContent();
    }

    function nextPhoto() {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryPhotos.length;
        updateLightboxContent();
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener("click", prevPhoto);
    if (lightboxNext) lightboxNext.addEventListener("click", nextPhoto);

    // Close on backdrop click
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener("click", (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (!lightboxOverlay || !lightboxOverlay.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prevPhoto();
        if (e.key === "ArrowRight") nextPhoto();
    });

    // -------------------------------------------------------------
    // 14. SCROLL REVEAL ANIMATION ENGINE
    // -------------------------------------------------------------
    function initScrollReveal() {
        if (window.createRevealObserver) {
            window.createRevealObserver();
            return;
        }

        const revealElements = document.querySelectorAll(
            ".reveal, .reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in"
        );

        if (!("IntersectionObserver" in window)) {
            revealElements.forEach((el) => el.classList.add("revealed"));
            return;
        }

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: "0px 0px 10px 0px"
        });

        revealElements.forEach((el) => {
            if (!el.classList.contains("revealed")) {
                revealObserver.observe(el);
            }
        });
    }

    // Scroll reveal dijalankan HANYA setelah cover ditutup (lihat section 11)
    // agar animasi fade-in bisa terlihat oleh user

    // -------------------------------------------------------------
    // 15. FLOATING POPUP (Live Wishes Notification)
    // -------------------------------------------------------------
    const popupSlideEl = document.getElementById("popup-slide-up");
    const popupNameEl = document.getElementById("popup-slide-name");
    const popupTimeEl = document.getElementById("popup-slide-time");
    const popupMsgEl = document.getElementById("popup-slide-message");
    const popupCloseBtn = document.getElementById("popup-slide-close");

    let popupTimer = null;
    let popupHideTimer = null;
    let currentPopupIndex = 0;
    let isPopupClosedByUser = false;
    let popupInitialized = false;

    function initPopupSlideUp() {
        // Hanya inisialisasi sekali
        if (popupInitialized) return;

        if (!popupSlideEl || !weddingData.popupSlideUp || !weddingData.popupSlideUp.enabled) {
            return;
        }

        popupInitialized = true;

        const config = weddingData.popupSlideUp;
        const delayMs   = (config.detikMunculPertama ?? 3) * 1000;
        const showMs    = (config.durasiTampilDetik  ?? 5) * 1000;
        const gapMs     = (config.intervalDetik      ?? 7) * 1000;

        // Ambil daftar ucapan langsung dari config (tidak tergantung pada scope lain)
        function getItems() {
            const list = config.daftarUcapan;
            if (Array.isArray(list) && list.length > 0) return list;

            // Fallback: baca dari localStorage
            try {
                const key = `wedding_wishes_${weddingData.panggilanPria}_${weddingData.panggilanWanita}`;
                const raw = localStorage.getItem(key);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
                }
            } catch(e) {}

            // Fallback akhir: gunakan wishes dari data.js
            if (Array.isArray(weddingData.wishes) && weddingData.wishes.length > 0) {
                return weddingData.wishes;
            }
            return [];
        }

        function hidePopup() {
            if (!popupSlideEl) return;
            popupSlideEl.classList.remove("show");
        }

        function showPopup() {
            if (isPopupClosedByUser || !popupSlideEl) return;

            const items = getItems();
            if (items.length === 0) return;

            const item = items[currentPopupIndex % items.length];
            currentPopupIndex++;

            if (popupNameEl) popupNameEl.textContent = item.nama  || "Tamu Undangan";
            if (popupTimeEl) popupTimeEl.textContent = item.waktu || "Baru saja";
            if (popupMsgEl)  popupMsgEl.textContent  = item.pesan || "";

            // Paksa reflow agar transisi terpicu ulang jika elemen sudah di-show sebelumnya
            popupSlideEl.classList.remove("show");
            void popupSlideEl.offsetWidth; // reflow trigger

            // Tampilkan dengan animasi
            requestAnimationFrame(() => {
                popupSlideEl.classList.add("show");
            });

            // Sembunyikan setelah showMs detik
            if (popupHideTimer) clearTimeout(popupHideTimer);
            popupHideTimer = setTimeout(() => {
                hidePopup();
                // Jadwalkan popup berikutnya
                if (!isPopupClosedByUser) {
                    if (popupTimer) clearTimeout(popupTimer);
                    popupTimer = setTimeout(showPopup, gapMs);
                }
            }, showMs);
        }

        // Mulai setelah delay pertama
        if (popupTimer) clearTimeout(popupTimer);
        popupTimer = setTimeout(showPopup, delayMs);
    }

    // Tombol close
    if (popupCloseBtn && popupSlideEl) {
        popupCloseBtn.addEventListener("click", () => {
            isPopupClosedByUser = true;
            popupSlideEl.classList.remove("show");
            if (popupTimer)     clearTimeout(popupTimer);
            if (popupHideTimer) clearTimeout(popupHideTimer);
        });
    }
});
