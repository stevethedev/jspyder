/** @interface */
export class DOMElementInterface {
    setHtml(html) {}
    getHtml(callbackFunction) {}
    exportHtml() {}

    getText(callbackFunction) {}
    exportText() {}
    setText(text) {}

    // find(cssSelector) {}
    // filter(cssSelector) {}
    // exclude(cssSelector) {}
    // and(elements) {}

    getProps(propertyObject, callbackFunction) {}
    exportProps(propertyObject) {}
    setProps(propertyObject) {}

    setValue(value, callbackFunction) {}
    getValue(callbackFunction) {}
    exportValue() {}
}