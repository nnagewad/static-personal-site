module.exports = value => {
  let month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  let date = new Date(value);
  return `${date.getUTCFullYear()}-${month[date.getMonth()]}-${(date.getDate())}`;
};