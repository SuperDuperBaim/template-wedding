/**
 * SMOOTH SCROLL ENGINE — LENIS + CINEMATIC SCROLL REVEAL
 * 
 * Fix:
 *  1. Background TIDAK ikut scroll (position:fixed, no parallax)
 *  2. Scroll reveal HANYA aktif setelah cover ditutup
 *  3. Animasi fade-up lambat & elegan saat user scroll ke bawah
 */

(function () {
    "use strict";

    // ─────────────────────────────────────────────────────────────
    // 1. LENIS SMOOTH SCROLL
    //    Inertia scroll premium setara GSAP ScrollSmoother
    // ─────────────────────────────────────────────────────────────
    let lenis = null;

    function initLenis() {
        if (typeof Lenis === "undefined") {
            console.warn("[SmoothScroll] Lenis tidak tersedia, pakai CSS fallback.");
            document.documentElement.style.scrollBehavior = "smooth";
            return;
        }

        lenis = new Lenis({
            duration: 1.4,                         // Durasi inertia (lebih tinggi = lebih halus)
            easing: function(t) {                  // Expo ease-out: terasa seperti GSAP Power4
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            },
            smoothWheel: true,
            smoothTouch: false,                    // Touch tetap native (lebih natural mobile)
            wheelMultiplier: 0.85,                 // Dikurangi sedikit = lebih smooth
            touchMultiplier: 2.2,
            infinite: false,
            orientation: "vertical",
        });

        // RAF loop wajib untuk Lenis
        (function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        })(0);

        // Expose globally
        window.__lenis = lenis;

        // ── Intercept anchor links agar smooth via Lenis ──
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener("click", function(e) {
                var id = this.getAttribute("href").slice(1);
                var target = document.getElementById(id);
                if (target) {
                    e.preventDefault();
                    lenis.scrollTo(target, {
                        offset: -24,
                        duration: 1.7,
                        easing: function(t) { return 1 - Math.pow(1 - t, 4); }
                    });
                }
            });
        });

        // ── Patch scrollIntoView (dipakai script.js saat cover tutup) ──
        var _orig = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function(opts) {
            if (lenis && opts && opts.behavior === "smooth") {
                lenis.scrollTo(this, {
                    offset: 0,
                    duration: 1.7,
                    easing: function(t) { return 1 - Math.pow(1 - t, 4); }
                });
            } else {
                _orig.call(this, opts);
            }
        };

        console.log("[SmoothScroll] Lenis aktif ✓");
    }

    // ─────────────────────────────────────────────────────────────
    // 2. SCROLL REVEAL ENGINE
    //    Hanya mulai observe setelah cover ditutup
    // ─────────────────────────────────────────────────────────────
    var SELECTORS = [
        ".reveal",
        ".reveal-fade-up",
        ".reveal-fade-left",
        ".reveal-fade-right",
        ".reveal-zoom-in"
    ].join(", ");

    var revealObserver = null;

    function createRevealObserver() {
        if (!("IntersectionObserver" in window)) {
            // Fallback: langsung reveal semua
            document.querySelectorAll(SELECTORS).forEach(function(el) {
                el.classList.add("revealed");
            });
            return;
        }

        if (revealObserver) revealObserver.disconnect();

        revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !entry.target.classList.contains("revealed")) {
                    entry.target.classList.add("revealed");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            // Elemen harus masuk minimal 40px ke dalam viewport baru trigger fade
            rootMargin: "0px 0px -40px 0px"
        });

        document.querySelectorAll(SELECTORS).forEach(function(el) {
            if (!el.classList.contains("revealed")) {
                revealObserver.observe(el);
            }
        });
    }

    // Expose ke global agar script.js dapat memanggil observer yang sama
    window.createRevealObserver = createRevealObserver;

    // Re-observe elemen yang di-render dinamis (galeri, rekening, dll)
    function watchDynamicReveal() {
        if (!("MutationObserver" in window)) return;

        new MutationObserver(function(mutations) {
            var hasNew = false;
            mutations.forEach(function(m) {
                m.addedNodes.forEach(function(node) {
                    if (node.nodeType !== 1) return;
                    // Cek elemen itu sendiri atau anaknya
                    if ((node.matches && node.matches(SELECTORS)) ||
                        (node.querySelectorAll && node.querySelectorAll(SELECTORS).length > 0)) {
                        hasNew = true;
                    }
                });
            });
            if (hasNew && revealObserver) {
                setTimeout(function() {
                    document.querySelectorAll(SELECTORS).forEach(function(el) {
                        if (!el.classList.contains("revealed")) {
                            revealObserver.observe(el);
                        }
                    });
                }, 100);
            }
        }).observe(document.body, { childList: true, subtree: true });
    }

    // ─────────────────────────────────────────────────────────────
    // 3. TUNGGU COVER TUTUP → BARU AKTIFKAN SCROLL REVEAL
    //    Watch class "hidden" yang ditambah ke #cover oleh script.js
    // ─────────────────────────────────────────────────────────────
    function waitForCoverClose() {
        var cover = document.getElementById("cover");
        if (!cover) {
            // Tidak ada cover, langsung aktifkan
            setTimeout(createRevealObserver, 100);
            return;
        }

        // Jika cover sudah hidden (reload setelah cover tutup)
        if (cover.classList.contains("hidden")) {
            setTimeout(createRevealObserver, 100);
            return;
        }

        // Observe class changes pada cover
        var coverWatcher = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
                if (m.type === "attributes" && m.attributeName === "class") {
                    if (cover.classList.contains("hidden")) {
                        coverWatcher.disconnect();
                        // Mulai scroll reveal setelah transisi cover selesai
                        setTimeout(function() {
                            createRevealObserver();
                            watchDynamicReveal();
                        }, 750);
                    }
                }
            });
        });

        coverWatcher.observe(cover, { attributes: true });
    }

    // ─────────────────────────────────────────────────────────────
    // 4. COVER STAGGER ENTRANCE ANIMASI
    //    Elemen cover masuk satu per satu saat halaman load
    // ─────────────────────────────────────────────────────────────
    function initCoverEntrance() {
        var cover = document.getElementById("cover");
        if (!cover) return;

        var els = [
            cover.querySelector(".cover-header-tag"),
            cover.querySelector(".cover-names"),
            cover.querySelector(".cover-date"),
            cover.querySelector(".cover-guest-box"),
            cover.querySelector(".btn-primary")
        ].filter(Boolean);

        // Set initial hidden state
        els.forEach(function(el) {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "none";
        });

        // Double rAF untuk force reflow sebelum animasi
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                els.forEach(function(el, i) {
                    setTimeout(function() {
                        el.style.transition =
                            "opacity 1.6s cubic-bezier(0.25,1,0.4,1) " + (i * 0.18) + "s, " +
                            "transform 1.6s cubic-bezier(0.25,1,0.4,1) " + (i * 0.18) + "s";
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0)";
                    }, 220 + i * 160);
                });
            });
        });
    }

    // ─────────────────────────────────────────────────────────────
    // 5. SCROLL PROGRESS BAR (garis emas tipis di atas)
    // ─────────────────────────────────────────────────────────────
    function initScrollProgress() {
        // Sembunyikan saat cover masih tampil
        var cover = document.getElementById("cover");
        if (cover && !cover.classList.contains("hidden")) return;

        var bar = document.createElement("div");
        bar.id = "scroll-progress-bar";
        bar.setAttribute("aria-hidden", "true");
        Object.assign(bar.style, {
            position: "fixed",
            top: "0",
            left: "0",
            height: "2px",
            width: "0%",
            background: "linear-gradient(90deg, #B69B6B, #D4B896, #B69B6B)",
            zIndex: "99998",
            pointerEvents: "none",
        });
        document.body.appendChild(bar);

        function update(scrollY) {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            var pct = max > 0 ? Math.min((scrollY / max) * 100, 100) : 0;
            bar.style.width = pct + "%";
        }

        if (lenis) {
            lenis.on("scroll", function(e) { update(e.scroll); });
        } else {
            window.addEventListener("scroll", function() { update(window.scrollY); }, { passive: true });
        }
    }

    // ─────────────────────────────────────────────────────────────
    // BOOT
    // ─────────────────────────────────────────────────────────────
    function boot() {
        initLenis();
        initCoverEntrance();
        waitForCoverClose();   // Scroll reveal aktif setelah cover tutup

        // Progress bar: tampilkan setelah cover tutup
        var cover = document.getElementById("cover");
        if (cover) {
            new MutationObserver(function(mutations) {
                mutations.forEach(function(m) {
                    if (m.attributeName === "class" && cover.classList.contains("hidden")) {
                        setTimeout(initScrollProgress, 800);
                    }
                });
            }).observe(cover, { attributes: true });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }

})();
