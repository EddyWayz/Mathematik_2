export default function initTopNavigation() {
  const footerNav = document.querySelector('footer .page-nav');
  const header = document.querySelector('header.page-header');
  if (!footerNav || !header) return;
  const topNav = footerNav.cloneNode(true);
  topNav.classList.add('top');
  header.insertAdjacentElement('afterend', topNav);
}
