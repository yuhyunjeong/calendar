let nav = 0;
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const calendar = document.getElementById("calendar");

const eventModal = document.getElementById("eventModal");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find((e) => e.date === clicked);

  eventModal.style.display = "block";
}

function closeModal() {
  eventModal.style.display = "none";
}

function load() {
  const date = new Date();

  //when click back or next button
  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1); // 1 is the first day of month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0 is the last day of month

  console.log(day, month + 1, year);
  console.log("day:", day);

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
  console.log(date.toLocaleDateString("en-US", { month: "long" }));

  document.getElementById("month").innerText = `${date.toLocaleDateString(
    "en-US",
    { month: "long" }
  )} ${year}`;

  // initialize calendar
  calendar.innerHTML = "";

  const paddingDays = weekdays.indexOf(dateString.split(",")[0]); // dates from previous months that are not part of the beginning of the current month
  console.log("paddingDays: ", paddingDays);

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");

    daySquare.classList.add("day"); // add a class

    console.log(i - paddingDays);
    console.log(day);

    daySquare.addEventListener("click", () =>
      openModal(`${month + 1}/${i - paddingDays}/${year}`)
    );

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays; // add(modify) text content
    } else {
      daySquare.classList.add("padding");
    }

    // current day, month
    if (i - paddingDays == day && nav === 0) {
      daySquare.classList.add("today");

      const todayText = document.createElement("div");
      todayText.innerText = " Today"; // add text content

      daySquare.appendChild(todayText);
    }

    calendar.appendChild(daySquare); // add new child node
  }
}

function initButtons() {
  document.getElementById("back").addEventListener("click", () => {
    nav--;
    load(); // reload
    console.log("back");
  });

  document.getElementById("next").addEventListener("click", () => {
    nav++;
    load(); // reload
    console.log("next");
  });

  document.getElementById("cancel").addEventListener("click", closeModal);
}
initButtons();
load();
