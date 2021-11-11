// Importing the functions from other modules
import { getElement, getElementAll, addPreventDefault } from "./utils.js";
import {
  convertHMS,
  startTimeCalculation,
  calculateTimeFromDate,
} from "./timeDateCalculation.js";
import { fetchJson } from "./fetch.js";

import {
  initializeVideoItemEvenListeners,
  removeVideoOptionMenuDiv,
} from "./videoItem.js";
import { MyStaticClass } from "./myStaticClass.js";

const url = "../asset/videoData.json";

// ===============================================
// fetching all the video item data from JSON file
// ===============================================
await fetchJson(url)
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
              <i class="fas fa-ellipsis-v fa-fw video-option-menu"></i>
            </div>
            <div class="section-video-info-div-middle">
              <p>${name}</p>
              <i class="fas fa-check-circle fa-fw"></i>
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
  getElement(".section-main").addEventListener(
    "click",
    windowClickEventHandlaer,
    false
  );
  initializeVideoItemEvenListeners();
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
      if (MyStaticClass.getPreviousVideoOptionMenuDiv()) {
        MyStaticClass.getSavedVideoOptionMenuBtn().style.display = "none";
        removeVideoOptionMenuDiv(MyStaticClass.getPreviousVideoOptionMenuDiv());
        MyStaticClass.setSavedVideoOptionMenuBtn(null);
      }
    }
  }
}

export { setVideoData };
