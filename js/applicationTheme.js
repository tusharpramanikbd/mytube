let currentTheme;

function initApplicationTheme(){
    currentTheme = localStorage.getItem("theme");
    if(!currentTheme){
        currentTheme = "dark";
        localStorage.setItem("theme", currentTheme);
    }
    console.log("Application theme initialized");
}

function getCurrentTheme(){
    return currentTheme;
}

function setCurrentTheme(theme){
    currentTheme = theme;
    localStorage.setItem("theme", currentTheme);
}

function isDarkThemeActivated(){
    if(currentTheme === "dark"){
        return true;
    }
    return false;
}

export { initApplicationTheme, isDarkThemeActivated };