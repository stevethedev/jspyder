/**
 * @interface
 */
export class RegistryInterface {
    /**
     * @param {string} key
     * @param {function(*)} [callback]
     * @return {*}
     */
    fetch(key, callback) { }
    
    /**
     * @param {string} key
     * @param {*} value
     * @return {*}
     */
    stash(key, value) { }
}
