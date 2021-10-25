import { getElement, getWidth } from "./utils.js";

const sectionMenusOverlay = getElement(".section-menus-overlay");
const sectionVideoFilter = getElement(".section-video-filter");
const sectionVideoContainer = getElement(".section-video-container");
const sectionMenus = getElement(".section-menus");
const sectionMenusSmall = getElement(".section-menus-small");
const overlay = getElement(".overlay");
const overlayToggleBtn = getElement(".overlay-toggle-btn");

overlay.addEventListener("click", () => {
  hideOverlay();
});

overlayToggleBtn.addEventListener("click", () => {
  hideOverlay();
});

export function toggleLeftMenusSection() {
  if (getWidth() > 1312) {
    if (sectionMenus.style.display === "none") {
      showSectionMenuBig();
    } else {
      showSectionMenuSmall();
    }
  } else {
    showOverlay();
  }
}

export function changeLeftMenusSectionOnWindowResize() {
  if (getWidth() > 1312) {
    hideOverlay();
    if (sectionMenus.style.display !== "block") {
      showSectionMenuBig();
    }
  } else {
    if (sectionMenusSmall.style.display !== "block") {
      showSectionMenuSmall();
    }
  }
}

function showSectionMenuBig() {
  sectionMenus.style.display = "block";
  sectionMenusSmall.style.display = "none";
  sectionVideoFilter.style.width = "calc(100% - 15.75rem)";
  sectionVideoFilter.style.left = "15rem";
  sectionVideoContainer.style.padding = "4.5rem 1.5rem 2rem 16.5rem";
}

function showSectionMenuSmall() {
  sectionMenus.style.display = "none";
  sectionMenusSmall.style.display = "block";
  sectionVideoFilter.style.width = "calc(100% - 5.25rem)";
  sectionVideoFilter.style.left = "4.5rem";
  sectionVideoContainer.style.padding = "4.5rem 1.5rem 2rem 6rem";
}

function hideOverlay() {
  overlay.classList.add("hide-overlay");
  sectionMenusOverlay.classList.remove("show-menus-overlay");
}

function showOverlay() {
  overlay.classList.remove("hide-overlay");
  sectionMenusOverlay.classList.add("show-menus-overlay");
}
