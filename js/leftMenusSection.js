import {
  getElement,
  getElementAll,
  getWidth,
  getAllElementFromElement,
} from "./utils.js";
import { subscriptionList } from "../asset/subscriptionList.js";
import { fetchJson } from "./fetch.js";

const sectionMenusOverlay = getElement(".section-menus-overlay");
const sectionVideoFilter = getElement(".section-video-filter");
const sectionVideoContainer = getElement(".section-video-container");
const sectionMenus = getElement(".section-menus");
const sectionMenusSmall = getElement(".section-menus-small");
const overlay = getElement(".overlay");
const overlayToggleBtn = getElement(".overlay-toggle-btn");
const noDataFound = getElement(".no-data-found");

const navigationMenuDataUrl = "../asset/navigationMenuData.json";

// Global data list for caching mechanism
let menusDataList;

// ===============================
// Initializing all the components
// ===============================

await fetchJson(navigationMenuDataUrl)
  .then((result) => cacheNavigationMenuData(result))
  .catch((error) => console.log(error));

// =============================
// Caching the fetched menu data
// =============================
function cacheNavigationMenuData(result) {
  menusDataList = result.navigationMenusList;
  initializeEveryThing();
}

// ==========================================================
// Initializing async task of setting data and event listener
// ==========================================================
function initializeEveryThing() {
  const initializeSectionMenuPromise = new Promise((resolve) => {
    initializeSectionMenu();
    resolve();
  });

  const initializeSectionMenuSmallPromise = new Promise((resolve) => {
    initializeSectionMenuSmall();
    resolve();
  });

  const initializeSectionMenuOverlayPromise = new Promise((resolve) => {
    initializeSectionMenuOverlay();
    resolve();
  });

  Promise.all([
    initializeSectionMenuPromise,
    initializeSectionMenuSmallPromise,
    initializeSectionMenuOverlayPromise,
  ])
    .then(() => {
      initializeSectionMenuOverlayEventListeners();
      initializeMenuClickEventListener();
      initializeSectionMenuSmallClickEventListener();
      console.log("Navigation menus functionality initialized...");
    })
    .catch(() => {
      console.log("Something bad happend...");
    });
}

// ===============================
// Event Listeners
// ===============================

// ============================================================================
// Initialize Section main Menu & Section Menu Overlay Btn Click Event Listener
// ============================================================================
function initializeMenuClickEventListener() {
  const sectionMenus = getElement(".section-menus");
  const sectionOverlayMenu = getElement(".section-menus-overlay-bottom");

  sectionMenus.addEventListener("click", (event1) => {
    sectionMainMenuBtnClickEventHandler(event1, sectionMenus);
  });
  sectionMenusOverlay.addEventListener("click", (event2) => {
    sectionOverlayMenuBtnClickEventHandler(event2, sectionOverlayMenu);
  });
}

// =================================================
// Initializing section overlay click event listener
// =================================================
function initializeSectionMenuOverlayEventListeners() {
  overlay.addEventListener("click", () => {
    hideSectionMenusOverlay();
  });

  overlayToggleBtn.addEventListener("click", () => {
    hideSectionMenusOverlay();
  });
}

// ==========================================
// Initializing see more click event listener
// ==========================================
function seeMoreClickEventListener(menuList) {
  menuList.forEach((menu) => {
    menu.addEventListener("click", seeMoreClickEventHandler);
  });
}

// ==========================================
// Initializing see less click event listener
// ==========================================
function seeLessClickEventListener(menuList) {
  menuList.forEach((menu) => {
    menu.addEventListener("click", seeLessClickEventHandler);
  });
}

