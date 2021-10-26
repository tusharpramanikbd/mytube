import {
  getElement,
  getElementAll,
  convertHMS,
  calculateCreationDate,
} from "./utils.js";
import { fetchJson } from "./fetch.js";

const sectionVideos = getElement(".section-video-container");
let savedVideoCreatedTimeList;
let refreshTimeIntervalInSeconds = 120;

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
          </div>
          <div class="section-video-info-div">
            <div class="section-video-info-div-top">
              <img
                src="${avater}"
                class="section-video-info-avater"
                alt=""
              />
              <h1>${title}</h1>
            </div>
            <div class="section-video-info-div-middle">
              <p>${name}</p>
              <i class="fas fa-check-circle"></i>
            </div>
            <p class="section-video-info-div-bottom-title">${views} views &middot; <span class="created-time" data-id="${id}">${calculateTimeFromDate(
        created
      )}</span>
            </p>
          </div>
        </div>`;
    })
    .join("");

  sectionVideos.innerHTML = videoListHtml;
  startTimeCalculation();
}

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
