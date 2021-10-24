import { getElement, getElementAll, changeColor } from "./utils.js";

const leftBtnDiv = getElement(".section-video-filter-btn-left-div");
const rightBtnDiv = getElement(".section-video-filter-btn-right-div");

const leftBtn = getElement(".section-video-filter-btn-left");
const rightBtn = getElement(".section-video-filter-btn-right");

const filterContainer = getElement(".section-video-filter");
const btnFilterContainer = getElement(".btn-filter-container");

const btnFilterList = [...getElementAll(".btn-filter")];

btnFilterList.forEach((btnFilter) => {
  btnFilter.addEventListener("click", () => {
    btnFilterList.map((item) => {
      if (item.classList.contains("active-btn-filter")) {
        item.classList.remove("active-btn-filter");
      }
      if (btnFilter.dataset.id === item.dataset.id) {
        item.classList.add("active-btn-filter");
      }
    });
  });
});

leftBtnDiv.addEventListener("click", () => {
  changeColor(leftBtn);
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
  changeColor(rightBtn);
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

function isVisible(elem) {
  if (!(elem instanceof Element))
    throw Error("DomUtil: elem is not an element.");
  const style = getComputedStyle(elem);
  if (style.display === "none") return false;
  if (style.visibility !== "visible") return false;
  if (style.opacity < 0.1) return false;
  if (
    elem.offsetWidth +
      elem.offsetHeight +
      elem.getBoundingClientRect().height +
      elem.getBoundingClientRect().width ===
    0
  ) {
    return false;
  }
  const elemCenter = {
    x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
    y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
  };
  if (elemCenter.x < 0) return false;
  if (
    elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)
  )
    return false;
  if (elemCenter.y < 0) return false;
  if (
    elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)
  )
    return false;
  let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
  do {
    if (pointContainer === elem) return true;
  } while ((pointContainer = pointContainer.parentNode));
  return false;
}

function setButtonDisplay(btn) {
  btn.style.display = "grid";
}
