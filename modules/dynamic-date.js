/**
 * Initializes dynamic date display.
 * Finds an element with the class 'date' and 'data-dynamic' attribute,
 * then updates its text content and datetime attribute with the current date
 * formatted for German locale.
 */
export default function initDynamicDate() {
  const dateElem = document.querySelector('.date[data-dynamic]');
  if (!dateElem) return;
  const now = new Date();
  const fmt = new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  dateElem.textContent = fmt.format(now);
  dateElem.setAttribute('datetime', now.toISOString());
}
