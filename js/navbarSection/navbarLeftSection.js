import { isDarkThemeActivated } from "../applicationTheme.js";
import { btnNavbarToggle } from "../staticVariables/svNavbarSection.js";
import { toggleLeftMenusSection } from "../leftNavigationMenusSection/leftNavSection.js"

// ==============================================
// Initialize navbar left section event listeners
// ==============================================
function intNavbarLeftEventListeners(){
  setNavbarLeftTheme()
  // Navbar Toggle Button
  btnNavbarToggle.addEventListener("click", toggleLeftMenusSection);
  btnNavbarToggle.addEventListener("mousedown", onMouseDownBtnNavbarToggle);
  btnNavbarToggle.addEventListener("mouseup", onMouseUpBtnNavbarToggle);
}

// ================================
// Event Handler Function
// ================================

// ===============================
// On mouse down btn navabr toggle
// ===============================
function onMouseDownBtnNavbarToggle(){
  this.classList.add("icon-mousedown-effect");
}
  
// ===============================
// On mouse up btn navbar toggle
// ===============================
function onMouseUpBtnNavbarToggle(){
  this.classList.remove("icon-mousedown-effect");
  this.classList.add("icon-mouseup-effect");
    setTimeout(()=>{
      this.classList.remove("icon-mouseup-effect");
  }, 500)
}

// =========================
// Set theme of left section
// =========================
function setNavbarLeftTheme(){
  if(isDarkThemeActivated()){
    btnNavbarToggle.classList.remove("navbar-toggle-btn-light-theme");
  }
  else{
    btnNavbarToggle.classList.add("navbar-toggle-btn-light-theme");
  }
}

export { intNavbarLeftEventListeners, setNavbarLeftTheme }