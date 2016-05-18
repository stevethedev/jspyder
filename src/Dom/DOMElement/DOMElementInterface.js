/** @interface */
export class DOMElementInterface {
    attach(parent, callbackFunction) {}
    attachStart(parent, callbackFunction) {}
    attachEnd(parent, callbackFunction) {}
    append(child) {}
    appendBefore(child) {}
    appendAfter(child) {}
    prepend(child) {}
    remove() {}
    parents(callbackFunction) {}
    children(callbackFunction, daraArray) {}
    setHtml(html) {}
    getHtml(callbackFunction) {}
    exportHtml() {}
    getText(callbackFunction) {}
    exportText() {}
    setText(text) {}
    find(cssSelector) {}
    filter(cssSelector) {}
    exclude(cssSelector) {}
    and(elements) {}

    getProps(propertyObject, callbackFunction) {}
    exportProps(propertyObject) {}
    setProps(propertyObject) {}

    setValue(value, callbackFunction) {}
    getValue(callbackFunction) {}
    exportValue() {}
}