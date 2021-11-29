import { getElement, getElementAll } from "../utils.js";

const sectionNavbar = getElement(".section-navbar");
const btnNavbarToggle = getElement(".navbar-toggle-btn");
const btnNavbarSearch = getElement(".navbar-btn-search");
const btnNavbarMicrophone = getElement(".navbar-btn-microphone");
const allNavbarIcons = [...getElementAll(".icon")];
const userImg = getElement(".avater-img");
const user = getElement(".user");
const userMenuItemList = [...getElementAll(".user-menu-item")];
const appearance = getElement(".appearance");
const btnLeftArrow = getElement(".btn-left-arrow");
const btnLightTheme = getElement(".btn-light-theme");
const btnDarkTheme = getElement(".btn-dark-theme");
const navbarMiddle = getElement(".navbar-middle");
const inputFormNavbar = getElement(".navbar-middle-form");
const navbarSearch = getElement(".navbar-search");
const btnCross = getElement(".btn-cross");
const navbarLeft = getElement(".navbar-left");
const navbarRight = getElement(".navbar-right");
const backBtnDiv = getElement(".back-arrow-div");
const btnBack = getElement(".btn-back");
const tickDark = getElement(".tick-dark")
const tickLight = getElement(".tick-light")
const userHeader = getElement(".user-header")
const userMenuDiv2 = getElement(".user-main-section-div-2")
const userMenuDiv3 = getElement(".user-main-section-div-3")
const appearanceTop = getElement(".appearance-top")

export {
    sectionNavbar,
    btnNavbarToggle,
    btnNavbarSearch,
    btnNavbarMicrophone,
    allNavbarIcons,
    userImg,
    user,
    userMenuItemList,
    appearance,
    btnLeftArrow,
    btnLightTheme,
    btnDarkTheme,
    navbarMiddle,
    inputFormNavbar,
    navbarSearch,
    btnCross,
    navbarLeft,
    navbarRight,
    backBtnDiv,
    btnBack,
    tickDark,
    tickLight,
    userHeader,
    userMenuDiv2,
    userMenuDiv3,
    appearanceTop
}