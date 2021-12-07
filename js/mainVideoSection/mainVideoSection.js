import { convertToHMS, startVideoUploadDateCalculation, calculateTimeFromDate } from "../timeDateCalculation.js";
import { FetchedData } from "../myStaticClass.js";
import { noDataFound, sectionVideos, documentBody } from "../staticVariables/svMainVideoSection.js";
import { initVideoItemEvenListeners } from "./videoItem.js";
import { isDarkThemeActivated } from "../applicationTheme.js";
import { getAllElementFromElement } from "../utils.js"

let videoItemList;

/**
 * Initialize main video section
 */
function initMainVideoSection() {
  console.log("Initializing main video section");
  initMainVideoSectionTheme();
  videoItemList = FetchedData.getVideoDataList();
  // setVideoData(videoItemList);
}

/**
 * Initializing theme color when stating the page
 */
function initMainVideoSectionTheme(){
  if(isDarkThemeActivated()){
    documentBody.classList.remove("body-light-theme");
  }
  else{
    documentBody.classList.add("body-light-theme");
  }
}

/**
 * Set video item data on video container
 * @param {Array} videoDataList 
 */
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
            <h5>${convertToHMS( duration )}</h5>
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
            <div class="section-video-info-div-top ${isDarkThemeActivated()? "" : "section-video-info-div-top-light-theme"}">
              <img
                src="${avater}"
                class="section-video-info-avater"
                alt="${name}"
              />
              <h1>${title}</h1>
              <i class="fas fa-ellipsis-v fa-fw video-option-menu ${isDarkThemeActivated()? "" : "video-option-menu-light-theme"}" data-id="${id}"></i>
            </div>
            <div class="section-video-info-div-middle ${isDarkThemeActivated()? "" : "section-video-info-div-middle-light-theme"}">
              <p>${name}</p>
              <i class="fas fa-check-circle fa-fw"></i>
            </div>
            <p class="section-video-info-div-bottom-title ${isDarkThemeActivated()? "" : "section-video-info-div-bottom-title-light-theme"}">
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
    startVideoUploadDateCalculation( videoDataList.map((item) => {
        return { id: item.id, created: item.created };
      })
    );
    initVideoItemEvenListeners();
  }
  else{
    sectionVideos.innerHTML = "";
  }
}

/**
 * Setting theme color on btn click
 */
function setMainVideoSectionTheme(){
  if(isDarkThemeActivated()){
    documentBody.classList.remove("body-light-theme");
  }
  else{
    documentBody.classList.add("body-light-theme");
  }

  const videoItemList = getAllElementFromElement(sectionVideos, ".div-video-item");
  videoItemList.map((item)=>{
    if(isDarkThemeActivated()){
      item.children[1].children[0].classList.remove("section-video-info-div-top-light-theme")
      item.children[1].children[1].classList.remove("section-video-info-div-middle-light-theme")
      item.children[1].children[2].classList.remove("section-video-info-div-bottom-title-light-theme")
      item.children[1].children[0].children[2].classList.remove("video-option-menu-light-theme")
    }
    else{
      item.children[1].children[0].classList.add("section-video-info-div-top-light-theme")
      item.children[1].children[1].classList.add("section-video-info-div-middle-light-theme")
      item.children[1].children[2].classList.add("section-video-info-div-bottom-title-light-theme")
      item.children[1].children[0].children[2].classList.add("video-option-menu-light-theme")
    }
    return item;
  })
}

/**
 * Show or hide no data found text
 * @param {Array} videoDataList 
 * @returns {Boolean} - True/False
 */
function toggleNoDataFound(videoDataList){
  if(videoDataList.length === 0){
    noDataFound.classList.add("show-no-data-found");
    setNoDataFoundTheme()
    return false;
  }
  else{
    noDataFound.classList.remove("show-no-data-found");
    setNoDataFoundTheme()
    return true;
  }
}

/**
 * Set the color theme of no data found text
 */
function setNoDataFoundTheme(){
  if(isDarkThemeActivated()){
    noDataFound.classList.remove("no-data-found-light-theme");
  }
  else{
    noDataFound.classList.add("no-data-found-light-theme");
  }
}

export { initMainVideoSection, setVideoData, setMainVideoSectionTheme, setNoDataFoundTheme };
