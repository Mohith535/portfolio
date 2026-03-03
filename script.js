// ==================== script.js ====================
document.addEventListener('DOMContentLoaded', function () {

    // --- Initialize AOS ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // ============================================
    // LANGUAGE SELECTOR (Google Translate Integration)
    // ============================================
    (function setupLanguageSelector() {
        const langToggle = document.getElementById('lang-toggle');
        const langDropdown = document.getElementById('lang-dropdown');
        const langOptions = document.querySelectorAll('.lang-option');
        const currentLangText = document.getElementById('current-lang');

        if (!langToggle || !langDropdown || !currentLangText) {
            return;
        }

        // Language code mapping for Google Translate
        const langCodeMap = {
            'ta': 'ta', 'te': 'te', 'ml': 'ml', 'kn': 'kn',
            'hi': 'hi', 'es': 'es', 'fr': 'fr', 'de': 'de',
            'zh-CN': 'zh-CN', 'en': 'en'
        };

        // Toggle dropdown
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
            const icon = langToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target) && !langToggle.contains(e.target)) {
                langDropdown.classList.remove('active');
                const icon = langToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-chevron-down');
                    icon.classList.remove('fa-chevron-up');
                }
            }
        });

        // Function to trigger Google Translate
        function triggerGoogleTranslate(langCode) {
            // If English, clear cookies and reload to restore original
            if (langCode === 'en') {
                document.cookie = "googtrans=/en/en; path=/; domain=" + window.location.hostname;
                document.cookie = "googtrans=/en/en; path=/";
                location.reload();
                return;
            }

            // Find the hidden Google Translate select element
            const selectElement = document.querySelector('.goog-te-combo');

            if (selectElement) {
                // Set the value
                selectElement.value = langCode;
                // Dispatch event to trigger translation
                selectElement.dispatchEvent(new Event('change'));

                // Also set the cookie just in case for persistence
                document.cookie = "googtrans=/en/" + langCode + "; path=/; domain=" + window.location.hostname;
                document.cookie = "googtrans=/en/" + langCode + "; path=/";
            } else {
                // Fallback: If widget hasn't loaded yet, set cookie and reload
                document.cookie = "googtrans=/en/" + langCode + "; path=/; domain=" + window.location.hostname;
                document.cookie = "googtrans=/en/" + langCode + "; path=/";
                location.reload();
            }
        }

        // Update checkmarks
        function updateCheckmarks(activeLangCode) {
            langOptions.forEach(opt => {
                const checkIcon = opt.querySelector('.check-icon');
                if (checkIcon) {
                    if (opt.getAttribute('data-lang') === activeLangCode) {
                        checkIcon.classList.remove('hidden');
                    } else {
                        checkIcon.classList.add('hidden');
                    }
                }
            });
        }

        // Get current language from cookie
        function getCurrentLanguage() {
            const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
            return match ? match[1] : 'en';
        }

        // Update UI Text
        function updateUIText(lang) {
            const labelMap = {
                'en': 'ENG', 'ta': 'TAM', 'te': 'TEL', 'ml': 'MAL',
                'kn': 'KAN', 'hi': 'HIN', 'es': 'ESP', 'fr': 'FRA',
                'de': 'DEU', 'zh-CN': 'CHN'
            };
            currentLangText.textContent = labelMap[lang] || 'ENG';
            updateCheckmarks(lang);
        }

        // Set initial UI state
        const currentLang = getCurrentLanguage();
        updateUIText(currentLang);

        // Attach click handlers
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const langCode = option.getAttribute('data-lang');

                // Update UI immediately
                updateUIText(langCode);

                // Close dropdown
                langDropdown.classList.remove('active');
                const icon = langToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-chevron-down');
                    icon.classList.remove('fa-chevron-up');
                }

                // Trigger translation
                triggerGoogleTranslate(langCode);
            });
        });

    })();

    // ============================================
    // REST OF YOUR UI FEATURES
    // ============================================

    // --- Particles.js ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00D4FF" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": false },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00D4FF", "opacity": 0.15, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } } }
            },
            "retina_detect": true
        });
    }

    // --- Rotating Text ---
    const rotatingText = document.getElementById('rotating-text');
    if (rotatingText) {
        const phrases = [
            "Open for AI Internships",
            "Open to Startup Collaboration",
            "Hackathon Teammate",
            "Building AI for Bharat \uD83C\uDDEE\uD83C\uDDF3"
        ];
        let phraseIndex = 0;

        rotatingText.style.transition = "opacity 0.5s ease";

        function rotateText() {
            rotatingText.style.opacity = 0;
            setTimeout(() => {
                rotatingText.textContent = phrases[phraseIndex];
                rotatingText.style.opacity = 1;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }, 500);
        }

        rotateText();
        setInterval(rotateText, 3000);
    }

    // --- Scroll Progress & Navbar ---
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        if (scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";
        }
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
            document.body.classList.toggle('overflow-hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                const icon = menuBtn?.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // --- Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function setTheme(isLight) {
        if (isLight) {
            body.classList.add('light-mode');
            if (themeToggle) themeToggle.querySelector('i').className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            if (themeToggle) themeToggle.querySelector('i').className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setTheme(true);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTheme(!body.classList.contains('light-mode'));
        });
    }

    // --- Command Palette (Ctrl+K) ---
    const palette = document.getElementById('command-palette');
    const cmdInput = document.getElementById('cmd-input');
    const cmdItems = document.querySelectorAll('.cmd-item');

    if (palette) {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                palette.classList.toggle('hidden');
                palette.classList.toggle('flex');
                if (!palette.classList.contains('hidden') && cmdInput) {
                    cmdInput.focus();
                }
            }
            if (e.key === 'Escape' && !palette.classList.contains('hidden')) {
                palette.classList.add('hidden');
                palette.classList.remove('flex');
            }
        });

        cmdItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.getAttribute('data-target');
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    palette.classList.add('hidden');
                    palette.classList.remove('flex');
                    if (cmdInput) cmdInput.value = '';
                }
            });
        });
    }

    // --- EmailJS Contact Form ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm && typeof emailjs !== 'undefined') {
        emailjs.init("S0nB3ZKrklbEVDggT");

        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnSpinner = document.getElementById('btn-spinner');
        const toastNotification = document.getElementById('toast-notification');
        const toastIcon = document.getElementById('toast-icon');
        const toastMessage = document.getElementById('toast-message');

        function showToast(message, isSuccess) {
            if (!toastNotification || !toastMessage || !toastIcon) return;

            toastMessage.textContent = message;
            toastIcon.className = isSuccess ? 'fas fa-check-circle text-green-400' : 'fas fa-times-circle text-red-500';
            if (isSuccess) {
                toastNotification.style.border = '1px solid rgba(74, 222, 128, 0.3)';
            } else {
                toastNotification.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            }

            toastNotification.classList.add('show');

            setTimeout(() => {
                toastNotification.classList.remove('show');
            }, 3000);
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const from_name = document.getElementById('from_name')?.value;
            const subject = document.getElementById('subject')?.value;
            const message = document.getElementById('message')?.value;

            if (!from_name || !subject || !message) {
                showToast('Please fill all fields', false);
                return;
            }

            if (submitBtn && btnText && btnSpinner) {
                submitBtn.disabled = true;
                btnText.textContent = 'Sending...';
                btnSpinner.classList.remove('hidden');
            }

            emailjs.send("service_gktuwsk", "template_rzlkqm9", {
                from_name: from_name,
                subject: subject,
                message: message
            })
                .then(() => {
                    showToast('Message sent successfully \uD83D\uDE80', true);
                    contactForm.reset();
                })
                .catch((error) => {
                    showToast('Failed to send message. Please try again.', false);
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    if (submitBtn && btnText && btnSpinner) {
                        submitBtn.disabled = false;
                        btnText.textContent = 'FIRE MESSAGE \uD83D\uDE80';
                        btnSpinner.classList.add('hidden');
                    }
                });
        });
    }

    // ============================================
    // TIMELINE INTERACTION LOGIC
    // ============================================

    // Timeline Panel Toggle
    window.toggleTimelinePanel = function (panelId) {
        const panel = document.getElementById(panelId);
        const iconId = panelId.replace('panel-', 'icon-');
        const icon = document.getElementById(iconId);
        const card = panel.closest('.timeline-card');

        // Check if panel is currently expanded
        const isExpanded = panel.style.maxHeight && panel.style.maxHeight !== '0px';

        if (isExpanded) {
            // Collapse
            panel.style.maxHeight = '0px';
            panel.style.opacity = '0';
            panel.classList.remove('mt-6');
            if (icon) icon.style.transform = 'rotate(0deg)';
            if (card) card.classList.remove('active-phase', 'shadow-[0_0_15px_rgba(0,212,255,0.15)]', 'border-[#00D4FF]/30');
        } else {
            // Expand - Use large max-height for transition but allow auto-expansion
            panel.style.maxHeight = 'none';
            panel.style.opacity = '1';
            panel.classList.add('mt-6');
            if (icon) icon.style.transform = 'rotate(180deg)';

            // Highlight active phase
            if (card) {
                document.querySelectorAll('.timeline-card').forEach(c => {
                    c.classList.remove('active-phase', 'shadow-[0_0_15px_rgba(0,212,255,0.15)]', 'border-[#00D4FF]/30');
                });
                card.classList.add('active-phase', 'shadow-[0_0_15px_rgba(0,212,255,0.15)]', 'border-[#00D4FF]/30');
            }

            if (panelId === 'panel-phase2') {
                setTimeout(() => {
                    if (typeof renderCertificates === 'function') {
                        renderCertificates();
                    }
                }, 100);
            }
        }
    };

    // Phase 1: Toggle Story Expansion
    window.toggleStory = function (event, storyId) {
        event.stopPropagation(); // Prevent triggering the panel toggle
        const storyDiv = document.getElementById(storyId);
        const btn = event.currentTarget;
        const icon = btn.querySelector('i');

        if (storyDiv.classList.contains('hidden')) {
            storyDiv.classList.remove('hidden');
            storyDiv.classList.add('block');
            btn.innerHTML = '[ Collapse Journey ] <i class="fas fa-arrow-up ml-2 text-[10px]"></i>';

            // Update parent panel max-height (REMOVED)
        } else {
            storyDiv.classList.add('hidden');
            storyDiv.classList.remove('block');
            btn.innerHTML = '[ Read Full Journey ] <i class="fas fa-arrow-right ml-2 text-[10px]"></i>';

            // Optionally adjust height back down (not strictly necessary as max-height can be large, but clean)
        }
    };

    // Phase 2: Tabbed Interface Logic
    const phase2Tabs = document.querySelectorAll('.phase2-tab');
    if (phase2Tabs.length > 0) {
        phase2Tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent panel toggle

                // Remove active styling from all tabs
                phase2Tabs.forEach(t => {
                    t.classList.remove('active-tab', 'text-[#00D4FF]', 'border-[#00D4FF]');
                    t.classList.add('text-gray-500', 'border-transparent');
                });

                // Add active styling to clicked tab
                tab.classList.add('active-tab', 'text-[#00D4FF]', 'border-[#00D4FF]');
                tab.classList.remove('text-gray-500', 'border-transparent');

                // Hide all tab contents
                const allTabContents = tab.closest('.timeline-card').querySelectorAll('.tab-content');
                allTabContents.forEach(content => {
                    content.classList.remove('opacity-100');
                    content.classList.add('opacity-0');

                    // Wait for fade out to hide
                    setTimeout(() => {
                        content.classList.add('hidden');
                    }, 150);
                });

                // Show targeted tab content after slight delay for fade transition
                const targetId = tab.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);

                if (targetContent) {
                    setTimeout(() => {
                        allTabContents.forEach(c => c.classList.remove('active'));
                        targetContent.classList.remove('hidden');
                        targetContent.classList.add('active');

                        // If it's the certifications tab, we force a render now that constraints are visible
                        if (targetId === 'tab-certifications') {
                            renderCertificates();
                        }

                        // Use a tiny timeout to allow display block to process before opacity transition
                        setTimeout(() => {
                            targetContent.classList.remove('opacity-0');
                            targetContent.classList.add('opacity-100');

                            // Recalculate parent panel height for dynamic content
                            const panel = document.getElementById('panel-phase2');
                            if (panel && panel.classList.contains('active')) {
                                panel.style.maxHeight = "5000px";
                            }

                            adjustTabHeight();
                        }, 50);
                    }, 150);
                }
            });
        });
    }

    // Photo Gallery Modal Logic

    // Photo Gallery Modal Logic
    const galleryModal = document.getElementById('gallery-modal');
    window.openGalleryModal = function (imageDesc) {
        if (!galleryModal) return;

        const descElem = document.getElementById('modal-description');
        if (descElem) descElem.textContent = imageDesc;

        galleryModal.classList.remove('hidden');
        galleryModal.classList.add('flex');

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';

        // Trigger fade in
        setTimeout(() => {
            galleryModal.classList.add('show');
        }, 10);
    };

    window.closeGalleryModal = function () {
        if (!galleryModal) return;

        galleryModal.classList.remove('show');

        setTimeout(() => {
            galleryModal.classList.add('hidden');
            galleryModal.classList.remove('flex');
            document.body.style.overflow = ''; // Restore scrolling
        }, 300); // Wait for transition
    };

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('show')) {
            closeGalleryModal();
        }
    });

    // ============================================
    // CERTIFICATION VAULT SYSTEM
    // ============================================
    const certifications = [
        { title: "BCG GenAI Job Simulation", issuer: "BCG – Forage", date: "Feb 6, 2026", category: "AI", file: "certifications/BCG's GenAI on Forage feb 6.jpg", type: "image" },
        { title: "Critical Thinking in AI", issuer: "HP", date: "Feb 2026", category: "AI", file: "certifications/Critical Thinking in the AI Era from hp feb 2026.jpg", type: "image" },
        { title: "Deloitte Data Analytics", issuer: "Deloitte – Forage", date: "Feb 3, 2026", category: "AI", file: "certifications/Deloitte data anali 2026 fed 3.jpg", type: "image" },
        { title: "Tata GenAI Data Analytics", issuer: "Tata", date: "Feb 9, 2026", category: "AI", file: "certifications/tata GenAI powered Data Analytics Job Simulation feb 9 2026.jpg", type: "image" },
        { title: "Outskill GenAI Mastermind", issuer: "Outskill", date: "2026", category: "AI", file: "certifications/Outskill Generative AI Mastermind.jpg", type: "image" },
        { title: "SSA SkySkill Drone", issuer: "SSA", date: "Feb 13", category: "Workshops", file: "certifications/SSA skyyskill fed 13 drone.png", type: "image" },
        { title: "IBM LLM Certification", issuer: "IBM", date: "Feb 4, 2026", category: "AI", file: "certifications/ibm llm 2026 feb 4.PNG", type: "image" }
    ];

    const certFilters = document.querySelectorAll('.cert-filter-btn');
    const certTrack = document.getElementById('cert-track');
    const certModal = document.getElementById('cert-modal');
    const certModalBody = document.getElementById('cert-modal-body');
    const certModalTitle = document.getElementById('cert-modal-title');
    const closeCertModalBtn = document.getElementById('close-cert-modal');

    let currentCertIndex = 0;
    let filteredCerts = [...certifications];

    function renderCertificates() {
        if (!certTrack) return;

        certTrack.innerHTML = '';

        if (filteredCerts.length === 0) {
            certTrack.innerHTML = '<p class="text-gray-500 font-bold mt-10 w-full text-center">No certificates found in this category.</p>';
            return;
        }

        // Render Carousel Track
        filteredCerts.forEach((cert, index) => {
            const card = document.createElement('div');
            card.className = 'cert-card';

            const thumbHtml = cert.type === 'image'
                ? `<img src="${cert.file}" alt="${cert.title}" loading="lazy">`
                : `<i class="fas fa-file-pdf text-6xl text-red-500/80"></i>`;

            card.innerHTML = `
                <div class="cert-card-inner">
                    <div class="cert-image-wrapper">
                        ${thumbHtml}
                    </div>
                    <div class="cert-info">
                        <h5 class="text-sm font-bold text-white mb-1 truncate">${cert.title}</h5>
                        <p class="text-[10px] text-[#00D4FF] mb-2">${cert.issuer} • ${cert.date}</p>
                        <div class="flex gap-2">
                            <span class="badge text-[8px]">${cert.category}</span>
                        </div>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                openCertModal(cert);
            });

            certTrack.appendChild(card);
        });

        updateCarouselPositions();

        if (certTrack) certTrack.style.opacity = '1';
    }

    const certCarousel = document.getElementById('cert-carousel');
    let rotationDeg = 0;

    function updateActiveSlide() {
        const cards = certTrack ? certTrack.querySelectorAll('.cert-card') : [];
        const total = filteredCerts.length;
        if (total === 0) return;

        // Calculate current index based on rotationDeg
        // currentCertIndex = Math.round(-rotationDeg / theta) % total
        let theta = 360 / total;
        let normalizedRot = ((-rotationDeg % 360) + 360) % 360;
        let activeIndex = Math.round(normalizedRot / theta) % total;

        cards.forEach((card, i) => {
            card.classList.remove('active-slide');
            if (i === activeIndex) {
                card.classList.add('active-slide');
                card.style.opacity = "1";
            } else {
                card.style.opacity = "0.4"; // Visual depth
            }
        });
    }

    function updateCarouselPositions() {
        if (!certTrack || !certCarousel) return;
        const total = filteredCerts.length;
        if (total === 0) return;

        const containerWidth = certCarousel.offsetWidth;
        const cardWidth = Math.min(containerWidth * 0.8, 500);
        const theta = 360 / total;

        // Calculate radius for cylindrical layout
        // For 1 or 2 cards, we use a fixed radius to keep them visible
        let radius = total > 2
            ? (cardWidth / 2) / Math.tan(Math.PI / total)
            : cardWidth * 0.8;

        const cards = certTrack.querySelectorAll('.cert-card');
        cards.forEach((card, i) => {
            card.style.width = `${cardWidth}px`;
            card.style.transform = `rotateY(${i * theta}deg) translateZ(${radius}px)`;
        });

        certTrack.style.transform = `translateZ(${-radius}px) rotateY(${rotationDeg}deg)`;
        updateActiveSlide();
    }

    window.addEventListener("resize", updateCarouselPositions);

    // 3D Swipe Physics
    let isDragging = false;
    let startX = 0;
    let startRotation = 0;

    if (certTrack) {
        certTrack.addEventListener('pointerdown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startRotation = rotationDeg;
            certTrack.style.transition = "none";
            if (certTrack.setPointerCapture) certTrack.setPointerCapture(e.pointerId);
        });

        certTrack.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const delta = e.clientX - startX;
            // Sensitivity: adjust pixels to degrees
            const sensitivity = 0.2;
            rotationDeg = startRotation + (delta * sensitivity);

            // Apply current rotation
            const total = filteredCerts.length;
            const cardWidth = Math.min(certCarousel.offsetWidth * 0.8, 500);
            const radius = total > 2 ? (cardWidth / 2) / Math.tan(Math.PI / total) : cardWidth * 0.8;
            certTrack.style.transform = `translateZ(${-radius}px) rotateY(${rotationDeg}deg)`;
            updateActiveSlide();
        });

        certTrack.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            if (certTrack.releasePointerCapture) certTrack.releasePointerCapture(e.pointerId);

            certTrack.style.transition = "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)";

            // Snapping logic
            const total = filteredCerts.length;
            const theta = 360 / total;
            rotationDeg = Math.round(rotationDeg / theta) * theta;

            updateCarouselPositions();
        });

        certTrack.addEventListener('dragstart', (e) => e.preventDefault());
    }

    const certPrevBtn = document.getElementById('cert-prev');
    const certNextBtn = document.getElementById('cert-next');

    if (certPrevBtn) {
        certPrevBtn.addEventListener('click', () => {
            if (filteredCerts.length > 0) {
                const theta = 360 / filteredCerts.length;
                rotationDeg += theta;
                updateCarouselPositions();
            }
        });
    }

    if (certNextBtn) {
        certNextBtn.addEventListener('click', () => {
            if (filteredCerts.length > 0) {
                const theta = 360 / filteredCerts.length;
                rotationDeg -= theta;
                updateCarouselPositions();
            }
        });
    }

    // Modal Handling Logic
    function openCertModal(cert) {
        if (!certModal) return;
        certModalTitle.textContent = cert.title;

        if (cert.type === 'pdf') {
            certModalBody.innerHTML = `<div class="iframe-wrapper"><iframe src="${cert.file}#toolbar=0" title="${cert.title}"></iframe></div>`;
        } else {
            certModalBody.innerHTML = `<img src="${cert.file}" alt="${cert.title}" class="modal-image">`;
        }

        certModal.classList.remove('hidden');
        certModal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            certModal.classList.add('show');
        }, 10);
    }

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.remove('show');
        setTimeout(() => {
            certModal.classList.add('hidden');
            certModal.classList.remove('flex');
            certModalBody.innerHTML = '';
            // Only restore if gallery isn't open
            if (!document.getElementById('gallery-modal')?.classList.contains('show')) {
                document.body.style.overflow = '';
            }
        }, 300);
    }

    if (closeCertModalBtn) closeCertModalBtn.addEventListener('click', closeCertModal);

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) closeCertModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.classList.contains('show')) {
                closeCertModal();
            }
        });
    }

    certFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            certFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            if (filter === 'All') {
                filteredCerts = [...certifications];
            } else {
                filteredCerts = certifications.filter(c => c.category === filter);
            }

            currentCertIndex = 0;

            if (certTrack) {
                certTrack.style.transition = 'opacity 0.2s';
                certTrack.style.opacity = '0';
            }

            setTimeout(() => {
                renderCertificates();
                if (certTrack) certTrack.style.opacity = '1';
            }, 200);
        });
    });

    // Initial render setup
    if (certTrack) {
        renderCertificates();
    }

    // --- Console Easter Egg ---
    console.log("%c MOHITH KANNAN K | AI Portfolio v3.2 (with Google Translate & Upgraded Timeline) ", "background: #00D4FF; color: #fff; font-weight: bold; padding: 5px; border-radius: 5px;");

});