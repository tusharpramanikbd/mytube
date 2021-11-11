import {
  getElement,
  getElementAll,
  changeColorFast,
  getElementFromElement,
  addPreventDefault,
} from "./utils.js";
import {
  videoOptionMenuItemDataTop,
  videoOptionMenuItemDataBottom,
} from "../asset/videoOptionMenuItemData.js";
import { MyStaticClass } from "./myStaticClass.js";

let videoOptionMenuId;

function initializeVideoItemEvenListeners() {
  videoOptionMenuId = -1;

  const videoItemList = [...getElementAll(".div-video-item")];

  videoItemList.forEach((videoItem) => {
    videoItem.addEventListener("mouseover", mouseOverEventHandler, false);
    videoItem.addEventListener("mouseleave", mouseLeaveEventHandler, false);
    videoItem.addEventListener("click", videoItemClickEventHandler, false);
  });
}

// ===============================
// Video Item Click event listener
// ===============================
function videoItemClickEventHandler(event) {
  const elem = getElement(".section-video-container");
  const mainSection = getElement(".section-main");

  // when video option menu icon is clicked mouse wheel mechanism is forcefully disabled
  mainSection.addEventListener("wheel", addPreventDefault);

  // calculating the height and width of clicked position
  const widthDifference = elem.offsetWidth - event.clientX;
  const heightDifference = elem.offsetHeight - event.clientY;

  setupDynamicVideoOptionMenu(event, widthDifference, heightDifference);
}

// =========================
// Mouse over event listener
// =========================
function mouseOverEventHandler(event) {
  const item = event.currentTarget;

  // Video item top area
  const childElementsOfVideoItemTop = getElementFromElement(
    item,
    ".section-video-img-div"
  );

  // watch latter btn
  const watchLaterBtn = getElementFromElement(
    childElementsOfVideoItemTop,
    ".video-item-overlay-icon-watchlater"
  );

  if (window.getComputedStyle(watchLaterBtn).display === "none") {
    watchLaterBtn.style.display = "grid";
  }

  // Add to queue btn
  const addToQueueBtn = getElementFromElement(
    childElementsOfVideoItemTop,
    ".video-item-overlay-icon-queue"
  );

  if (window.getComputedStyle(addToQueueBtn).display === "none") {
    addToQueueBtn.style.display = "grid";
  }

  // video item bottom area
  const childElementsOfVideoItemBottom = getElementFromElement(
    item,
    ".section-video-info-div"
  );

  // watch latter btn
  const VideoOptionMenuBtn = getElementFromElement(
    childElementsOfVideoItemBottom,
    ".video-option-menu"
  );

  if (window.getComputedStyle(VideoOptionMenuBtn).display === "none") {
    VideoOptionMenuBtn.classList.add("video-option-menu-show");
  }

  // watch later hover event listener
  if (
    event.target.classList.contains("video-item-overlay-icon-watchlater") ||
    event.target.classList.contains("show-watch-later")
  ) {
    const watchlaterBanner = getElementFromElement(item, ".hide-watch-later");
    if (!watchlaterBanner.classList.contains("show-watch-later")) {
      watchlaterBanner.classList.add("show-watch-later");
    }
  } else {
    const watchlaterBanner = getElementFromElement(item, ".hide-watch-later");
    if (watchlaterBanner.classList.contains("show-watch-later")) {
      watchlaterBanner.classList.remove("show-watch-later");
    }
  }

  // add to queue hover event listener
  if (
    event.target.classList.contains("video-item-overlay-icon-queue") ||
    event.target.classList.contains("show-add-to-queue")
  ) {
    const addToQueueBanner = getElementFromElement(item, ".hide-add-to-queue");
    if (!addToQueueBanner.classList.contains("show-add-to-queue")) {
      addToQueueBanner.classList.add("show-add-to-queue");
    }
  } else {
    const addToQueueBanner = getElementFromElement(item, ".hide-add-to-queue");
    if (addToQueueBanner.classList.contains("show-add-to-queue")) {
      addToQueueBanner.classList.remove("show-add-to-queue");
    }
  }
}

// ==========================
// Mouse leave event listener
// ==========================
function mouseLeaveEventHandler(event) {
  const item = event.currentTarget;

  // Video item top area
  const childElementsOfVideoItemTop = getElementFromElement(
    item,
    ".section-video-img-div"
  );

  // watch latter btn
  const watchLaterBtn = getElementFromElement(
    childElementsOfVideoItemTop,
    ".video-item-overlay-icon-watchlater"
  );
  if (window.getComputedStyle(watchLaterBtn).display === "grid") {
    watchLaterBtn.style.display = "none";
  }

  // Add to queue btn
  const addToQueueBtn = getElementFromElement(
    childElementsOfVideoItemTop,
    ".video-item-overlay-icon-queue"
  );
  if (window.getComputedStyle(addToQueueBtn).display === "grid") {
    addToQueueBtn.style.display = "none";
  }

  // video item bottom area
  const childElementsOfVideoItemBottom = getElementFromElement(
    item,
    ".section-video-info-div"
  );

  // video option menu icon
  const VideoOptionMenuBtn = getElementFromElement(
    childElementsOfVideoItemBottom,
    ".video-option-menu"
  );

  if (videoOptionMenuId === item.dataset.id) {
    VideoOptionMenuBtn.classList.add("video-option-menu-show");
  } else {
    VideoOptionMenuBtn.classList.remove("video-option-menu-show");
  }

  // remove watch later and add to queue banner on mouse leave
  const watchlaterBanner = getElementFromElement(item, ".hide-watch-later");
  if (watchlaterBanner.classList.contains("show-watch-later")) {
    watchlaterBanner.classList.remove("show-watch-later");
  }
  const addToQueueBanner = getElementFromElement(item, ".hide-add-to-queue");
  if (addToQueueBanner.classList.contains("show-add-to-queue")) {
    addToQueueBanner.classList.remove("show-add-to-queue");
  }
}

