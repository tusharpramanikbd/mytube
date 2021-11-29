import { 
  allNavbarIcons,
  userImg,
  user,
  userMenuItemList,
  appearance,
  btnLightTheme,
  btnDarkTheme,
  btnLeftArrow,
  tickDark,
  tickLight,
  userHeader,
  userMenuDiv2,
  userMenuDiv3,
  appearanceTop
} from "../staticVariables/svNavbarSection.js"
import { isDarkThemeActivated } from "../applicationTheme.js"
import { setCurrentTheme, getCurrentTheme } from "../applicationTheme.js"
import { setFilterVideoSectionTheme } from "../filterVideoSection/filterVideoSection.js";
import { setMainVideoSectionTheme } from "../mainVideoSection/mainVideoSection.js";
import { setNavbarSectionTheme } from "./navbarSection.js";
import { setNavbarLeftTheme } from "./navbarLeftSection.js";
import { setNavbarMiddleTheme } from "./navbarMiddleSection.js";
import { setNoDataFoundTheme } from "../mainVideoSection/mainVideoSection.js";

// ===============================================
// Initialize navbar right section event listeners
// ===============================================
function initNavbarRightEventListeners(){
  setNavbarRightTheme();
  setUserMenuTheme();
  setAppearanceTheme();
  // Navbar Icons
  allNavbarIcons.forEach((icon) => {
    icon.addEventListener("mousedown", onMouseDownNavbarIcon);
    icon.addEventListener("mouseup", onMouseUpNavbarIcon);
  });

  // User Image
  userImg.addEventListener("click", onClickUserImage);

  // Navbar User Menu Item Hover
  userMenuItemList.forEach((item)=>{
    item.addEventListener("mouseenter", onMouseEnterEffect);
    item.addEventListener("mouseleave", onMouseLeaveEffect);
    item.addEventListener("click", onMouseLeaveEffect);
  });

  // Appearance menu click event listener
  user.addEventListener("click", onClickAppearanceInUserMenu);

  // Light theme
  btnLightTheme.addEventListener("click", onClickBtnLightTheme);
  btnLightTheme.addEventListener("mouseenter", onMouseEnterEffect);
  btnLightTheme.addEventListener("mouseleave", onMouseLeaveEffect);

  // Dark theme
  btnDarkTheme.addEventListener("click", onClickBtnDarkTheme);
  btnDarkTheme.addEventListener("mouseenter", onMouseEnterEffect);
  btnDarkTheme.addEventListener("mouseleave", onMouseLeaveEffect);

  // Appearance back btn
  btnLeftArrow.addEventListener("click", onClickAppearanceLeftArrow);
}

// ================================
// Event Handler Function
// ================================

// ===================================
// On mouse down btn navbar icons
// ===================================
function onMouseDownNavbarIcon(){
  this.classList.add("icon-mousedown-effect");
}

// ===================================
// On mouse up btn navbar icons
// ===================================
function onMouseUpNavbarIcon(){
  this.classList.remove("icon-mousedown-effect");
  this.classList.add("icon-mouseup-effect");
  setTimeout(()=>{
    this.classList.remove("icon-mouseup-effect");
  }, 500)
}

// ===================================
// On mouse enter hover effect
// ===================================
function onMouseEnterEffect(){
  if(isDarkThemeActivated()){
    this.classList.add("appearance-hover-dark-theme");
  }
  else{
    this.classList.add("appearance-hover-light-theme");
  }
}

// ===================================
// On mouse leave hover effect
// ===================================
function onMouseLeaveEffect(){
  if(isDarkThemeActivated()){
    this.classList.remove("appearance-hover-dark-theme");
  }
  else{
    this.classList.remove("appearance-hover-light-theme");
  }
}

// ==============================================================================
// showing appearance overlay on appearnace menu click on user option menu overlay
// ==============================================================================
function onClickAppearanceInUserMenu(event){
  if(event.target.parentElement.dataset.id === "appearance"){
    user.classList.remove("show-user");
    appearance.classList.add("show-appearance");
    setTickMark(getCurrentTheme());
  }
}

// =================================================================================
// going back to user option menu overlay on clicking back btn on appearance overlay
// =================================================================================
function onClickAppearanceLeftArrow(){
  appearance.classList.remove("show-appearance");
  user.classList.add("show-user");
  setAppearanceMenuTitle();
}

