const { DateTime } = require("luxon");

module.exports = value => {
  let date = DateTime.fromJSDate(value);
  return DateTime.fromISO(date).toISODate();
}