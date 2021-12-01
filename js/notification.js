import { 
    notification,
    notificationImg,
    notificationText 
} from "./staticVariables/svNotification.js";

/**
 * This function show offline notification by adding "show-notification" class
 */
function showOfflineNotification(){
    notification.classList.add("show-notification");
}

/**
 * Change content of notification to online
 * After some time hide the notification
 */
function hideOfflineNotification(){
    notification.classList.add("notification-online");
    notificationImg.classList.add("notification-img-online");
    notificationText.innerText = "You are online...";
    setTimeout(()=>{
        notification.classList.remove("show-notification");
        setTimeout(()=>{
            notification.classList.remove("notification-online");
            notificationImg.classList.remove("notification-img-online");
            notificationText.innerText = "You are offline...";
        }, 500)
        
    }, 2000);
    
}

export { showOfflineNotification, hideOfflineNotification }
