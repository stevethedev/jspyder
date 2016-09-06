import { buildFormatRegexString } from "Date/DateString";
import { ERA_KEYS, ERA_LOOKUP } from "Date/Constant/Era";
import { YEAR_KEYS, YEAR_LOOKUP } from "Date/Constant/Year";
import { MONTH_KEYS, MONTH_LOOKUP } from "Date/Constant/Month";
import { DAY_KEYS, DAY_LOOKUP } from "Date/Constant/Days";

export const FORMAT_COLLECTION = {};

buildFormatRegexString(FORMAT_COLLECTION, ERA_LOOKUP, ERA_KEYS);
buildFormatRegexString(FORMAT_COLLECTION, YEAR_LOOKUP, YEAR_KEYS);
buildFormatRegexString(FORMAT_COLLECTION, MONTH_LOOKUP, MONTH_KEYS);
buildFormatRegexString(FORMAT_COLLECTION, DAY_LOOKUP, DAY_KEYS);

// TODO: Weekdays
// TODO: Hours
// TODO: Minutes
// TODO: Seconds
// TODO: Milliseconds
// TODO: Meridiem
// TODO: Time Zone