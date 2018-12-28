const dayMiliSeconds = 86400000;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Friday",
  "Saturday"
]

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
]

export function moreThanDay(date) {
  // const yesterday = new Date(now - dayMiliSeconds);
  // console.log(yesterday);
  // console.log(date);
  // return (yesterday.getDate() === date.getDate());
  return (Date.now() - date) >= dayMiliSeconds;
}

export function parseHours(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  return hours + ":" + minutes;
}

export function parseMonthDate(date) {
  const month = months[date.getMonth()];
  const dateNumber = date.getDate();
  return month + " " + dateNumber;
}

export function parseDay(date) {
  return days[date.getDay()];
}

export function parseDate(date, US = false) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const format = (US) ? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
  return format;
}

export function getTimePassed(date) {
  const difference = (Date.now() - date) / 1000;
  let minutes = 0,
    hours = 0,
    seconds = 0;
  if (difference > 0) {
    minutes = Math.floor(difference / 60);
    hours = Math.floor(minutes / 60);
    minutes -= (hours * 60);
    seconds = Math.floor(difference - (hours * 60 + minutes) * 60);
  }
  return {
    hours,
    minutes,
    seconds
  }
}