// filter button click functionality
const leftBtn = document.querySelector(".section-filter-btn-left-div");
const rightBtn = document.querySelector(".section-filter-btn-right-div");

const filterContainer = document.querySelector(".section-filter");

leftBtn.addEventListener("click", () => {
  filterContainer.scrollBy({ left: -200, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
  filterContainer.scrollBy({ left: 200, behavior: "smooth" });
});
