import { getElement, getElementAll } from "./utils.js";

const leftBtn = getElement(".section-video-filter-btn-left-div");
const rightBtn = getElement(".section-video-filter-btn-right-div");
const filterContainer = getElement(".section-video-filter");
const btnFilterContainer = getElement(".btn-filter-container");

const btnFilterList = [...getElementAll(".btn-filter")];

btnFilterList.forEach((btnFilter) => {
  btnFilter.addEventListener("click", () => {
    btnFilterList
      .map((item) => {
        if (item.classList.contains("active-btn-filter")) {
          item.classList.remove("active-btn-filter");
        }
        if (btnFilter.dataset.id === item.dataset.id) {
          item.classList.add("active-btn-filter");
        }
      })
      .join("");
  });
});

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
