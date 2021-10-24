import { getElement } from "./utils.js";

const navbarToggleBtn = getElement(".navbar-toggle-btn");
const sectionMenus = getElement(".section-menus");
const sectionMenusSmall = getElement(".section-menus-small");
const sectionVideoFilter = getElement(".section-video-filter");
const sectionVideoContainer = getElement(".section-video-container");
const overlayToggleBtn = getElement(".overlay-toggle-btn");
const sectionMenusOverlay = getElement(".section-menus-overlay");
const overlay = getElement(".overlay");

navbarToggleBtn.addEventListener("click", () => {
  changeColor(navbarToggleBtn);
  if (getWidth() > 1312) {
    if (sectionMenus.style.display === "none") {
      showSectionMenuBig();
    } else {
      showSectionMenuSmall();
    }
  } else {
    showOverlay();
  }
});

overlay.addEventListener("click", () => {
  hideOverlay();
});

overlayToggleBtn.addEventListener("click", () => {
  hideOverlay();
});

window.onresize = () => {
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
};

function changeColor(element) {
  element.style.backgroundColor = "#5f5e5e";
  setTimeout(() => {
    element.style.backgroundColor = "transparent";
  }, 400);
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function showSectionMenuBig() {
  sectionMenus.style.display = "block";
  sectionMenusSmall.style.display = "none";
  sectionVideoFilter.style.width = "calc(100% - 15.75rem)";
  sectionVideoFilter.style.left = "15rem";
  sectionVideoContainer.style.padding = "8.5rem 1.5rem 2rem 16.5rem";
}

function showSectionMenuSmall() {
  sectionMenus.style.display = "none";
  sectionMenusSmall.style.display = "block";
  sectionVideoFilter.style.width = "calc(100% - 5.25rem)";
  sectionVideoFilter.style.left = "4.5rem";
  sectionVideoContainer.style.padding = "8.5rem 1.5rem 2rem 6rem";
}

function hideOverlay() {
  overlay.classList.add("hide-overlay");
  sectionMenusOverlay.classList.remove("show-menus-overlay");
}

function showOverlay() {
  overlay.classList.remove("hide-overlay");
  sectionMenusOverlay.classList.add("show-menus-overlay");
}
