import { FetchedData } from "./myStaticClass.js";
import { initInternetStatusCheck } from "./internetStatusCheck.js";
import { initFetchData } from "./fetchData.js";
import { initApplicationTheme } from "./applicationTheme.js";
import { initFilterVideoSection } from "./filterVideoSection/filterVideoSection.js";

// step 0 -> document state check
if( document.readyState !== 'loading' ) {
    console.log( 'document is already ready, start executing code here' );
    
    // step 1 -> internet connection check
    if(await initInternetStatusCheck()){
        // step 2 -> fetch data
        const result = await initFetchData();
        // step 3 -> cache data
        cacheAllFetcheddata(result);
        // step 4 -> initialize application theme
        initApplicationTheme()
        // step 5 -> initialize all the components
        initAllComponents();
    }
} 
else {
    document.addEventListener('DOMContentLoaded', async () => {
        console.log( 'document was not ready, place code here' );

        // step 1 -> internet connection check
        if(await initInternetStatusCheck()){
             // step 2 -> fetch data
            const result = await initFetchData();
            // step 3 -> cache data
            cacheAllFetcheddata(result);
            // step 4 -> initialize application theme
            initApplicationTheme()
            // step 5 -> initialize all the components
            initAllComponents();
        }
    });
}

// caching all the fetched data to a static class
function cacheAllFetcheddata(values){
    FetchedData.setFilterDataList(values[0]);
    FetchedData.setNavigationMenuDataList(values[1]);
    FetchedData.setSubscriptionDataList(values[2]);
    FetchedData.setVideoDataList(values[3]);
    FetchedData.setVideoOptionMenuDataList(values[4]);

    console.log("Data caching successful");
}

// initialize all the components
function initAllComponents(){
    console.log("Initializing all components");
    initFilterVideoSection();
}













