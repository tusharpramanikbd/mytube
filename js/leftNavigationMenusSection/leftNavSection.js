import {  
  getElementAll,
  getWidth,
  getAllElementFromElement
} from "../utils.js";
import {
  topMenuSection,
  middleMenuSection,
  subcriptionDivSection,
  sectionMenuSmall,
  subcriptionDivSectionOverlay,
  sectionOverlayMenu,
  sectionMenus,
  sectionMenusOverlay,
  sectionVideoFilter,
  sectionVideoContainer,
  noDataFound,
} from "../staticVariables/svLeftNavSection.js";
import { FetchedData } from "../myStaticClass.js";
import { 
  initLeftNavSectionSmall,
  initLeftNavSmallEventListeners,
  showSectionMenuSmall 
} from "./leftNavSectionSmall.js";
import {
  initLeftNavSectionOverlay,
  initLeftNavOverlayEventListeners,
  showSectionMenusOverlay,
  sectionOverlayMenuBtnClickEventHandler
} from "./leftNavSectionOverlay.js";
import { isDarkThemeActivated } from "../applicationTheme.js"

// Global data list for caching mechanism
let menusDataList;

// ==========================================================
// Initializing async task of setting data and event listener
// ==========================================================
function initLeftNavigationSection() {
  cacheNavigationMenuData()
  const initLeftNavPromise = new Promise((resolve) => {
    initLeftNavSection();
    resolve();
  });

  const initLeftNavSmallPromise = new Promise((resolve) => {
    initLeftNavSectionSmall();
    resolve();
  });

  const initLeftNavOverlayPromise = new Promise((resolve) => {
    initLeftNavSectionOverlay();
    resolve();
  });

  Promise.all([
    initLeftNavPromise,
    initLeftNavSmallPromise,
    initLeftNavOverlayPromise,
  ])
    .then(() => {
      initLeftNavEventListeners();
      initLeftNavSmallEventListeners();
      initLeftNavOverlayEventListeners();
      console.log("Navigation menus functionality initialized...");
    })
    .catch(() => {
      console.log("Something bad happend...");
    });
}

// =============================
// Caching the fetched menu data
// =============================
function cacheNavigationMenuData() {
  menusDataList = FetchedData.getNavigationMenuDataList();
}

// ===============================
// Event Listeners
// ===============================

// ============================================================================
// Initialize Section main Menu & Section Menu Overlay Btn Click Event Listener
// ============================================================================
function initLeftNavEventListeners() {
  sectionMenus.addEventListener("click", (event1) => {
    sectionMainMenuBtnClickEventHandler(event1, sectionMenus);
  });
  sectionMenusOverlay.addEventListener("click", (event2) => {
    sectionOverlayMenuBtnClickEventHandler(event2, sectionOverlayMenu);
  });
  mouserHoverEventListener();
}

function mouserHoverEventListener(){
  const menuList = getAllElementFromElement(sectionMenus, ".menu-div")
  menuList.forEach((menu)=>{
    menu.addEventListener("mouseenter", onMouseEnterEffect);
    menu.addEventListener("mouseleave", onMouseLeaveEffect);
    menu.addEventListener("mousedown", onMouseDownEffect);
    menu.addEventListener("mouseup", onMouseUpEffect);
  })

  const subscriberList = getAllElementFromElement(subcriptionDivSection, ".div-subscription");
  subscriberList.forEach((item)=>{
    item.addEventListener("mouseenter", onMouseEnterEffect);
    item.addEventListener("mouseleave", onMouseLeaveEffect);
    item.addEventListener("mousedown", onMouseDownEffect);
    item.addEventListener("mouseup", onMouseUpEffect);
  })

  const smallMenuList = getAllElementFromElement(sectionMenuSmall, ".menu-small-div");
  smallMenuList.forEach((item)=>{
    item.addEventListener("mouseenter", onMouseEnterEffect);
    item.addEventListener("mouseleave", onMouseLeaveEffect);
    item.addEventListener("mousedown", onMouseDownEffect);
    item.addEventListener("mouseup", onMouseUpEffect);
  })

  const overlayMenuList = getAllElementFromElement(sectionMenusOverlay, ".menu-div");
  overlayMenuList.forEach((item)=>{
    item.addEventListener("mouseenter", onMouseEnterEffect);
    item.addEventListener("mouseleave", onMouseLeaveEffect);
    item.addEventListener("mousedown", onMouseDownEffect);
    item.addEventListener("mouseup", onMouseUpEffect);
  })

  const overlaySubscriberList = getAllElementFromElement(subcriptionDivSectionOverlay, ".div-subscription");
  overlaySubscriberList.forEach((item)=>{
    item.addEventListener("mouseenter", onMouseEnterEffect);
    item.addEventListener("mouseleave", onMouseLeaveEffect);
    item.addEventListener("mousedown", onMouseDownEffect);
    item.addEventListener("mouseup", onMouseUpEffect);
  })
}

