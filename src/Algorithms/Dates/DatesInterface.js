/** @interface */
export class DatesInterface {
    /**
     * Coerces any value to a date
     *
     * @param {*} value
     * @param {Date|*} [defaultValue]
     *
     * @return {Date|?}
     */
    date(value, defaultValue) {}
}