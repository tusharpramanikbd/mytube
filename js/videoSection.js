// Importing the functions from other modules
import {
  getElement,
  getElementAll,
  changeColorFast,
  getElementFromElement,
  addPreventDefault,
} from "./utils.js";
import {
  convertHMS,
  startTimeCalculation,
  calculateTimeFromDate,
} from "./timeDateCalculation.js";
import { fetchJson } from "./fetch.js";

// creating some global variable
let videoOptionMenuId = -1;
let previousVideoOptionMenuDiv = null;
let savedVideoOptionMenuBtn = null;

// ===============================================
// fetching all the video item data from JSON file
// ===============================================
await fetchJson()
  .then((result) => setVideoData(result))
  .catch((error) => console.log(error));

// ===========================
// display all the video items
// ===========================
function setVideoData(videoList) {
  const videoListHtml = videoList
    .map((video) => {
      const {
        id,
        name,
        image: img,
        duration,
        title,
        avater,
        views,
        created,
      } = video;
      return `<div class="div-video-item" data-id="${id}">
          <div class="section-video-img-div">
            <img
              src="${img}"
              class="section-video-img"
              alt="${name}"
            />
            <h5>${convertHMS(duration)}</h5>

            <i
              class="far fa-clock fa-fw video-item-overlay-icon-watchlater"
            ></i>

            <i class="fas fa-list-ul fa-fw video-item-overlay-icon-queue"></i>

            <h4 class="hide-add-to-queue">add to queue</h4>
            <h4 class="hide-watch-later">watch later</h4>
          </div>
          <div class="section-video-info-div">
            <div class="section-video-info-div-top">
              <img
                src="${avater}"
                class="section-video-info-avater"
                alt="${name}"
              />
              <h1>${title}</h1>
              <i class="fas fa-ellipsis-v video-option-menu"></i>
            </div>
            <div class="section-video-info-div-middle">
              <p>${name}</p>
              <i class="fas fa-check-circle"></i>
            </div>
            <p class="section-video-info-div-bottom-title">
              ${views} views &middot;
              <span class="created-time" data-id="${id}">${calculateTimeFromDate(
        created
      )}</span>
            </p>
          </div>
        </div>`;
    })
    .join("");

  const sectionVideos = getElement(".section-video-container");
  sectionVideos.innerHTML = videoListHtml;
  // calculate and display video created time
  // start refreshing time mechanism
  startTimeCalculation(
    videoList.map((item) => {
      return { id: item.id, created: item.created };
    })
  );
  initializeEventListeners();
}

/* 
==================================
Initialize all the event listeners
==================================
*/
function initializeEventListeners() {
  const videoItemList = [...getElementAll(".div-video-item")];

  videoItemList.forEach((videoItem) => {
    videoItem.addEventListener("mouseover", mouseOverEventHandler, false);
    videoItem.addEventListener("mouseleave", mouseLeaveEventHandler, false);
    videoItem.addEventListener("click", videoItemClickEventHandler, false);
    getElement(".section-main").addEventListener(
      "click",
      windowClickEventHandlaer,
      false
    );
  });
}

// ++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++
// All The Event Listener Functionality
// ++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++

// =================================
// Whole window click event listener
// =================================
function windowClickEventHandlaer(event) {
  if (!event.target.classList.contains("video-option-menu")) {
    if (!event.target.classList.contains("video-option-menu-div")) {
      const mainSection = getElement(".section-main");
      mainSection.removeEventListener("wheel", addPreventDefault);
      if (previousVideoOptionMenuDiv) {
        savedVideoOptionMenuBtn.style.display = "none";
        removeVideoOptionMenuDiv(previousVideoOptionMenuDiv);
        savedVideoOptionMenuBtn = null;
      }
    }
  }
}

// ===============================
// Video Item Click event listener
// ===============================
function videoItemClickEventHandler(event) {
  const elem = getElement(".section-video-container");
  const mainSection = getElement(".section-main");

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

  if (!watchLaterBtn.style.display || watchLaterBtn.style.display === "none") {
    watchLaterBtn.style.display = "grid";
  }

  // Add to queue btn
  const addToQueueBtn = getElementFromElement(
    childElementsOfVideoItemTop,
    ".video-item-overlay-icon-queue"
  );

  if (!addToQueueBtn.style.display || addToQueueBtn.style.display === "none") {
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

  if (
    !VideoOptionMenuBtn.style.display ||
    VideoOptionMenuBtn.style.display === "none"
  ) {
    VideoOptionMenuBtn.style.display = "grid";
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
  if (watchLaterBtn.style.display === "grid") {
    watchLaterBtn.style.display = "none";
  }

  // Add to queue btn
  const addToQueueBtn = getElementFromElement(
    childElementsOfVideoItemTop,
    ".video-item-overlay-icon-queue"
  );
  if (addToQueueBtn.style.display === "grid") {
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
    VideoOptionMenuBtn.style.display = "grid";
  } else {
    VideoOptionMenuBtn.style.display = "none";
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
      if (previousVideoOptionMenuDiv !== null) {
        removeVideoOptionMenuDiv(previousVideoOptionMenuDiv);
      }

      // create new Video Option Menu div
      createVideoOptionMenuDiv(
        videoOptionMenuBtn,
        videoItemDiv,
        heightDifference,
        widthDifference
      );

      if (savedVideoOptionMenuBtn) {
        savedVideoOptionMenuBtn.style.display = "none";
      }

      previousVideoOptionMenuDiv = videoOptionMenuBtn;
      videoOptionMenuId = videoItemDiv.dataset.id;
      savedVideoOptionMenuBtn = event.target;
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
}

// ============================
// Remove video option menu div
// ============================
function removeVideoOptionMenuDiv(videoOptionMenuBtn) {
  const child = getElement(".video-option-menu-div");
  videoOptionMenuBtn.removeChild(child);
  previousVideoOptionMenuDiv = null;
  videoOptionMenuId = -1;
}
