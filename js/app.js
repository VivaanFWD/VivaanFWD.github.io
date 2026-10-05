/* =========================================================
   VIVAANFWD PORTFOLIO
   Vanilla JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const root = document.documentElement;
    const navbar = document.getElementById("mainNavbar");
    const themeToggle = document.getElementById("themeToggle");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");

    /* -----------------------------------------
       CURRENT YEAR
       ----------------------------------------- */
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* -----------------------------------------
       THEME
       ----------------------------------------- */
    const savedTheme = localStorage.getItem("vivaan-theme");

    if (savedTheme === "dark") {
        root.setAttribute("data-theme", "dark");
    }

    function updateThemeIcon() {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");
        const dark = root.getAttribute("data-theme") === "dark";

        icon.className = dark
            ? "bi bi-sun-fill"
            : "bi bi-moon-stars-fill";

        themeToggle.setAttribute(
            "aria-label",
            dark ? "Switch to light mode" : "Switch to dark mode"
        );
    }

    updateThemeIcon();

    themeToggle?.addEventListener("click", () => {
        const dark = root.getAttribute("data-theme") === "dark";

        if (dark) {
            root.removeAttribute("data-theme");
            localStorage.setItem("vivaan-theme", "light");
        } else {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("vivaan-theme", "dark");
        }

        updateThemeIcon();
    });

    /* -----------------------------------------
       NAVBAR SCROLL
       ----------------------------------------- */
    function handleScroll() {
        if (window.scrollY > 30) {
            navbar?.classList.add("scrolled");
        } else {
            navbar?.classList.remove("scrolled");
        }

        if (window.scrollY > 500) {
            backToTop?.classList.add("show");
        } else {
            backToTop?.classList.remove("show");
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    /* -----------------------------------------
       MOBILE NAVBAR AUTO CLOSE
       ----------------------------------------- */
    document.querySelectorAll("#navbarContent .nav-link, #navbarContent .btn")
        .forEach(link => {
            link.addEventListener("click", () => {
                const navbarContent = document.getElementById("navbarContent");

                if (
                    navbarContent &&
                    navbarContent.classList.contains("show")
                ) {
                    const collapse = bootstrap.Collapse.getInstance(navbarContent);

                    if (collapse) {
                        collapse.hide();
                    }
                }
            });
        });

    /* -----------------------------------------
       BACK TO TOP
       ----------------------------------------- */
    backToTop?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    /* -----------------------------------------
       SCROLL REVEAL
       ----------------------------------------- */
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    /* -----------------------------------------
       SKILL PROGRESS ANIMATION
       ----------------------------------------- */
    const progressBars = document.querySelectorAll(".progress-bar");

    if ("IntersectionObserver" in window) {
        const progressObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        const width = bar.dataset.width || 0;

                        bar.style.width = `${width}%`;
                        progressObserver.unobserve(bar);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }

    /* -----------------------------------------
       COUNTER ANIMATION
       ----------------------------------------- */
    const counters = document.querySelectorAll("[data-count]");

    function animateCounter(element) {
        const target = Number(element.dataset.count);
        const duration = 1000;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(progress * target);

            element.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.7
            }
        );

        counters.forEach(counter => counterObserver.observe(counter));
    }

    /* -----------------------------------------
       PROJECT FILTER
       ----------------------------------------- */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.dataset.filter;

            projectItems.forEach(item => {
                const categories = item.dataset.category.split(" ");

                if (filter === "all" || categories.includes(filter)) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });

    /* -----------------------------------------
       PROJECT MODAL
       ----------------------------------------- */
    const projectModalElement = document.getElementById("projectModal");

    if (projectModalElement) {
        const projectModal = new bootstrap.Modal(projectModalElement);

        const modalTitle = document.getElementById("projectModalLabel");
        const modalDescription = document.getElementById("modalDescription");
        const modalTech = document.getElementById("modalTech");
        const modalIcon = document.getElementById("modalIcon");

        document.querySelectorAll(".project-details-btn")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const title = button.dataset.title || "Project";
                    const description = button.dataset.description || "";
                    const tech = button.dataset.tech || "";
                    const icon = button.dataset.icon || "bi-code-slash";

                    modalTitle.textContent = title;
                    modalDescription.textContent = description;

                    modalIcon.className = `bi ${icon}`;

                    modalTech.innerHTML = "";

                    tech.split(",").forEach(item => {
                        const tag = document.createElement("span");
                        tag.textContent = item.trim();
                        modalTech.appendChild(tag);
                    });

                    projectModal.show();
                });
            });
    }

    /* -----------------------------------------
       CONTACT FORM
       ----------------------------------------- */
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    contactForm?.addEventListener("submit", event => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.classList.add("was-validated");

            if (formMessage) {
                formMessage.textContent = "Please complete all required fields.";
                formMessage.className = "small mt-3 text-danger";
            }

            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        /*
         * This is a frontend-only form.
         * Replace the mailto address below with your actual email.
         */
        const recipient = "your-email@example.com";

        const mailto =
            `mailto:${recipient}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\n${message}`
            )}`;

        if (formMessage) {
            formMessage.textContent =
                "Opening your email application...";
            formMessage.className =
                "small mt-3 text-success";
        }

        window.location.href = mailto;
    });

    /* -----------------------------------------
       ACTIVE NAVIGATION
       ----------------------------------------- */
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(
        '#navbarContent .nav-link[href^="#"]'
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const id = entry.target.getAttribute("id");

                    navLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${id}`
                        );
                    });
                });
            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

});
