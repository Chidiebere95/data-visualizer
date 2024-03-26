import moment from 'moment';

export {};
export const getTimeAgo = (time: any) => {
  // Get the current time
  const currentTime = moment();

  // Assuming you have the date string
  const dateString = time;

  // Parse the date string using moment
  const date = moment(dateString);

  // Calculate the difference in milliseconds
  const diffMilliseconds = currentTime.diff(date);

  // Calculate the difference in seconds, minutes, hours, days, months, and years
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30); // Approximation
  const diffYears = Math.floor(diffDays / 365); // Approximation

  // Determine the appropriate format based on the difference
  let formattedDifference;
  if (diffYears > 0) {
    formattedDifference = `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  } else if (diffMonths > 0) {
    formattedDifference = `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  } else if (diffDays > 0) {
    formattedDifference = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    formattedDifference = `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMinutes > 0) {
    formattedDifference = `${diffMinutes} min${diffMinutes > 1 ? 's' : ''} ago`;
  } else {
    formattedDifference = `${diffSeconds} sec${diffSeconds > 1 ? 's' : ''} ago`;
  }
  return formattedDifference;
};
