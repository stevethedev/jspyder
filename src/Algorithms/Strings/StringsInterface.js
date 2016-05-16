/**
 * @interface
 */
export class StringsInterface {
    /**
     * Coerces any value to a string primitive.
     * 
     * @param {*} value
     * @param {*} defaultValue
     */
    string(value, defaultValue) {}
    
    /**
     * Escapes the string [stringToEscape] to be safe for 
     * consumption by other functions.
     * 
     * @param {string} stringToEscape
     * 
     * @return {string}
     */
    escapeString(stringToEscape) {}
}