// ================================
// Setup Dynamic Video Option Menu
// ================================
function setupDynamicVideoOptionMenu(event, widthDifference, heightDifference) {
  if (event.target.classList.contains("video-option-menu")) {
    const videoOptionMenuBtn = event.target;
    let videoItemDiv = event.currentTarget;
    const priviousVideoOptionMenuDiv = document.querySelector(
      ".video-option-menu-div"
    );

    if (
      priviousVideoOptionMenuDiv &&
      priviousVideoOptionMenuDiv.dataset.id === videoItemDiv.dataset.id
    ) {
      if (!event.target.classList.contains("video-option-menu-div")) {
        changeColorFast(event.target);
        removeVideoOptionMenuDiv(videoOptionMenuBtn);
        const mainSection = getElement(".section-main");
        // here its removing the prevent default
        mainSection.removeEventListener("wheel", addPreventDefault);
      }
    } else {
      changeColorFast(event.target);
      if (MyStaticClass.getPreviousVideoOptionMenuDiv() !== null) {
        removeVideoOptionMenuDiv(MyStaticClass.getPreviousVideoOptionMenuDiv());
      }

      // create new Video Option Menu div
      createVideoOptionMenuDiv(
        videoOptionMenuBtn,
        videoItemDiv,
        heightDifference,
        widthDifference
      );

      if (MyStaticClass.getSavedVideoOptionMenuBtn()) {
        MyStaticClass.getSavedVideoOptionMenuBtn().classList.remove(
          "video-option-menu-show"
        );
      }

      MyStaticClass.setPreviousVideoOptionMenuDiv(videoOptionMenuBtn);
      videoOptionMenuId = videoItemDiv.dataset.id;
      MyStaticClass.setSavedVideoOptionMenuBtn(event.target);
    }
  }
}

// ============================
// Create Video Option Menu Div
// ============================
function createVideoOptionMenuDiv(
  videoOptionMenuBtn,
  videoItemDiv,
  heightDifference,
  widthDifference
) {
  const videoOptionMenuDiv = document.createElement("div");
  videoOptionMenuDiv.classList.add("video-option-menu-div");
  videoOptionMenuDiv.setAttribute("data-id", `${videoItemDiv.dataset.id}`);

  if (heightDifference < 250) {
    videoOptionMenuDiv.style.top = `-260px`;
  } else {
    videoOptionMenuDiv.style.top = `35px`;
  }

  if (widthDifference < 150) {
    videoOptionMenuDiv.style.left = `-260px`;
  } else {
    videoOptionMenuDiv.style.left = `0`;
  }

  // append to video option menu
  videoOptionMenuBtn.appendChild(videoOptionMenuDiv);
  displayVideoOptionMenuData(videoOptionMenuDiv);
}

// ==============================
// Display Video Option Menu Data
// ==============================
function displayVideoOptionMenuData(videoOptionMenuDiv) {
  const videoOptionMenuDivTop = createMenuItems(
    "video-option-menu-div-item-top",
    videoOptionMenuItemDataTop
  );
  const videoOptionMenuDivBottom = createMenuItems(
    "video-option-menu-div-item-bottom",
    videoOptionMenuItemDataBottom
  );
  // append to video option menu div
  videoOptionMenuDiv.appendChild(videoOptionMenuDivTop);
  videoOptionMenuDiv.appendChild(videoOptionMenuDivBottom);

  // initializing video option menu item mouse down event listener
  [...getElementAll(".video-option-menu-item")].forEach((item) => {
    item.addEventListener("mousedown", (event) => {
      if (
        event.target.parentElement.classList.contains("video-option-menu-item")
      ) {
        event.target.parentElement.style.backgroundColor = "rgb(109, 109, 109)";
      }
    });
  });
}

// =================
// Create menu items
// =================
function createMenuItems(className, dataList) {
  const element = document.createElement("div");
  element.classList.add(className);
  const data = dataList
    .map((item) => {
      return `<div class="video-option-menu-item" data-id="${item.id}">
    <i class="${item.logo}"></i>
    <p>${item.text}</p>
    </div>`;
    })
    .join("");

  element.innerHTML = data;
  return element;
}

// ============================
// Remove video option menu div
// ============================
function removeVideoOptionMenuDiv(videoOptionMenuBtn) {
  const child = getElement(".video-option-menu-div");
  videoOptionMenuBtn.removeChild(child);
  MyStaticClass.setPreviousVideoOptionMenuDiv(null);
  videoOptionMenuId = -1;
}

export { initializeVideoItemEvenListeners, removeVideoOptionMenuDiv };
