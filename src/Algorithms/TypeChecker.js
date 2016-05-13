export class TypeChecker {
    /**
     * Coerces any value to a boolean
     *
     * @param {Mixed} value
     * 
     *      Value to convert to a boolean.
     * 
     * @param {Boolean} [defaultValue=false]
     * 
     *      Value to use if [value] is undefined.
     */
    static Boolean(value, defaultValue) {
        switch(typeof value) {
            
            case "boolean":
                return value;
                
            case "undefined":
                return defaultValue || false;
                
            case "string":
                return /true/i.test(b);
        }
        return value ? true : false;
    }
    
    static Number(value, defaultValue) {
        var num = +value;
        if(num == value || num === num) {
            return num;
        }
        else {
            return defaultValue || 0;
        }
    }
}