import initDarkMode from './modules/darkMode.js';
import initDynamicDate from './modules/dynamicDate.js';
import initTopNavigation from './modules/topNavigation.js';
import initBackToTop from './modules/backToTop.js';
import initSearch from './modules/search.js';
import initScrollProgress from './modules/scrollProgress.js';

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initDynamicDate();
  initTopNavigation();
  initBackToTop();
  initSearch();
  initScrollProgress();
});
