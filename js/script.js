/* =============================================
   TECH LYNX HUB
   THE SKY GEN - PROJECT 02
   Custom Vanilla JavaScript
   ============================================= */

"use strict";


/* =============================================
   1. MOBILE NAVIGATION
   ============================================= */

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const navigationLinks = Array.from(
    document.querySelectorAll(".site-nav-link")
);

function setMenuOpen(isOpen) {
    if (!menuToggle || !primaryNavigation) {
        return;
    }

    menuToggle.classList.toggle("is-open", isOpen);
    primaryNavigation.classList.toggle("is-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}

if (menuToggle && primaryNavigation) {
    menuToggle.addEventListener("click", function () {
        const isCurrentlyOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        setMenuOpen(!isCurrentlyOpen);
    });

    // Close the mobile menu after any in-page link is selected,
    // including the "Start a project" CTA inside the menu.
    primaryNavigation
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {
            link.addEventListener("click", function () {
                setMenuOpen(false);
            });
        });

    // Close the menu when the visitor clicks outside it.
    document.addEventListener("click", function (event) {
        const isMenuOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        const clickedInsideMenu =
            primaryNavigation.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (isMenuOpen && !clickedInsideMenu && !clickedToggle) {
            setMenuOpen(false);
        }
    });

    // Support keyboard users.
    document.addEventListener("keydown", function (event) {
        const isMenuOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (event.key === "Escape" && isMenuOpen) {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    // If a user expands the viewport to desktop size, reset the menu.
    const desktopViewport = window.matchMedia("(min-width: 992px)");

    const handleViewportChange = function (event) {
        if (event.matches) {
            setMenuOpen(false);
        }
    };

    if (typeof desktopViewport.addEventListener === "function") {
        desktopViewport.addEventListener("change", handleViewportChange);
    } else {
        // Compatibility fallback for older browsers.
        desktopViewport.addListener(handleViewportChange);
    }
}


/* =============================================
   2. ACTIVE NAVIGATION LINK
   ============================================= */

const pageSections = Array.from(
    document.querySelectorAll("main section[id]")
);

function setActiveNavigationLink(sectionId) {
    navigationLinks.forEach(function (link) {
        const matchesCurrentSection =
            link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle("is-active", matchesCurrentSection);

        if (matchesCurrentSection) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

// Select the right navigation state when loading a direct section URL.
const requestedSectionId = window.location.hash.slice(1);
const requestedSectionExists = pageSections.some(function (section) {
    return section.id === requestedSectionId;
});

setActiveNavigationLink(
    requestedSectionExists ? requestedSectionId : "home"
);

if ("IntersectionObserver" in window && pageSections.length > 0) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            const visibleEntries = entries.filter(function (entry) {
                return entry.isIntersecting;
            });

            if (visibleEntries.length === 0) {
                return;
            }

            // If more than one section qualifies, activate the one
            // with the largest visible intersection.
            visibleEntries.sort(function (first, second) {
                return second.intersectionRatio - first.intersectionRatio;
            });

            setActiveNavigationLink(visibleEntries[0].target.id);
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: [0, 0.1, 0.25, 0.5]
        }
    );

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}


/* =============================================
   3. TESTIMONIAL SLIDER
   ============================================= */

const testimonialSlider = document.querySelector(".testimonial-slider");
const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialSlides = Array.from(
    document.querySelectorAll(".testimonial-slide")
);
const testimonialPreviousButton = document.querySelector(".testimonial-prev");
const testimonialNextButton = document.querySelector(".testimonial-next");
const testimonialDots = Array.from(
    document.querySelectorAll(".testimonial-dot")
);

let currentTestimonialIndex = 0;

function showTestimonial(index) {
    if (!testimonialTrack || testimonialSlides.length === 0) {
        return;
    }

    currentTestimonialIndex =
        (index + testimonialSlides.length) % testimonialSlides.length;

    testimonialTrack.style.transform =
        `translateX(-${currentTestimonialIndex * 100}%)`;

    testimonialSlides.forEach(function (slide, slideIndex) {
        const isActive = slideIndex === currentTestimonialIndex;
        slide.setAttribute("aria-hidden", String(!isActive));
    });

    testimonialDots.forEach(function (dot, dotIndex) {
        const isActive = dotIndex === currentTestimonialIndex;

        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
    });
}

if (testimonialTrack && testimonialSlides.length > 0) {
    if (testimonialPreviousButton) {
        testimonialPreviousButton.addEventListener("click", function () {
            showTestimonial(currentTestimonialIndex - 1);
        });
    }

    if (testimonialNextButton) {
        testimonialNextButton.addEventListener("click", function () {
            showTestimonial(currentTestimonialIndex + 1);
        });
    }

    testimonialDots.forEach(function (dot) {
        dot.addEventListener("click", function () {
            const selectedIndex = Number(dot.dataset.slideTo);

            if (
                Number.isInteger(selectedIndex) &&
                selectedIndex >= 0 &&
                selectedIndex < testimonialSlides.length
            ) {
                showTestimonial(selectedIndex);
            }
        });
    });

    // Arrow-key navigation works whenever a control inside the slider
    // has keyboard focus.
    if (testimonialSlider) {
        testimonialSlider.addEventListener("keydown", function (event) {
            if (event.altKey || event.ctrlKey || event.metaKey) {
                return;
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                showTestimonial(currentTestimonialIndex - 1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                showTestimonial(currentTestimonialIndex + 1);
            }
        });
    }

    showTestimonial(0);

    console.info(
        "Tech Lynx Hub: testimonial slider initialized successfully."
    );
}


/* =============================================
   4. FAQ ACCORDION
   ============================================= */

const faqList = document.querySelector(".faq-list");
const faqItems = Array.from(document.querySelectorAll(".faq-item"));

function closeFaqItem(item) {
    const questionButton = item.querySelector(".faq-question");
    const answerPanel = item.querySelector(".faq-answer");

    if (!questionButton || !answerPanel) {
        return;
    }

    item.classList.remove("is-open");
    questionButton.setAttribute("aria-expanded", "false");
    answerPanel.setAttribute("aria-hidden", "true");
}

function openFaqItem(item) {
    const questionButton = item.querySelector(".faq-question");
    const answerPanel = item.querySelector(".faq-answer");

    if (!questionButton || !answerPanel) {
        return;
    }

    item.classList.add("is-open");
    questionButton.setAttribute("aria-expanded", "true");
    answerPanel.setAttribute("aria-hidden", "false");
}

if (faqList && faqItems.length > 0) {
    faqItems.forEach(function (item) {
        const questionButton = item.querySelector(".faq-question");

        if (!questionButton) {
            return;
        }

        questionButton.addEventListener("click", function () {
            const wasOpen =
                questionButton.getAttribute("aria-expanded") === "true";

            // This is a single-open-item accordion.
            faqItems.forEach(closeFaqItem);

            // Clicking an open question closes it. Clicking a closed
            // question closes the others and opens the selected answer.
            if (!wasOpen) {
                openFaqItem(item);
            }
        });
    });

    console.info(
        "Tech Lynx Hub: FAQ accordion initialized successfully."
    );
}


/* =============================================
   5. CONTACT FORM VALIDATION
   ============================================= */

const contactForm = document.querySelector("#contact-form");
const contactFormStatus = document.querySelector("#contact-form-status");

function showContactFormStatus(message, statusType) {
    if (!contactFormStatus) {
        return;
    }

    contactFormStatus.textContent = message;
    contactFormStatus.classList.remove("is-error", "is-success");
    contactFormStatus.classList.add(statusType);
    contactFormStatus.hidden = false;
}

function clearContactFormStatus() {
    if (!contactFormStatus) {
        return;
    }

    contactFormStatus.textContent = "";
    contactFormStatus.classList.remove("is-error", "is-success");
    contactFormStatus.hidden = true;
}

function validateContactField(field, showError) {
    field.setCustomValidity("");

    const value = String(field.value || "").trim();

    if (field.required && value.length === 0) {
        field.setCustomValidity("This field is required.");
    } else if (field.id === "contact-name" && value.length < 2) {
        field.setCustomValidity(
            "Please enter a name using at least two characters."
        );
    } else if (field.id === "contact-message" && value.length < 10) {
        field.setCustomValidity(
            "Please enter at least ten characters."
        );
    } else if (
        field.type === "email" &&
        value.length > 0 &&
        field.validity.typeMismatch
    ) {
        field.setCustomValidity("Please enter a valid email address.");
    }

    const isValid = field.checkValidity();

    field.classList.toggle("is-invalid", Boolean(showError && !isValid));

    if (showError && !isValid) {
        field.setAttribute("aria-invalid", "true");
    } else {
        field.removeAttribute("aria-invalid");
    }

    return isValid;
}

if (contactForm && contactFormStatus) {
    const contactFields = Array.from(
        contactForm.querySelectorAll("input, select, textarea")
    );

    contactForm.addEventListener("submit", function (event) {
        // This is a frontend demonstration, not a message-delivery service.
        event.preventDefault();

        let firstInvalidField = null;

        contactFields.forEach(function (field) {
            const isValid = validateContactField(field, true);

            if (!isValid && !firstInvalidField) {
                firstInvalidField = field;
            }
        });

        if (firstInvalidField) {
            showContactFormStatus(
                "Please review the highlighted fields and correct the details before continuing.",
                "is-error"
            );

            firstInvalidField.focus();

            console.info(
                "Tech Lynx Hub: contact form validation found errors."
            );

            return;
        }

        showContactFormStatus(
            "Your details passed the demo validation checks. This form is not connected to a message-delivery service, so your enquiry has NOT been sent or stored.",
            "is-success"
        );

        console.info(
            "Tech Lynx Hub: contact form demo validation passed. No message was sent."
        );
    });

    function handleContactFieldEdit(event) {
        const field = event.target;

        if (!field.matches(".contact-input")) {
            return;
        }

        const wasAlreadyInvalid = field.classList.contains("is-invalid");

        validateContactField(field, wasAlreadyInvalid);
        clearContactFormStatus();
    }

    contactForm.addEventListener("input", handleContactFieldEdit);
    contactForm.addEventListener("change", handleContactFieldEdit);

    console.info(
        "Tech Lynx Hub: contact form validation initialized successfully."
    );
}


/* =============================================
   6. DYNAMIC FOOTER COPYRIGHT YEAR
   ============================================= */

const currentYearElement = document.querySelector("#current-year");

if (currentYearElement) {
    currentYearElement.textContent = String(new Date().getFullYear());

    console.info(
        "Tech Lynx Hub: footer copyright year updated."
    );
}


/* =============================================
   7. PROJECT INITIALIZATION
   ============================================= */

console.info(
    "Tech Lynx Hub: custom JavaScript loaded successfully."
);
