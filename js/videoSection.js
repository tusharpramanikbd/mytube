import { getElement } from "./utils.js";

const sectionMenus = getElement(".section-menus");
const sectionVideos = getElement(".section-video-container");

// sectionMenus.addEventListener("wheel", (event) => {
//   //event.preventDefault();

//   sectionVideos.scrollBy({
//     top: event.deltaY < 0 ? -0 : 0,
//     behavior: "smooth",
//   });
// });

// sectionMenus.addEventListener("mouseover", (e) => {
//   e.preventDefault();
// });
