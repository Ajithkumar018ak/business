
/* =========================================================
   VANTAGE — STRATEGY & CONSULTING
   MAIN JAVASCRIPT
   Vanilla JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       01. PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");
    const preloaderFill = document.getElementById("preloaderFill");
    const preloaderPercentage = document.getElementById("preloaderPercentage");
    const preloaderStatus = document.getElementById("preloaderStatus");

    let loadingProgress = 0;

    const loadingMessages = [
        "Preparing your experience",
        "Building strategic perspectives",
        "Crafting digital excellence",
        "Almost ready"
    ];

    if (preloader) {

        const loadingInterval = setInterval(() => {

            loadingProgress += Math.floor(Math.random() * 5) + 2;

            if (loadingProgress >= 100) {
                loadingProgress = 100;
                clearInterval(loadingInterval);
            }

            if (preloaderFill) {
                preloaderFill.style.width = `${loadingProgress}%`;
            }

            if (preloaderPercentage) {
                preloaderPercentage.textContent = `${loadingProgress}%`;
            }

            if (preloaderStatus) {

                let messageIndex = 0;

                if (loadingProgress >= 75) {
                    messageIndex = 3;
                } else if (loadingProgress >= 50) {
                    messageIndex = 2;
                } else if (loadingProgress >= 25) {
                    messageIndex = 1;
                }

                preloaderStatus.textContent = loadingMessages[messageIndex];
            }

            if (loadingProgress === 100) {

                setTimeout(() => {

                    preloader.classList.add("is-hidden");

                    document.body.classList.remove("loading");

                    setTimeout(() => {
                        preloader.remove();
                    }, 1200);

                }, 500);

            }

        }, 65);

    }


    /* =====================================================
       02. CUSTOM CURSOR
    ===================================================== */

    const customCursor = document.getElementById("customCursor");
    const cursorOutline = document.getElementById("cursorOutline");

    if (
        customCursor &&
        cursorOutline &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });

        function animateCursor() {

            cursorX += (mouseX - cursorX) * 0.18;
            cursorY += (mouseY - cursorY) * 0.18;

            customCursor.style.left = `${mouseX}px`;
            customCursor.style.top = `${mouseY}px`;

            cursorOutline.style.left = `${cursorX}px`;
            cursorOutline.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, select, .expertise-card, .industry-item"
        );

        interactiveElements.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });

        });

    }


    /* =====================================================
       03. HEADER SCROLL EFFECT
    ===================================================== */

    const siteHeader = document.getElementById("siteHeader");

    function updateHeader() {

        if (!siteHeader) return;

        if (window.scrollY > 50) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, { passive: true });

    updateHeader();


    /* =====================================================
       04. SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        document.documentElement.style.setProperty(
            "--scroll-progress",
            `${progress}%`
        );

    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    updateScrollProgress();


    /* =====================================================
       05. MOBILE NAVIGATION DRAWER
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const drawerClose = document.getElementById("drawerClose");

    function openDrawer() {

        if (!mobileDrawer || !mobileOverlay) return;

        mobileDrawer.classList.add("active");
        mobileOverlay.classList.add("active");

        document.body.classList.add("drawer-open");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "true");
        }

    }

    function closeDrawer() {

        if (!mobileDrawer || !mobileOverlay) return;

        mobileDrawer.classList.remove("active");
        mobileOverlay.classList.remove("active");

        document.body.classList.remove("drawer-open");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }

    }

    if (menuToggle) {
        menuToggle.addEventListener("click", openDrawer);
    }

    if (drawerClose) {
        drawerClose.addEventListener("click", closeDrawer);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", closeDrawer);
    }

    if (mobileDrawer) {

        mobileDrawer.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", closeDrawer);

        });

    }


    /* =====================================================
       06. LOGIN MODAL
    ===================================================== */

    const loginModal = document.getElementById("loginModal");

    const loginTriggers = document.querySelectorAll(
        "[data-open-login], .login-trigger, .drawer-login"
    );

    const loginCloseButtons = document.querySelectorAll(
        "[data-close-login]"
    );

    function openLoginModal() {

        if (!loginModal) return;

        closeDrawer();

        loginModal.classList.add("active");

        document.body.classList.add("modal-open");

    }

    function closeLoginModal() {

        if (!loginModal) return;

        loginModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }

    loginTriggers.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            openLoginModal();

        });

    });

    loginCloseButtons.forEach((button) => {

        button.addEventListener("click", closeLoginModal);

    });

    const loginBackdrop = loginModal?.querySelector(".login-backdrop");

    if (loginBackdrop) {
        loginBackdrop.addEventListener("click", closeLoginModal);
    }


    /* =====================================================
       07. LOGIN TABS — USER / ADMIN
    ===================================================== */

    const loginTabs = document.querySelectorAll(".login-tab");

    const loginForms = document.querySelectorAll("[data-login-form]");

    loginTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const selectedType = tab.dataset.loginType;

            loginTabs.forEach((item) => {
                item.classList.remove("active");
                item.setAttribute("aria-selected", "false");
            });

            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");

            loginForms.forEach((form) => {

                const formType = form.dataset.loginForm;

                form.classList.toggle(
                    "active",
                    formType === selectedType
                );

            });

        });

    });


    /* =====================================================
       08. PASSWORD SHOW / HIDE
    ===================================================== */

    const passwordToggles = document.querySelectorAll(".password-toggle");

    passwordToggles.forEach((toggle) => {

        toggle.addEventListener("click", () => {

            const inputWrap = toggle.closest(".input-wrap");

            const passwordInput = inputWrap?.querySelector("input");

            if (!passwordInput) return;

            const isPassword = passwordInput.type === "password";

            passwordInput.type = isPassword ? "text" : "password";

            const icon = toggle.querySelector("i");

            if (icon) {

                icon.classList.toggle("fa-eye", !isPassword);
                icon.classList.toggle("fa-eye-slash", isPassword);

            }

            toggle.setAttribute(
                "aria-label",
                isPassword ? "Hide password" : "Show password"
            );

        });

    });


    /* =====================================================
       09. LOGIN FORM VALIDATION
    ===================================================== */

    const loginFormElements = document.querySelectorAll(".login-form");

    loginFormElements.forEach((form) => {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            if (!form.checkValidity()) {

                form.reportValidity();

                return;

            }

            const submitButton = form.querySelector(".login-submit");

            if (submitButton) {

                const originalText = submitButton.innerHTML;

                submitButton.innerHTML =
                    '<i class="fa-solid fa-circle-check"></i> Demo Submitted';

                submitButton.disabled = true;

                setTimeout(() => {

                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;

                }, 1800);

            }

            /*
              Frontend demo only.
              Real login authentication requires a secure backend.
            */

        });

    });


    /* =====================================================
       10. HERO CAROUSEL
    ===================================================== */

    const heroSection = document.getElementById("homeHero");

    const heroHeading = document.getElementById("heroHeading");
    const heroDescription = document.getElementById("heroDescription");

    const heroCategory = document.getElementById("heroCategory");

    const heroImageStage = document.getElementById("heroImageStage");

    const currentSlide = document.getElementById("currentSlide");

    const heroImageTitle = document.getElementById("heroImageTitle");

    const heroStat = document.getElementById("heroStat");

    const heroNumber = document.getElementById("heroNumber");

    const heroRightLabel = document.getElementById("heroRightLabel");
    const heroRightTitle = document.getElementById("heroRightTitle");
    const heroRightDescription = document.getElementById(
        "heroRightDescription"
    );

    const heroDots = document.querySelectorAll(".hero-dot");

    const heroPrev = document.getElementById("heroPrev");
    const heroNext = document.getElementById("heroNext");


    const heroSlides = [

        {
            category: "STRATEGY & TRANSFORMATION",

            heading: "Build a vision.<br>Shape the <span>future.</span>",

            description:
                "We help ambitious organizations turn complex challenges into meaningful opportunities through strategic thinking and purposeful execution.",

            image: "assets/images/hero.jpg",

            imageTitle: "Strategic Thinking",

            stat: "01",

            number: "01",

            rightLabel: "OUR PERSPECTIVE",

            rightTitle: "Think beyond<br>the ordinary.",

            rightDescription:
                "A clearer vision creates stronger possibilities."

        },

        {
            category: "BUSINESS EXCELLENCE",

            heading: "Move forward.<br>Lead with <span>purpose.</span>",

            description:
                "Discover new possibilities, strengthen your business foundations and create sustainable value with a team that thinks differently.",

            image: "assets/images/hero-02.jpg",

            imageTitle: "Business Excellence",

            stat: "02",

            number: "02",

            rightLabel: "OUR APPROACH",

            rightTitle: "Progress with<br>confidence.",

            rightDescription:
                "Turn meaningful ideas into measurable outcomes."

        },

        {
            category: "DIGITAL INNOVATION",

            heading: "Create impact.<br>Make it <span>lasting.</span>",

            description:
                "We combine insight, innovation and execution to help businesses navigate change and build a stronger tomorrow.",

            image: "assets/images/hero-03.jpg",

            imageTitle: "Digital Innovation",

            stat: "03",

            number: "03",

            rightLabel: "OUR COMMITMENT",

            rightTitle: "Designed for<br>what's next.",

            rightDescription:
                "Build capabilities that move your organization forward."

        }

    ];


    let activeSlide = 0;
    let heroAutoplay = null;


    function showHeroSlide(index) {

        if (!heroHeading || !heroSlides.length) return;

        activeSlide = (index + heroSlides.length) % heroSlides.length;

        const slide = heroSlides[activeSlide];

        heroHeading.innerHTML = slide.heading;

        if (heroCategory) {
            heroCategory.textContent = slide.category;
        }

        if (heroDescription) {
            heroDescription.textContent = slide.description;
        }

        if (heroImageTitle) {
            heroImageTitle.textContent = slide.imageTitle;
        }

        if (heroStat) {
            heroStat.textContent = slide.stat;
        }

        if (currentSlide) {
            currentSlide.textContent = String(activeSlide + 1).padStart(2, "0");
        }

        if (heroNumber) {
            heroNumber.textContent = slide.number;
        }

        if (heroRightLabel) {
            heroRightLabel.textContent = slide.rightLabel;
        }

        if (heroRightTitle) {
            heroRightTitle.innerHTML = slide.rightTitle;
        }

        if (heroRightDescription) {
            heroRightDescription.textContent = slide.rightDescription;
        }


        /* Update hero image */

        if (heroImageStage) {

            let heroImage = heroImageStage.querySelector("img");

            if (!heroImage) {

                heroImage = document.createElement("img");

                heroImage.alt = slide.imageTitle;

                heroImageStage.prepend(heroImage);

            }

            heroImage.style.opacity = "0";

            setTimeout(() => {

                heroImage.src = slide.image;
                heroImage.alt = slide.imageTitle;

                heroImage.onload = () => {
                    heroImage.style.opacity = "1";
                };

                heroImage.onerror = () => {
                    heroImage.style.opacity = "1";
                };

            }, 200);

        }


        /* Update dots */

        heroDots.forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === activeSlide
            );

            dot.setAttribute(
                "aria-current",
                dotIndex === activeSlide ? "true" : "false"
            );

        });

    }


    function nextHeroSlide() {
        showHeroSlide(activeSlide + 1);
    }

    function previousHeroSlide() {
        showHeroSlide(activeSlide - 1);
    }


    function startHeroAutoplay() {

        stopHeroAutoplay();

        heroAutoplay = setInterval(() => {

            nextHeroSlide();

        }, 5500);

    }


    function stopHeroAutoplay() {

        if (heroAutoplay) {
            clearInterval(heroAutoplay);
            heroAutoplay = null;
        }

    }


    if (heroNext) {

        heroNext.addEventListener("click", () => {

            nextHeroSlide();
            startHeroAutoplay();

        });

    }


    if (heroPrev) {

        heroPrev.addEventListener("click", () => {

            previousHeroSlide();
            startHeroAutoplay();

        });

    }


    heroDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showHeroSlide(index);
            startHeroAutoplay();

        });

    });


    if (heroSection && heroSlides.length) {

        showHeroSlide(0);

        startHeroAutoplay();

        heroSection.addEventListener("mouseenter", stopHeroAutoplay);

        heroSection.addEventListener("mouseleave", startHeroAutoplay);

    }


    /* =====================================================
       11. SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal-left, .reveal-right, .reveal-up, .image-reveal"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    /* =====================================================
       12. STAGGERED CARD ANIMATIONS
    ===================================================== */

    const staggerGroups = document.querySelectorAll(
        ".expertise-grid, .industries-grid, .insights-grid, .approach-steps"
    );

    staggerGroups.forEach((group) => {

        const cards = group.children;

        Array.from(cards).forEach((card, index) => {

            card.style.transitionDelay = `${index * 90}ms`;

        });

    });


    /* =====================================================
       13. ANIMATED COUNTERS
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target = parseFloat(counter.dataset.target);

        if (Number.isNaN(target)) return;

        const duration = 1800;

        const startTime = performance.now();

        const decimalPlaces =
            String(counter.dataset.target).includes(".") ? 1 : 0;


        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = 1 - Math.pow(1 - progress, 4);

            const currentValue = target * easedProgress;

            counter.textContent = currentValue.toFixed(decimalPlaces);

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target.toFixed(decimalPlaces);

            }

        }

        requestAnimationFrame(updateCounter);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


        counters.forEach((counter) => {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach((counter) => {

            const target = Number(counter.dataset.target);

            if (!Number.isNaN(target)) {
                counter.textContent = target;
            }

        });

    }


    /* =====================================================
       14. SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = siteHeader
                ? siteHeader.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       15. IMAGE LOADING EFFECT
    ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        if (image.complete) {
            image.classList.add("image-loaded");
        } else {

            image.addEventListener("load", () => {
                image.classList.add("image-loaded");
            });

            image.addEventListener("error", () => {
                image.classList.add("image-error");
            });

        }

    });


    /* =====================================================
       16. KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeDrawer();
            closeLoginModal();

        }

        if (
            event.key === "ArrowRight" &&
            !loginModal?.classList.contains("active")
        ) {

            nextHeroSlide();

        }

        if (
            event.key === "ArrowLeft" &&
            !loginModal?.classList.contains("active")
        ) {

            previousHeroSlide();

        }

    });


    /* =====================================================
       17. PREVENT EMPTY LINKS
    ===================================================== */

    document.querySelectorAll('a[href="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            if (
                link.hasAttribute("data-open-login") ||
                link.classList.contains("login-trigger") ||
                link.classList.contains("drawer-login")
            ) {
                return;
            }

            event.preventDefault();

        });

    });


    /* =====================================================
       18. FOOTER CURRENT YEAR
    ===================================================== */

    const currentYearElements = document.querySelectorAll(".current-year");

    currentYearElements.forEach((element) => {

        element.textContent = new Date().getFullYear();

    });


    /* =====================================================
       19. PAGE READY
    ===================================================== */

    document.body.classList.add("page-ready");

    console.log(
        "%c VANTAGE ",
        "background:#172d27;color:#d8bd83;padding:10px 18px;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%c Strategy. Perspective. Progress.",
        "color:#a88b55;font-size:12px;letter-spacing:2px;"
    );

});