// =================================
// changing image border color
// toggling user option menu overlay
// =================================
function onClickUserImage(event){
  changeUserImgBorder(event.currentTarget);
  if(user.classList.contains("show-user")){
    user.classList.remove("show-user")
    user.classList.remove("user-light-theme");
  }
  else{
    if(!isDarkThemeActivated()){
      user.classList.add("user-light-theme");
    }
    user.classList.add("show-user")
  }
  
  setAppearanceMenuTitle();
  appearance.classList.remove("show-appearance");
}

// =====================
// On click light theme
// =====================
function onClickBtnLightTheme(){
  setTheme("light")
  btnLightTheme.classList.remove("appearance-hover-dark-theme")
  btnLightTheme.classList.add("appearance-hover-light-theme")
}

// =====================
// On click dark theme
// =====================
function onClickBtnDarkTheme(){
  setTheme("dark")
  btnDarkTheme.classList.remove("appearance-hover-light-theme")
  btnDarkTheme.classList.add("appearance-hover-dark-theme")
}

// =========================
// Other Business Logic
// =========================

// ==============================
// Change user image border color
// ==============================
function changeUserImgBorder(element){
  element.classList.add("avater-img-click-effect");
  setTimeout(()=>{
    element.classList.remove("avater-img-click-effect");
  }, 300);
}

// ============================================
// hiding user menus div on click outside of it
// ============================================
function hideUserMenus(){
  if(user.classList.contains("show-user")){
    user.classList.remove("show-user")
  }
}

// ==================================================
// hiding appearance menus div on click outside of it
// ==================================================
function hideAppearanceMenus(){
  appearance.classList.remove("show-appearance")
}

// =============================
// Setting appearance menu title
// =============================
function setAppearanceMenuTitle(){
  userMenuItemList.map((menu)=>{
    if(menu.dataset.id === "appearance"){
      menu.children[1].innerText = `appearance: ${getCurrentTheme()}`
    }
    return menu;
  })
}

// ====================================
// Set all whole navbar theme on click
// ====================================
function setTheme(theme){
  setCurrentTheme(theme);
  setFilterVideoSectionTheme();
  setMainVideoSectionTheme();
  setNavbarSectionTheme();
  setNavbarLeftTheme();
  setNavbarMiddleTheme();
  setNavbarRightTheme();
  setUserMenuTheme();
  setAppearanceTheme();
  setNoDataFoundTheme();
  setTickMark(theme);
}

// ==============================
// Set navbar right section theme
// ==============================
function setNavbarRightTheme(){
  allNavbarIcons.map((icon)=>{
    if(isDarkThemeActivated()){
      icon.classList.remove("icon-light-theme");
    }
    else{
      icon.classList.add("icon-light-theme");
    }
  })
}

// ===========================
// Set user menu section theme
// ===========================
function setUserMenuTheme(){
  if(isDarkThemeActivated()){
    user.classList.remove("user-light-theme")
    userHeader.classList.remove("user-header-light-theme")
    userMenuDiv2.classList.remove("border-light-theme")
    userMenuDiv3.classList.remove("border-light-theme")
  }
  else{
    user.classList.add("user-light-theme")
    userHeader.classList.add("user-header-light-theme")
    userMenuDiv2.classList.add("border-light-theme")
    userMenuDiv3.classList.add("border-light-theme")
  }
}

// =================================
// Set appearance menu section theme
// =================================
function setAppearanceTheme(){
  if(isDarkThemeActivated()){
    appearance.classList.remove("appearance-light-theme")
    appearanceTop.classList.remove("appearance-top-light-theme")
  }
  else{
    appearance.classList.add("appearance-light-theme")
    appearanceTop.classList.add("appearance-top-light-theme")
  }
}

// =================================================
// Set tick mark ok theme menu on appearance section
// =================================================
function setTickMark(theme){
  if(theme === "dark"){
    // set tick mark next to dark theme
    tickDark.classList.remove("hide-tick-mark")
    tickLight.classList.add("hide-tick-mark")
  }
  else{
    // set tick mark next to light theme
    tickLight.classList.remove("hide-tick-mark")
    tickDark.classList.add("hide-tick-mark")
  }
}

export { initNavbarRightEventListeners, hideUserMenus, hideAppearanceMenus }