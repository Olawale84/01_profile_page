const day = document.querySelector('[data-testid="currentDayOfTheWeek"]');
const timeUTC = document.querySelector('[data-testid="currentUTCTime"]');
function updateDateTime() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getUTCDay()];
  const time = now.getUTCHours() + ":" + now.getUTCMinutes() + " UTC";

  day.textContent = dayOfWeek;
  timeUTC.textContent = time;
}

// Update the date and time every minute
setInterval(updateDateTime, 60000);

// Call the function initially
updateDateTime();
