import { isDarkThemeActivated } from "../applicationTheme.js";
import { intNavbarLeftEventListeners } from "./navbarLeftSection.js";
import { initNavbarMiddleEventListeners } from "./navbarMiddleSection.js";
import { initNavbarRightEventListeners } from "./navbarRightSection.js";
import { sectionNavbar } from "../staticVariables/svNavbarSection.js";

// =========================================
// ************ Event Listeners ************
// =========================================

/**
 * Initializing navbar section
 */
function initNavbarSection(){
  console.log("Initalizing navbar section");
  intNavbarLeftEventListeners();
  initNavbarMiddleEventListeners();
  initNavbarRightEventListeners();
  setNavbarSectionTheme();
}

// =========================================
// ******* Business Logic Functions ********
// =========================================

/**
 * Set navbar section theme
 */
function setNavbarSectionTheme(){
  if(isDarkThemeActivated()){
    sectionNavbar.classList.remove("section-navbar-light-theme")
  }
  else{
    sectionNavbar.classList.add("section-navbar-light-theme")
  }
}

export { initNavbarSection, setNavbarSectionTheme }
