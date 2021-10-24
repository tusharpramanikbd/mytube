import { getElement } from "./utils.js";
import {
  toggleLeftMenusSection,
  changeLeftMenusSectionOnWindowResize,
} from "./leftMenusSection.js";

const navbarToggleBtn = getElement(".navbar-toggle-btn");

navbarToggleBtn.addEventListener("click", () => {
  changeColor(navbarToggleBtn);
  toggleLeftMenusSection();
});

window.onresize = () => {
  changeLeftMenusSectionOnWindowResize();
};

function changeColor(element) {
  element.style.backgroundColor = "#5f5e5e";
  setTimeout(() => {
    element.style.backgroundColor = "transparent";
  }, 400);
}
