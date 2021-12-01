import { showOfflineNotification, hideOfflineNotification } from "./notification.js";
import { dummyUrl} from "./urlList.js";

// =========================================
// ************ Event Listener *************
// =========================================

// always check for internet status changing
window.addEventListener('online', async () => {
    const online = checkOnlineStatusUsingFetch();
    if (online) {
        hideOfflineNotification();
        console.log('You became online')
    }
});
window.addEventListener('offline', () => {
    console.log('You became offline');
    showOfflineNotification();
});

/**
 * Initialize internet status checking functionality
 * @returns {Boolean} - True or False if browser connected to internet or not
 */
async function initInternetStatusCheck() {
    if(!navigator.onLine){
        console.log("You are offline");
        showOfflineNotification();
    }
    else{
        const online = checkOnlineStatusUsingFetch();
        if (online) {
            console.log("You are online");
            return true;
        }
        else{
            console.log("You are offline");
            showOfflineNotification();
        }
    }
}

// Fetching from a random addres to ensure that internet is online
/**
 * Fetch from a random addres to ensure that internet is online
 * @returns {Boolean} - True or False if fetch is successful or not
 */
async function checkOnlineStatusUsingFetch() {
    try {
        const online = await fetch(dummyUrl + Date.now());
        return online.status >= 200 && online.status < 300;
    } catch (err) {
        return false;
    }
};

export {initInternetStatusCheck}