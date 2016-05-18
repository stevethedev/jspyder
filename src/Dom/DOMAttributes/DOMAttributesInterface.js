/** @interface */
export class DOMAttributesInterface {
    getAttrs(attributeObject, callbackFunction) {}
    exportAttrs(attributeObject) {}
    setAttrs(attributeObject, callbackFunction) {}
    getAttr(attribute, callbackFunction) {}
    exportAttr(attribute) {}
    setAttr(attribute, value) {}
}