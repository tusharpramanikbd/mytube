// filter button click functionality
const leftBtn = document.querySelector(".section-filter-btn-left-div");
const rightBtn = document.querySelector(".section-filter-btn-right-div");

const filterContainer = document.querySelector(".section-filter");
const navbar = document.querySelector(".navbar");
const sectionVideos = document.querySelector(".section-videos");

leftBtn.addEventListener("click", () => {
  filterContainer.scrollBy({
    left: -200,
    behavior: "smooth",
  });
});

rightBtn.addEventListener("click", () => {
  filterContainer.scrollBy({
    left: 200,
    behavior: "smooth",
  });
});

filterContainer.addEventListener("wheel", (event) => {
  event.preventDefault();

  filterContainer.scrollBy({
    left: event.deltaY < 0 ? -200 : 200,
    behavior: "smooth",
  });
});

navbar.addEventListener("wheel", (event) => {
  event.preventDefault();

  sectionVideos.scrollBy({
    top: event.deltaY < 0 ? -300 : 300,
    behavior: "smooth",
  });
});
