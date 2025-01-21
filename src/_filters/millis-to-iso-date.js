const { DateTime } = require("luxon");

module.exports = value => {
  let date = Number(value);
  return DateTime.fromMillis(date).toISODate();
}