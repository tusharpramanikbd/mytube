import {
  getElement,
  getElementAll,
  convertHMS,
  calculateCreationDate,
  changeColor,
  changeColorFast,
  getElementFromElement,
  getAllElementFromElement,
} from "./utils.js";
import { fetchJson } from "./fetch.js";

const sectionVideos = getElement(".section-video-container");
let savedVideoCreatedTimeList;
let refreshTimeIntervalInSeconds = 120;

// setDynamicVideoData();
// initialAddToQueueBannar();
// initialWatchLaterBanner();

await fetchJson()
  .then((result) => setVideoData(result))
  .catch((error) => console.log(error));

function setVideoData(videoList) {
  savedVideoCreatedTimeList = videoList.map((item) => {
    return { id: item.id, created: item.created };
  });
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
      return `<div class="div-video-item">
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

  sectionVideos.innerHTML = videoListHtml;
  startTimeCalculation();
  setDynamicVideoData();
}

/* 
========================================
Dynamic Video Data Related functionality
========================================
 */
function setDynamicVideoData() {
  const videoItemList = [...getElementAll(".div-video-item")];

  videoItemList.forEach((videoItem) => {
    videoItem.addEventListener("mouseover", mouseOverEventHandler, false);
    videoItem.addEventListener("mouseleave", mouseLeaveEventHandler, false);
    videoItem.addEventListener("click", clickEventHandler, false);
  });
}

// Video Item Click event listener
function clickEventHandler(event) {
  if (event.target.classList.contains("video-option-menu")) {
    changeColorFast(event.target);
  }
}

// Mouse leave event listener
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

  // watch latter btn
  const VideoOptionMenuBtn = getElementFromElement(
    childElementsOfVideoItemBottom,
    ".video-option-menu"
  );

  if (VideoOptionMenuBtn.style.display === "grid") {
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

// Mouse over event listener
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
  if (event.target.classList.contains("video-item-overlay-icon-watchlater")) {
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
  if (event.target.classList.contains("video-item-overlay-icon-queue")) {
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

/* 
=======================================
Video Create Time Related functionality
=======================================
 */
function calculateTimeFromDate(creationDate) {
  const date = new Date(creationDate);
  const timeDifferenceInMilliseconds = Date.now() - date.getTime();

  const timeInSecons = Math.floor(timeDifferenceInMilliseconds / 1000);

  return calculateCreationDate(convertHMS(timeInSecons));
}

function startTimeCalculation() {
  const createdTimeList = [...getElementAll(".created-time")];
  console.log("started refreshing");
  setInterval(() => {
    createdTimeList.map((item) => {
      savedVideoCreatedTimeList.forEach((videoItem) => {
        if (item.dataset.id === videoItem.id.toString()) {
          item.textContent = calculateTimeFromDate(videoItem.created);
        }
      });
    });
  }, refreshTimeIntervalInSeconds * 1000);
}