// ========================================================
// Initializing Section Menu Small Btn Click Event Listener
// ========================================================
function initializeSectionMenuSmallClickEventListener(){
  const sectionMenuSmall = getElement(".section-menus-small");

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

// ===========================
// See more menu event handler
// ===========================
function seeMoreClickEventHandler(event) {
  if (event.currentTarget.innerText === "See More") {
    initializeSectionMenu().setFullData(setMenuData("full_data"));
    initializeSectionMenuOverlay().setFullOverlayData(setMenuData("full_data"));
  }
}

// ===========================
// See less menu event handler
// ===========================
function seeLessClickEventHandler(event) {
  if (event.currentTarget.innerText === "See Less") {
    initializeSectionMenu().setHalfData(setMenuData("first_half"));
    initializeSectionMenuOverlay().setHalfOverlayData(
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
  const sectionMenus = getElement(".section-menus");
  const sectionMenusList = getAllElementFromElement(sectionMenus, ".menu-div");

  // remove the previous selected menu from section main menu list
  // set the current selected menu to section main menu list
  updateSelectionOnBtnClick(sectionMenusList, element);

  // Section Menu Overlay
  // getting section overlay menus element and list of menu divs
  const sectionMenusOverlay = getElement(".section-menus-overlay");
  const sectionMenusOverlayList = getAllElementFromElement(sectionMenusOverlay, ".menu-div");

  // remove previous selection from section menus overlay
  // set current selection to section menus overlay
  updateSelectionOnBtnClick(sectionMenusOverlayList, element);

  // Section Menu Data
  // setting current selection and removing previous selection to menus data list
  updateSectionMenuData(newMenuId, previousMenuId);
}

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
    const sectionOverlayMenu = getElement(".section-menus-overlay-bottom");
    const sectionOverlayMenuList = getAllElementFromElement(sectionOverlayMenu, ".menu-div");

    // remove the previous selected menu from section menu overlay list
    // set the current selected menu to section menu overlay list
    updateSelectionOnBtnClick(sectionOverlayMenuList, element);

    // Section Menu Small
    const sectionMenuSmall = getElement(".section-menus-small");
    const sectionMenuSmallList = getAllElementFromElement(sectionMenuSmall, ".menu-small-div");

    // remove the previous selected menu from section menu small list
    // set the current selected menu to section menu small list
    updateSelectionOnBtnClick(sectionMenuSmallList, element);

    // Section Menu Data
    // setting current selection and removing previous selection to menus data list
    updateSectionMenuData(newMenuId, previousMenuId);
  }
}


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
    const sectionMenuSmall = getElement(".section-menus-small");
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
export function toggleLeftMenusSection() {
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
  sectionMenusSmall.classList.remove("show-section-menu-small");
  noDataFound.classList.remove("change-no-data-found-position");

  [...getElementAll(".div-video-item")].forEach((videoItem) => {
    videoItem.classList.remove("increase-div-video-item");
  });
}

// =======================
// Show section menu small
// =======================
export function showSectionMenuSmall() {
  sectionMenus.classList.add("hide-element");
  sectionVideoFilter.classList.add("increase-video-filter-width");
  sectionVideoContainer.classList.add("increase-video-container-width");
  sectionMenusSmall.classList.add("show-section-menu-small");
  noDataFound.classList.add("change-no-data-found-position");

  [...getElementAll(".div-video-item")].forEach((videoItem) => {
    videoItem.classList.add("increase-div-video-item");
  });
}

// =========================
// Hide section menu overlay
// =========================
export function hideSectionMenusOverlay() {
  overlay.classList.add("hide-overlay");
  sectionMenusOverlay.classList.remove("show-menus-overlay");
}

// =============================================
// Show section menu overlay on toggle btn click
// =============================================
function showSectionMenusOverlay() {
  overlay.classList.remove("hide-overlay");
  sectionMenusOverlay.classList.add("show-menus-overlay");
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
  return subscriptionList
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

// ================================================================
// This function fetch and set the dynamic data on the section menu
// ================================================================
function initializeSectionMenu() {
  const topMenuSection = getElement(".section-menus-div-1");
  topMenuSection.innerHTML = setMenuData("top_data");

  const middleMenuSection = getElement(".section-menus-div-2");
  middleMenuSection.innerHTML = setMenuData("first_half");
  let menuDivList = getAllElementFromElement(middleMenuSection, ".menu-div");
  seeMoreClickEventListener(menuDivList);

  const subcriptionDivSection = getElement(".subscription-div-container");
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

// =============================
// Initialize section menu small
// =============================
function initializeSectionMenuSmall() {
  const sectionMenuSmall = getElement(".section-menus-small");
  sectionMenuSmall.innerHTML = setSectionMenuSmall();
}

// ========================================================================
// This function fetch and set the dynamic data on the section menu overlay
// ========================================================================
function initializeSectionMenuOverlay() {
  const topMenuSectionOverlay = getElement(".section-menus-overlay-div-1");
  topMenuSectionOverlay.innerHTML = setMenuData("top_data");

  const middleMenuSectionOverlay = getElement(".section-menus-overlay-div-2");
  middleMenuSectionOverlay.innerHTML = setMenuData("first_half");
  let overlayMenuDivList = getAllElementFromElement(
    middleMenuSectionOverlay,
    ".menu-div"
  );
  seeMoreClickEventListener(overlayMenuDivList);

  const subcriptionDivSectionOverlay = getElement(
    ".subscription-div-container-overlay"
  );
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
