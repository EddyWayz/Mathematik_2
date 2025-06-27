/**
 * Initializes dark mode functionality.
 * Toggles dark mode on and off based on user clicks and stores the preference in local storage.
 * Applies the saved theme on page load.
 */
export default function initDarkMode() {
  const toggleButton = document.getElementById('dark-mode-toggle');
  if (!toggleButton) return;
  const body = document.body;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      toggleButton.textContent = '☀️';
      toggleButton.setAttribute('aria-pressed', 'true');
    } else {
      body.classList.remove('dark-mode');
      toggleButton.textContent = '🌙';
      toggleButton.setAttribute('aria-pressed', 'false');
    }
  };

  toggleButton.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
}
