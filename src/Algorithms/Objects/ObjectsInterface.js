/** @interface */
export class Objects {
    /**
     * Coerces any value to an Object value.
     * 
     * @param {*} value
     * @param {*} defaultValue
     */
    object(value, defaultValue) {}
    
    mergeObj(base, ...subs) {}
    cloneObj(object) {}
    deepCloneObj(object) {}
    
    /**
     * Returns the first matching property of the object, provided.
     * This is especially useful for dealing with objects that have
     * different implementations in different browsers.
     */
    property(object, ...levels) {}
}