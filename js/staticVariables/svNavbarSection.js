import { getElement, getElementAll } from "../utils.js";

const btnNavbarToggle = getElement(".navbar-toggle-btn");
const btnNavbarSearch = getElement(".navbar-btn-search");
const btnNavbarMicrophone = getElement(".navbar-btn-microphone");
const allNavbarIcons = [...getElementAll(".icon")];
const userImg = getElement(".avater-img");
const user = getElement(".user");

export {
    btnNavbarToggle,
    btnNavbarSearch,
    btnNavbarMicrophone,
    allNavbarIcons,
    userImg,
    user
}