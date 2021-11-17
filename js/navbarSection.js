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

import { fetchJson } from "./fetch.js";
import { fetchVideoData, setVideoData } from "./videoSection.js";

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
const appearance = getElement(".appearance");
const btnLeftArrow = getElement(".btn-left-arrow");
const btnCross = getElement(".btn-cross");

// Dark and light theme related global variables
const btnLightTheme = getElement(".btn-light-theme");
const btnDarkTheme = getElement(".btn-dark-theme");
const mainBody = getElement("body");
const navbarSection = getElement(".section-navbar");
const navbarMiddle = getElement(".navbar-middle");
const navbarSearch = getElement(".navbar-search");
const tickDark = getElement(".tick-dark")
const tickLight = getElement(".tick-light")
const appearanceTop = getElement(".appearance-top");
const userMenuItemList = [...getElementAll(".user-menu-item")];
const userSectionDiv2 = getElement(".user-main-section-div-2")
const userSectionDiv3 = getElement(".user-main-section-div-3")
const userHeader = getElement(".user-header");

userMenuItemHoverEffect();

const urlVideoDataList = "../asset/videoData.json";

let isDarkThemeActivated = true;


userImg.addEventListener("mousedown", (event)=>{
  changeUserImgBorder(event.currentTarget);
  user.classList.toggle("show-user");
})

user.addEventListener("click", (event)=>{
  if(event.target.parentElement.dataset.id === "appearance"){
    user.classList.toggle("show-user");
    appearance.classList.add("show-appearance");
  }
})

btnLeftArrow.addEventListener("click", ()=>{
  appearance.classList.remove("show-appearance");
  user.classList.toggle("show-user");
})

// =====================
// Light theme
// =====================
btnLightTheme.addEventListener("click", (event)=>{
  mainBody.classList.add("body-light-theme");
  navbarSection.classList.add("section-navbar-light-theme");
  navbarToggleBtn.classList.add("navbar-toggle-btn-light-theme");
  navbarMiddle.classList.add("navbar-middle-light-theme");
  navbarBtnMicrophone.classList.add("navbar-btn-microphone-light-theme");
  allNavbarIcons.map((item)=>{
    item.classList.add("icon-light-theme");
  });
  navbarBtnSearch.classList.add("navbar-btn-search-light-theme");
  navbarSearch.classList.add("navbar-search-light-theme");
  isDarkThemeActivated = false;
  appearance.classList.remove("show-appearance");
  tickLight.classList.remove("hide-tick-mark")
  tickDark.classList.add("hide-tick-mark")
  appearance.classList.add("appearance-light-theme")
  appearanceTop.classList.add("appearance-top-light-theme")
  changeThemeName("apperence: light");
  user.classList.add("user-light-theme")
  userSectionDiv2.classList.add("border-light-theme")
  userSectionDiv3.classList.add("border-light-theme")
  userHeader.classList.add("user-header-light-theme")
})

btnLightTheme.addEventListener("mouseenter",()=>{
  if(isDarkThemeActivated){
    btnLightTheme.classList.add("appearance-hover-dark-theme");
  }
  else{
    btnLightTheme.classList.add("appearance-hover-light-theme");
  }
  
})
btnLightTheme.addEventListener("mouseleave",()=>{
  btnLightTheme.classList.remove("appearance-hover-light-theme");
  btnLightTheme.classList.remove("appearance-hover-dark-theme");
})

// =====================
// Dark theme
// =====================
btnDarkTheme.addEventListener("click", (event)=>{
  mainBody.classList.remove("body-light-theme");
  navbarSection.classList.remove("section-navbar-light-theme");
  navbarToggleBtn.classList.remove("navbar-toggle-btn-light-theme");
  navbarMiddle.classList.remove("navbar-middle-light-theme");
  navbarBtnMicrophone.classList.remove("navbar-btn-microphone-light-theme");
  allNavbarIcons.map((item)=>{
    item.classList.remove("icon-light-theme");
  });
  navbarBtnSearch.classList.remove("navbar-btn-search-light-theme");
  navbarSearch.classList.remove("navbar-search-light-theme");
  isDarkThemeActivated = true;
  appearance.classList.remove("show-appearance");
  tickDark.classList.remove("hide-tick-mark")
  tickLight.classList.add("hide-tick-mark")
  appearance.classList.remove("appearance-light-theme")
  appearanceTop.classList.remove("appearance-top-light-theme")
  changeThemeName("apperence: dark");
  user.classList.remove("user-light-theme")
  userSectionDiv2.classList.remove("border-light-theme")
  userSectionDiv3.classList.remove("border-light-theme")
  userHeader.classList.remove("user-header-light-theme")
})

