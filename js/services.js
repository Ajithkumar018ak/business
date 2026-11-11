
/* =====================================================
   VANTAGE — SERVICES PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const page = document.querySelector("main");

    if (!page) return;

    document.documentElement.classList.add("services-js");


    /* =================================================
       01. SCROLL REVEAL
    ================================================= */

    const revealElements = page.querySelectorAll(`
        .services-hero-content,
        .services-hero-visual,
        .service-overview-heading,
        .overview-service-card,
        .strategy-service-visual,
        .strategy-service-content,
        .digital-service-heading,
        .digital-feature-image,
        .digital-feature-item,
        .growth-service-top,
        .growth-card,
        .process-heading,
        .process-image,
        .process-step,
        .services-cta-container
    `);

    revealElements.forEach((element, index) => {

        element.classList.add("service-reveal");

        if (
            element.classList.contains("overview-service-card") ||
            element.classList.contains("digital-feature-item") ||
            element.classList.contains("growth-card") ||
            element.classList.contains("process-step")
        ) {
            element.style.setProperty(
                "--reveal-delay",
                `${(index % 5) * 100}ms`
            );
        }

    });


    /* =================================================
       02. INTERSECTION OBSERVER
    ================================================= */

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
    });


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =================================================
       03. HERO INTRO ANIMATION
    ================================================= */

    const hero = document.querySelector(".services-hero");

    if (hero) {

        window.requestAnimationFrame(() => {

            hero.classList.add("hero-loaded");

        });

    }


    /* =================================================
       04. IMAGE REVEAL
    ================================================= */

    const imageElements = page.querySelectorAll(`
        .services-visual-main,
        .strategy-image-main,
        .strategy-image-small,
        .digital-feature-image img,
        .process-image img
    `);

    const imageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("image-visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });


    imageElements.forEach(image => {
        image.classList.add("service-image-reveal");
        imageObserver.observe(image);
    });


    /* =================================================
       05. PROCESS TIMELINE ACTIVE STATE
    ================================================= */

    const processSteps = page.querySelectorAll(".process-step");

    if (processSteps.length) {

        const processObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    processSteps.forEach(step => {
                        step.classList.remove("active");
                    });

                    entry.target.classList.add("active");

                }

            });

        }, {
            threshold: 0.6
        });

        processSteps.forEach(step => {
            processObserver.observe(step);
        });

    }


    /* =================================================
       06. SMOOTH ANCHOR SCROLL
    ================================================= */

    const anchorLinks = page.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =================================================
       07. GROWTH CARD HOVER EFFECT
    ================================================= */

    const growthCards = page.querySelectorAll(".growth-card");

    growthCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("card-hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("card-hovered");
        });

    });


    /* =================================================
       08. SCROLL PROGRESS
       Works only if #scrollProgress exists
    ================================================= */

    const scrollProgress = document.querySelector("#scrollProgress");

    if (scrollProgress) {

        let ticking = false;

        const updateProgress = () => {

            const scrollTop = window.scrollY;

            const scrollHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const progress = scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

            scrollProgress.style.width = `${progress}%`;

            ticking = false;

        };

        window.addEventListener("scroll", () => {

            if (!ticking) {

                window.requestAnimationFrame(updateProgress);

                ticking = true;

            }

        }, { passive: true });

        updateProgress();

    }


    /* =================================================
       09. CLEANUP FALLBACK
    ================================================= */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

        imageElements.forEach(image => {
            image.classList.add("image-visible");
        });

    }

});
