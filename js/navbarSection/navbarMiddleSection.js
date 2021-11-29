import { 
  btnNavbarSearch,
  inputFormNavbar,
  navbarSearch,
  btnCross,
  sectionNavbar,
  navbarLeft,
  navbarRight,
  backBtnDiv,
  btnBack,
  btnNavbarMicrophone,
  navbarMiddle
  } from "../staticVariables/svNavbarSection.js"
import { FetchedData } from "../myStaticClass.js";
import { setVideoData } from "../mainVideoSection/mainVideoSection.js"
import { getWidth } from "../utils.js";
import { isDarkThemeActivated } from "../applicationTheme.js"

// ================================================
// Initialize navbar middle section event listeners
// ================================================
function initNavbarMiddleEventListeners(){
  setNavbarMiddleTheme();
  // Navbar Search Button
  btnNavbarSearch.addEventListener("click", onClickBtnNavbarSearch);
  btnNavbarSearch.addEventListener("mousedown", onMouseDownBtnNavbarSearch);
  btnNavbarSearch.addEventListener("mouseup", onMouseUpBtnNavbarSearch);

  // Navbar Microphone Icon
  btnNavbarMicrophone.addEventListener("mousedown", onMouseDownBtnNavbarMicrophone);
  btnNavbarMicrophone.addEventListener("mouseup", onMouseUpBtnNavbarMicrophone);

  // Navbar Input Form 
  inputFormNavbar.addEventListener("keyup", onKeyUpInputFormNavbar);

  // Navbar Input Form Button Cross
  btnCross.addEventListener("click", onClickBtnCross);
  btnCross.addEventListener("mousedown", onMouseDownBtnCross);
  btnCross.addEventListener("mouseup", onMouseUpBtnCross);

  // Navbar Small Screen Button Back
  btnBack.addEventListener("click", onClickBtnBack);
  btnBack.addEventListener("mousedown", onMouseDownBtnBack);
  btnBack.addEventListener("mouseup", onMouseUpBtnBack);
}

// =======================
// Event Handler Functions
// =======================

// ==========================
// On click navbar btn search
// ==========================
function onClickBtnNavbarSearch(){
  const inputDisplay = window.getComputedStyle(inputFormNavbar).display;
  
  if (getWidth() <= 800 && inputDisplay === "none") {
    inputFormNavbar.classList.add(
      "show-navbar-middle-form",
      "changed-navbar-middle-form"
    );
    sectionNavbar.classList.add("changed-section-navbar");
    navbarLeft.classList.add("hide-element");
    navbarRight.classList.add("hide-element");
    backBtnDiv.classList.add("show-element");
  }
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

// ===================
// On keyboard key up
// ===================
function onKeyUpInputFormNavbar(){
  if(!btnCross.classList.contains("show-btn-cross")){
    btnCross.classList.add("show-btn-cross");
  }
  const searchValue = navbarSearch.value;
  if(searchValue){
    filterSearchedVideos(searchValue);
  }
  else{
    btnCross.classList.remove("show-btn-cross");
    setVideoData(FetchedData.getVideoDataList());
  }
}

// =================================
// On click btn cross on input field
// =================================
function onClickBtnCross(){
  navbarSearch.value = "";
  setVideoData(FetchedData.getVideoDataList());
}
  
// =======================
// On mouse down btn cross
// =======================
function onMouseDownBtnCross(){
  this.classList.add("icon-mousedown-effect");
}
  
// =======================
// On mouse up btn cross
// =======================
function onMouseUpBtnCross(){
  this.classList.remove("icon-mousedown-effect");
    this.classList.add("icon-mouseup-effect");
      setTimeout(()=>{
        this.classList.remove("icon-mouseup-effect");
        this.classList.remove("show-btn-cross");
    }, 100)
}

// =================================
// On click btn back on small screen
// =================================
function onClickBtnBack(){
  setTimeout(()=>{
    removeAddedClasses();
  }, 300);
}
  
// ======================================
// On mouse down btn back on small screen
// ======================================
function onMouseDownBtnBack(){
  this.classList.add("icon-mousedown-effect");
}

// ====================================
// On mouse up btn back on small screen
// ====================================
function onMouseUpBtnBack(){
  this.classList.remove("icon-mousedown-effect");
  this.classList.add("icon-mouseup-effect");
      setTimeout(()=>{
        this.classList.remove("icon-mouseup-effect");
    }, 500)
}

// =========================
// Other Business Logic
// =========================

// ======================================================================
// Remove the added classes when navbar search btn clicked on smallscreen
// ======================================================================
function removeAddedClasses() {
  inputFormNavbar.classList.remove(
    "show-navbar-middle-form",
    "changed-navbar-middle-form"
  );
  sectionNavbar.classList.remove("changed-section-navbar");
  navbarLeft.classList.remove("hide-element");
  navbarRight.classList.remove("hide-element");
  backBtnDiv.classList.remove("show-element");
}

// ======================
// filter searched videos
// ======================
function filterSearchedVideos(searchValue){
  const videoDataList = FetchedData.getVideoDataList();
  const videoItemList = videoDataList.filter((video)=>{
    let title = video.title;
    title = title.toLowerCase();
    if(title.startsWith(searchValue)){
      return video;
    }
  });
  setVideoData(videoItemList);
}

// ===================================
// Setting navbar middle section theme
// ===================================
function setNavbarMiddleTheme(){
  if(isDarkThemeActivated()){
    navbarMiddle.classList.remove("navbar-middle-light-theme");
    navbarSearch.classList.remove("navbar-search-light-theme")
    btnNavbarSearch.classList.remove("navbar-btn-search-light-theme");
    btnNavbarMicrophone.classList.remove("navbar-btn-microphone-light-theme");
  }
  else{
    navbarMiddle.classList.add("navbar-middle-light-theme");
    navbarSearch.classList.add("navbar-search-light-theme");
    btnNavbarSearch.classList.add("navbar-btn-search-light-theme");
    btnNavbarMicrophone.classList.add("navbar-btn-microphone-light-theme");
  }
}

export { initNavbarMiddleEventListeners, setNavbarMiddleTheme }