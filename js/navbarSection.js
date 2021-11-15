import {
  getElement,
  getElementAll,
  changeColor,
  changeColorFast,
  getWidth,
} from "./utils.js";
import {
  hideSectionMenusOverlay,
  toggleLeftMenusSection,
} from "./leftMenusSection.js";

const sectionMain = getElement(".section-main");
const navbarToggleBtn = getElement(".navbar-toggle-btn");
const navbarBtnMicrophone = getElement(".navbar-btn-microphone");
const allNavbarIcons = [...getElementAll(".icon")];
const navbarBtnSearch = getElement(".navbar-btn-search");
const navbarMiddleForm = getElement(".navbar-middle-form");
const sectionNavbar = getElement(".section-navbar");
const navbarLeft = getElement(".navbar-left");
const navbarRight = getElement(".navbar-right");
const backBtnDiv = getElement(".back-arrow-div");
const btnBack = getElement(".btn-back");
const userImg = getElement(".avater-img");
const user = getElement(".user");


userImg.addEventListener("click", (event)=>{
  changeUserImgBorder(event.currentTarget);
  user.classList.toggle("show-user");
})

export function removeUserElement(){
  user.classList.remove("show-user");
}

function changeUserImgBorder(element){
  element.style.border = "2px solid var(--clr-blueish)";
  setTimeout(()=>{
    element.style.border = "2px solid transparent";
  }, 100);
}



window.onresize = () => {
  changeMiddleNavbar();
  if (getWidth() > 1312) {
    hideSectionMenusOverlay();
  }
};

// ===============================
// Event Listeners
// ===============================
navbarToggleBtn.addEventListener("click", () => {
  changeColor(navbarToggleBtn);
  toggleLeftMenusSection();
});

allNavbarIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    changeColorFast(icon);
  });
});

navbarBtnMicrophone.addEventListener("click", () => {
  changeColorFast(navbarBtnMicrophone, "#202020");
});

navbarBtnSearch.addEventListener("click", () => {
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

// ========================
// Business Logic Functions
// ========================

// This function remove the added classes on less than 800px window width
function changeMiddleNavbar() {
  if (getWidth() > 800) {
    removeAddedClasses();
  }
}

// Remove the added classes
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
