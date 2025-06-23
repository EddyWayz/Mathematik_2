// main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode Toggle ---
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        const body = document.body;

        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                toggleButton.textContent = '☀️';
            } else {
                body.classList.remove('dark-mode');
                toggleButton.textContent = '🌙';
            }
        };

        toggleButton.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            const newTheme = isDarkMode ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });

        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
    }
    // --- Dynamic Date ---
    const dateElem = document.querySelector(".date[data-dynamic]");
    if (dateElem) {
        const now = new Date();
        const fmt = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" });
        dateElem.textContent = fmt.format(now);
        dateElem.setAttribute("datetime", now.toISOString());
    }

    // --- Top Navigation ---
    const footerNav = document.querySelector("footer .page-nav");
    const header = document.querySelector("header.page-header");
    if (footerNav && header) {
        const topNav = footerNav.cloneNode(true);
        topNav.classList.add("top");
        header.insertAdjacentElement("afterend", topNav);
    }



    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
