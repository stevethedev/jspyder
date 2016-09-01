/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Steven Jimenez
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @author Steven Jimenez
 */

import {JSObject} from "JSObject";

import {JSRegistry} from "Registry/JSRegistry";

import {Arrays} from "Algorithms/Arrays/Arrays";
import {Objects} from "Algorithms/Objects/Objects";
import {Booleans} from "Algorithms/Booleans/Booleans";
import {Functions} from "Algorithms/Functions/Functions";
import {Numbers} from "Algorithms/Numbers/Numbers";

import {DOMAttributes} from "Dom/DOMAttributes/DOMAttributes";
import {DOMCss} from "Dom/DOMCss/DOMCss";
import {DOMClasses} from "Dom/DOMClasses/DOMClasses";
import {DOMElement} from "Dom/DOMElement/DOMElement";
import {DOMPosition} from "Dom/DOMPosition/DOMPosition";
import {DOMProperties} from "Dom/DOMProperties/DOMProperties";
import {DOMTree} from "Dom/DOMTree/DOMTree";
import {DOMValue} from "Dom/DOMValue/DOMValue";

import {DOMAttributesInterface} from "Dom/DOMAttributes/DOMAttributesInterface";
import {DOMClassesInterface} from "Dom/DOMClasses/DOMClassesInterface";
import {DOMCssInterface} from "Dom/DOMCss/DOMCssInterface";
import {DOMElementInterface} from "Dom/DOMElement/DOMElementInterface";
import {DOMPositionInterface} from "Dom/DOMPosition/DOMPositionInterface";
import {DOMPropertiesInterface} from "Dom/DOMProperties/DOMPropertiesInterface";
import {DOMTreeInterface} from "Dom/DOMTree/DOMTreeInterface";
import {DOMValueInterface} from "Dom/DOMValue/DOMValueInterface";

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
 * @implements {DOMPropertiesInterface}
 * @implements {DOMValueInterface}
 *
 * @inheritDoc
 */
export class JSDom extends JSObject {
    constructor(element, callbackFunction = null, argumentArray = []) {
        var jsDom = this;
        if (JSDom.inPrototypeChain(element)) {
            jsDom = element;
        }
        else {
            this._element = DOMElement.ToElement(element);
            jsDom.extend("_element", this._element);
        }

        jsDom.each(DOMElement.AttachRegistry);
        jsDom.use(callbackFunction, argumentArray);

        if (jsDom !== this) {
            return jsDom;
        }
    }

