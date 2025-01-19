module.exports = value => {
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let date = new Date(value);
  return `${month[date.getMonth()]} ${(date.getDate())}, ${date.getUTCFullYear()}`;
}