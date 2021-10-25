import { getElement } from "./utils.js";
import { fetchJson } from "./fetch.js";

const sectionVideos = getElement(".section-video-container");

await fetchJson()
  .then((result) => setVideoData(result))
  .catch((error) => console.log(error));

function setVideoData(videoList) {
  const videoListHtml = videoList
    .map((video) => {
      return `<div class="div-video-item">
          <div class="section-video-img-div">
            <img
              src="./images/project-1.jpeg"
              class="section-video-img"
              alt=""
            />
            <h5>5:00</h5>
          </div>
          <div class="section-video-info-div">
            <div class="section-video-info-div-top">
              <img
                src="./images/hero-img-small.jpeg"
                class="section-video-info-avater"
                alt=""
              />
              <h1>javascript progress bar animation tutorial</h1>
            </div>
            <div class="section-video-info-div-middle">
              <p>dev ed</p>
              <i class="fas fa-check-circle"></i>
            </div>
            <p class="section-video-info-div-bottom-title">
              7.1<span>K</span> views &middot; 11 hours ago
            </p>
          </div>
        </div>`;
    })
    .join("");

  sectionVideos.innerHTML = videoListHtml;
}
