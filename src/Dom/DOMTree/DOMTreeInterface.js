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

    /**
     * Searches for an object containing the DOM nodes which match the
     * provided CSS selector.
     *
     * @param {string|Element} cssSelector
     * @return this
     */
    find(cssSelector) {}
    /**
     * Excludes any child nodes that do not match the provided CSS 
     * selector
     *
     * @param {string|Element} cssSelector
     * @return this
     */
    filter(cssSelector) {}
    /**
     * Excludes any child nodes that match the provided CSS selector
     *
     * @param {string|Element} cssSelector
     * @return this
     */
    exclude(cssSelector) {}
    /**
     * Appends any nodes that match the provided CSS selector
     *
     * @param {string|Element} cssSelector
     * @return this
     */
    and(cssSelector) {}
    
    parents(callbackFunction) {}
    children(callbackFunction, dataArray) {}
}