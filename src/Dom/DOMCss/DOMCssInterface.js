/** @interface */
export class DOMCssInterface {
    setCss(cssObject, callbackFunction) {}
    getCss(cssObject, callbackFunction) {}
    exportCss(cssObject) {}    
    inlineStyles() {}
}