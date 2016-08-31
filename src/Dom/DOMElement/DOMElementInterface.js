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
}