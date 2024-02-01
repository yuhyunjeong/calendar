const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function load() {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1); // 1 is the first day of month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0 is the last day of month

  console.log(day, month + 1, year);
  console.log("date:", date);
  console.log("month:", month);
  console.log("daysInMonth:", daysInMonth);
  console.log("firstDayOfMonth:", firstDayOfMonth);

  const dateString = firstDayOfMonth.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }); // (English, option)
  console.log("dateString:", dateString);
}

load();
