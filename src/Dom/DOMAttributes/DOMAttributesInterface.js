/** @interface */
export class DOMAttributesInterface {
    /**
     * @param {!Object} attributeObject
     * @param {function(Object)} callbackFunction
     * @return this
     */
    getAttrs(attributeObject, callbackFunction) {}

    /**
     * @param {!Object} attributeObject
     * @return this
     */
    setAttrs(attributeObject) {}

    /**
     * @param {!Object} attributeObject
     * @return {Object} attributeObject
     */
    exportAttrs(attributeObject) {}

    /**
     * @param {string} attribute
     * @param {function(Object)} callbackFunction
     * @return this
     */
    getAttr(attribute, callbackFunction) {}

    /**
     * @param {string} attribute
     * @param {?} value
     * @return this
     */
    setAttr(attribute, value) {}

    /**
     * @param {string} attribute
     * @return {string|null}
     */
    exportAttr(attribute) {}
}