btnDarkTheme.addEventListener("mouseenter",()=>{
  if(isDarkThemeActivated){
    btnDarkTheme.classList.add("appearance-hover-dark-theme");
  }
  else{
    btnDarkTheme.classList.add("appearance-hover-light-theme");
  }
  
})
btnDarkTheme.addEventListener("mouseleave",()=>{
  btnDarkTheme.classList.remove("appearance-hover-light-theme");
  btnDarkTheme.classList.remove("appearance-hover-dark-theme");
})

function removeUserElement(){
  user.classList.remove("show-user");
}

function changeUserImgBorder(element){
  element.classList.add("avater-img-click-effect");
  setTimeout(()=>{
    element.classList.remove("avater-img-click-effect");
  }, 200);
}

function changeThemeName(name){
  userMenuItemList.forEach((item)=>{
    if(item.dataset.id === "appearance"){
      const childElement = item.getElementsByTagName('p')[0];
      childElement.innerText = name;
    }
  })
}

function userMenuItemHoverEffect(){
  userMenuItemList.forEach((item)=>{
    item.addEventListener("mouseenter",()=>{
      if(isDarkThemeActivated){
        item.classList.add("appearance-hover-dark-theme");
      }
      else{
        item.classList.add("appearance-hover-light-theme");
      }
      
    })
    item.addEventListener("mouseleave",()=>{
      item.classList.remove("appearance-hover-light-theme");
      item.classList.remove("appearance-hover-dark-theme");
    })
  })
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
  // changeColor(navbarToggleBtn);
  toggleLeftMenusSection();
});
navbarToggleBtn.addEventListener("mousedown",()=>{
  navbarToggleBtn.classList.add("icon-mousedown-effect");
})
navbarToggleBtn.addEventListener("mouseup",()=>{
  navbarToggleBtn.classList.remove("icon-mousedown-effect");
  navbarToggleBtn.classList.add("icon-mouseup-effect");
    setTimeout(()=>{
      navbarToggleBtn.classList.remove("icon-mouseup-effect");
  }, 1000)
})

allNavbarIcons.forEach((icon) => {
  icon.addEventListener("mousedown",()=>{
    icon.classList.add("icon-mousedown-effect");
  })
  icon.addEventListener("mouseup",()=>{
    icon.classList.remove("icon-mousedown-effect");
    icon.classList.add("icon-mouseup-effect");
      setTimeout(()=>{
      icon.classList.remove("icon-mouseup-effect");
    }, 1000)
  })
});

navbarBtnMicrophone.addEventListener("mousedown",()=>{
  navbarBtnMicrophone.classList.add("icon-mousedown-effect");
})
navbarBtnMicrophone.addEventListener("mouseup",()=>{
  navbarBtnMicrophone.classList.remove("icon-mousedown-effect");
  navbarBtnMicrophone.classList.add("icon-mouseup-effect");
    setTimeout(()=>{
      navbarBtnMicrophone.classList.remove("icon-mouseup-effect");
  }, 1000)
})

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

navbarBtnSearch.addEventListener("mousedown",()=>{
  if(isDarkThemeActivated){
    navbarBtnSearch.classList.add("navbar-btn-search-click-effect");
  }
  else{
    navbarBtnSearch.classList.add("navbar-btn-search-click-effect-light-theme");
  }
  
})
navbarBtnSearch.addEventListener("mouseup",()=>{
  if(isDarkThemeActivated){
    navbarBtnSearch.classList.remove("navbar-btn-search-click-effect");
  }
  else{
    navbarBtnSearch.classList.remove("navbar-btn-search-click-effect-light-theme");
  }
})

navbarMiddleForm.addEventListener("keyup", (event)=>{
  if(!btnCross.classList.contains("show-btn-cross")){
    btnCross.classList.add("show-btn-cross");
  }
  const searchValue = navbarSearch.value;
  if(searchValue){
    fetchSearchedVideos(searchValue);
  }
  else{
    btnCross.classList.remove("show-btn-cross");
    fetchVideoData(urlVideoDataList);
  }
})

async function fetchSearchedVideos(searchValue){
  await fetchJson(urlVideoDataList)
  .then((result) => findSearchedVideos(result, searchValue))
  .catch((error) => console.log(error));
}

function findSearchedVideos(result, searchValue){
  const videoItemList = result.filter((video)=>{
    let title = video.title;
    title = title.toLowerCase();
    if(title.startsWith(searchValue)){
      return video;
    }
  });
  setVideoData(videoItemList);
}

btnCross.addEventListener("click", ()=>{
  navbarSearch.value = "";
  fetchVideoData(urlVideoDataList);
})

btnCross.addEventListener("mousedown",()=>{
  btnCross.classList.add("icon-mousedown-effect");
})
btnCross.addEventListener("mouseup",()=>{
  btnCross.classList.remove("icon-mousedown-effect");
  btnCross.classList.add("icon-mouseup-effect");
    setTimeout(()=>{
      btnCross.classList.remove("icon-mouseup-effect");
      btnCross.classList.remove("show-btn-cross");
  }, 100)
})

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

export { removeUserElement }