    /** Document Object */
    static get doc() { return new JSDom(document.documentElement); }

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
        return new JSDom(this.exportElement(index), callbackFunction);
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
        this.at(index, function () {
            var element = this._element[0];
            if (element) {
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
            for (let i = 0; i < li; ++i) {
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
            for (let i = 0; i < li; ++i) {
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
     * @param {number} [index]
     * @return {Object} attributeObject
     */
    exportAttrs(attributeObject, index = 0) {
        var attributeKeys = Object.getOwnPropertyNames(attributeObject);
        for (let i = 0; i < attributeKeys.length; ++i) {
            let key = attributeKeys[i];
            attributeObject[key] = this.exportAttr(key, index);
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
     * @param {string} attributeName
     * @param {?} value
     * @return this
     */
    setAttr(attributeName, value) {
        this.each((element) => {
            DOMAttributes.SetAttribute(element, attributeName, value);
        });
        return this;
    }

    /**
     * Profile: O(1)
     *
     * @param {string} attributeName
     * @param {number} [index]
     * @return {string|null}
     */
    exportAttr(attributeName, index = 0) {
        var element = this.exportElement(index);
        return DOMAttributes.GetAttribute(element, attributeName);
    }

    // [DOMCssInterface] =========================================
    // O(n)
    setCss(cssObject = Objects.CreateBlankObject(), callbackFunction = undefined) {
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
    getCss(cssObject = Objects.CreateBlankObject(), callbackFunction = undefined) {
        this.each(DOMCss.getCssFromLoop, this.constructor, cssObject, callbackFunction);
        return this;
    }

    /**
     * Exports the CSS associated with this object
     * Profile: O(1)
     * 
     * @param {Object} [cssObject]
     * @param {number} [index]
     */
    exportCss(cssObject = Objects.CreateBlankObject(), index = 0) {
        this.at(index).getCss(cssObject);
        return cssObject;
    }

    /**
     * Inlines the styles of each element
     */
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
            for (let i = 0; i < li; ++i) {
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
            for (let i = 0; i < li; ++i) {
                elementClasses[keys[i]] = (classCache.indexOf(keys[i]) !== -1);
            }

            if (USE_CALLBACK) {
                new JSDom(element, callbackFunction, [elementClasses]);
            }
        });

        return this;
    }

    /**
     * Profile: O(n)
     *
     * @param {Object<boolean>} classObject
     * @param {number} [index]
     * @return this
     */
    exportClasses(classObject, index = 0) {
        this.at(index).getClasses(classObject);
        return classObject;
    }

    // [DOMPositionInterface] ====================================
    /**
     * @param {number} [index]
     * @return {Object}
     */
    exportPosition(index = 0) {
        return DOMPosition.GetPosition(this.exportElement(index));
    }
    /**
     * @param {number} [index]
     * @return {Object}
     */
    exportOffsetPosition(index = 0) {
        return DOMPosition.GetOffsetPosition(this.exportElement(index));
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
    /**
     * TODO: Build function
     */
    on(eventString, handlerFunction) { }
    /**
     * TODO: Build function
     */
    off(eventString, handlerFunction) { }
    /**
     * TODO: Build function
     */
    trigger(eventString) { }

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
     * @param {number} [index]
     *
     * @return this
     */
    attach(parent, index = 0) {
        var documentFragment = this.createDocumentFragment();
        var parentDom = new JSDom(parent).exportElement(index);
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
     * @param {number} [index]
     * 
     * @return this
     */
    attachStart(parent, index = 0) {
        var documentFragment = this.createDocumentFragment();
        var parentDom = new JSDom(parent).exportElement(index);
        DOMTree.AttachChildNodeAtStart(parentDom, documentFragment);
        return this;
    }

    /**
     * Attaches the elements from the JSDom element to the start of the first
     * element identifeid in the parent object, outside the tag.
     *
     * @param {JSDom|Node|string} reference
     * @param {number} index
     * @return this;
     */
    attachBefore(reference, index = 0) {
        var referenceDom = new JSDom(reference).exportElement(index);
        var documentFragment = this.createDocumentFragment();
        DOMTree.InsertNodeBefore(referenceDom, documentFragment);
        return this;
    }

    /**
     * Attaches the elements from the JSDom element to the start of the first
     * element identifeid in the parent object, outside the tag.
     *
     * @param {JSDom|Node|string} reference
     * @param {number} [index]
     * @return this;
     */
    attachAfter(reference, index = 0) {
        var referenceDom = new JSDom(reference).exportElement(index);
        var documentFragment = this.createDocumentFragment();
        DOMTree.InsertNodeAfter(referenceDom, documentFragment);
        return this;
    }

    /**
     * Appends a child element to the end of this object, inside
     * of the tag.
     *
     * @param {JSDom|Node|string} child
     * @param {number} [index]
     * @return this
     */
    append(child, index = 0) {
        new JSDom(child).attach(this, index);
        return this;
    }

    /**
     * Appends a child element to the beginning of this object,
     * inside the tag.
     *
     * @param {JSDom|Node|string} child
     * @param {number} [index]
     * @return this
     */
    prepend(child, index = 0) {
        new JSDom(child).attachStart(this, index);
        return this;
    }

    /**
     * Appends a child element to the parent of this element
     *
     * @param {JSDom|Node|string} insertNode
     * @param {number} [index]
     * @return this
     */
    appendBefore(insertNode, index = 0) {
        new JSDom(insertNode).attachBefore(this, index);
        return this;
    }

    /**
     * Appends a child to the parent of this element
     *
     * @param {JSDom|Node|string} insertNode
     * @param {number} [index]
     * @return this
     */
    appendAfter(insertNode, index = 0) {
        new JSDom(insertNode).attachAfter(this, index);
        return this;
    }

    /**
     * Removes the element from its parent
     *
     * @return this
     */
    remove() {
        this.each(DOMTree.RemoveNodeFromParent);
        return this;
    }

    /**
     * Gets the parent(s) of the elements in the node, and runs 
     * the provided callback function.
     * 
     * @param {function(Node, Node)} callbackFunction
     * @return this
     */
    onParents(callbackFunction) {
        this.each((element, index) => {
            var parent = DOMTree.GetParent(element);
            new JSDom(parent, callbackFunction, [parent, element]);
        });
        return this;
    }

    /**
     * Retrieves the parent(s) of these elements as their own 
     * JSDom Object.
     * 
     * @return {JSDom}
     */
    parents() {
        var parents = [];
        this.onParents((parent, element) => {
            parents.indexOf(parent) && parents.push(parent);
        });
        return new JSDom(parents);
    }

    /**
     * Gets the children of the elements in the node, and runs
     * the provided callback function.
     * 
     * @param {function()} callbackFunction
     * @param {Array} [dataArray]
     * @return this
     */
    onChildren(callbackFunction, dataArray = undefined) {
        this.each((element, index) => {
            var children = DOMTree.GetChildren(element);
            new JSDom(children, callbackFunction, dataArray);
        });
        return this;
    }

    /**
     * Retrieves the children of these elements as a separate
     * JSDom Object
     */
    children() {
        var children = [];
        this.onChildren(() => {
            Arrays.WidePush(children, this._element);
        });
        return new JSDom(children);
    }

    // ==========================================================
    /**
     * Sets the HTML content of all of the child elements.
     *
     * @param {string} html
     * @return this
     */
    setHtml(html) {
        this.each((element) => DOMProperties.SetProperty(element, "innerHTML", html));
        return this;
    }

    /**
     * Gets the HTML content of all of the child elements, and
     * executes callbackFunction for each returned value.
     *
     * @param {function({string})|undefined} [callbackFunction]
     * @return this
     */
    getHtml(callbackFunction = undefined) {
        this.each((element) => {
            var innerHTML = DOMProperties.GetProperty(element, "innerHTML");
            new JSDom(element, callbackFunction, [innerHTML]);
        });
        return this;
    }

    /**
     * @param {number} [index]
     * @return {string}
     */
    exportHtml(index = 0) {
        return /** @type {string} */(DOMProperties.GetProperty(this.exportElement(index), "innerHTML"));
    }

    /**
     * Sets the Text Content of all child elements.
     *
     * @param {string} text
     * @return this
     */
    setText(text) {
        this.each((element) => DOMProperties.SetProperty(element, "innerText", text));
        return this;
    }
    /**
     * Gets the Text Content of all child elements
     *  
     * @return this 
     */
    getText(callbackFunction) {
        this.each((element) => {
            var innerText = DOMProperties.GetProperty(element, "innerText");
            new JSDom(element, callbackFunction, [innerText]);
        });
        return this;
    }
    /**
     * Exports the Text Content of the first child element
     * 
     * @param {number} index
     * @return this
     */
    exportText(index = 0) {
        var element = this.exportElement(index);
        return DOMProperties.GetProperty(element, "innerText");
    }

    /**
     * Searches for an object containing the DOM nodes which match the
     * provided CSS selector.
     *
     * @param {!string} cssSelector
     * @return this
     */
    find(cssSelector) {
        var found = [];

        if (cssSelector) {
            this.each((element, index) => {
                var children = element.querySelectorAll(cssSelector);
                Arrays.WidePush(found, new JSDom(children)._element);
            });
        }

        return new JSDom(found);
    }
    static findInternal(element, index, elements, cssSelector, found) {
        var children = element.querySelectorAll(cssSelector);
        Arrays.WidePush(found, new JSDom(children)._element);
    }

    /**
     * Excludes any child nodes that do not match the provided CSS 
     * selector
     *
     * @param {!string} cssSelector
     * @return this
     */
    filter(cssSelector) {
        if(cssSelector) {
            this.each(JSDom.filterInternal, cssSelector);
        }
        return this;
    }
    static filterInternal(element, index, elements, cssSelector) {
        DOMElement.MatchesSelector(element, cssSelector) || this.drop();
    }

    /**
     * Excludes any child nodes that match the provided CSS selector
     *
     * @param {!string} cssSelector
     * @return {JSDom}
     */
    exclude(cssSelector) {
        if(cssSelector) {
            this.each(JSDom.excludeInternal, cssSelector);
        }
        return this;
    }

    static excludeInternal(element, index, elements, cssSelector) {
        DOMElement.MatchesSelector(element, cssSelector) && this.drop();
    }

    /**
     * Appends any nodes that match the provided CSS selector
     *
     * @param {!string|Element} cssSelector
     * @return this
     */
    and(cssSelector) {
        var keepElements = Arrays.Slice(this._element);
        var andDom = new JSDom(cssSelector);

        andDom.each((element, index) => {
            if(keepElements.indexOf(element) === -1) {
                keepElements.push(element);
            }
        });

        return new JSDom(keepElements);
    }

    // ===========================================================
    /**
     * Retrieves the identified property from the child nodes and
     * executes them in the callback function
     * 
     * @param {!string} propertyName
     * @param {function(*)} callbackFunction
     * @return this
     */
    getProp(propertyName, callbackFunction) {
        this.each((element, index) => {
            var property = DOMProperties.GetProperty(element, propertyName);
            new JSDom(element, callbackFunction, [property]);
        });
        return this;
    }
    /**
     * Exports the identified property from the first child node.
     * 
     * @param {!string} propertyName
     * @param {number} [index]
     * @return {*}
     */
    exportProp(propertyName, index = 0) {
        var element = this.exportElement(index);
        return DOMProperties.GetProperty(element, propertyName);
    }
    /**
     * Sets the identified property on the child nodes to the specified
     * value.
     * 
     * @param {!string} propertyName
     * @param {*} value
     * @return this
     */
    setProp(propertyName, value) {
        this.each((element, index) => {
            DOMProperties.SetProperty(element, propertyName, value);
        });
        return this;
    }
    /**
     * Retrieves the identified properties from the child nodes and 
     * executes them in the callback function
     * 
     * @param {!Object} propertyObject
     * @param {function(!Object)} callbackFunction
     * @return this
     */
    getProps(propertyObject, callbackFunction) {
        var propertyKeys = Object.getOwnPropertyNames(propertyObject);
        var li = propertyKeys.length;
        this.each((element, index) => {
            var properties = (index ? {} : propertyObject);
            for (let i = 0; i < li; ++i) {
                let key = propertyKeys[i];
                properties[key] = DOMProperties.GetProperty(element, key);
            }
            new JSDom(element, callbackFunction, [propertyObject]);
        });
        return this;
    }
    /**
     * Retrieves the identified properties from the first child node.
     * 
     * @param {!Object} propertyObject
     * @param {number} [index]
     * @return {!Object} propertyObject 
     */
    exportProps(propertyObject, index = 0) {
        var propertyKeys = Object.getOwnPropertyNames(propertyObject);
        var li = propertyKeys.length;
        for (let i = 0; i < li; ++i) {
            let key = propertyKeys[i];
            propertyObject[key] = this.exportProp(key, index);
        }
        return propertyObject;
    }
    /**
     * Sets properties on the child nodes to match the properties in
     * the passed object.
     * 
     * @param {!Object} propertyObject
     * @param {number} [index]
     * @return this
     */
    setProps(propertyObject, index = 0) {
        var element = this.exportElement(index);
        DOMProperties.SetProperties(element, propertyObject);
        return this;
    }

    // ===========================================================
    /**
     * Sets the value of the child nodes
     * 
     * @param {*} value
     * @return this
     */
    setValue(value) {
        this.each((element, index) => DOMValue.SetValue(element, value));
        return this;
    }

    /**
     * Gets the value of the child nodes and passes it through the
     * callback function.
     * 
     * @param {function(!Object)} callbackFunction
     * @return this
     */
    getValue(callbackFunction) {
        this.each((element, index) => {
            var value = DOMValue.GetValue(element);
            new JSDom(element, callbackFunction, [value]);
        });
        return this;
    }

    /**
     * Gets the value of the first child node
     * 
     * @param {number} [index]
     * @return {*}
     */
    exportValue(index = 0) {
        var element = this.exportElement(index);
        return DOMValue.GetValue(element);
    }

    /**
     * TODO: Build function
     */
    template(fields) { }

    /**
     * TODO: Build function
     */
    setDraggable(dragSelector) { }
}
