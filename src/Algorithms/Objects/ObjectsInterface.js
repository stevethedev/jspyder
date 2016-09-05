/** 
 * @interface 
 */
export class ObjectsInterface {
    /**
     * Coerces any value to an Object value.
     * 
     * @param {*} value
     * @param {*} defaultValue
     * @return {?}
     */
    object(value, defaultValue) {}
    
    /**
     * @param {!Object} base
     * @param {...Object} subs
     * 
     * @return {!Object}
     */
    mergeObj(base, ...subs) {}
    
    /**
     * @param {!Object} object
     * @return {!Object} Cloned object
     */
    cloneObj(object) {}
    
    /**
     * @param {!Object} object
     * @return {!Object} Deep-Cloned Object
     */
    deepCloneObj(object) {}
    
    /**
     * Returns the first matching property of the object, provided.
     * This is especially useful for dealing with objects that have
     * different implementations in different browsers.
     */
    property(object, ...levels) {}
}