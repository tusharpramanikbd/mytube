import {
  getElement,
  getElementAll,
  changeColor,
  changeColorFast,
} from "./utils.js";
import {
  toggleLeftMenusSection,
  changeLeftMenusSectionOnWindowResize,
} from "./leftMenusSection.js";

const navbarToggleBtn = getElement(".navbar-toggle-btn");
const navbarBtnMicrophone = getElement(".navbar-btn-microphone");
const allNavbarIcons = [...getElementAll(".icon")];

navbarToggleBtn.addEventListener("click", () => {
  changeColor(navbarToggleBtn);
  toggleLeftMenusSection();
});

window.onresize = () => {
  changeLeftMenusSectionOnWindowResize();
};

allNavbarIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    changeColorFast(icon);
  });
});

navbarBtnMicrophone.addEventListener("click", () => {
  changeColorFast(navbarBtnMicrophone, "#202020");
});
