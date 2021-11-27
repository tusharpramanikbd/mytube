// import { getElement, getElementAll, changeColorFast, getElementFromElement, addPreventDefault } from "./utils.js";
// import { videoOptionMenuItemDataTop, videoOptionMenuItemDataBottom } from "../asset/videoOptionMenuItemData.js";
import { MyStaticClass } from "../myStaticClass.js";
import { getElementAll, getElementFromElement } from "../utils.js";
import { createVideoOptionMenuDiv, removeVideoOptionMenuDiv } from "./videoOptionMenu.js";

let videoOptionMenuId = -1;

// Initialize video item event listeners
function initVideoItemEvenListeners() {
  const videoItemList = [...getElementAll(".div-video-item")];
  videoItemList.forEach((videoItem) => {
    videoItem.addEventListener("mouseover", mouseOverEventHandler);
    videoItem.addEventListener("mouseleave", mouseLeaveEventHandler);
  });
}

// #########################
// Event handler
// #########################

// ===================================
// video item mouse over event handler
// ===================================
function mouseOverEventHandler(event) {
  const element = event.currentTarget;
  
  // show watch later btn
  const btnWatchLater = getElementFromElement(element, ".video-item-overlay-icon-watchlater");
  if (window.getComputedStyle(btnWatchLater).display === "none") {
    btnWatchLater.classList.add("show-element");
  }

  // show add to queue btn
  const btnAddToQueue = getElementFromElement(element, ".video-item-overlay-icon-queue");
  if (window.getComputedStyle(btnAddToQueue).display === "none") {
    btnAddToQueue.classList.add("show-element");
  }

  // show video item option menu btn
  const btnVideoOptionMenu = getElementFromElement(element, ".video-option-menu");
  if (window.getComputedStyle(btnVideoOptionMenu).display === "none") {
    btnVideoOptionMenu.classList.add("show-element");
  }

  // adding event listener when entering into the item
  const divWatchLater = btnWatchLater.parentElement;
  divWatchLater.addEventListener("mouseover", divWatchLaterMouseOverEventHandler);
  divWatchLater.addEventListener("mouseleave", divWatchLaterMouseLeaveEventHandler);
  
  const divAddToQueue = btnAddToQueue.parentElement;
  divAddToQueue.addEventListener("mouseover", divAddToQueueMouseOverEventHandler);
  divAddToQueue.addEventListener("mouseleave", divAddToQueueMouseLeaveEventHandler);

  btnVideoOptionMenu.addEventListener("mousedown", btnVideoOptionMenuMouseDownEventHandler);
  btnVideoOptionMenu.addEventListener("mouseup", btnVideoOptionMenuMouseUpEventHandler);
}

// ====================================
// video item mouse leave event handler
// ====================================
function mouseLeaveEventHandler(event){
  const element = event.currentTarget;
  
  // hide watch later btn
  const btnWatchLater = getElementFromElement(element, ".video-item-overlay-icon-watchlater");
  if (window.getComputedStyle(btnWatchLater).display === "grid") {
    btnWatchLater.classList.remove("show-element");
  }

  // hide add to queue btn
  const btnAddToQueue = getElementFromElement(element, ".video-item-overlay-icon-queue");
  if (window.getComputedStyle(btnAddToQueue).display === "grid") {
    btnAddToQueue.classList.remove("show-element");
  }
  // hide video item option menu btn
  // if video option menu and mouse leave item is same, 
  // then video option menu btn is not removed
  const btnVideoOptionMenu = getElementFromElement(element, ".video-option-menu");
  
  const previousItemId = MyStaticClass.getSavedVideoOptionMenuBtn();
  const currentItem = btnVideoOptionMenu.closest(".div-video-item");
  if(currentItem){
    if(currentItem.dataset.id !== previousItemId){
      if (window.getComputedStyle(btnVideoOptionMenu).display === "grid") {
        btnVideoOptionMenu.classList.remove("show-element");
      }
    }
  }

  // removing event listener when leaving out of the item
  const divWatchLater = btnWatchLater.parentElement;
  divWatchLater.removeEventListener("mouseover", divWatchLaterMouseOverEventHandler);
  divWatchLater.removeEventListener("mouseleave", divWatchLaterMouseLeaveEventHandler);
  
  const divAddToQueue = btnAddToQueue.parentElement;
  divAddToQueue.removeEventListener("mouseover", divAddToQueueMouseOverEventHandler);
  divAddToQueue.removeEventListener("mouseleave", divAddToQueueMouseLeaveEventHandler);

  btnVideoOptionMenu.removeEventListener("mousedown", btnVideoOptionMenuMouseDownEventHandler);
  btnVideoOptionMenu.removeEventListener("mouseup", btnVideoOptionMenuMouseUpEventHandler);
}

// ====================================
// watch later mouse over event handler
// ====================================
function divWatchLaterMouseOverEventHandler(event){
  const bannerWatchLater = event.currentTarget.children[0];
  if(event.target.classList.contains("video-item-overlay-icon-watchlater")){
    bannerWatchLater.classList.add("show-video-item-overlay-banner");
  }
}

// =====================================
// watch later mouse leave event handler
// =====================================
function divWatchLaterMouseLeaveEventHandler(event){
  const bannerWatchLater = event.currentTarget.children[0];
  bannerWatchLater.classList.remove("show-video-item-overlay-banner");
  
}

// =====================================
// add to queue mouse over event handler
// =====================================
function divAddToQueueMouseOverEventHandler(event){
  const bannerAddToQueue = event.currentTarget.children[0];
  if(event.target.classList.contains("video-item-overlay-icon-queue")){
    bannerAddToQueue.classList.add("show-video-item-overlay-banner");
  }
}

// ======================================
// add to queue mouse leave event handler
// ======================================
function divAddToQueueMouseLeaveEventHandler(event){
  const bannerAddToQueue = event.currentTarget.children[0];
  bannerAddToQueue.classList.remove("show-video-item-overlay-banner");
}

// ===============================================
// btn video option menu mouse down event handler
// ===============================================
function btnVideoOptionMenuMouseDownEventHandler(){
  this.classList.add("icon-mousedown-effect");
}

// ===============================================
// btn video option menu mouse up event handler
// ===============================================
function btnVideoOptionMenuMouseUpEventHandler(e){
  this.classList.remove("icon-mousedown-effect");
  this.classList.add("icon-mouseup-effect");
    setTimeout(()=>{
      this.classList.remove("icon-mouseup-effect");
  }, 500);
}

// ===============================================
// btn video option menu click event handler
// ===============================================
// function btnVideoOptionMenuClickEventHandler(e){
  
// }

// ########################
// Business logic functions
// ########################

// ===============================================
// Remove video option menu btn
// ===============================================
function removeVideoOptionMenuIcon(){
  if(MyStaticClass.getPreviousVideoOptionMenuDiv()){
    MyStaticClass.getPreviousVideoOptionMenuDiv().classList.remove("show-element");
    MyStaticClass.setPreviousVideoOptionMenuDiv(null);
  }
}

export { initVideoItemEvenListeners, removeVideoOptionMenuIcon };