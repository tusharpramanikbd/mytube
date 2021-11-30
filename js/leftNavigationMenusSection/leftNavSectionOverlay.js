import {  
  getElement,
  getWidth,
  getAllElementFromElement
} from "../utils.js";
import {
  topMenuSectionOverlay,
  middleMenuSectionOverlay,
  subcriptionDivSectionOverlay,
  overlay,
  sectionMenusOverlay,
  sectionMenuSmall,
  overlayToggleBtn
} from "../staticVariables/svLeftNavSection.js";
import {
  setMenuData,
  seeMoreClickEventListener,
  fetchSubscriptionList,
  seeLessClickEventListener,
  updateSelectionOnBtnClickWithStoringValue,
  updateSelectionOnBtnClick,
  updateSectionMenuData
} from "./leftNavSection.js";
import { isDarkThemeActivated } from "../applicationTheme.js";

window.onresize = () => {
  if (getWidth() > 1312) {
    hideSectionMenusOverlay();
  }
};

// ========================================================================
// This function fetch and set the dynamic data on the section menu overlay
// ========================================================================
function initLeftNavSectionOverlay() {
  setLeftNavOverlayTheme();
  topMenuSectionOverlay.innerHTML = setMenuData("top_data");
  middleMenuSectionOverlay.innerHTML = setMenuData("first_half");
  let overlayMenuDivList = getAllElementFromElement(middleMenuSectionOverlay, ".menu-div");
  seeMoreClickEventListener(overlayMenuDivList);
  subcriptionDivSectionOverlay.innerHTML = fetchSubscriptionList();

  function setMiddleMenuOverlaySectionHalfData(data) {
    middleMenuSectionOverlay.innerHTML = data;
    overlayMenuDivList = getAllElementFromElement(
      middleMenuSectionOverlay,
      ".menu-div"
    );
    seeMoreClickEventListener(overlayMenuDivList);
  }

  function setMiddleMenuOverlaySectionFullData(data) {
    middleMenuSectionOverlay.innerHTML = data;
    overlayMenuDivList = getAllElementFromElement(
      middleMenuSectionOverlay,
      ".menu-div"
    );
    seeLessClickEventListener(overlayMenuDivList);
  }

  return {
    setHalfOverlayData: setMiddleMenuOverlaySectionHalfData,
    setFullOverlayData: setMiddleMenuOverlaySectionFullData,
  };
}

// ===============================
// Event Listeners
// ===============================

// =================================================
// Initializing section overlay click event listener
// =================================================
function initLeftNavOverlayEventListeners() {
  overlay.addEventListener("click", () => {
    hideSectionMenusOverlay();
  });

  overlayToggleBtn.addEventListener("click", () => {
    hideSectionMenusOverlay();
  });
}

// ===============================
// Event Handlers
// ===============================

// ============================================
// Section Menu Overlay btn click event handler
// ============================================
function sectionOverlayMenuBtnClickEventHandler(event, sectionOverlayMenu) {
  if (event.target.parentElement.classList.contains("menu-div")) {
    sectionOverlayBtnClickLogic(event.target.parentElement, sectionOverlayMenu);
  }
  else if (event.target.classList.contains("menu-div")) {
    sectionOverlayBtnClickLogic(event.target, sectionOverlayMenu);
  }
}

// =========================================
// Btn click logic
// =========================================

// ====================================
// Section Menu Overlay btn click logic
// ====================================
function sectionOverlayBtnClickLogic(element, sectionOverlayMenu) {
  let newMenuId, previousMenuId;

  // checking if the clicked element is "See more" or "See less" or not
  if (element.dataset.id !== "8" && element.dataset.id !== "11") {

    // Section Menu Overlay
    const sectionOverlayMenuList = getAllElementFromElement(sectionOverlayMenu, ".menu-div");

    // remove the previous selected menu from section menu overlay list
    // set the current selected menu to section menu overlay list
    const menuIdObj = updateSelectionOnBtnClickWithStoringValue(sectionOverlayMenuList, element);
    newMenuId = menuIdObj.newMenuId;
    previousMenuId = menuIdObj.previousMenuId;

    // Section Main Menu
    const sectionMainMenus = getElement(".section-menus");
    const sectionMainMenuList = getAllElementFromElement(sectionMainMenus, ".menu-div");

    // remove the previous selected menu from section main menu list
    // set the current selected menu to section main menu list
    updateSelectionOnBtnClick(sectionMainMenuList, element);

    // Section Menu Small
    const sectionMenuSmallList = getAllElementFromElement(sectionMenuSmall, ".menu-small-div");

    // remove the previous selected menu from section menu small list
    // set the current selected menu to section menu small list
    updateSelectionOnBtnClick(sectionMenuSmallList, element);

    // Section Menu Data
    // setting current selection and removing previous selection to menus data list
    updateSectionMenuData(newMenuId, previousMenuId);
  }
}

// =============================================
// Show section menu overlay on toggle btn click
// =============================================
function showSectionMenusOverlay() {
  overlay.classList.remove("hide-overlay");
  sectionMenusOverlay.classList.add("show-menus-overlay");
}

// =========================
// Hide section menu overlay
// =========================
function hideSectionMenusOverlay() {
  overlay.classList.add("hide-overlay");
  sectionMenusOverlay.classList.remove("show-menus-overlay");
}

// ==========================================
// Set theme for left navigation overlay menu
// ==========================================
function setLeftNavOverlayTheme(){
  if(isDarkThemeActivated()){
    sectionMenusOverlay.classList.remove("section-menus-overlay-light-theme")
    overlayToggleBtn.classList.remove("overlay-toggle-btn-light-theme")
  }
  else{
    sectionMenusOverlay.classList.add("section-menus-overlay-light-theme")
    overlayToggleBtn.classList.add("overlay-toggle-btn-light-theme")
  }
  updateSelectedMenuTheme();
}

// ==========================
// Update selected menu theme
// ==========================
function updateSelectedMenuTheme(){
  const menuList = getAllElementFromElement(sectionMenusOverlay, ".menu-div");
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
  initLeftNavSectionOverlay, 
  initLeftNavOverlayEventListeners, 
  showSectionMenusOverlay, 
  sectionOverlayMenuBtnClickEventHandler,
  setLeftNavOverlayTheme 
}