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