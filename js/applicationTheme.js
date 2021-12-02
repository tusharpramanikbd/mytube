let currentTheme;

/**
 * Initialize application theme
 * Default theme is dark
 * if theme is not stored in storage, it will be stored
 */
function initApplicationTheme() {
  currentTheme = localStorage.getItem("theme");
  if (!currentTheme) {
    currentTheme = "dark";
    localStorage.setItem("theme", currentTheme);
  }
  console.log("Application theme initialized");
}

/**
 * Whoever call this function get the current selected theme
 * @returns {String} - Current theme as string like light/dark
 */
function getCurrentTheme() {
  return currentTheme;
}

/**
 * Set the given theme as current theme by caching and storing it on storage
 * @param {String} theme - String as light/dark
 */
function setCurrentTheme(theme) {
  currentTheme = theme;
  localStorage.setItem("theme", currentTheme);
}

/**
 * This function checks whether the dark theme is activated or not
 * @returns {Boolean} - Return true or false
 */
function isDarkThemeActivated() {
  if (currentTheme === "dark") {
    return true;
  }
  return false;
}

export {
  initApplicationTheme,
  isDarkThemeActivated,
  setCurrentTheme,
  getCurrentTheme,
};
