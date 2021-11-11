import { getElement, getWidth, getAllElementFromElement } from "./utils.js";
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
    }
  } else {
    showOverlay();
  }
}

export function changeLeftMenusSectionOnWindowResize() {
  if (getWidth() > 1312) {
    hideOverlay();
    if (window.getComputedStyle(sectionMenus).display !== "block") {
      // showSectionMenuBig();
      changeNoDataFoundPosition();
    }
  } else {
    // showSectionMenuSmall();
    changeNoDataFoundPosition();
  }
}

export function changeNoDataFoundPosition() {
  if (getWidth() < 1312) {
    if (getWidth() > 950) {
      noDataFound.style.left = "40%";
    } else {
      if (getWidth() > 870) {
        noDataFound.style.left = "35%";
      } else {
        if (getWidth() > 750) {
          noDataFound.style.left = "32%";
        } else {
          if (getWidth() > 600) {
            noDataFound.style.left = "28%";
          } else {
            if (getWidth() > 550) {
              noDataFound.style.left = "23%";
            } else {
              noDataFound.style.left = "18%";
            }
          }
        }
      }
    }
  } else {
    noDataFound.style.left = "45%";
  }
}

// function showSectionMenuBig() {
//   sectionMenus.classList.remove("hide-element");

//   sectionMenusSmall.style.display = "none";
//   sectionVideoFilter.style.width = "calc(100% - 15.75rem)";
//   sectionVideoFilter.style.left = "15rem";
//   sectionVideoContainer.style.padding = "5rem 1.5rem 2rem 16.5rem";
// }

// export function showSectionMenuSmall() {
//   sectionMenus.classList.add("hide-element");

//   // if (getWidth() <= 870) {
//   //   if (getWidth() > 580) {
//   //     sectionVideoContainer.style.padding = "5rem 4rem 2rem 4rem";
//   //   } else {
//   //     sectionVideoContainer.style.padding = "5rem 5rem 2rem 5rem";
//   //   }
//   //   sectionMenusSmall.style.display = "none";
//   //   sectionVideoFilter.style.width = "calc(100% - 0.75rem)";
//   //   sectionVideoFilter.style.left = "0";
//   // } else {
//   //   sectionMenusSmall.style.display = "block";
//   //   sectionVideoFilter.style.width = "calc(100% - 5.25rem)";
//   //   sectionVideoFilter.style.left = "4.5rem";
//   //   sectionVideoContainer.style.padding = "5rem 1.5rem 2rem 6rem";
//   // }
// }

function hideOverlay() {
  overlay.classList.add("hide-overlay");
  sectionMenusOverlay.classList.remove("show-menus-overlay");
}

function showOverlay() {
  overlay.classList.remove("hide-overlay");
  sectionMenusOverlay.classList.add("show-menus-overlay");
}
