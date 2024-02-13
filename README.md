# calendar

![Alt text](calendar_1.gif)

### Next Challenge

- add schedules (modal)
- responsive web design

## ✅ What I Learned

### getMonth()

method of a Date object returns the month starting at 0

```
const firstDayOfMonth = new Date(year, month, 1);
// day 1 is the first day of the current month

const daysInMonth = new Date(year, month + 1, 0).getDate();
// jump to the next month, and ask for day 0 to get the last day of the current month
```

### Date.toLocaleDateString()

Returns a date as a string value appropriate to the host environment's current locale

```
const dateString = firstDayOfMonth.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
```

toLocaleString('en-US', options) means to display the options in English

numeric property is used to localize dates, numbers, and currencies, and its value is either true or false.

### Array.prototype.find()

find() method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned

```
  const eventForDay = events.find(e => e.date === clicked);
```

<hr>

### flex-wrap

specifies whether the flexible items should wrap or not<br>
If the elements are not flexible items, the flex-wrap property has no effect

```
#calendar {
  /* Arranged in multiple rows, not in a single row */
  display: flex;
  flex-wrap: wrap;
}
```

## Troubleshooting

### Uncaught TypeError: Cannot read properties of undefined (reading 'task')

Cause: Only when 'eventForDay' is defined, the 'task' property can be read and its value assigned to 'eventTitle'

Solution:

```
if (eventForDay) { // This will prevent an error from occurring even if 'eventForDay' is undefined
  eventTitle.innerText = eventForDay.task;
}
```
