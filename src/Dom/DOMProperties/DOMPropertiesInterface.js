/** @interface */
export class DOMPropertiesInterface {
    /**
     * @param {!Object} propertyObject
     * @param {function(Object)} callbackFunction
     * @return this
     */
    getProps(propertyObject, callbackFunction) {}

    /**
     * @param {!Object} propertyObject
     * @return this
     */
    setProps(propertyObject) {}

    /**
     * @param {!Object} propertyObject
     * @param {number} index
     * @return {Object} propertyObject
     */
    exportProps(propertyObject, index) {}

    /**
     * @param {!string} propertyName
     * @param {function(*)} callbackFunction
     * @return this
     */
    getProp(propertyName, callbackFunction) {}

    /**
     * @param {string} propertyName
     * @param {*} value
     * @return this
     */
    setProp(propertyName, value) {}

    /**
     * @param {string} propertyName
     * @param {number} index
     * @return {*}
     */
    exportProp(propertyName, index) {}
}