import { convertHMS, startTimeCalculation, calculateTimeFromDate } from "../timeDateCalculation.js";
import { FetchedData } from "../myStaticClass.js";
import { noDataFound, sectionVideos } from "../staticVariables/svMainVideoSection.js";
import { initVideoItemEvenListeners } from "./videoItem.js";

let videoItemList;

// Initialize main video section
function initMainVideoSection() {
  videoItemList = FetchedData.getVideoDataList();
  setVideoData(videoItemList);
}

function setVideoData(videoDataList){
  if(toggleNoDataFound(videoDataList)){
    const videoListHtml = videoDataList
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
            <h5>${convertHMS( duration )}</h5>

            <div class="watch-later">
              <h4 class="hide-watch-later">watch later</h4>
              <i class="far fa-clock fa-fw video-item-overlay-icon-watchlater"></i>
            </div>
            <div class="add-to-queue">
              <h4 class="hide-add-to-queue">add to queue</h4>
              <i class="fas fa-list-ul fa-fw video-item-overlay-icon-queue"></i>
            </div>
          </div>
          <div class="section-video-info-div">
            <div class="section-video-info-div-top">
              <img
                src="${avater}"
                class="section-video-info-avater"
                alt="${name}"
              />
              <h1>${title}</h1>
              <i class="fas fa-ellipsis-v fa-fw video-option-menu" data-id="${id}"></i>
            </div>
            <div class="section-video-info-div-middle">
              <p>${name}</p>
              <i class="fas fa-check-circle fa-fw"></i>
            </div>
            <p class="section-video-info-div-bottom-title">
              ${views} views &middot;
              <span class="created-time" data-id="${id}">${calculateTimeFromDate( created )}</span>
            </p>
          </div>
        </div>`;
    })
    .join("");

    sectionVideos.innerHTML = videoListHtml;
    // calculate and display video created time
    // start refreshing time mechanism
    startTimeCalculation( videoDataList.map((item) => {
        return { id: item.id, created: item.created };
      })
    );
    // initializeEventListeners();
    initVideoItemEvenListeners();
  }
  else{
    sectionVideos.innerHTML = "";
  }
}

function toggleNoDataFound(videoDataList){
  if(videoDataList.length === 0){
    noDataFound.classList.add("show-no-data-found");
    return false;
  }
  else{
    noDataFound.classList.remove("show-no-data-found");
    return true;
  }
}

export { initMainVideoSection, setVideoData };