/* =====================================================
   20. VISUAL SHOWCASE CAROUSEL
===================================================== */

const showcaseTrack = document.getElementById("showcaseTrack");
const showcasePrev = document.getElementById("showcasePrev");
const showcaseNext = document.getElementById("showcaseNext");
const showcaseCurrent = document.getElementById("showcaseCurrent");

if (showcaseTrack) {

    const showcaseSlides = Array.from(
        showcaseTrack.querySelectorAll(".showcase-slide")
    );

    let showcaseIndex = 0;

    function getShowcaseVisibleCount() {

        if (window.innerWidth <= 768) return 1;

        if (window.innerWidth <= 1024) return 2;

        return 3;

    }

    function updateShowcase() {

        const visibleCount = getShowcaseVisibleCount();

        const maxIndex = Math.max(
            0,
            showcaseSlides.length - visibleCount
        );

        showcaseIndex = Math.min(showcaseIndex, maxIndex);

        const slideWidth = showcaseSlides[0].getBoundingClientRect().width;

        const gap = parseFloat(
            getComputedStyle(showcaseTrack).gap
        ) || 0;

        showcaseTrack.style.transform =
            `translateX(-${showcaseIndex * (slideWidth + gap)}px)`;

        if (showcaseCurrent) {

            showcaseCurrent.textContent = String(
                showcaseIndex + 1
            ).padStart(2, "0");

        }

        if (showcasePrev) {
            showcasePrev.disabled = showcaseIndex === 0;
        }

        if (showcaseNext) {
            showcaseNext.disabled = showcaseIndex >= maxIndex;
        }

    }

    showcaseNext?.addEventListener("click", () => {

        const maxIndex = Math.max(
            0,
            showcaseSlides.length - getShowcaseVisibleCount()
        );

        showcaseIndex = showcaseIndex >= maxIndex
            ? 0
            : showcaseIndex + 1;

        updateShowcase();

    });

    showcasePrev?.addEventListener("click", () => {

        const maxIndex = Math.max(
            0,
            showcaseSlides.length - getShowcaseVisibleCount()
        );

        showcaseIndex = showcaseIndex <= 0
            ? maxIndex
            : showcaseIndex - 1;

        updateShowcase();

    });

    window.addEventListener("resize", updateShowcase);

    updateShowcase();

}


