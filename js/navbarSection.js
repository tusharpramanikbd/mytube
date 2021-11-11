import {
  getElement,
  getElementAll,
  changeColor,
  changeColorFast,
  getWidth,
} from "./utils.js";
import {
  toggleLeftMenusSection,
  changeLeftMenusSectionOnWindowResize,
} from "./leftMenusSection.js";

const navbarToggleBtn = getElement(".navbar-toggle-btn");
const navbarBtnMicrophone = getElement(".navbar-btn-microphone");
const allNavbarIcons = [...getElementAll(".icon")];
const navbarBtnSearch = getElement(".navbar-btn-search");
const navbarMiddleForm = getElement(".navbar-middle-form");
const sectionNavbar = getElement(".section-navbar");
const navbarLeft = getElement(".navbar-left");
const navbarRight = getElement(".navbar-right");
const backBtnDiv = getElement(".back-arrow-div");
const navbarMiddle = getElement(".navbar-middle");
const btnBack = getElement(".btn-back");

navbarToggleBtn.addEventListener("click", () => {
  changeColor(navbarToggleBtn);
  toggleLeftMenusSection();
});

window.addEventListener("DOMContentLoaded", (event) => {
  if (getWidth() < 1312) {
    // showSectionMenuSmall();
    if (getWidth() <= 870) {
      changeLeftMenusSectionOnWindowResize();
    }
  }
});

window.onresize = () => {
  changeLeftMenusSectionOnWindowResize();
  changeMiddleNavbar();
};

allNavbarIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    changeColorFast(icon);
  });
});

navbarBtnMicrophone.addEventListener("click", () => {
  changeColorFast(navbarBtnMicrophone, "#202020");
});

navbarBtnSearch.addEventListener("click", (event) => {
  const inputDisplay = window.getComputedStyle(navbarMiddleForm).display;

  if (getWidth() <= 800 && inputDisplay === "none") {
    navbarMiddleForm.classList.add(
      "show-navbar-middle-form",
      "changed-navbar-middle-form"
    );
    sectionNavbar.classList.add("changed-section-navbar");
    navbarLeft.classList.add("hide-element");
    navbarRight.classList.add("hide-element");
    backBtnDiv.classList.add("show-element");
  }
});

btnBack.addEventListener("click", () => {
  changeColorFast(btnBack);
  setTimeout(() => {
    removeAddedClasses();
  }, 100);
});

function changeMiddleNavbar() {
  if (getWidth() > 800) {
    removeAddedClasses();
  }
}

function removeAddedClasses() {
  navbarMiddleForm.classList.remove(
    "show-navbar-middle-form",
    "changed-navbar-middle-form"
  );
  sectionNavbar.classList.remove("changed-section-navbar");
  navbarLeft.classList.remove("hide-element");
  navbarRight.classList.remove("hide-element");
  backBtnDiv.classList.remove("show-element");
}
