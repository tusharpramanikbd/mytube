import { getElement, getElementAll } from "../utils.js";

// list of global static elements

// Notification
const notification = getElement(".notification"); 
const notificationImg = getElement(".notification-img-offline"); 
const notificationText = getElement(".notification-text-offline"); 

export {
    notification,
    notificationImg, 
    notificationText
}