import {
  getElement,
  getElementAll,
  getWidth,
  getAllElementFromElement,
} from "./utils.js";
import { navigationMenusList } from "../asset/navigationMenus.js";
import { subscriptionList } from "../asset/subscriptionList.js";

const sectionMenusOverlay = getElement(".section-menus-overlay");
const sectionVideoFilter = getElement(".section-video-filter");
const sectionVideoContainer = getElement(".section-video-container");
const sectionMenus = getElement(".section-menus");
const sectionMenusSmall = getElement(".section-menus-small");
const overlay = getElement(".overlay");
const overlayToggleBtn = getElement(".overlay-toggle-btn");
const noDataFound = getElement(".no-data-found");

// ===============================
// Initializing all the components
// ===============================
initializeSectionMenu();

initializeSectionMenuOverlay();

initializeEventListeners();

// ===============================
// Event Listeners
// ===============================
function initializeEventListeners() {
  overlay.addEventListener("click", () => {
    hideSectionMenusOverlay();
  });

  overlayToggleBtn.addEventListener("click", () => {
    hideSectionMenusOverlay();
  });
}

function seeMoreClickEventListener(menuList) {
  menuList.forEach((menu) => {
    menu.addEventListener("click", seeMoreClickEventHandler);
  });
}

function seeLessClickEventListener(menuList) {
  menuList.forEach((menu) => {
    menu.addEventListener("click", seeLessClickEventHandler);
  });
}

// ===============================
// Event Handlers
// ===============================

// ===========================
// See more menu event handler
// ===========================
function seeMoreClickEventHandler(event) {
  if (event.currentTarget.innerText === "See More") {
    if (
      event.currentTarget.parentElement.classList.contains(
        "section-menus-div-2"
      )
    ) {
      initializeSectionMenu().setFullData(fetchMenuData("full_data"));
    } else {
      initializeSectionMenuOverlay().setFullOverlayData(
        fetchMenuData("full_data")
      );
    }
  }
}

// ===========================
// See less menu event handler
// ===========================
function seeLessClickEventHandler(event) {
  if (event.currentTarget.innerText === "See Less") {
    if (
      event.currentTarget.parentElement.classList.contains(
        "section-menus-div-2"
      )
    ) {
      initializeSectionMenu().setHalfData(fetchMenuData("first_half"));
    } else {
      initializeSectionMenuOverlay().setHalfOverlayData(
        fetchMenuData("first_half")
      );
    }
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
function fetchMenuData(tag) {
  if (tag === "first_half") {
    return navigationMenusList
      .map((item) => {
        if (item.id < 6) {
          return `<div class="menu-div" data-id="${item.id}">
            <i class="${item.logo}"></i>
            <p>${item.text}</p>
          </div>`;
        }
      })
      .join("");
  } else {
    return navigationMenusList
      .map((item) => {
        if (item.id !== 5) {
          return `<div class="menu-div" data-id="${item.id}">
            <i class="${item.logo}"></i>
            <p>${item.text}</p>
          </div>`;
        }
      })
      .join("");
  }
}

// ================================================================
// This function fetch the subscription list
// ================================================================
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

// ================================================================
// This function fetch and set the dynamic data on the section menu
// ================================================================
function initializeSectionMenu() {
  const middleMenuSection = getElement(".section-menus-div-2");
  middleMenuSection.innerHTML = fetchMenuData("first_half");
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

// ========================================================================
// This function fetch and set the dynamic data on the section menu overlay
// ========================================================================
function initializeSectionMenuOverlay() {
  const middleMenuSectionOverlay = getElement(".section-menus-overlay-div-2");
  middleMenuSectionOverlay.innerHTML = fetchMenuData("first_half");
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
