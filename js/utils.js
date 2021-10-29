const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

const getElementFromElement = (element, selection) => {
  const childElement = element.querySelector(selection);
  if (childElement) return childElement;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

const getAllElementFromElement = (element, selection) => {
  const childElement = element.querySelectorAll(selection);
  if (childElement) return childElement;
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

// This method add the prevent default functionality to the element
function addPreventDefault(evt) {
  evt.preventDefault();
}

export {
  getElement,
  getElementAll,
  getWidth,
  changeColor,
  changeColorFast,
  isVisible,
  getElementFromElement,
  getAllElementFromElement,
  addPreventDefault,
};
