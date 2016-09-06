import {YEAR_LONG, YEAR_MEDIUM, YEAR_SHORT, YEAR_DIGIT}
    from "Date/Constant/Constant";

const YEAR_LONG_LOOKUP = "\\d{4}";
const YEAR_MEDIUM_LOOKUP = "\\d{3}";
const YEAR_SHORT_LOOKUP = "\\d{2}";
const YEAR_DIGIT_LOOKUP = "\\d{1}";

export const YEAR_KEYS = [
    YEAR_LONG,
    YEAR_MEDIUM,
    YEAR_SHORT,
    YEAR_DIGIT
];

export const YEAR_LOOKUP = [
    {
        [YEAR_LONG]: YEAR_LONG_LOOKUP,
        [YEAR_MEDIUM]: YEAR_MEDIUM_LOOKUP,
        [YEAR_SHORT]: YEAR_SHORT_LOOKUP,
        [YEAR_DIGIT]: YEAR_DIGIT_LOOKUP
    }
];
