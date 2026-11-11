
/* =====================================================
   VANTAGE — INDUSTRIES PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const page = document.querySelector(".industries-hero");

    if (!page) return;

    document.documentElement.classList.add("industries-js");


    /* =================================================
       01. HERO ENTRANCE
    ================================================= */

    requestAnimationFrame(() => {

        page.classList.add("hero-loaded");

    });


    /* =================================================
       02. SCROLL REVEAL ELEMENTS
    ================================================= */

    const revealGroups = [

        ".industry-intro-left",
        ".industry-intro-right",

        ".industry-grid-heading",
        ".industry-card",

        ".industry-expertise-visual",
        ".industry-expertise-content",

        ".industry-approach-heading",
        ".approach-card",

        ".industry-impact-top",
        ".impact-item",

        ".industries-cta-container"

    ];

    const revealElements = document.querySelectorAll(
        revealGroups.join(",")
    );


    revealElements.forEach((element) => {

        element.classList.add("industry-reveal");

    });


    /* =================================================
       03. STAGGERED ANIMATIONS
    ================================================= */

    const staggerGroups = [

        ".industry-card",
        ".approach-card",
        ".impact-item"

    ];

    staggerGroups.forEach((selector) => {

        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {

            element.style.setProperty(
                "--reveal-delay",
                `${(index % 4) * 110}ms`
            );

        });

    });


    /* =================================================
       04. IMAGE REVEAL PREPARATION
    ================================================= */

    const images = document.querySelectorAll(
        ".industry-card-image img, " +
        ".industry-expertise-visual img, " +
        ".industries-cta-image img"
    );

    images.forEach((img) => {

        img.addEventListener("load", () => {

            img.classList.add("image-loaded");

        }, { once: true });

        if (img.complete && img.naturalWidth > 0) {

            img.classList.add("image-loaded");

        }

    });


    /* =================================================
       05. INTERSECTION OBSERVER
    ================================================= */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach((element) => {

            element.classList.add("is-visible");

        });

        return;

    }


    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -45px 0px"
        }

    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =================================================
       06. EXPERTISE ITEM INTERACTIONS
    ================================================= */

    const expertiseItems = document.querySelectorAll(
        ".expertise-item"
    );

    expertiseItems.forEach((item) => {

        item.addEventListener("mouseenter", () => {

            item.classList.add("expertise-hover");

        });

        item.addEventListener("mouseleave", () => {

            item.classList.remove("expertise-hover");

        });

    });


    /* =================================================
       07. INDUSTRY CARD INTERACTIONS
    ================================================= */

    const industryCards = document.querySelectorAll(
        ".industry-card"
    );

    industryCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("card-active");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("card-active");

        });

    });


    /* =================================================
       08. INTERNAL ANCHOR NAVIGATION
    ================================================= */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

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
       09. ACCESSIBILITY - KEYBOARD FOCUS
    ================================================= */

    const interactiveElements = document.querySelectorAll(
        ".industry-card-link, " +
        ".industry-text-link, " +
        ".expertise-button, " +
        ".industries-cta-button, " +
        ".industries-hero .primary-button"
    );

    interactiveElements.forEach((element) => {

        element.addEventListener("focus", () => {

            element.classList.add("keyboard-focused");

        });

        element.addEventListener("blur", () => {

            element.classList.remove("keyboard-focused");

        });

    });


    /* =================================================
       10. PAGE INITIALIZATION
    ================================================= */

    document.documentElement.classList.add(
        "industries-page-ready"
    );

});
