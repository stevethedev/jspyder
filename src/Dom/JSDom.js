import {JSObject} from "JSObject";

import {JSRegistry} from "Registry/JSRegistry";
import {Objects} from "Algorithms/Objects/Objects";
import {Booleans} from "Algorithms/Booleans/Booleans";
import {Functions} from "Algorithms/Functions/Functions";
import {Numbers} from "Algorithms/Numbers/Numbers";

import {DOMAttributes} from "Dom/DOMAttributes/DOMAttributes";
import {DOMCss} from "Dom/DOMCss/DOMCss";
import {DOMClasses} from "Dom/DOMClasses/DOMClasses";
import {DOMElement} from "Dom/DOMElement/DOMElement";
import {DOMPosition} from "Dom/DOMPosition/DOMPosition";
import {DOMTree} from "Dom/DOMTree/DOMTree";

import {DOMAttributesInterface} from "Dom/DOMAttributes/DOMAttributesInterface";
import {DOMClassesInterface} from "Dom/DOMClasses/DOMClassesInterface";
import {DOMCssInterface} from "Dom/DOMCss/DOMCssInterface";
import {DOMElementInterface} from "Dom/DOMElement/DOMElementInterface";
import {DOMPositionInterface} from "Dom/DOMPosition/DOMPositionInterface";
import {DOMTreeInterface} from "Dom/DOMTree/DOMTreeInterface";

import {Looper} from "Algorithms/Looper/Looper";

/**
 * @class JSDom
 * @extends {JSObject}
 *
 * @implements {DOMAttributesInterface}
 * @implements {DOMElementInterface}
 * @implements {DOMClassesInterface}
 * @implements {DOMCssInterface}
 * @implements {DOMPositionInterface}
 *
 * @inheritDoc
 */
export class JSDom extends JSObject {
    /** Document Object */
    static get doc() { return new JSDom(document.documentElement); }

    constructor(element, callbackFunction = null, argumentArray = []) {
        if (!JSDom.inPrototypeChain(element)) {
            element = DOMElement.ToElement(element);
        }

        this._element = element;
        this.extend("_element", this._element);
        this.each(DOMElement.AttachRegistry);
        this.use(callbackFunction, argumentArray);
    }

    /** Returns the number of elements this object wraps */
    get count() { return this._element ? this._element.length : 0; }

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
     * Retrieves the element at [index]; executes the callback
     * function against that element, if a callback was provided.
     * 
     * Profile: O(1)
     * 
     * @param {!number} index
     * @param {function()|undefined} [callbackFunction]
     * 
     * @return {JSDom} Element at [index]
     */
    at(index, callbackFunction = undefined) {
        index = Numbers.ToUInt32(index);
        return new JSDom(this._element[index], callbackFunction);
    }
    
    /**
     * Profile: O(1)
     * 
     * @param {!number} index
     * @param {function({JSDom})|undefined} [callbackFunction]
     * 
     * @return this
     */
    element(index, callbackFunction = undefined) {
        index = Numbers.ToUInt32(index);
        this.at(index, function() {
            var element = this._element[0];
            if(element) {
                Functions.Use(element, callbackFunction, [this]);
            }
        });
        return this;
    }
    
    /**
     * Exports a DOM element.
     * 
     * Profile: O(1)
     * 
     * @param {!number} index
     * @return {HTMLElement}
     */
    exportElement(index) {
        index = Numbers.ToUInt32(index);
        return this._element[index];
    }

    // [DOMAttributesInterface] ==================================
    /**
     * Profile: O(m * n)
     * 
     * @param {!Object} attributeObject
     * @param {function(Object)} callbackFunction
     * @return this
     */
    getAttrs(attributeObject, callbackFunction = undefined) {
        var attributeKeys = Object.getOwnPropertyNames(attributeObject);
        var li = attributeKeys.length;
        this.each((element, index) => {
            var attributes = (index ? {} : attributeObject);
            for(let i = 0; i < li; ++i) {
                let key = attributeKeys[i];
                attributes[key] = DOMAttributes.GetAttribute(element, key);
            }
            new JSDom(element, callbackFunction, [attributeObject]);
        });
        return this;
    }

