import { getElement } from "./utils.js";

const leftBtn = getElement(".section-filter-btn-left-div");
const rightBtn = getElement(".section-filter-btn-right-div");

const filterContainer = getElement(".section-filter");

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
