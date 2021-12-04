import { isDarkThemeActivated } from "../applicationTheme.js";
import { FetchedData, MyStaticClass } from "../myStaticClass.js";
import { mainSection, sectionVideos } from "../staticVariables/svMainVideoSection.js";
import { addPreventDefault, getElement, getAllElementFromElement } from "../utils.js";
import { removeVideoOptionMenuIcon } from "./videoItem.js";

let videoOptionMenuItemDataTop, videoOptionMenuItemDataBottom, sectionVideoInfoDivTop, clickedElementId, videoOptionMenuDiv;

// =========================================
// ************ Event Listeners ************
// =========================================

/**
 * Initialize video option menu listener
 */
function initVideoOptionMenuHoverEventListener(){
  const menus = getAllElementFromElement(videoOptionMenuDiv, ".video-option-menu-item");
  menus.forEach((menu)=>{
    menu.addEventListener("mouseenter", onMouseEnterMenu);
    menu.addEventListener("mouseleave", onMouseLeaveMenu);
  })
}

// =========================================
// ************ Event Handlers *************
// =========================================

/**
 * Add effect on mouse enter
 */
function onMouseEnterMenu(e){
  if(isDarkThemeActivated()){
    e.currentTarget.classList.add("video-option-menu-item-hover-dark");
  }
  else{
    e.currentTarget.classList.add("video-option-menu-item-hover-light");
  }
}

/**
 * Remove effect on mouse leave
 */
function onMouseLeaveMenu(e){
  if(isDarkThemeActivated()){
    e.currentTarget.classList.remove("video-option-menu-item-hover-dark");
  }
  else{
    e.currentTarget.classList.remove("video-option-menu-item-hover-light");
  }
}

// =========================================
// ******* Business Logic Functions ********
// =========================================

/**
 * Create Video Option Menu Div
 * @param {HTMLElement} element 
 * @param {Event} event 
 */
function createVideoOptionMenuDiv(element, event){
    clearPreviousData();
    // when video option menu icon is clicked mouse wheel mechanism is forcefully disabled
    sectionVideos.addEventListener("wheel", addPreventDefault);

    // removing previously selected video option menu btn if any
    if(MyStaticClass.getPreviousVideoOptionMenuDiv()){
      removeVideoOptionMenuIcon();
    }
    // console.log(element);
    clickedElementId = element.parentElement.parentElement.parentElement.dataset.id;
    MyStaticClass.setSavedVideoOptionMenuBtn(clickedElementId);
    MyStaticClass.setPreviousVideoOptionMenuDiv(element);
    sectionVideoInfoDivTop = element.parentElement;

    // calculating the height and width of clicked position
    const widthDifference = document.body.offsetWidth - event.clientX;
    const heightDifference = document.body.offsetHeight - event.clientY;

    videoOptionMenuDiv = document.createElement("div");
    videoOptionMenuDiv.classList.add("video-option-menu-div");
    videoOptionMenuDiv.setAttribute("data-id", clickedElementId);

    const divVideoItem = getElement(".div-video-item");
    const videoItemWidth = parseInt(window.getComputedStyle(divVideoItem).width);
    const videoItemHeight = parseInt(window.getComputedStyle(divVideoItem).height);

    if(widthDifference < 110){
      videoOptionMenuDiv.style.left = `${videoItemWidth - 255}px`;
    }
    else{
      videoOptionMenuDiv.style.left = `${videoItemWidth + 10}px`;
    }
    if(heightDifference < 110){
      videoOptionMenuDiv.style.top = `${videoItemHeight - (videoItemHeight + 230)}px`;;
    }

    // append to video option menu
    sectionVideoInfoDivTop.appendChild(videoOptionMenuDiv);
    displayVideoOptionMenuData(videoOptionMenuDiv);
}

/**
 * Display Video Option Menu Data
 * @param {HTMLElement} videoOptionMenuDiv 
 */
function displayVideoOptionMenuData(videoOptionMenuDiv) {
    prepareDataForMenuItems();
    
    const videoOptionMenuDivTop = createMenuItems( "video-option-menu-div-item-top", videoOptionMenuItemDataTop );
    const videoOptionMenuDivBottom = createMenuItems( "video-option-menu-div-item-bottom", videoOptionMenuItemDataBottom );
    
    // append to video option menu div
    videoOptionMenuDiv.appendChild(videoOptionMenuDivTop);
    videoOptionMenuDiv.appendChild(videoOptionMenuDivBottom);

    // Initalizing video option menu div theme
    setVideoOptionMenuTheme();

    // Initializing video option menus hover event listener
    initVideoOptionMenuHoverEventListener();
}

/**
 * Remove video option menu div
 */
function removeVideoOptionMenuDiv() {
  if(sectionVideoInfoDivTop){
    const element = sectionVideoInfoDivTop.children[3];
    sectionVideoInfoDivTop.removeChild(element);
    sectionVideos.removeEventListener("wheel", addPreventDefault);
    MyStaticClass.setSavedVideoOptionMenuBtn(null);
  }
}

/**
 * Create menu items
 * @param {String} className 
 * @param {Array} dataList 
 * @returns {HTMLElement}
 */
function createMenuItems(className, dataList) {
    const element = document.createElement("div");
    element.classList.add(className);
    const data = dataList
      .map((item) => {
        return `<div class="video-option-menu-item" data-id="${item.id}">
      <i class="${item.logo}"></i>
      <p>${item.text}</p>
      </div>`;
      })
      .join("");
  
    element.innerHTML = data;
    return element;
}

/**
 * Prepare data for video option menu items
 */
function prepareDataForMenuItems(){
    const dataList = FetchedData.getVideoOptionMenuDataList();
    dataList.forEach((item)=>{
        if(item.id > 0 && item.id < 4){
            videoOptionMenuItemDataTop.push(item);
        }
        if(item.id > 3 && item.id < 7){
            videoOptionMenuItemDataBottom.push(item);
        }
    })

}

/**
 * Clear previously saved data on global variables
 */
 function clearPreviousData(){
  videoOptionMenuItemDataTop = [];
  videoOptionMenuItemDataBottom = [];
  sectionVideoInfoDivTop = null;
  clickedElementId = -1;
}

/**
 * Set current theme of video option menu
 */
function setVideoOptionMenuTheme(){
  if(isDarkThemeActivated()){
    videoOptionMenuDiv.classList.remove("video-option-menu-div-light-theme");
    videoOptionMenuDiv.children[1].classList.remove("video-option-menu-div-item-bottom-light-theme");
  }
  else{
    videoOptionMenuDiv.classList.add("video-option-menu-div-light-theme");
    videoOptionMenuDiv.children[1].classList.add("video-option-menu-div-item-bottom-light-theme");
  }
}

export { createVideoOptionMenuDiv, removeVideoOptionMenuDiv }