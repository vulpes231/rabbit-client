export function getJoinedTimeAgo(joinedDate) {
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = currentDate.getTime() - joinedDate.getTime();

  // Convert milliseconds to days
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysAgo = Math.floor(timeDiff / msPerDay);

  // Output the result
  if (daysAgo >= 365) {
    return (
      Math.floor(daysAgo / 365) +
      (Math.floor(daysAgo / 365) === 1 ? " year ago" : " years ago")
    );
  } else if (daysAgo >= 30) {
    return (
      Math.floor(daysAgo / 30) +
      (Math.floor(daysAgo / 30) === 1 ? " month ago" : " months ago")
    );
  } else if (daysAgo === 1) {
    return "1 day ago";
  } else if (daysAgo === 0) {
    return "today";
  } else {
    return daysAgo + " days ago";
  }
}
