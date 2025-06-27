/**
 * Initializes the back-to-top button functionality.
 * The button appears when the user scrolls down more than 300 pixels
 * and smoothly scrolls the page to the top when clicked.
 */
export default function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  if (!backToTopButton) return;
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
