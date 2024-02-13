let nav = 0;
let clickedDate = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const calendar = document.getElementById("calendar");
const newModal = document.getElementById("newModal");
const editModal = document.getElementById("editModal");
const newInputField = document.getElementById("newInputField");
const editInputField = document.getElementById("editInputField");

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
  clickedDate = date;

  const eventForDay = events.find((e) => e.date === clickedDate);

  if (eventForDay) {
    editModal.style.display = "block";
    editInputField.value = eventForDay.task;
  } else {
    newModal.style.display = "block";
  }
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
    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    console.log("dayString:", dayString);

    daySquare.classList.add("day"); // add a class

    console.log(i - paddingDays);
    console.log(day);

    daySquare.addEventListener("click", () => openModal(dayString));

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays; // add(modify) text content

      const eventForDay = events.find((e) => e.date === dayString);

      if (eventForDay) {
        daySquare.classList.add("event");

        console.log("eventForDay: ", eventForDay);

        const eventTitle = document.createElement("div");
        eventTitle.classList.add("title");

        eventTitle.innerText = eventForDay.task;

        daySquare.appendChild(eventTitle);
      }
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

function closeModal() {
  newModal.style.display = "none";
  editModal.style.display = "none";

  newInputField.value = "";

  load();
}

function saveEvent() {
  if (newInputField.value) {
    events.push({
      date: clickedDate,
      task: newInputField.value,
    });
  }

  localStorage.setItem("events", JSON.stringify(events));
  console.log("events save: ", events);

  closeModal();
  load();
}

function editEvent() {
  const eventIndex = events.findIndex((e) => e.date === clickedDate);
  events[eventIndex].task = editInputField.value;

  localStorage.setItem("events", JSON.stringify(events));
  console.log("events edit:", events);

  closeModal();
  load();
}

function deleteEvent() {
  events = events.filter((e) => e.date !== clickedDate);

  localStorage.setItem("events", JSON.stringify(events));
  console.log("events delete: ", events);

  closeModal();
  load();
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

  document.getElementById("save").addEventListener("click", saveEvent);
  document.getElementById("edit").addEventListener("click", editEvent);
  document.getElementById("cancel").addEventListener("click", closeModal);
  document.getElementById("cancelEdit").addEventListener("click", closeModal);
  document.getElementById("delete").addEventListener("click", deleteEvent);
}
initButtons();
load();
