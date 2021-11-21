import { showOfflineNotification, hideOfflineNotification } from "./notification.js";
import { dummyUrl} from "./urlList.js";


// ************ Event Listener *************
// always check for internet status changing
window.addEventListener('online', async () => {
    const online = await checkOnlineStatusUsingFetch();
    if (online) {
        hideOfflineNotification();
        console.log('You became online')
    }
});
window.addEventListener('offline', () => {
    console.log('You became offline');
    showOfflineNotification();
});

// Initialize internet status checking functionality
// Firstly checking if browser is connected to any network
// If not then showing offline message
// If yes then further checking
async function initInternetStatusCheck() {
    if(!navigator.onLine){
        console.log("You are offline");
        showOfflineNotification();
    }
    else{
        const online = await checkOnlineStatusUsingFetch();
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
async function checkOnlineStatusUsingFetch() {
    try {
        const online = await fetch(dummyUrl + Date.now());
        return online.status >= 200 && online.status < 300;
    } catch (err) {
        return false;
    }
};

export {initInternetStatusCheck}