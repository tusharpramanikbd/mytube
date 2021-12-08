import { FetchedData } from "./myStaticClass.js";
import { initInternetStatusCheck } from "./internetStatusCheck.js";
import { initFetchData } from "./fetchData.js";
import { initApplicationTheme } from "./applicationTheme.js";
import { initFilterVideoSection } from "./filterVideoSection/filterVideoSection.js";
import { initMainVideoSection } from "./mainVideoSection/mainVideoSection.js";
import { initDocumentClickEventListener } from "./documentEvents.js";
import { initNavbarSection } from "./navbarSection/navbarSection.js";
import { initLeftNavigationSection } from "./leftNavigationMenusSection/leftNavSection.js";

/**
 * Here I am checking the state of the document
 * If ready state is not loading then then start the procedure
 * If domContentLoaded is also fired then the procedure is started
 */
if (document.readyState !== "loading") {
  console.log("document is already ready, start executing code here");
  initApp();
} else {
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("document was not ready, place code here");
    initApp();
  });
}

/**
 * Initialize the app
 */
async function initApp(){
    // step 1 -> internet connection check
    if (initInternetStatusCheck()) {
        // step 2 -> fetch data
        const result = await initFetchData();
        // step 3 -> cache data
        cacheAllFetchedData(result);
        // step 4 -> initialize application theme
        initApplicationTheme();
        // step 5 -> initialize all the components
        initAllComponents();
    }
}

/**
 * Caching all the fetched data to a static class
 * @param {Array} values - List of fetched data in array
 */
function cacheAllFetchedData(values) {
  FetchedData.setFilterDataList(values[0]);
  FetchedData.setNavigationMenuDataList(values[1]);
  FetchedData.setSubscriptionDataList(values[2]);
  FetchedData.setVideoDataList(values[3]);
  FetchedData.setVideoOptionMenuDataList(values[4]);
  console.log("Data caching successful");
}

/**
 * Initialize all the components
 */
function initAllComponents() {
  initFilterVideoSection();
  initMainVideoSection();
  initDocumentClickEventListener();
  initNavbarSection();
  initLeftNavigationSection();
}
