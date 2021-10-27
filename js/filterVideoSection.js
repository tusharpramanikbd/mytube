import {
  getElement,
  getElementAll,
  changeColor,
  isVisible,
  changeColorFast,
} from "./utils.js";

const leftBtnDiv = getElement(".section-video-filter-btn-left-div");
const rightBtnDiv = getElement(".section-video-filter-btn-right-div");

const leftBtn = getElement(".section-video-filter-btn-left");
const rightBtn = getElement(".section-video-filter-btn-right");

const filterContainer = getElement(".section-video-filter");
const btnFilterContainer = getElement(".btn-filter-container");

const btnFilterList = [...getElementAll(".btn-filter")];

btnFilterList.forEach((btnFilter) => {
  btnFilter.addEventListener("click", (event) => {
    // removing all the active button
    btnFilterList.map((item) => {
      if (item.classList.contains("active-btn-filter")) {
        item.classList.remove("active-btn-filter");
      }
    });

    // setting the clicked button as active
    const item = event.target;
    if (btnFilter.dataset.id === item.dataset.id) {
      item.classList.add("active-btn-filter");
    }
  });
});

leftBtnDiv.addEventListener("click", () => {
  changeColorFast(leftBtn);
  filterContainer.scrollBy({
    left: -200,
    behavior: "smooth",
  });
  setButtonDisplay(rightBtnDiv);
  btnFilterList.map((item) => {
    if (item.dataset.id === "1" && isVisible(item)) {
      leftBtnDiv.style.display = "none";
    }
  });
});

rightBtnDiv.addEventListener("click", () => {
  changeColorFast(rightBtn);
  filterContainer.scrollBy({
    left: 200,
    behavior: "smooth",
  });
  setButtonDisplay(leftBtnDiv);
  btnFilterList.map((item) => {
    if (
      item.dataset.id === (btnFilterList.length - 1).toString() &&
      isVisible(item)
    ) {
      rightBtnDiv.style.display = "none";
    }
  });
});

filterContainer.addEventListener("wheel", (event) => {
  event.preventDefault();

  let leftValue;
  if (event.deltaY < 0) {
    leftValue = -200;
  } else {
    leftValue = 200;
    setButtonDisplay(leftBtnDiv);
  }

  filterContainer.scrollBy({
    left: leftValue,
    behavior: "smooth",
  });

  btnFilterList.map((item) => {
    if (
      item.dataset.id === (btnFilterList.length - 1).toString() &&
      isVisible(item)
    ) {
      rightBtnDiv.style.display = "none";
    } else {
      rightBtnDiv.style.display = "grid";
    }
    if (item.dataset.id === "1" && isVisible(item)) {
      leftBtnDiv.style.display = "none";
    }
  });
});

function setButtonDisplay(btn) {
  btn.style.display = "grid";
}
