// url list
import {
    urlFilterVideoData,
    urlNavigationMenuData,
    urlSubscriptionData,
    urlVideoData,
    urlVideoOptionMenuData
} from "./urlList.js";

/**
 * This function uses Promise.all to fetch data from multiple address 
 * @returns {Array} - Retuns an array with the fetched values
 */
async function initFetchData(){
    console.log("fetching data");

    const filterVideoData = fetch(urlFilterVideoData);
    const navigationMenuData = fetch(urlNavigationMenuData);
    const subscriptionData = fetch(urlSubscriptionData);
    const videoData = fetch(urlVideoData);
    const videoOptionMenuData = fetch(urlVideoOptionMenuData);

    try {
        const responseValueList = await Promise.all([
            filterVideoData,
            navigationMenuData,
            subscriptionData,
            videoData,
            videoOptionMenuData
        ]);
        const dataValueList = await Promise.all(responseValueList.map(r => r.json()));
        console.log("Data fetching successful");
        return dataValueList;
    } catch (error) {
        console.log(error.message);
    }
}

export { initFetchData }