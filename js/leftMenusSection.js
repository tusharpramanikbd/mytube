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
let menuDivList = null;

// implement middle menu section dynamically
const middleMenuSection = getElement(".section-menus-div-2");

const menuData = navigationMenusList
  .map((item) => {
    if (item.id < 6) {
      return `<div class="menu-div" data-id="${item.id}">
            <i class="${item.logo}"></i>
            <p>${item.text}</p>
          </div>`;
    }
  })
  .join("");

middleMenuSection.innerHTML = menuData;

menuDivList = getAllElementFromElement(middleMenuSection, ".menu-div");

seeMoreClickEventListener();

// Implement subscription div area dynamically
const subcriptionDivSection = getElement(".subscription-div-container");

const subscriptionData = subscriptionList
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

subcriptionDivSection.innerHTML = subscriptionData;

// Event Listeners
overlay.addEventListener("click", () => {
  hideOverlay();
});

overlayToggleBtn.addEventListener("click", () => {
  hideOverlay();
});

function seeMoreClickEventListener() {
  menuDivList.forEach((menuDiv) => {
    menuDiv.addEventListener("click", seeMoreClickEventHandler);
  });
}

function seeMoreClickEventHandler(event) {
  if (event.currentTarget.innerText === "See More") {
    const allMenuData = navigationMenusList
      .map((item) => {
        if (item.id !== 5) {
          return `<div class="menu-div" data-id="${item.id}">
            <i class="${item.logo}"></i>
            <p>${item.text}</p>
          </div>`;
        }
      })
      .join("");

    middleMenuSection.innerHTML = allMenuData;
    menuDivList = getAllElementFromElement(middleMenuSection, ".menu-div");
    seeLessClickEventListener();
  }
}

function seeLessClickEventListener() {
  menuDivList.forEach((menuDiv) => {
    menuDiv.addEventListener("click", seeLessClickEventHandler);
  });
}

function seeLessClickEventHandler(event) {
  if (event.currentTarget.innerText === "See Less") {
    const allMenuData = navigationMenusList
      .map((item) => {
        if (item.id < 6) {
          return `<div class="menu-div" data-id="${item.id}">
              <i class="${item.logo}"></i>
              <p>${item.text}</p>
            </div>`;
        }
      })
      .join("");

    middleMenuSection.innerHTML = allMenuData;
    menuDivList = getAllElementFromElement(middleMenuSection, ".menu-div");
    seeMoreClickEventListener();
  }
}

export function toggleLeftMenusSection() {
  if (getWidth() > 1312) {
    if (window.getComputedStyle(sectionMenus).display === "none") {
      showSectionMenuBig();
    } else {
      showSectionMenuSmall();
    }
  } else {
    showOverlay();
  }
}

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

export function hideOverlay() {
  overlay.classList.add("hide-overlay");
  sectionMenusOverlay.classList.remove("show-menus-overlay");
}

function showOverlay() {
  overlay.classList.remove("hide-overlay");
  sectionMenusOverlay.classList.add("show-menus-overlay");
}
