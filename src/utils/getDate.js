export function getJoinedTimeAgo(joinedDate) {
  try {
    // Parse the joinedDate string into a Date object
    const [day, month, year] = joinedDate.split("/").map(Number);

    // Validate day, month, year ranges
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new Error("Invalid date format");
    }

    const joinedDateTime = new Date(year, month - 1, day); // Month is 0-based in JavaScript Date constructor

    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = currentDate.getTime() - joinedDateTime.getTime();

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
  } catch (error) {
    console.error("Error parsing or calculating date:", error);
    return ""; // or handle error as needed
  }
}

export const getAccessToken = () => {
  const token = sessionStorage.getItem("accessToken");
  return token ? JSON.parse(token) : null;
};
