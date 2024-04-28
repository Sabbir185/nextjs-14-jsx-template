import moment from "moment";

export const getRemainingDays = (endDate) => {
  const today = new Date();
  const endDateObject = new Date(endDate);
  const timeDifference = endDateObject.getTime() - today.getTime();
  let remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (remainingDays < 0) {
    remainingDays = 0;
  }

  return remainingDays;
};

export const formatLastSeen = (lastSeen) => {
  if (!lastSeen) return "Loading...";

  const currentTime = new Date();
  const duration = moment.duration(moment(currentTime).diff(moment(lastSeen)));

  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())} seconds ago`;
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} minutes ago`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())} hours ago`;
  } else if (duration.asDays() < 30) {
    return `${Math.floor(duration.asDays())} days ago`;
  } else if (duration.asMonths() < 12) {
    return `${Math.floor(duration.asMonths())} months ago`;
  } else {
    return `${Math.floor(duration.asYears())} years ago`;
  }
};

export const capitalizeFirstLetter = (str) => {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
