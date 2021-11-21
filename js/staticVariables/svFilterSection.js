import { getElement } from "../utils.js";

const btnLeftDiv = getElement(".section-video-filter-btn-left-div");
const btnRightDiv = getElement(".section-video-filter-btn-right-div");

const btnLeft = getElement(".section-video-filter-btn-left");
const btnRight = getElement(".section-video-filter-btn-right");

const filterContainer = getElement(".section-video-filter");
const filterContainerBtn = getElement(".btn-filter-container");

export {
    btnLeftDiv,
    btnRightDiv,
    btnLeft,
    btnRight,
    filterContainer,
    filterContainerBtn
}