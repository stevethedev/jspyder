/** @interface */
export class DOMTreeInterface {
    attach(parent, callbackFunction) {}
    attachStart(parent, callbackFunction) {}
    
    append(child) {}
    appendBefore(child) {}
    appendAfter(child) {}
    
    prepend(child) {}
    remove() {}
    
    parents(callbackFunction) {}
    children(callbackFunction, daraArray) {}
}