function onMouseDownEffect(){
  this.classList.add("icon-mousedown-effect");
}

function onMouseUpEffect(){
  this.classList.remove("icon-mousedown-effect");
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

// ==========================================
// Initializing see more click event listener
// ==========================================
function seeMoreClickEventListener(menuList) {
  menuList.forEach((menu) => {
    menu.addEventListener("click", seeMoreClickEventHandler);
  });
  mouserHoverEventListener();
}

// ==========================================
// Initializing see less click event listener
// ==========================================
function seeLessClickEventListener(menuList) {
  menuList.forEach((menu) => {
    menu.addEventListener("click", seeLessClickEventHandler);
  });
  mouserHoverEventListener();
}

// ===============================
// Event Handlers
// ===============================

// ===========================
// See more menu event handler
// ===========================
function seeMoreClickEventHandler(event) {
  if (event.currentTarget.innerText === "See More") {
    initLeftNavSection().setFullData(setMenuData("full_data"));
    initLeftNavSectionOverlay().setFullOverlayData(setMenuData("full_data"));
  }
}

// ===========================
// See less menu event handler
// ===========================
function seeLessClickEventHandler(event) {
  if (event.currentTarget.innerText === "See Less") {
    initLeftNavSection().setHalfData(setMenuData("first_half"));
    initLeftNavSectionOverlay().setHalfOverlayData(
      setMenuData("first_half")
    );
  }
}

// =========================================
// Section Main Menu btn click event handler
// =========================================
function sectionMainMenuBtnClickEventHandler(event, sectionMenus) {
  if (event.target.classList.contains("menu-div")) {
    sectionMainBtnClickLogic(event.target, sectionMenus);
  }
  else if (event.target.parentElement.classList.contains("menu-div")) {
    sectionMainBtnClickLogic(event.target.parentElement, sectionMenus);
  }
}

// =========================================
// Btn click logic
// =========================================

// =================================
// Section Main Menu btn click logic
// =================================
function sectionMainBtnClickLogic(element, sectionMenus) {
  let newMenuId, previousMenuId;

  // checking if the clicked element is "See more" or "See less" or not
  if (element.dataset.id !== "8" && element.dataset.id !== "11") {
    // Section Main Menu
    const sectionMainMenuList = getAllElementFromElement(sectionMenus, ".menu-div");

    // remove the previous selected menu from section main menu list
    // set the current selected menu to section main menu list
    const menuIdObj = updateSelectionOnBtnClickWithStoringValue(sectionMainMenuList, element);
    newMenuId = menuIdObj.newMenuId;
    previousMenuId = menuIdObj.previousMenuId;

    // Section Menu Overlay
    const sectionOverlayMenuList = getAllElementFromElement(sectionOverlayMenu, ".menu-div");

    // remove the previous selected menu from section menu overlay list
    // set the current selected menu to section menu overlay list
    updateSelectionOnBtnClick(sectionOverlayMenuList, element);

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

// =====================================
// Toggle left menu section on btn click
// =====================================
function toggleLeftMenusSection() {
  if (getWidth() > 1312) {
    if (window.getComputedStyle(sectionMenus).display === "none") {
      showSectionMenuBig();
    } else {
      showSectionMenuSmall();
    }
  } else {
    showSectionMenusOverlay();
  }
}

// =====================
// Show section menu big
// =====================
function showSectionMenuBig() {
  sectionMenus.classList.remove("hide-element");
  sectionVideoFilter.classList.remove("increase-video-filter-width");
  sectionVideoContainer.classList.remove("increase-video-container-width");
  sectionMenuSmall.classList.remove("show-section-menu-small");
  noDataFound.classList.remove("change-no-data-found-position");

  [...getElementAll(".div-video-item")].forEach((videoItem) => {
    videoItem.classList.remove("increase-div-video-item");
  });
}

// ==================================================
// This function fetch menu data depending on the tag
// ==================================================
function setMenuData(tag) {
  if (tag === "top_data") {
    return menusDataList
      .map((item) => {
        if (item.id < 4) {
          return `<div class="menu-div ${item.status}" data-id="${item.id}">
            <i class="${item.logo}"></i>
            <p>${item.text}</p>
          </div>`;
        }
      })
      .join("");
  } else if (tag === "first_half") {
    return menusDataList
      .map((item) => {
        if (item.id > 3 && item.id < 9) {
          return `<div class="menu-div ${item.status}" data-id="${item.id}">
            <i class="${item.logo}"></i>
            <p>${item.text}</p>
          </div>`;
        }
      })
      .join("");
  } else {
    return menusDataList
      .map((item) => {
        if (item.id > 3 && item.id !== 8) {
          return `<div class="menu-div ${item.status}" data-id="${item.id}">
            <i class="${item.logo}"></i>
            <p>${item.text}</p>
          </div>`;
        }
      })
      .join("");
  }
}

// =========================================
// This function fetch the subscription list
// =========================================
function fetchSubscriptionList() {
  return FetchedData.getSubscriptionDataList()
    .map((item) => {
      return `<div class="div-subscription">
              <img
                src="${item.avater}"
                class="avater-img"
                alt="${item.name}"
              />
              <p>${item.name}</p>
            </div>`;
    })
    .join("");
}

// ================================================================
// This function fetch and set the dynamic data on the section menu
// ================================================================
function initLeftNavSection() {
  topMenuSection.innerHTML = setMenuData("top_data");
  middleMenuSection.innerHTML = setMenuData("first_half");
  let menuDivList = getAllElementFromElement(middleMenuSection, ".menu-div");
  seeMoreClickEventListener(menuDivList);
  subcriptionDivSection.innerHTML = fetchSubscriptionList();

  function setMiddleMenuSectionHalfData(data) {
    middleMenuSection.innerHTML = data;
    menuDivList = getAllElementFromElement(middleMenuSection, ".menu-div");
    seeMoreClickEventListener(menuDivList);
  }

  function setMiddleMenuSectionFullData(data) {
    middleMenuSection.innerHTML = data;
    menuDivList = getAllElementFromElement(middleMenuSection, ".menu-div");
    seeLessClickEventListener(menuDivList);
  }

  return {
    setHalfData: setMiddleMenuSectionHalfData,
    setFullData: setMiddleMenuSectionFullData,
  };
}

// ================
// Update functions
// ================

// ==================================
// Update menu selection on btn click
// ==================================
function updateSelectionOnBtnClick(menuList, element){
  menuList.map((menu) => {
    if (menu.classList.contains("menu-selected")) {
      menu.classList.remove("menu-selected");
    }
    if (element.dataset.id === menu.dataset.id) {
      menu.classList.add("menu-selected");
    }
  });
}

// ============================================================
// Update menu selection on btn click with returning section id
// ============================================================
function updateSelectionOnBtnClickWithStoringValue(menuList, element){
  let newMenuId, previousMenuId;
  menuList.map((menu) => {
    if (menu.classList.contains("menu-selected")) {
      menu.classList.remove("menu-selected");
      previousMenuId = menu.dataset.id;
    }
    if (element.dataset.id === menu.dataset.id) {
      menu.classList.add("menu-selected");
      newMenuId = menu.dataset.id;
    }
  });

  return {
    newMenuId : newMenuId,
    previousMenuId: previousMenuId
  }
}

// ========================
// Update section menu data
// ========================
function updateSectionMenuData(newMenuId, previousMenuId){
  const tmpMenusDataList = menusDataList.map((item) => {
    if (item.id.toString() === newMenuId) {
      item.status = "menu-selected";
    }
    if (item.id.toString() === previousMenuId) {
      item.status = "";
    }
    return item;
  });
  menusDataList = tmpMenusDataList;
}


export { 
  showSectionMenuSmall,
  initLeftNavigationSection,
  toggleLeftMenusSection,
  menusDataList,
  updateSelectionOnBtnClickWithStoringValue,
  updateSelectionOnBtnClick,
  updateSectionMenuData,
  setMenuData,
  seeMoreClickEventListener,
  seeLessClickEventListener,
  fetchSubscriptionList,
 }