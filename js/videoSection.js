import { getElement } from "./utils.js";

const navbar = getElement(".navbar");
const sectionVideos = getElement(".section-videos");

navbar.addEventListener("wheel", (event) => {
  event.preventDefault();

  sectionVideos.scrollBy({
    top: event.deltaY < 0 ? -300 : 300,
    behavior: "smooth",
  });
});
