import { isVisible, getElementAll } from "../utils.js";
import { FetchedData } from "../myStaticClass.js";
import {
  btnLeftDiv,
  btnRightDiv,
  btnLeft,
  btnRight,
  filterContainer,
  filterContainerBtn
} from "../staticVariables/svFilterSection.js";
import { isDarkThemeActivated } from "../applicationTheme.js";

// Dynamic elements variable
let btnFilterList;

// Initialize filter video section by adding dynamic elements to filter btn container
function initFilterVideoSection() {
  const filterBtnList = FetchedData.getFilterDataList()
    .map((item) => {
      return `<button type="button" class="btn-filter ${
        item.status ? getSelecetedThemeClass() : ""
      }" data-id="${item.id}">
            ${item.tag}
          </button>`;
    })
    .join("");
  filterContainerBtn.innerHTML = filterBtnList;
  initFilterVideoSectionTheme();
  getDynamicElements();
  initEventListeners();
}

// =======================
// Event Listener
// =======================
function initEventListeners() {

  // Btn filter click event listener
  btnFilterList.forEach((btnFilter) => {
    if (!isVisible(btnFilter)) {
      showButtonDisplay(btnRightDiv);
    }
    btnFilter.addEventListener("click", (e)=>{
      btnFilterClickEventHandler(e, btnFilter);
    });
  });

  // btn right div click event listener
  btnRight.addEventListener("click", btnRightClickEventHandler);

  // rightBtn.addEventListener("mousedown", onMouseDownNavbarIcon);
  // rightBtn.addEventListener("mouseup", onMouseUpNavbarIcon);

  // btn left div click event listener
  btnLeft.addEventListener("click", btnLeftClickEventHandler);

  // leftBtn.addEventListener("mousedown", onMouseDownNavbarIcon);
  // leftBtn.addEventListener("mouseup", onMouseUpNavbarIcon);

  // mouse wheel event listener
  filterContainer.addEventListener("wheel", mouseWheelEventHandler);
}

// =======================
// Event Handler
// =======================

// Filter btns click event handler
function btnFilterClickEventHandler(event, btnFilter){
  btnFilterList.map((item) => {
    // adding btn-filter-light-theme on every element if light theme is activated
    if(!isDarkThemeActivated()){
      item.classList.add("btn-filter-light-theme");
    }

    // removing previous active button
    if (item.classList.contains("active-btn-filter") || item.classList.contains("active-btn-filter-light-theme")) {
      item.classList.remove("active-btn-filter");
      item.classList.remove("active-btn-filter-light-theme");
    }
  });

  // setting the clicked button as active
  const clickedBtn = event.target;
  if (btnFilter.dataset.id === clickedBtn.dataset.id) {
    if(isDarkThemeActivated()){
      clickedBtn.classList.add("active-btn-filter");
    }
    else{
      clickedBtn.classList.add("active-btn-filter-light-theme");
    }
    // initializeUpdatingVideoItemData(clickedBtn);
  }
}

// Right btn click event handler
function btnRightClickEventHandler(){
  scroll(200);
  showButtonDisplay(btnLeftDiv);
  btnFilterList.map((item) => {
    if ( item.dataset.id === (btnFilterList.length - 3).toString() && isVisible(item) ) {
      hideButtonDisplay(btnRightDiv);
    }
  });
}

// Left btn click event handler
function btnLeftClickEventHandler(){
  scroll(-200);
  showButtonDisplay(btnRightDiv);
  btnFilterList.map((item) => {
    if (item.dataset.id === "3" && isVisible(item)) {
      hideButtonDisplay(btnLeftDiv);
    }
  });
}

function mouseWheelEventHandler(event){
  event.preventDefault();

  let leftValue;
  if (event.deltaY < 0) {
    leftValue = -200;
  } else {
    leftValue = 200;
    showButtonDisplay(btnLeftDiv);
  }

  scroll(leftValue);

  btnFilterList.map((item) => {
    if ( item.dataset.id === btnFilterList.length.toString() && isVisible(item) ) {
      hideButtonDisplay(btnRightDiv)
    } else {
      showButtonDisplay(btnRightDiv)
    }
    if (item.dataset.id === "3" && isVisible(item)) {
      hideButtonDisplay(btnLeftDiv)
    }
  });
}

// =========================
// Other business logic
// =========================

// Adding class according to activated theme
function getSelecetedThemeClass(){
  if(isDarkThemeActivated()){
    return "active-btn-filter";
  }
  return "active-btn-filter-light-theme";
}

// Initialize filter video section theme
function initFilterVideoSectionTheme(){
  if(!isDarkThemeActivated()){
    btnLeftDiv.classList.add("section-video-filter-btn-left-div-light-theme");
    btnRightDiv.classList.add("section-video-filter-btn-right-div-light-theme");
    btnLeft.classList.add("section-video-filter-btn-light-theme");
    btnRight.classList.add("section-video-filter-btn-light-theme");
  }
}

// get all the dynamic elements
function getDynamicElements(){
  btnFilterList = [...getElementAll(".btn-filter")];
}

// Display the hidden btn
function showButtonDisplay(btn) {
  btn.classList.add("show-section-video-filter-btn-div");
}

// hide the displayed btn
function hideButtonDisplay(btn) {
  btn.classList.remove("show-section-video-filter-btn-div");
}

function scroll(scrollValue){
  filterContainer.scrollBy({
    left: scrollValue,
    behavior: "smooth",
  });
}

export { initFilterVideoSection }
