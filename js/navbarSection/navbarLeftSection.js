import { isDarkThemeActivated } from "../applicationTheme.js";
import { btnNavbarToggle } from "../staticVariables/svNavbarSection.js";
import { toggleLeftMenusSection } from "../leftNavigationMenusSection/leftNavSection.js"

// =========================================
// ************ Event Listeners ************
// =========================================

/**
 * Initialize navbar left section event listeners
 */
function intNavbarLeftEventListeners(){
  setNavbarLeftTheme()
  // Navbar Toggle Button
  btnNavbarToggle.addEventListener("click", toggleLeftMenusSection);
  btnNavbarToggle.addEventListener("mousedown", onMouseDownBtnNavbarToggle);
  btnNavbarToggle.addEventListener("mouseup", onMouseUpBtnNavbarToggle);
}

// =========================================
// ************ Event Handlers *************
// =========================================

/**
 * Adding mouse down effect when mouse btn is down
 */
function onMouseDownBtnNavbarToggle(){
  this.classList.add("icon-mousedown-effect");
}
  
/**
 * Removing mouse down effect
 * Adding mouse up effect when mouse btn is up
 */
function onMouseUpBtnNavbarToggle(){
  this.classList.remove("icon-mousedown-effect");
  this.classList.add("icon-mouseup-effect");
    setTimeout(()=>{
      this.classList.remove("icon-mouseup-effect");
  }, 500)
}

// =========================================
// ******* Business Logic Functions ********
// =========================================

/**
 * Setting current theme of navbar left section
 */
function setNavbarLeftTheme(){
  if(isDarkThemeActivated()){
    btnNavbarToggle.classList.remove("navbar-toggle-btn-light-theme");
  }
  else{
    btnNavbarToggle.classList.add("navbar-toggle-btn-light-theme");
  }
}

export { intNavbarLeftEventListeners, setNavbarLeftTheme }