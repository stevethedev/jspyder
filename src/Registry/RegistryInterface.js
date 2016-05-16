/**
 * @interface
 */
export class RegistryInterface {
    /**
     * @param {string} key
     * @param {Function} [callback]
     */
    fetch(key, callback) { }
    
    /**
     * @param {string} key
     * @param {Object} [value]
     */
    stash(key, value) { }
}
