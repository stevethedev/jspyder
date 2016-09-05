/** @interface */
export class BooleansInterface {
    /**
     * Coerces any value to a boolean.
     * 
     * @param {*} value
     *  
     *      Value to convert to a boolean
     * 
     * @param {*} defaultValue
     * 
     *      Default value to use as a last resort.
     */
    bool(value, defaultValue) {}
}