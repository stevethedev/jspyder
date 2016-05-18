import {JSObject} from "JSObject";

import {JSRegistry} from "Registry/JSRegistry";


import {DOMAttributes} from "Dom/DOMAttributes/DOMAttributes";
import {DOMCss} from "Dom/DOMCss/DOMCss";
import {DOMElement} from "Dom/DOMElement/DOMElement";
import {DOMClasses} from "Dom/DOMClasses/DOMClasses";

import {DOMAttributesInterface} from "Dom/DOMAttributes/DOMAttributesInterface";
import {DOMCssInterface} from "Dom/DOMCss/DOMCssInterface";
import {DOMElementInterface} from "Dom/DOMElement/DOMElementInterface";
import {DOMClassesInterface} from "Dom/DOMClasses/DOMClassesInterface";

import {Looper} from "Algorithms/Looper/Looper";

/**
 * @class JSDom
 *
 * @extends {JSObject}
 *
 * @implements {DOMAttributesInterface}
 * @implements {DOMElementInterface}
 * @implements {DOMCssInterface}
 * @implements {DOMClassesInterface}
 *
 * @inheritDoc
 */
export class JSDom extends JSObject {
    /** Document Object */
    static get doc() { return new JSDom(document.documentElement); }

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
     *
     * @return this
     */
    setCss(cssObject = {}, callbackFunction = undefined) {
        this.each(DOMCss.setCssOnLoop, cssObject);
        this.use(callbackFunction, [cssObject]);
        return this;
    }

    /**
     * Gathers whether the specified CSS attributes have been assigned,
     * and then calls [fn] with the context of the jsDom object, and
     * the parameter being the css object passed in.
     *
     * @param {Object} cssObject
     *      A JavaScript Object where keys correspond to attributes.
     *      Values will be loaded into the object reference.
     *
     * @param {Function} callbackFunction
     *      A callback, which takes [css] as a parameter and uses
     *      [this] as the context.
     *
     * @return this
     */
    getCss(cssObject = {}, callbackFunction = undefined) {
        this.each(DOMCss.getCssFromLoop, this.constructor, cssObject, callbackFunction);
        return this;
    }

    /**
     * Gathers whether the specified CSS attributes have been assigned,
     * and then calls [fn] with the context of the jsDom object, and
     * the parameter being the css object passed in.
     *
     * @param {Object} cssObject
     *      A JavaScript Object where keys correspond to attributes.
     *      Values will be loaded into the object reference.
     *
     * @return cssObject
     */
    exportCss(cssObject = {}) {
        this.getCss(cssObject);
        return cssObject;
    }

    inlineStyles() {}

    getPosition(callbackFunction) {}
    exportPosition() {}
    getOffsetPosition(callbackFunction) {}
    exportOffsetPosition() {}

    at(index, callbackFunction) {}
    element(index, callbackFunction) {}
    exportElement(index) {}

    on(eventString, handlerFunction) {}
    off(eventString, handlerFunction) {}
    trigger(eventString) {}

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

    getAttrs(attributeObject, callbackFunction) {}
    exportAttrs(attributeObject) {}
    setAttrs(attributeObject, callbackFunction) {}

    getAttr(attribute, callbackFunction) {}
    exportAttr(attribute) {}
    setAttr(attribute, value) {}

    setClasses(classObject) {}
    getClasses(classObject, callbackFunction) {}
    exportClasses(classObject) {}

    template(fields) {}

    setDraggable(dragSelector) {}
}
