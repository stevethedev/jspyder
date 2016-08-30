/** @interface */
export class DOMElementInterface {
    setHtml(html) {}
    getHtml(callbackFunction) {}

    /** 
     * @param {number} index
     * @return {string} 
     */
    exportHtml(index) {}

    getText(callbackFunction) {}
    /** 
     * @param {number} index
     * @return {string} 
     */
    exportText(index) {}
    setText(text) {}

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
}