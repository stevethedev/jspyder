export class TypeChecker {
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
    static Boolean(value, defaultValue = false) {
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
    
    /**
     * @param {?} value
     * @param {?} defaultValue
     */
    static Number(value, defaultValue = 0) {
        var num = +value;
        if(num == value && num === num) {
            return num;
        }
        else {
            return defaultValue;
        }
    }
}