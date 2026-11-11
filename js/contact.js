
/* =====================================================
   VANTAGE — CONTACT PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =================================================
       PAGE INITIALIZATION
    ================================================= */

    document.documentElement.classList.add("contact-page-js");


    /* =================================================
       HERO ENTRANCE
    ================================================= */

    const contactHero = document.querySelector(".contact-hero");

    if (contactHero) {
        requestAnimationFrame(() => {
            contactHero.classList.add("hero-loaded");
        });
    }


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealSelectors = [
        ".contact-information-heading",
        ".contact-info-card",
        ".contact-form-visual",
        ".contact-form-heading",
        ".contact-field",
        ".contact-consent",
        ".contact-submit-button",
        ".contact-why-heading",
        ".contact-why-card",
        ".contact-faq-heading",
        ".contact-faq-item",
        ".contact-cta-container"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(",")
    );


    revealElements.forEach((element, index) => {

        element.classList.add("contact-reveal");

        const groupIndex = index % 4;

        element.style.setProperty(
            "--contact-delay",
            `${groupIndex * 100}ms`
        );

    });


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -45px 0px"
            }
        );


        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =================================================
       FAQ ACCORDION
    ================================================= */

    const faqItems = document.querySelectorAll(
        ".contact-faq-item"
    );


    faqItems.forEach(item => {

        const question = item.querySelector(
            ".contact-faq-question"
        );

        if (!question) return;


        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");


            // Close all FAQ items

            faqItems.forEach(faqItem => {

                faqItem.classList.remove("active");

                const faqButton = faqItem.querySelector(
                    ".contact-faq-question"
                );

                if (faqButton) {
                    faqButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });


            // Open selected item

            if (!isActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });



    /* =================================================
       CONTACT FORM VALIDATION
    ================================================= */

    const contactForm = document.getElementById(
        "mainContactForm"
    );

    if (!contactForm) return;


    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const phoneInput = document.getElementById("contactPhone");
    const companyInput = document.getElementById("contactCompany");
    const serviceInput = document.getElementById("contactService");
    const messageInput = document.getElementById("contactMessage");
    const consentInput = document.getElementById("contactConsent");

    const successMessage = document.getElementById(
        "contactFormSuccess"
    );

    const consentError = document.querySelector(
        ".consent-error"
    );


    /* =================================================
       FIELD ERROR HELPERS
    ================================================= */

    function showFieldError(input, message) {

        const field = input.closest(".contact-field");

        if (!field) return;

        field.classList.add("invalid");

        const error = field.querySelector(".field-error");

        if (error) {
            error.textContent = message;
        }

    }


    function clearFieldError(input) {

        const field = input.closest(".contact-field");

        if (!field) return;

        field.classList.remove("invalid");

        const error = field.querySelector(".field-error");

        if (error) {
            error.textContent = "";
        }

    }


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    /* =================================================
       LIVE FIELD ERROR CLEARING
    ================================================= */

    const formInputs = contactForm.querySelectorAll(
        "input:not([type='checkbox']), textarea, select"
    );


    formInputs.forEach(input => {

        input.addEventListener("input", () => {

            clearFieldError(input);

            if (successMessage) {
                successMessage.classList.remove("show");
            }

        });

        input.addEventListener("change", () => {

            clearFieldError(input);

        });

    });


    if (consentInput && consentError) {

        consentInput.addEventListener("change", () => {

            consentError.classList.remove("show");
            consentError.textContent = "";

        });

    }



    /* =================================================
       VALIDATION FUNCTION
    ================================================= */

    function validateContactForm() {

        let isValid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const service = serviceInput.value;
        const message = messageInput.value.trim();


        // Name validation

        if (name.length < 2) {

            showFieldError(
                nameInput,
                "Please enter your full name."
            );

            isValid = false;

        } else {

            clearFieldError(nameInput);

        }


        // Email validation

        if (!email) {

            showFieldError(
                emailInput,
                "Email address is required."
            );

            isValid = false;

        } else if (!isValidEmail(email)) {

            showFieldError(
                emailInput,
                "Please enter a valid email address."
            );

            isValid = false;

        } else {

            clearFieldError(emailInput);

        }


        // Optional phone validation

        if (phone && !/^[+]?[\d\s()-]{7,20}$/.test(phone)) {

            showFieldError(
                phoneInput,
                "Please enter a valid phone number."
            );

            isValid = false;

        } else {

            clearFieldError(phoneInput);

        }


        // Service validation

        if (!service) {

            showFieldError(
                serviceInput,
                "Please select a service."
            );

            isValid = false;

        } else {

            clearFieldError(serviceInput);

        }


        // Message validation

        if (message.length < 10) {

            showFieldError(
                messageInput,
                "Please enter at least 10 characters."
            );

            isValid = false;

        } else {

            clearFieldError(messageInput);

        }


        // Consent validation

        if (!consentInput.checked) {

            consentError.textContent =
                "Please agree before submitting your enquiry.";

            consentError.classList.add("show");

            isValid = false;

        } else {

            consentError.classList.remove("show");

        }


        return isValid;

    }



    /* =================================================
       FORM SUBMISSION
    ================================================= */

    contactForm.addEventListener("submit", event => {

        event.preventDefault();


        if (successMessage) {
            successMessage.classList.remove("show");
        }


        const isValid = validateContactForm();


        if (!isValid) {

            const firstInvalid = contactForm.querySelector(
                ".contact-field.invalid input, " +
                ".contact-field.invalid textarea, " +
                ".contact-field.invalid select"
            );

            if (firstInvalid) {

                firstInvalid.focus();

                firstInvalid.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

            return;

        }


        // Frontend validation success only.
        // No backend or email service is connected.

        if (successMessage) {

            successMessage.classList.add("show");

            successMessage.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }

        contactForm.reset();

        consentError.classList.remove("show");

    });



    /* =================================================
       OPTIONAL FORM SUBMIT BUTTON FEEDBACK
    ================================================= */

    const submitButton = contactForm.querySelector(
        ".contact-submit-button"
    );

    if (submitButton) {

        submitButton.addEventListener("mouseenter", () => {
            submitButton.classList.add("button-hovered");
        });

        submitButton.addEventListener("mouseleave", () => {
            submitButton.classList.remove("button-hovered");
        });

    }


});
