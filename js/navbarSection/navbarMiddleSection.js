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

// =========================================
// *********** Event Listeners *************
// =========================================

/**
 * Initialize navbar middle section event listeners
 */
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

// =========================================
// ************ Event Handlers *************
// =========================================

/**
 * When window width is less than 800px, search input hides, only search btn is displayed
 * When search btn is clicked, other elements on navbar hides, only search input gets visible
 */
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
    btnNavbarMicrophone.classList.add("navbar-btn-microphone-small-screen");
  }
}

/**
 * Adding mouse down effect when mouse btn is down on search btn
 */
function onMouseDownBtnNavbarSearch(){
  if(isDarkThemeActivated()){
    this.classList.add("navbar-btn-search-click-effect");
  }
  else{
    this.classList.add("navbar-btn-search-click-effect-light-theme");
  }
}

/**
 * Removing mouse down effect when mouse btn is up
 */
function onMouseUpBtnNavbarSearch(){
  if(isDarkThemeActivated()){
    this.classList.remove("navbar-btn-search-click-effect");
  }
  else{
    this.classList.remove("navbar-btn-search-click-effect-light-theme");
  }
}

/**
 * Adding mouse down effect when mouse btn is down on microphone btn
 */
function onMouseDownBtnNavbarMicrophone(){
  this.classList.add("icon-mousedown-effect");
}
  
/**
 * Removing mouse down effect
 * Adding mouse up effect when mouse btn is up on microphone btn
 */
function onMouseUpBtnNavbarMicrophone(){
  this.classList.remove("icon-mousedown-effect");
    this.classList.add("icon-mouseup-effect");
      setTimeout(()=>{
        this.classList.remove("icon-mouseup-effect");
    }, 500)
}

/**
 * Get input value when keyboard key is up and call filterSearchedVideos() function
 */
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

/**
 * When btn cross is clicked, input field is cleared
 * Set video data to it's initial form
 */
function onClickBtnCross(){
  navbarSearch.value = "";
  setVideoData(FetchedData.getVideoDataList());
}
  
/**
 * Adding mouse down effect when mouse btn is down on cross btn
 */
function onMouseDownBtnCross(){
  this.classList.add("icon-mousedown-effect");
}
  
/**
 * Removing mouse down effect
 * Adding mouse up effect when mouse btn is up on cross btn
 */
function onMouseUpBtnCross(){
  this.classList.remove("icon-mousedown-effect");
    this.classList.add("icon-mouseup-effect");
      setTimeout(()=>{
        this.classList.remove("icon-mouseup-effect");
        this.classList.remove("show-btn-cross");
    }, 100)
}

/**
 * When btn back is clicked input field hide and other element on navbar is shown
 */
function onClickBtnBack(){
  setTimeout(()=>{
    removeAddedClasses();
  }, 300);
}
  
/**
 * Adding mouse down effect when mouse btn is down on back btn
 */
function onMouseDownBtnBack(){
  this.classList.add("icon-mousedown-effect");
}

/**
 * Removing mouse down effect
 * Adding mouse up effect when mouse btn is up on back btn
 */
function onMouseUpBtnBack(){
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
 * Remove the added classes when navbar search btn clicked on smallscreen
 */
function removeAddedClasses() {
  inputFormNavbar.classList.remove(
    "show-navbar-middle-form",
    "changed-navbar-middle-form"
  );
  sectionNavbar.classList.remove("changed-section-navbar");
  navbarLeft.classList.remove("hide-element");
  navbarRight.classList.remove("hide-element");
  backBtnDiv.classList.remove("show-element");
  btnNavbarMicrophone.classList.remove("navbar-btn-microphone-small-screen");
}

/**
 * Filter searched videos according to the search input value 
 * and send video list to main section to display
 * @param {String} searchValue 
 */
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

/**
 * Setting current theme of navbar middle section
 */
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

export { initNavbarMiddleEventListeners, setNavbarMiddleTheme, removeAddedClasses }