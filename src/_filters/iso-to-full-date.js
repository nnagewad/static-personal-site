import { DateTime } from "luxon";

export default value => {
  let date = DateTime.fromJSDate(value);
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);
}