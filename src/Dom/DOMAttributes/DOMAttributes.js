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
        for (let attributeName in attributeObject) {
            attributeObject[attributeName] = DOMAttributes.GetAttribute(element, attributeName);
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
        for(let attributeName in attributeObject) {
            DOMAttributes.SetAttribute(element, attributeName, attributeObject[attributeName]);
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