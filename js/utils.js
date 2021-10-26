const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

const getElementAll = (selection) => {
  const element = document.querySelectorAll(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function changeColor(element) {
  element.style.backgroundColor = "#5f5e5e";
  setTimeout(() => {
    element.style.backgroundColor = "transparent";
  }, 400);
}

function changeColorFast(element, color) {
  element.style.backgroundColor = "#5f5e5e";
  setTimeout(() => {
    if (color) {
      element.style.backgroundColor = color;
    } else {
      element.style.backgroundColor = "transparent";
    }
  }, 100);
}

function isVisible(elem) {
  if (!(elem instanceof Element))
    throw Error("DomUtil: elem is not an element.");
  const style = getComputedStyle(elem);
  if (style.display === "none") return false;
  if (style.visibility !== "visible") return false;
  if (style.opacity < 0.1) return false;
  if (
    elem.offsetWidth +
      elem.offsetHeight +
      elem.getBoundingClientRect().height +
      elem.getBoundingClientRect().width ===
    0
  ) {
    return false;
  }
  const elemCenter = {
    x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
    y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
  };
  if (elemCenter.x < 0) return false;
  if (
    elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)
  )
    return false;
  if (elemCenter.y < 0) return false;
  if (
    elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)
  )
    return false;
  let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
  do {
    if (pointContainer === elem) return true;
  } while ((pointContainer = pointContainer.parentNode));
  return false;
}

function convertHMS(sec) {
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (hours === "00") {
    return minutes + ":" + seconds;
  } else {
    return hours + ":" + minutes + ":" + seconds;
  }
}

function calculateCreationDate(time) {
  const timeArray = time.split(":");
  if (time.length < 8) {
    return `${timeArray[0]} minutes ago`;
  } else {
    if (timeArray[0] > 24) {
      const days = timeArray[0] / 24;
      if (Math.floor(days) < 30) return `${Math.floor(days)} days ago`;
      else {
        const months = days / 30;
        if (Math.floor(months) < 12) return `${Math.floor(months)} months ago`;
        else {
          const years = months / 12;
          return `${Math.floor(years)} years ago`;
        }
      }
    } else {
      return `${timeArray[0]} hours ago`;
    }
  }
}

export {
  getElement,
  getElementAll,
  getWidth,
  changeColor,
  changeColorFast,
  isVisible,
  convertHMS,
  calculateCreationDate,
};
