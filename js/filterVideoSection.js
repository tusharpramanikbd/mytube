import {
  getElement,
  getElementAll,
  changeColor,
  isVisible,
  changeColorFast,
} from "./utils.js";

import { fetchJson } from "./fetch.js";

import { setVideoData } from "./videoSection.js";

import { changeNoDataFoundPosition } from "./leftMenusSection.js";

const leftBtnDiv = getElement(".section-video-filter-btn-left-div");
const rightBtnDiv = getElement(".section-video-filter-btn-right-div");

const leftBtn = getElement(".section-video-filter-btn-left");
const rightBtn = getElement(".section-video-filter-btn-right");

const filterContainer = getElement(".section-video-filter");
const btnFilterContainer = getElement(".btn-filter-container");

const urlVideoFilter = "../asset/filterVideoData.json";
const urlVideoItemList = "../asset/videoData.json";

const noDataFound = getElement(".no-data-found");

// ========================================
// initialize api call to fetch filter data
// ========================================
await fetchJson(urlVideoFilter)
  .then((result) => setFilterVideoData(result))
  .catch((error) => console.log(error));

function setFilterVideoData(dataList) {
  const filterBtnList = dataList
    .map((item) => {
      return `<button type="button" class="btn-filter ${
        item.status ? "active-btn-filter" : ""
      }" data-id="${item.id}">
            ${item.tag}
          </button>`;
    })
    .join("");
  btnFilterContainer.innerHTML = filterBtnList;
  initialEventListener();
}

function initialEventListener() {
  const btnFilterList = [...getElementAll(".btn-filter")];

  btnFilterList.forEach((btnFilter) => {
    if (!isVisible(btnFilter)) {
      rightBtnDiv.style.display = "grid";
    }
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
        initializeUpdatingVideoItemData(item);
        changeNoDataFoundPosition();
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
      if (item.dataset.id === "3" && isVisible(item)) {
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
        item.dataset.id === (btnFilterList.length - 3).toString() &&
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
        item.dataset.id === btnFilterList.length.toString() &&
        isVisible(item)
      ) {
        rightBtnDiv.style.display = "none";
      } else {
        rightBtnDiv.style.display = "grid";
      }
      if (item.dataset.id === "3" && isVisible(item)) {
        leftBtnDiv.style.display = "none";
      }
    });
  });
}

async function initializeUpdatingVideoItemData(item) {
  await fetchJson(urlVideoItemList)
    .then((result) => updateVideoData(result, item))
    .catch((error) => console.log(error));
}

function updateVideoData(result, item) {
  let dataList = [];
  if (item.innerText.toLowerCase() === "all") {
    dataList = result;
  } else {
    dataList = result.filter((data) => {
      if (data.tag === item.innerText.toLowerCase()) {
        return data;
      }
    });
  }

  if (dataList.length === 0) {
    noDataFound.style.display = "grid";
  } else {
    noDataFound.style.display = "none";
  }

  setVideoData(dataList);
}

function setButtonDisplay(btn) {
  btn.style.display = "grid";
}
