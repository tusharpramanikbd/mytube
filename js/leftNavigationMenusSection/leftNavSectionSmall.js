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

// =============================
// Initialize section menu small
// =============================
function initLeftNavSectionSmall() {
  sectionMenuSmall.innerHTML = setSectionMenuSmall();
}

// ===============================
// Event Listeners
// ===============================

// ========================================================
// Initializing Section Menu Small Btn Click Event Listener
// ========================================================
function initLeftNavSmallEventListeners(){
  sectionMenuSmall.addEventListener("click", (event)=>{
    sectionMenuSmallClickEventHandler(event, sectionMenuSmall);
  })
}

// ===============================
// Event Handlers
// ===============================

// ==========================================
// Section Menu Small Btn Click Event Handler
// ==========================================
function sectionMenuSmallClickEventHandler(event, sectionMenuSmall){
  if (event.target.classList.contains("menu-small-div")) {
    sectionMenuSmallBtnClickLogic(event.target, sectionMenuSmall);
  }
  else if (event.target.parentElement.classList.contains("menu-small-div")) {
    sectionMenuSmallBtnClickLogic(event.target.parentElement, sectionMenuSmall);
  }
}

// =========================================
// Btn click logic
// =========================================

// ==================================
// Section Menu Small Btn Click Logic
// ==================================
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

// ================================
// Fetch section menu small items
// ================================
function setSectionMenuSmall() {
  return menusDataList
    .map((item) => {
      if (item.id < 5) {
        return `<div class="menu-small-div ${item.status}" data-id="${item.id}">
            <i class="${item.logo}"></i>
            <p>${item.text}</p>
          </div>`;
      }
    })
    .join("");
}

// =======================
// Show section menu small
// =======================
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

export { initLeftNavSectionSmall, initLeftNavSmallEventListeners, showSectionMenuSmall }