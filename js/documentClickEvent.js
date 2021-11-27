import { MyStaticClass } from "./myStaticClass.js";
import { createVideoOptionMenuDiv, removeVideoOptionMenuDiv} from "./mainVideoSection/videoOptionMenu.js";
import { removeVideoOptionMenuIcon } from "./mainVideoSection/videoItem.js";

// ========================================
// Initialize document click event listener
// ========================================
function initDocumentClickEventListener(){
    document.addEventListener("click", onClickDocumentEventHandler);
}

// ==============================
// Document onclick event handler
// ==============================
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
        // removing previously selected video option menu btn if any
        // removeVideoOptionMenuIcon();
      }
    }
  }

  export { initDocumentClickEventListener }