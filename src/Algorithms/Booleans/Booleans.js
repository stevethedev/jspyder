export class Booleans {
    /**
     * Coerces any value to a boolean
     *
     * @param {?} value
     * 
     *      Value to convert to a boolean.
     * 
     * @param {?} defaultValue
     * 
     *      Value to use if [value] is undefined.
     */
    static ToBoolean(value, defaultValue = false) {
        switch(typeof value) {
            
            case "boolean":
                return value;
                
            case "undefined":
                return defaultValue;
                
            case "string":
                if(/^true$/i.test(value)) {
                    return true;
                }
                else if(/^false$/i.test(value)) {
                    return false;
                }
                else {
                    return defaultValue;
                }
                
            case "number":
                return value !== 0;
        }
        return value ? true : defaultValue;
    }
}