    /**
     * Profile: O(m * n)
     * 
     * @param {!Object} attributeObject
     * @return this
     */
    setAttrs(attributeObject) {
        var attributeKeys = Object.getOwnPropertyNames(attributeObject);
        var li = attributeKeys.length;
        this.each((element) => {
            for(let i = 0; i < li; ++i) {
                let key = attributeKeys[i];
                DOMAttributes.SetAttribute(element, key, attributeObject[key]);
            }
        });
        return this;
    }

    /**
     * Profile: O(m)
     * 
     * @param {!Object} attributeObject
     * @return {Object} attributeObject
     */
    exportAttrs(attributeObject) {
        var attributeKeys = Object.getOwnPropertyNames(attributeObject);
        for(let i = 0; i < attributeKeys.length; ++i) {
            let key = attributeKeys[i];
            attributeObject[key] = this.exportAttr(key);
        }
        return attributeObject;
    }

    /**
     * Profile: O(n)
     * 
     * @param {string} attribute
     * @param {function(Object)} [callbackFunction]
     * @return this
     */
    getAttr(attribute, callbackFunction = undefined) {
        this.each((element) => {
            var value = DOMAttributes.GetAttribute(element, attribute);
            new JSDom(element, callbackFunction, [value]);
        });
        return this;
    }

    /**
     * Profile: O(m)
     * 
     * @param {string} attribute
     * @param {?} value
     * @return this
     */
    setAttr(attribute, value) {
        this.each((element) => {
            DOMAttributes.SetAttribute(element, attribute, value);
        });
        return this;
    }

    /**
     * Profile: O(1)
     * 
     * @param {string} attribute
     * @return {string|null}
     */
    exportAttr(attribute) {
        return DOMAttributes.GetAttribute(this._element[0], attribute);
    }

    // [DOMCssInterface] =========================================
    // O(n)
    setCss(cssObject = {}, callbackFunction = undefined) {
        this.each(DOMCss.setCssOnLoop, cssObject);
        this.use(callbackFunction, [cssObject]);
        return this;
    }

    /**
     * Profile: O(n)
     * 
     * @param {Object<string>} cssObject
     * @param {function(Object<string>)} [callbackFunction]
     * 
     * @return this
     */
    getCss(cssObject = {}, callbackFunction = undefined) {
        this.each(DOMCss.getCssFromLoop, this.constructor, cssObject, callbackFunction);
        return this;
    }

    // O(1)
    exportCss(cssObject = {}) {
        this.at(0).getCss(cssObject);
        return cssObject;
    }

    inlineStyles() {
        this.each((element) => DOMCss.InlineStyles(element));
    }

    // [DOMClassesInterface] =====================================
    /**
     * Profile: O(m*n)
     * 
     * @param {Object<boolean>} classObject
     * @return this
     */
    setClasses(classObject) {
        var keys = Objects.GetProperties(classObject);
        var li = keys.length;
        this.each((element) => {
            for(let i = 0; i < li; ++i) {
                DOMClasses.SetClass(element, keys[i], Booleans.ToBoolean(classObject[keys[i]]));
            }
        });
        return this;
    }
    
    /**
     * Profile: O(n)
     * 
     * @param {Object<boolean>} classObject
     * @param {function(Object<boolean>)} [callbackFunction]
     * 
     * @return this
     */
    getClasses(classObject, callbackFunction = undefined) {
        // Minimize the number of calculations required.
        const keys = Objects.GetProperties(classObject);
        const li = keys.length;
        const USE_CALLBACK = Functions.IsFunction(callbackFunction); 

        // Iterate all of my elements.
        this.each((element, index) => {
            // Only copy values to classObject for the first element.
            let elementClasses = (!index ? classObject : {});
            let classCache = DOMClasses.GetClasses(element);
            for(let i = 0; i < li; ++i) {
                elementClasses[keys[i]] = (classCache.indexOf(keys[i]) !== -1);
            }
            
            if(USE_CALLBACK) {
                new JSDom(element, callbackFunction, [elementClasses]);
            }
        });

        return this;
    }
    /**
     * Profile: O(n)
     * 
     * @param {Object<boolean>} classObject
     * @return this
     */
    exportClasses(classObject) {
        this.at(0).getClasses(classObject);
        return classObject;
    }

