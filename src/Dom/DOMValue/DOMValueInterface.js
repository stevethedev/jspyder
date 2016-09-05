/** @interface */
export class DOMValueInterface {
    /**
     * @param {*} value
     * @return this
     */
    setValue(value) {}

    /**
     * @param {function(Object)} callbackFunction
     * @return this
     */
    getValue(callbackFunction) {}

    /**
     * @param {number} index
     * @return {*}
     */
    exportValue(index) {}
}