import {Dates} from "Algorithms/Dates/Dates";

export class DatesInterface {
    /**
     * Coerces any value to a date
     *
     * @param {*} value
     * @param {Date|*} [defaultValue]
     *
     * @return {Date|?}
     */
    date(value, defaultValue = new Date()) {
        return Dates.ToDate(value, defaultValue);
    }
}