/* =====================================================
   21. TESTIMONIAL CAROUSEL
===================================================== */

const testimonialTrack = document.getElementById("testimonialTrack");

const testimonialPrev = document.getElementById("testimonialPrev");

const testimonialNext = document.getElementById("testimonialNext");

const testimonialDots = document.querySelectorAll(".testimonial-dot");

if (testimonialTrack) {

    const testimonialCards = Array.from(
        testimonialTrack.querySelectorAll(".testimonial-card")
    );

    let testimonialIndex = 0;

    let testimonialTimer;


    function updateTestimonials() {

        testimonialTrack.style.transform =
            `translateX(-${testimonialIndex * 100}%)`;

        testimonialDots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === testimonialIndex
            );

        });

        testimonialCards.forEach((card, index) => {

            card.classList.toggle(
                "active",
                index === testimonialIndex
            );

        });

    }


    function nextTestimonial() {

        testimonialIndex =
            (testimonialIndex + 1) % testimonialCards.length;

        updateTestimonials();

    }


    function previousTestimonial() {

        testimonialIndex =
            (testimonialIndex - 1 + testimonialCards.length) %
            testimonialCards.length;

        updateTestimonials();

    }


    function startTestimonialAutoplay() {

        stopTestimonialAutoplay();

        testimonialTimer = setInterval(
            nextTestimonial,
            6000
        );

    }


    function stopTestimonialAutoplay() {

        clearInterval(testimonialTimer);

    }


    testimonialNext?.addEventListener("click", () => {

        nextTestimonial();

        startTestimonialAutoplay();

    });


    testimonialPrev?.addEventListener("click", () => {

        previousTestimonial();

        startTestimonialAutoplay();

    });


    testimonialDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            testimonialIndex = index;

            updateTestimonials();

            startTestimonialAutoplay();

        });

    });


    testimonialTrack.addEventListener(
        "mouseenter",
        stopTestimonialAutoplay
    );

    testimonialTrack.addEventListener(
        "mouseleave",
        startTestimonialAutoplay
    );


    updateTestimonials();

    startTestimonialAutoplay();

}












/* =========================================================
   VANTAGE ABOUT PAGE — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       IMPACT COUNTER ANIMATION
    ========================================= */

    const counters = document.querySelectorAll(".impact-counter");

    const counterObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = counter.dataset.target;

            if (target === "∞") {
                counter.textContent = "∞";
                observer.unobserve(counter);
                return;
            }

            const targetNumber = Number(target);

            if (!Number.isFinite(targetNumber)) return;

            const duration = 1600;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const eased = 1 - Math.pow(1 - progress, 4);

                const value = Math.floor(targetNumber * eased);

                counter.textContent = targetNumber === 1
                    ? String(value).padStart(2, "0")
                    : value;

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = targetNumber === 1
                        ? "01"
                        : targetNumber;

                }

            }

            requestAnimationFrame(updateCounter);

            observer.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    document.querySelectorAll('.about-page a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(event) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


});