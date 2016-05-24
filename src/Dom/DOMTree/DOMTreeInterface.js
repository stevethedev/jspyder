/** @interface */
export class DOMTreeInterface {
    createDocumentFragment() {}

    attach(parent) {}
    attachStart(parent) {}
    
    attachBefore(reference) {}
    attachAfter(reference) {}

    append(child) {}
    prepend(child) {}

    appendBefore(insertNode) {}
    appendAfter(insertNode) {}
    
    remove() {}
    
    parents(callbackFunction) {}
    children(callbackFunction, dataArray) {}
}