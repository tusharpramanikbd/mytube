import { getElementAll } from "./utils.js";

let refreshTimeIntervalInSeconds = 120;

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
    let arr = new Array(...timeArray[0]);
    if (arr[0] === "0") {
      if (arr[1] === "0") {
        return `now`;
      }
      if (arr[1] === "1") {
        return `${arr[1]} minute ago`;
      }
      return `${arr[1]} minutes ago`;
    }
    return `${timeArray[0]} minutes ago`;
  } else {
    if (timeArray[0] > 24) {
      const days = timeArray[0] / 24;
      if (Math.floor(days) < 30) {
        if (Math.floor(days) === 1) {
          return `${Math.floor(days)} day ago`;
        }
        return `${Math.floor(days)} days ago`;
      } else {
        const months = days / 30;
        if (Math.floor(months) < 12) return `${Math.floor(months)} months ago`;
        else {
          const years = months / 12;
          return `${Math.floor(years)} years ago`;
        }
      }
    } else {
      let arr = new Array(...timeArray[0]);
      if (arr[0] === "0") {
        if (arr[1] === "1") {
          return `${arr[1]} hour ago`;
        }
        return `${arr[1]} hours ago`;
      }
      return `${timeArray[0]} hours ago`;
    }
  }
}

/* 
=======================================
Video Create Time Related functionality
=======================================
 */
function startTimeCalculation(savedVideoCreatedTimeList) {
  const createdTimeList = [...getElementAll(".created-time")];
  console.log("started refreshing");
  setInterval(() => {
    createdTimeList.map((item) => {
      savedVideoCreatedTimeList.forEach((videoItem) => {
        if (item.dataset.id === videoItem.id.toString()) {
          item.textContent = calculateTimeFromDate(videoItem.created);
        }
      });
    });
  }, refreshTimeIntervalInSeconds * 1000);
}

function calculateTimeFromDate(creationDate) {
  const date = new Date(creationDate);
  const timeDifferenceInMilliseconds = Date.now() - date.getTime();
  const timeInSecons = Math.floor(timeDifferenceInMilliseconds / 1000);
  return calculateCreationDate(convertHMS(timeInSecons));
}

export {
  convertHMS,
  calculateCreationDate,
  startTimeCalculation,
  calculateTimeFromDate,
};
