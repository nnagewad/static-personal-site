import { DateTime } from "luxon";

export default value => {
  let date = DateTime.fromJSDate(value);
  return DateTime.fromISO(date).toISODate();
}