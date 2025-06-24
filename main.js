import initDarkMode from './modules/dark-mode.js';
import initDynamicDate from './modules/dynamic-date.js';
import initTopNavigation from './modules/top-navigation.js';
import initBackToTop from './modules/back-to-top.js';
import initSearch from './modules/search.js';
import initScrollProgress from './modules/scroll-progress.js';
import initTasks from './modules/tasks.js';

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initDynamicDate();
  initTopNavigation();
  initBackToTop();
  initSearch();
  initScrollProgress();
  initTasks();
});