    // [DOMPositionInterface] ====================================
    /**
     * @return {Object}
     */
    exportPosition() {
        return DOMPosition.GetPosition(this._element[0]);
    }
    /**
     * @return {Object}
     */
    exportOffsetPosition() {
        return DOMPosition.GetOffsetPosition(this._element[0]);
    }
    /**
     * @param {function({Object})} [callbackFunction]
     * @return this
     */
    getPosition(callbackFunction = undefined) {
        this.each((element, index) => {
            var position = DOMPosition.GetPosition(element);
            this.at(index).use(callbackFunction, [position]);
        });
        return this;
    }
    /**
     * @param {function({Object})|undefined} [callbackFunction]
     * @return this
     */
    getOffsetPosition(callbackFunction = undefined) {
        this.each((element, index) => {
            var position = DOMPosition.GetOffsetPosition(element);
            this.at(index).use(callbackFunction, [position]);
        });
        return this;
    }
    // ===========================================================
    on(eventString, handlerFunction) {}
    off(eventString, handlerFunction) {}
    trigger(eventString) {}

    // [DOMTreeInterface] ========================================
    /**
     * @return {Node} Document Fragment object with all of the wrapped nodes.
     */
    createDocumentFragment() {
        return DOMTree.CreateDocumentFragment(this._element);
    }

    /**
     * Attaches the elements from the JSDom element to the first 
     * element identified in the parent object, inside the tag.
     * 
     * @param {JSDom|Node|string} parent
     *      The element which this JSDom should be attached to.
     * 
     * @return this
     */
    attach(parent) {
        var documentFragment = this.createDocumentFragment();
        var parentDom = new JSDom(parent)._element[0];
        DOMTree.AttachChildNode(parentDom, documentFragment);
        return this;
    }

    /**
     * Attaches the elements from the JSDom element to the end of the first 
     * element identified in the parent object, inside the tag
     * 
     * @param {JSDom|Node|string} parent
     *      The element which this JSDom should be attached to.
     * 
     * @return this
     */
    attachStart(parent) {
        var documentFragment = this.createDocumentFragment();
        var parentDom = new JSDom(parent)._element[0];
        DOMTree.AttachChildNodeAtStart(parentDom, documentFragment);
        return this;
    }
    
    /**
     * Attaches the elements from the JSDom element to the start of the first
     * element identifeid in the parent object, outside the tag.
     * 
     * @param {JSDom|Node|string} reference
     * @return this;
     */
    attachBefore(reference) {
        var referenceDom = new JSDom(reference)._element[0];
        var documentFragment = this.createDocumentFragment();
        DOMTree.InsertNodeBefore(referenceDom, documentFragment);
        return this;
    }
    
    /**
     * Attaches the elements from the JSDom element to the start of the first
     * element identifeid in the parent object, outside the tag.
     * 
     * @param {JSDom|Node|string} reference
     * @return this;
     */
    attachAfter(reference) {
        var referenceDom = new JSDom(reference)._element[0];
        var documentFragment = this.createDocumentFragment();
        DOMTree.InsertNodeAfter(referenceDom, documentFragment);
        return this;
    }
    /**
     * @param {JSDom|Node|string} child
     * @return this
     */
    append(child) {
        new JSDom(child).attach(this);
        return this;
    }
    appendBefore(child) {}
    appendAfter(child) {}
    
    prepend(child) {}
    remove() {}
    
    parents(callbackFunction) {}
    children(callbackFunction, daraArray) {}
    
    // ==========================================================
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

    // ===========================================================
    getProps(propertyObject, callbackFunction) {}
    exportProps(propertyObject) {}
    setProps(propertyObject) {}

    setValue(value, callbackFunction) {}
    getValue(callbackFunction) {}
    exportValue() {}

    template(fields) {}

    setDraggable(dragSelector) {}
}
