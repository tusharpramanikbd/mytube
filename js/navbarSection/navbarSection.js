import { 
  btnNavbarToggle,
  btnNavbarSearch,
  btnNavbarMicrophone,
  allNavbarIcons,
  userImg,
  user
 } from "../staticVariables/svNavbarSection.js"
 import { isDarkThemeActivated } from "../applicationTheme.js"

// ===========================
// Initializing navbar section
// ===========================
function initNavbarSection(){
  console.log("Initalizing navbar section");
  initNavbarEventListeners()
}

// ==================================
// Initializing navbar event listener
// ==================================
function initNavbarEventListeners(){
  // Navbar Toggle Button
  // btnNavbarToggle.addEventListener("click", toggleLeftMenusSection);
  btnNavbarToggle.addEventListener("mousedown", onMouseDownBtnNavbarToggle);
  btnNavbarToggle.addEventListener("mouseup", onMouseUpBtnNavbarToggle);

  // Navbar Search Button
  // btnNavbarSearch.addEventListener("click", onClickBtnNavbarSearch);
  btnNavbarSearch.addEventListener("mousedown", onMouseDownBtnNavbarSearch);
  btnNavbarSearch.addEventListener("mouseup", onMouseUpBtnNavbarSearch);

  // Navbar Microphone Icon
  btnNavbarMicrophone.addEventListener("mousedown", onMouseDownBtnNavbarMicrophone);
  btnNavbarMicrophone.addEventListener("mouseup", onMouseUpBtnNavbarMicrophone);

  // Navbar Icons
  allNavbarIcons.forEach((icon) => {
    icon.addEventListener("mousedown", onMouseDownNavbarIcon);
    icon.addEventListener("mouseup", onMouseUpNavbarIcon);
  });

  // User Image
  userImg.addEventListener("mousedown", onClickUserImage);
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

// ===============================
// On mouse down btn navbar search
// ===============================
function onMouseDownBtnNavbarSearch(){
  if(isDarkThemeActivated()){
    this.classList.add("navbar-btn-search-click-effect");
  }
  else{
    this.classList.add("navbar-btn-search-click-effect-light-theme");
  }
}

// ================================
// On mouse down btn navbar search
// ================================
function onMouseUpBtnNavbarSearch(){
  if(isDarkThemeActivated()){
    this.classList.remove("navbar-btn-search-click-effect");
  }
  else{
    this.classList.remove("navbar-btn-search-click-effect-light-theme");
  }
}

// ===================================
// On mouse down btn navbar microphone
// ===================================
function onMouseDownBtnNavbarMicrophone(){
  this.classList.add("icon-mousedown-effect");
}

// ===================================
// On mouse up btn navbar microphone
// ===================================
function onMouseUpBtnNavbarMicrophone(){
  this.classList.remove("icon-mousedown-effect");
    this.classList.add("icon-mouseup-effect");
      setTimeout(()=>{
        this.classList.remove("icon-mouseup-effect");
    }, 500)
}

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

// =================================
// changing image border color
// toggling user option menu overlay
// =================================
function onClickUserImage(event){
  changeUserImgBorder(event.currentTarget);
  user.classList.toggle("show-user");
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

export { initNavbarSection }
