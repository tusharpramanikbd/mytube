import { getElement, changeColor } from "./utils.js";
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
