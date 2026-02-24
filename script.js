// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
});

// Custom Language Dropdown Logic
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangText = document.getElementById('current-lang');

    // Toggle dropdown visibility
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
        const icon = langToggle.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langDropdown.contains(e.target) && !langToggle.contains(e.target)) {
            langDropdown.classList.remove('active');
            langToggle.querySelector('i').classList.add('fa-chevron-down');
            langToggle.querySelector('i').classList.remove('fa-chevron-up');
        }
    });

    // Initialize EmailJS
    emailjs.init("S0nB3ZKrklbEVDggT");

    // Programmatic language switch logic
    function setLanguage(lang) {
        const select = document.querySelector('.goog-te-combo');
        if (!select) {
            // Re-try after a delay in case google translate is still loading
            setTimeout(() => setLanguage(lang), 500);
            return;
        }

        select.value = lang;
        select.dispatchEvent(new Event('change'));

        localStorage.setItem('selectedLanguage', lang);

        // Update Label
        let shortText = "ENG";
        const labelMap = {
            'en': 'ENG', 'ta': 'TAM', 'te': 'TEL', 'ml': 'MAL',
            'kn': 'KAN', 'hi': 'HIN', 'es': 'ESP', 'fr': 'FRA',
            'de': 'DEU', 'zh-CN': 'CHN'
        };
        shortText = labelMap[lang] || 'ENG';
        if (currentLangText) currentLangText.textContent = shortText;

        updateCheckmarks(lang);
    }

    function updateCheckmarks(activeLangCode) {
        langOptions.forEach(opt => {
            const checkIcon = opt.querySelector('.check-icon');
            if (opt.getAttribute('data-lang') === activeLangCode) {
                checkIcon.classList.remove('hidden');
            } else {
                checkIcon.classList.add('hidden');
            }
        });
    }

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const langCode = option.getAttribute('data-lang');
            setLanguage(langCode);

            // Close dropdown
            langDropdown.classList.remove('active');
            langToggle.querySelector('i').classList.add('fa-chevron-down');
            langToggle.querySelector('i').classList.remove('fa-chevron-up');
        });
    });

    // On page load restore language
    window.addEventListener('load', () => {
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang && savedLang !== 'en') {
            setTimeout(() => {
                setLanguage(savedLang);
            }, 1000);
        }
    });
});


// Particles.js Configuration
// ... (rest of particles, AOS, rotating text, scroll, stats, mobile menu, dark mode, cmd palette) ...
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

// Rotating Text Animation
const rotatingText = document.getElementById('rotating-text');
const phrases = [
    "Open for AI Internships",
    "Open to Startup Collaboration",
    "Hackathon Teammate",
    "Building AI for Bharat 🇮🇳"
];
let phraseIndex = 0;

function rotateText() {
    if (!rotatingText) return;
    rotatingText.style.opacity = 0;
    setTimeout(() => {
        rotatingText.textContent = phrases[phraseIndex];
        rotatingText.style.opacity = 1;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }, 500);
}

if (rotatingText) {
    rotatingText.style.transition = "opacity 0.5s ease";
    rotateText();
    setInterval(rotateText, 3000);
}

// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + "%";
});

// Stats Counter Animation
const stats = document.querySelectorAll('[id^="stat-"]');
const observerOptions = { threshold: 0.5 };

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetText = target.innerText;

            // If target contains a number or is numeric, animate it
            const numericMatch = targetText.match(/\d+/);
            if (numericMatch) {
                const targetValue = parseInt(numericMatch[0]);
                let startValue = 0;
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * targetValue);
                    target.innerText = targetText.replace(/\d+/, current);
                    if (progress < 1) requestAnimationFrame(updateCounter);
                }
                requestAnimationFrame(updateCounter);
                statsObserver.unobserve(target);
            } else {
                // Not numeric, just show it
                target.style.opacity = 0;
                setTimeout(() => {
                    target.style.transition = "opacity 1s ease";
                    target.style.opacity = 1;
                }, 100);
                statsObserver.unobserve(target);
            }
        }
    });
}, observerOptions);

stats.forEach(stat => statsObserver.observe(stat));

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        document.body.classList.toggle('overflow-hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
            document.body.classList.remove('overflow-hidden');
        });
    });
}

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(isLight) {
    if (isLight) {
        body.classList.add('light-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        themeToggle.querySelector('i').className = 'fas fa-moon';
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

// Command Palette (Ctrl+K)
const palette = document.getElementById('command-palette');
const cmdInput = document.getElementById('cmd-input');
const cmdItems = document.querySelectorAll('.cmd-item');

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        palette.classList.toggle('hidden');
        palette.classList.toggle('flex');
        if (!palette.classList.contains('hidden')) cmdInput.focus();
    }
    if (e.key === 'Escape' && palette && !palette.classList.contains('hidden')) {
        palette.classList.add('hidden');
        palette.classList.remove('flex');
    }
});

if (cmdItems.length > 0) {
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

// EmailJS Contact Form
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const toastNotification = document.getElementById('toast-notification');
    const toastIcon = document.getElementById('toast-icon');
    const toastMessage = document.getElementById('toast-message');

    function showToast(message, isSuccess) {
        toastMessage.textContent = message;
        if (isSuccess) {
            toastIcon.className = 'fas fa-check-circle text-green-400';
            toastNotification.style.border = '1px solid rgba(74, 222, 128, 0.3)';
        } else {
            toastIcon.className = 'fas fa-times-circle text-red-500';
            toastNotification.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        }

        toastNotification.classList.add('show');

        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const from_name = document.getElementById('from_name').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Update UI to loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnSpinner.classList.remove('hidden');

            // Payload
            const templateParams = {
                from_name: from_name,
                subject: subject,
                message: message
            };

            // Send via EmailJS
            emailjs.send("service_gktuwsk", "template_rzlkqm9", templateParams)
                .then(function (response) {
                    // Success
                    showToast('Message sent successfully 🚀', true);
                    contactForm.reset();

                    // Reset UI
                    submitBtn.disabled = false;
                    btnText.textContent = 'FIRE MESSAGE 🚀';
                    btnSpinner.classList.add('hidden');
                }, function (error) {
                    // Error
                    showToast('Failed to send message. Please try again.', false);
                    console.error('EmailJS Error:', error);

                    // Reset UI
                    submitBtn.disabled = false;
                    btnText.textContent = 'FIRE MESSAGE 🚀';
                    btnSpinner.classList.add('hidden');
                });
        });
    }
});

// Console Easter Egg
console.log("%c MOHITH KANNAN K | AI Portfolio v3.2 (Custom UI) ", "background: #00D4FF; color: #fff; font-weight: bold; padding: 5px; border-radius: 5px;");
