import {JSObject} from "JSObject";
import {JSRegistry} from "Registry/JSRegistry";

import {DOMElement} from "Dom/DOMElement";
import {DOMCss} from "Dom/DOMCss";

import {Looper} from "Algorithms/Looper/Looper";

/**
 * @class JSDom
 * @inheritDoc
 */
export class JSDom extends JSObject {
    constructor(element, callbackFunction = null, argumentArray = []) {
        if (!JSDom.inPrototypeChain(element)) {
            element = DOMElement.toElement(element);
        }
        
        this._element = element;
        this.extend("_element", this._element);
        this.each(DOMElement.attachRegistry);
        this.use(callbackFunction, argumentArray);
    }
    
    /** Returns the number of elements this object wraps */
    get count() { return this._element.length; }

    /**
     * Iterates through all of the elements in the jsDom object.
     *
     * @param {Function} iteratorFunction
     * 
     *      Function with the following parameters:
     *       1. The value of the current item
     *       2. The key of the current item
     *       3. A reference to the elements
     *       4. A reference to [args]
     *
     *      The context of this variable points to a controller 
     *      object with the members:
     *       - stop() -- stops iterations and breaks from the 
     *                   function
     *
     *      If the Function returns a value, then that value will 
     *      be inserted in the array at that position.
     */
    each(iteratorFunction, ...args) {
        Looper.ArrayEach(this._element, iteratorFunction, ...args);
        return this;
    }
    
    /**
     * Applies the specified CSS template to all of the elements in
     * the jsDom object
     * 
     * Profile: O(this._elements * cssObject.size)
     *
     * @param {Object} cssObject
     *      A JavaScript Object where keys correspond to attributes.
     *      If more than one value must be applied, then both values
     *      should be placed in an array; or can be passed as a comma-
     *      separated list in a string.
     *
     * @param {Function} callbackFunction
     *      A callback, which takes [css] as a parameter and uses
     *      [this] as the context.
     */
    setCss(cssObject = {}, callbackFunction = undefined) {
        this.each(DOMCss.setCssOnLoop, cssObject);
        this.use(callbackFunction, [cssObject]);
        return this;
    }
    
    getCss(cssObject = {}, callbackFunction = undefined) {
        this.each(DOMCss.getCssFromLoop, JSDom, cssObject, callbackFunction);
        return this;
    }
}