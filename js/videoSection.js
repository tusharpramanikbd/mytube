import { getElement } from "./utils.js";
import { fetchJson } from "./fetch.js";

const sectionVideos = getElement(".section-video-container");

await fetchJson()
  .then((result) => setVideoData(result))
  .catch((error) => console.log(error));

function setVideoData(videoList) {
  const videoListHtml = videoList
    .map((video) => {
      const {
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
            <h5>${duration}</h5>
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
            <p class="section-video-info-div-bottom-title">${views} views &middot; ${created}
            </p>
          </div>
        </div>`;
    })
    .join("");

  sectionVideos.innerHTML = videoListHtml;
}
