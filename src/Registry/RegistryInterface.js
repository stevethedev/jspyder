/**
 * @interface
 */
export class RegistryInterface {
    /**
     * @param {String} key
     * @param {Function} [callback]
     */
    fetch(key, callback) { }
    
    /**
     * @param {String} key
     * @param {Object} [value]
     */
    stash(key, value) { }
}
