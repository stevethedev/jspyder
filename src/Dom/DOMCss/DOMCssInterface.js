/** @interface */
export class DOMCssInterface {
    /**
     * Gathers whether the specified CSS attributes have been assigned,
     * and then calls [fn] with the context of the jsDom object, and
     * the parameter being the css object passed in.
     *
     * @param {Object<string>} cssObject
     *      A JavaScript Object where keys correspond to attributes.
     *      Values will be loaded into the object reference.
     *
     * @return {Object<string>} cssObject
     */
    exportCss(cssObject) {}

    /**
     * Gathers whether the specified CSS attributes have been assigned,
     * and then calls [fn] with the context of the jsDom object, and
     * the parameter being the css object passed in.
     *
     * @param {Object<string>} cssObject
     *      A JavaScript Object where keys correspond to attributes.
     *      Values will be loaded into the object reference.
     *
     * @param {function(Object<string>)} callbackFunction
     *      A callback, which takes [css] as a parameter and uses
     *      [this] as the context.
     *
     * @return this
     */
    getCss(cssObject, callbackFunction) {}

    /**
     * Applies the specified CSS template to all of the elements in
     * the jsDom object
     *
     * Profile: O(this._elements * cssObject.size)
     *
     * @param {Object<string>} cssObject
     *      A JavaScript Object where keys correspond to attributes.
     *      If more than one value must be applied, then both values
     *      should be placed in an array; or can be passed as a comma-
     *      separated list in a string.
     *
     * @param {Function} callbackFunction
     *      A callback, which takes [css] as a parameter and uses
     *      [this] as the context.
     *
     * @return this
     */
    setCss(cssObject, callbackFunction) {}

    inlineStyles() {}
}