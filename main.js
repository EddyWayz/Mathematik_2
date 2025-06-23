import initDarkMode from './modules/darkMode.js';
import initDynamicDate from './modules/dynamicDate.js';
import initTopNavigation from './modules/topNavigation.js';
import initBackToTop from './modules/backToTop.js';

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initDynamicDate();
  initTopNavigation();
  initBackToTop();
});
