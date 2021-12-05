import { MyStaticClass } from "./myStaticClass.js";
import { createVideoOptionMenuDiv, removeVideoOptionMenuDiv} from "./mainVideoSection/videoOptionMenu.js";
import { removeVideoOptionMenuIcon } from "./mainVideoSection/videoItem.js";
import { hideUserMenus, hideAppearanceMenus } from "./navbarSection/navbarRightSection.js";
import { hideSectionMenusOverlay } from "./leftNavigationMenusSection/leftNavSectionOverlay.js"
import { removeAddedClasses } from "./navbarSection/navbarMiddleSection.js"
import { getWidth } from "./utils.js"

// =========================================
// ************ Event Listener *************
// =========================================

window.onresize = () => {
  if (getWidth() > 1312) {
    hideSectionMenusOverlay();
  }
  if (getWidth() > 800) {
    removeAddedClasses();
  }
};

/**
 * Initialize whole document click event listener
 */
function initDocumentClickEventListener(){
  console.log("Initializing document click event listener");
  document.addEventListener("click", onClickDocumentEventHandler);
}


// =========================================
// ************* Event Handler *************
// =========================================

/**
 * Whole document onclick event handler
 * @param {Event} e 
 */
function onClickDocumentEventHandler(e){
  const element = e.target;
  
  // If clicked item is video option menu icon
  if(element.classList.contains("video-option-menu")){
    // If previously no video option div was created
    // then create new video option div
    if(!MyStaticClass.getSavedVideoOptionMenuBtn()){
      createVideoOptionMenuDiv(element, e);
    }
    // If previously video option div was created
    else{
      const previousItemId = MyStaticClass.getSavedVideoOptionMenuBtn();
      const currentItemId = element.closest(".div-video-item").dataset.id;
      removeVideoOptionMenuDiv();
      removeVideoOptionMenuIcon();
      // if the clicked btn is not same as previously selected btn
      if(previousItemId !== currentItemId){
        createVideoOptionMenuDiv(element, e);
      }
    }
  }
  else{
    if(MyStaticClass.getSavedVideoOptionMenuBtn()){
      const previousItemId = MyStaticClass.getSavedVideoOptionMenuBtn();
      const currentItem = element.closest(".div-video-item");
      if(currentItem){
        if( previousItemId !== currentItem.dataset.id){
          removeVideoOptionMenuDiv()
          removeVideoOptionMenuIcon();
        }
      }
      else{
        removeVideoOptionMenuDiv()
        removeVideoOptionMenuIcon();
      }
    }
  }

  // if the clicked item is not user when user is showing
  // then hide the user menus
  if(!element.closest(".user") && !element.closest(".avater-img") && !element.closest(".appearance")){
    hideUserMenus();
    hideAppearanceMenus();
  }
}

export { initDocumentClickEventListener }