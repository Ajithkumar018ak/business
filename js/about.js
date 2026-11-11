/* =========================================================
   VANTAGE ABOUT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       01 — 3D PERSPECTIVE HERO CAROUSEL
    ===================================================== */

    const carousel = document.getElementById("perspectiveCarousel");

    if (carousel) {

        const cards = Array.from(
            carousel.querySelectorAll(".perspective-card")
        );

        const dots = Array.from(
            document.querySelectorAll("#aboutHeroDots button")
        );

        const prevButton = document.getElementById("aboutHeroPrev");
        const nextButton = document.getElementById("aboutHeroNext");

        const currentCounter = document.getElementById("heroCurrent");

        let currentIndex = 0;
        let autoplayTimer = null;

        const totalSlides = cards.length;


        function updateCarousel() {

            cards.forEach((card, index) => {

                card.classList.remove(
                    "active",
                    "prev",
                    "next",
                    "far"
                );

                const previousIndex =
                    (currentIndex - 1 + totalSlides) % totalSlides;

                const nextIndex =
                    (currentIndex + 1) % totalSlides;


                if (index === currentIndex) {

                    card.classList.add("active");

                } else if (index === previousIndex) {

                    card.classList.add("prev");

                } else if (index === nextIndex) {

                    card.classList.add("next");

                } else {

                    card.classList.add("far");

                }

            });


            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });


            if (currentCounter) {

                currentCounter.textContent =
                    String(currentIndex + 1).padStart(2, "0");

            }

        }


        function nextSlide() {

            currentIndex = (currentIndex + 1) % totalSlides;

            updateCarousel();

        }


        function previousSlide() {

            currentIndex =
                (currentIndex - 1 + totalSlides) % totalSlides;

            updateCarousel();

        }


        function startAutoplay() {

            stopAutoplay();

            autoplayTimer = setInterval(() => {

                nextSlide();

            }, 4500);

        }


        function stopAutoplay() {

            if (autoplayTimer) {

                clearInterval(autoplayTimer);

                autoplayTimer = null;

            }

        }


        if (nextButton) {

            nextButton.addEventListener("click", () => {

                nextSlide();

                startAutoplay();

            });

        }


        if (prevButton) {

            prevButton.addEventListener("click", () => {

                previousSlide();

                startAutoplay();

            });

        }


        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                currentIndex = index;

                updateCarousel();

                startAutoplay();

            });

        });


        carousel.addEventListener("mouseenter", stopAutoplay);

        carousel.addEventListener("mouseleave", startAutoplay);


        /* TOUCH SWIPE */

        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener("touchstart", event => {

            touchStartX = event.changedTouches[0].screenX;

        }, { passive: true });


        carousel.addEventListener("touchend", event => {

            touchEndX = event.changedTouches[0].screenX;

            const difference = touchStartX - touchEndX;

            if (Math.abs(difference) > 45) {

                if (difference > 0) {

                    nextSlide();

                } else {

                    previousSlide();

                }

                startAutoplay();

            }

        }, { passive: true });


        /* KEYBOARD */

        document.addEventListener("keydown", event => {

            if (!carousel.matches(":hover")) return;

            if (event.key === "ArrowRight") {

                nextSlide();

                startAutoplay();

            }

            if (event.key === "ArrowLeft") {

                previousSlide();

                startAutoplay();

            }

        });


        updateCarousel();

        startAutoplay();

    }



    /* =====================================================
       02 — PROCESS ACTIVE HOVER
    ===================================================== */

    const processSteps = document.querySelectorAll(".process-step");

    processSteps.forEach(step => {

        step.addEventListener("mouseenter", () => {

            processSteps.forEach(item => {

                item.classList.remove("active");

            });

            step.classList.add("active");

        });

    });



    /* =====================================================
       03 — IMAGE REVEAL
    ===================================================== */

    const revealImages = document.querySelectorAll(
        ".story-image-large, .story-image-side, .capability-image, .process-image"
    );

    if ("IntersectionObserver" in window) {

        const imageObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("image-in-view");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });


        revealImages.forEach(image => {

            imageObserver.observe(image);

        });

    } else {

        revealImages.forEach(image => {

            image.classList.add("image-in-view");

        });

    }


});