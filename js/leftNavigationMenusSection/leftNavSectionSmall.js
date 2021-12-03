import {  
  getElementAll,
  getAllElementFromElement
} from "../utils.js";
import {
  sectionMenuSmall,
  sectionMenus,
  sectionMenusOverlay,
  sectionVideoFilter,
  sectionVideoContainer,
  noDataFound
} from "../staticVariables/svLeftNavSection.js";
import { 
  menusDataList,
  updateSelectionOnBtnClickWithStoringValue,
  updateSelectionOnBtnClick,
  updateSectionMenuData
} from "./leftNavSection.js";
import { isDarkThemeActivated } from "../applicationTheme.js";
import { setMenuSelectionStatus } from "./leftNavSection.js";

/**
 * Initialize section menu small
 */
function initLeftNavSectionSmall() {
  setLeftNavSmallTheme();
  sectionMenuSmall.innerHTML = setSectionMenuSmall();
}

// =========================================
// ************ Event Listeners ************
// =========================================

/**
 * Initializing Section Menu Small Btn Click Event Listener
 */
function initLeftNavSmallEventListeners(){
  sectionMenuSmall.addEventListener("click", (event)=>{
    sectionMenuSmallClickEventHandler(event, sectionMenuSmall);
  })
}

// =========================================
// ************ Event Handlers *************
// =========================================

/**
 * Section Menu Small Btn Click Event Handler
 * @param {Event} event 
 * @param {HTMLElement} sectionMenuSmall 
 */
function sectionMenuSmallClickEventHandler(event, sectionMenuSmall){
  if (event.target.classList.contains("menu-small-div")) {
    sectionMenuSmallBtnClickLogic(event.target, sectionMenuSmall);
  }
  else if (event.target.parentElement.classList.contains("menu-small-div")) {
    sectionMenuSmallBtnClickLogic(event.target.parentElement, sectionMenuSmall);
  }
}

// =========================================
// ******* Business Logic Functions ********
// =========================================

/**
 * Section Menu Small Btn Click Logic
 * @param {HTMLElement} element 
 * @param {HTMLElement} sectionMenuSmall 
 */
function sectionMenuSmallBtnClickLogic(element, sectionMenuSmall){
  let newMenuId, previousMenuId;

  // Section Menu small
  const sectionMenuSmallList = getAllElementFromElement(sectionMenuSmall, ".menu-small-div");

  // remove the previous selected menu from section menu small list
  // set the current selected menu to section menu small list
  const menuIdObj = updateSelectionOnBtnClickWithStoringValue(sectionMenuSmallList, element);
  newMenuId = menuIdObj.newMenuId;
  previousMenuId = menuIdObj.previousMenuId;

  // Section Main Menu
  const sectionMenusList = getAllElementFromElement(sectionMenus, ".menu-div");

  // remove the previous selected menu from section main menu list
  // set the current selected menu to section main menu list
  updateSelectionOnBtnClick(sectionMenusList, element);

  // Section Menu Overlay
  // getting section overlay menus element and list of menu divs
  const sectionMenusOverlayList = getAllElementFromElement(sectionMenusOverlay, ".menu-div");

  // remove previous selection from section menus overlay
  // set current selection to section menus overlay
  updateSelectionOnBtnClick(sectionMenusOverlayList, element);

  // Section Menu Data
  // setting current selection and removing previous selection to menus data list
  updateSectionMenuData(newMenuId, previousMenuId);
}

/**
 * Fetch section menu small items
 * @returns {Array} - Menu data list
 */
function setSectionMenuSmall() {
  return menusDataList
    .map((item) => {
      if (item.id < 5) {
        return `<div class="menu-small-div ${setMenuSelectionStatus(item)}" data-id="${item.id}">
            <i class="${item.logo}"></i>
            <p>${item.text}</p>
          </div>`;
      }
    })
    .join("");
}

/**
 * Show section menu small
 */
function showSectionMenuSmall() {
  sectionMenus.classList.add("hide-element");
  sectionVideoFilter.classList.add("increase-video-filter-width");
  sectionVideoContainer.classList.add("increase-video-container-width");
  sectionMenuSmall.classList.add("show-section-menu-small");
  noDataFound.classList.add("change-no-data-found-position");

  [...getElementAll(".div-video-item")].forEach((videoItem) => {
    videoItem.classList.add("increase-div-video-item");
  });
}

/**
 * Set theme for left navigation small menu
 */
function setLeftNavSmallTheme(){
  if(isDarkThemeActivated()){
    sectionMenuSmall.classList.remove("section-menus-small-light-theme");
  }
  else{
    sectionMenuSmall.classList.add("section-menus-small-light-theme");
  }
  updateSelectedMenuTheme()
}

/**
 * Update selected menu theme
 */
function updateSelectedMenuTheme(){
  const menuList = getAllElementFromElement(sectionMenuSmall, ".menu-small-div");
  menuList.forEach((item)=>{
    if(item.classList.contains("menu-selected") ||
     item.classList.contains("menu-selected-light-theme")){
       if(isDarkThemeActivated()){
         item.classList.remove("menu-selected-light-theme");
         item.classList.add("menu-selected");
       }
       else{
        item.classList.remove("menu-selected");
        item.classList.add("menu-selected-light-theme");
       }
     }
  })
}

export { 
  initLeftNavSectionSmall, 
  initLeftNavSmallEventListeners, 
  showSectionMenuSmall,
  setLeftNavSmallTheme 
}