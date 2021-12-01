/**
 * Return an element matching selection inside document
 * @param {String} selection - Class name or id of target element
 * @returns {HTMLElement} 
 */
const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

/**
 * Return a child element matching selection inside a parent element
 * @param {HTMLElement} element - Parent element
 * @param {String} selection - Class name or id of target element
 * @returns {HTMLElement}
 */
const getElementFromElement = (element, selection) => {
  const childElement = element.querySelector(selection);
  if (childElement) return childElement;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

/**
 * Returns all child elements matching selection inside a parent element
 * @param {HTMLElement} element - Parent element
 * @param {String} selection - Class name or id of target element
 * @returns {Array} - ArrayList of all child elements matching the selection
 */
const getAllElementFromElement = (element, selection) => {
  const childElement = element.querySelectorAll(selection);
  if (childElement) return [...childElement];
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

/**
 * Returns all child elements matching selection inside document
 * @param {String} selection - Class name or id of target element
 * @returns {HTMLElement}
 */
const getElementAll = (selection) => {
  const element = document.querySelectorAll(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

/**
 * Returns width of the screen
 * @author <https://stackoverflow.com/>
 * @returns {Number}
 */
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

/**
 * Find a given element is visible to user or not
 * @author <https://stackoverflow.com/>
 * @param {HTMLElement} element - Target element
 * @returns {Boolean} - If element visible then true else false
 */
function isVisible(element) {
  if (!(element instanceof Element))
    throw Error("DomUtil: element is not an HTML Element.");
  const style = getComputedStyle(element);
  if (style.display === "none") return false;
  if (style.visibility !== "visible") return false;
  if (style.opacity < 0.1) return false;
  if (
    element.offsetWidth +
    element.offsetHeight +
    element.getBoundingClientRect().height +
    element.getBoundingClientRect().width ===
    0
  ) {
    return false;
  }
  const elementCenter = {
    x: element.getBoundingClientRect().left + element.offsetWidth / 2,
    y: element.getBoundingClientRect().top + element.offsetHeight / 2,
  };
  if (elementCenter.x < 0) return false;
  if (
    elementCenter.x > (document.documentElement.clientWidth || window.innerWidth)
  )
    return false;
  if (elementCenter.y < 0) return false;
  if (
    elementCenter.y > (document.documentElement.clientHeight || window.innerHeight)
  )
    return false;
  let pointContainer = document.elementFromPoint(elementCenter.x, elementCenter.y);
  do {
    if (pointContainer === element) return true;
  } while ((pointContainer = pointContainer.parentNode));
  return false;
}

/**
 * Add prevent default functionality to the event of targeted element
 * @param {Event} event 
 * @return {void}
 */
function addPreventDefault(event) {
  event.preventDefault();
}

export {
  getElement,
  getElementAll,
  getWidth,
  isVisible,
  getElementFromElement,
  getAllElementFromElement,
  addPreventDefault,
};
