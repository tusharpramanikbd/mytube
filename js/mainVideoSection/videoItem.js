import { MyStaticClass } from "../myStaticClass.js";
import { getElementAll, getElementFromElement } from "../utils.js";

// =========================================
// ************ Event Listeners ************
// =========================================

/**
 * Initialize video item event listeners
 */
function initVideoItemEvenListeners() {
  const videoItemList = [...getElementAll(".div-video-item")];
  videoItemList.forEach((videoItem) => {
    videoItem.addEventListener("mouseover", mouseOverEventHandler);
    videoItem.addEventListener("mouseleave", mouseLeaveEventHandler);
  });
}

// =========================================
// ************ Event Handlers *************
// =========================================

/**
 * Video item mouse over event handler
 * @param {Event} event 
 */
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

/**
 * Video item mouse leave event handler
 * @param {Event} event 
 */
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

/**
 * Watch later mouse over event handler
 * @param {Event} event 
 */
function divWatchLaterMouseOverEventHandler(event){
  const bannerWatchLater = event.currentTarget.children[0];
  if(event.target.classList.contains("video-item-overlay-icon-watchlater")){
    bannerWatchLater.classList.add("show-video-item-overlay-banner");
  }
}

/**
 * Watch later mouse leave event handler
 * @param {Event} event 
 */
function divWatchLaterMouseLeaveEventHandler(event){
  const bannerWatchLater = event.currentTarget.children[0];
  bannerWatchLater.classList.remove("show-video-item-overlay-banner");
  
}

/**
 * Add to queue mouse over event handler
 * @param {Event} event 
 */
function divAddToQueueMouseOverEventHandler(event){
  const bannerAddToQueue = event.currentTarget.children[0];
  if(event.target.classList.contains("video-item-overlay-icon-queue")){
    bannerAddToQueue.classList.add("show-video-item-overlay-banner");
  }
}

/**
 * Add to queue mouse leave event handler
 * @param {Event} event 
 */
function divAddToQueueMouseLeaveEventHandler(event){
  const bannerAddToQueue = event.currentTarget.children[0];
  bannerAddToQueue.classList.remove("show-video-item-overlay-banner");
}

/**
 * Btn video option menu mouse down event handler
 */
function btnVideoOptionMenuMouseDownEventHandler(){
  this.classList.add("icon-mousedown-effect");
}

/**
 * Btn video option menu mouse up event handler
 */
function btnVideoOptionMenuMouseUpEventHandler(){
  this.classList.remove("icon-mousedown-effect");
  this.classList.add("icon-mouseup-effect");
    setTimeout(()=>{
      this.classList.remove("icon-mouseup-effect");
  }, 500);
}

// =========================================
// ******* Business Logic Functions ********
// =========================================

/**
 * Remove video option menu btn
 */
function removeVideoOptionMenuIcon(){
  if(MyStaticClass.getPreviousVideoOptionMenuDiv()){
    MyStaticClass.getPreviousVideoOptionMenuDiv().classList.remove("show-element");
    MyStaticClass.setPreviousVideoOptionMenuDiv(null);
  }
}

export { initVideoItemEvenListeners, removeVideoOptionMenuIcon };
