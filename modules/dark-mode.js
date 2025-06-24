export default function initDarkMode() {
  const toggleButton = document.getElementById('dark-mode-toggle');
  if (!toggleButton) return;
  const body = document.body;

  const applyTheme = theme => {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      toggleButton.textContent = '☀️';
    } else {
      body.classList.remove('dark-mode');
      toggleButton.textContent = '🌙';
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
