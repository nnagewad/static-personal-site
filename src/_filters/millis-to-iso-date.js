import { DateTime } from "luxon";

export default value => {
  let date = Number(value);
  return DateTime.fromMillis(date).toISODate();
}