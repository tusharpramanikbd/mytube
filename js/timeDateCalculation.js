import { createdTimeList } from "./staticVariables/svMainVideoSection.js";

const refreshTimeIntervalInSeconds = 120;

/**
 * Convert seconds into HH:MM:SS format
 * @param {Number} totalTimeInSeconds
 * @returns {String} - Time in HH:MM:SS string format
 */
function convertToHMS(totalTimeInSeconds) {
  let hours = Math.floor(totalTimeInSeconds / 3600);
  let minutes = Math.floor((totalTimeInSeconds - hours * 3600) / 60);
  let seconds = totalTimeInSeconds - hours * 3600 - minutes * 60;

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

/**
 * Calculate video upload date in minute, hour, day, month, year from formatted time
 * @param {String} timeInHHMMSS - Time in HH:MM:SS string format
 * @returns {String} - Return strings like minutes/hours/days/months/years ago
 */
function calculateVideoUploadDate(timeInHHMMSS) {
  const timeArray = timeInHHMMSS.split(":");
  if (timeInHHMMSS.length < 8) {
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

/**
 * This method refresh the calculated date every 1 second to get updated upload date
 * @param {Array} videoUploadDateList 
 * @return {void}
 */
function startVideoUploadDateCalculation(videoUploadDateList) {
  console.log("Started refreshing video upload date");
  setInterval(() => {
    createdTimeList.map((item) => {
      videoUploadDateList.forEach((videoItem) => {
        if (item.dataset.id === videoItem.id.toString()) {
          item.textContent = calculateTimeFromDate(videoItem.created);
        }
      });
    });
  }, refreshTimeIntervalInSeconds * 1000);
}

/**
 * Generate how much time before this video uploaded  
 * @param {String} creationDate - The date and time the video uploaded
 * @returns {String} - Returns string as like minutes/hours/days/months/years ago
 */
function calculateTimeFromDate(creationDate) {
  const date = new Date(creationDate);
  const timeDifferenceInMilliseconds = Date.now() - date.getTime();
  const timeInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  return calculateVideoUploadDate(convertToHMS(timeInSeconds));
}

export {
  convertToHMS,
  calculateVideoUploadDate,
  startVideoUploadDateCalculation,
  calculateTimeFromDate,
};
