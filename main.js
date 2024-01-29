function load() {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  console.log(day, month + 1, year);
}

load();
