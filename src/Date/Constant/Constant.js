export const ERA = "G";
export const ERA_ALT = "C";
export const YEAR_LONG = "yyyy";
export const YEAR_MEDIUM = "yyy";
export const YEAR_SHORT = "yy";
export const YEAR_DIGIT = "y";
export const MONTH_LONG_U = "MMMM";
export const MONTH_LONG_L = "mmmm";
export const MONTH_SHORT_U = "MMM";
export const MONTH_SHORT_L = "mmm";
export const MONTH_DDIGIT = "mm";
export const MONTH_SDIGIT = "m";
export const DAY_DDIGIT_TH = "ddth";
export const DAY_SDIGIT_TH = "dth";
export const DAY_DDIGIT = "dd";
export const DAY_SDIGIT = "d";
export const WEEKDAY_LONG_U = "WWWW";
export const WEEKDAY_LONG_L = "wwww";
export const WEEKDAY_SHORT_U = "WWW";
export const WEEKDAY_SHORT_L = "www";
export const WEEKDAY_DLETTER_U = "WW";
export const WEEKDAY_DLETTER_L = "ww";
export const WEEKDAY_LETTER_U = "W";
export const WEEKDAY_LETTER_L = "w";
export const MERIDIEM_DOUBLE_U = "TT";
export const MERIDIEM_DOUBLE_L = "tt";
export const MERIDIEM_SINGLE_U = "T";
export const MERIDIEM_SINGLE_L = "t";
export const HOUR_DDIGIT_M = "HH"; // 4PM = 16, 4AM = 04
export const HOUR_SDIGIT_M = "H";  // 4PM = 16, 4AM =  4
export const HOUR_DDIGIT_C = "hh"; // 4PM = 04, 4AM = 04
export const HOUR_SDIGIT_C = "h";  // 4PM =  4, 4AM =  4
export const MINUTE_DDIGIT = "nn"; // :04 = :04
export const MINUTE_SDIGIT = "n";  // :04 = : 4
export const SECOND_DDIGIT = "ss";
export const SECOND_SDIGIT = "s";
export const MSECOND_TDIGIT = "xxx";
export const MSECOND_DDIGIT = "xx";
export const MSECOND_SDIGIT = "x";
export const TZONE_TDIGIT = "ttt"; // -05:00
export const TZONE_DDIGIT = "tt";  // -05
export const TZONE_SDIGIT = "t";  // -5

export const LOOKUP_REGEXP = new RegExp(`(\\[[^\\]]*\\]|${[
    ERA,
    ERA_ALT,
    YEAR_LONG,
    YEAR_MEDIUM,
    YEAR_SHORT,
    YEAR_DIGIT,
    MONTH_LONG_U,
    MONTH_LONG_L,
    MONTH_SHORT_U,
    MONTH_SHORT_L,
    MONTH_DDIGIT,
    MONTH_SDIGIT,
    DAY_DDIGIT_TH,
    DAY_SDIGIT_TH,
    DAY_DDIGIT,
    DAY_SDIGIT,
    WEEKDAY_LONG_U,
    WEEKDAY_LONG_L,
    WEEKDAY_SHORT_U,
    WEEKDAY_SHORT_L,
    WEEKDAY_DLETTER_U,
    WEEKDAY_DLETTER_L,
    WEEKDAY_LETTER_U,
    WEEKDAY_LETTER_L,
    MERIDIEM_DOUBLE_U,
    MERIDIEM_DOUBLE_L,
    MERIDIEM_SINGLE_U,
    MERIDIEM_SINGLE_L,
    HOUR_DDIGIT_M,
    HOUR_SDIGIT_M,
    HOUR_DDIGIT_C,
    HOUR_SDIGIT_C,
    MINUTE_DDIGIT,
    MINUTE_SDIGIT,
    SECOND_DDIGIT,
    SECOND_SDIGIT,
    MSECOND_TDIGIT,
    MSECOND_DDIGIT,
    MSECOND_SDIGIT,
    TZONE_TDIGIT,
    TZONE_DDIGIT,
    TZONE_SDIGIT
].join("|")})`, "g");

export const DEFAULT_FORMAT = `${WEEKDAY_SHORT_L} ${MONTH_SHORT_L} ${DAY_SDIGIT} ${YEAR_LONG} ${HOUR_DDIGIT_C}:${MINUTE_DDIGIT}:${SECOND_DDIGIT}}`;
export const DEFAULT_UTC = false;