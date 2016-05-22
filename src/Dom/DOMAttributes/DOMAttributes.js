import {DOMElement} from "Dom/DOMElement/DOMElement";

export class DOMAttributes {
    /**
     * Profile: O(n)
     * 
     * @param {HTMLElement|Element} element
     * @param {Object} attributeObject
     * @return {Object}
     */
    static GetAttributes(element, attributeObject) {
        for (let propertyName in attributeObject) {
            attributeObject[propertyName] = DOMAttributes.GetAttribute(element, propertyName);
        }
        return attributeObject;
    }

    /**
     * Profile: O(n)
     * 
     * @param {HTMLElement|Element} element
     * @param {Object} attributeObject
     * @return {void}
     */
    static SetAttributes(element, attributeObject) {
        for(let propertyName in attributeObject) {
            DOMAttributes.SetAttribute(element, propertyName, attributeObject[propertyName]);
        }
    }

    /**
     * Profile: O(1)
     * 
     * @param {HTMLElement|Element} element
     * @param {string} attribute
     * @return {string|null} element[attribute]
     */
    static GetAttribute(element, attribute) {
        var value = null;
        if (DOMElement.IsElement(element)) {
            value = element.getAttribute(attribute);
        }
        return value;
    }

    /**
     * Profile: O(1)
     * 
     * @param {HTMLElement|Element} element
     * @param {string} attribute
     * @return {void}
     */
    static SetAttribute(element, attribute, value) {
        if (DOMElement.IsElement(element)) {
            if (null === value) {
                element.removeAttribute(attribute);
            }
            else {
                element.setAttribute(attribute, value);
            }
        }
    }
}