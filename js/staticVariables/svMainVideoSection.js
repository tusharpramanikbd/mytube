import { getElement, getElementAll } from "../utils.js";

const noDataFound = getElement(".no-data-found");
const sectionVideos = getElement(".section-video-container");
const createdTimeList = [...getElementAll(".created-time")];
const mainSection = getElement(".section-main");
const documentBody = document.body;

export { noDataFound, sectionVideos, createdTimeList, mainSection, documentBody };
