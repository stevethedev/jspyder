export class DOMTree {
    /**
     * Attaches the child node to the parent node.
     * 
     * @param {HTMLElement|Element} parent
     * @param {HTMLElement|Element} child
     */
    static AttachNode(parent, child) {
        
    }

    attach(parent, callbackFunction = undefined) {}
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
    
    setText(text) {}
    getText(callbackFunction) {}
    exportText() {}
    
    find(cssSelector) {}
    filter(cssSelector) {}
    exclude(cssSelector) {}
    and(elements) {}
}