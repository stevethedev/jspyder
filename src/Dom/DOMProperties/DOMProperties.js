import {DOMElement} from "Dom/DOMElement/DOMElement";

export class DOMProperties {
    /**
     * Profile: O(n)
     * 
     * @param {HTMLElement|Element} element
     * @param {Object} propertyObject
     * @return {Object}
     */
    static GetProperties(element, propertyObject) {
        if (DOMElement.IsElement(element)) {
            for (let propertyName in propertyObject) {
                propertyObject[propertyName] = element[propertyName];
            }
        }
        return propertyObject;
    }

    /**
     * Profile: O(n)
     * 
     * @param {HTMLElement|Element} element
     * @param {Object} propertyObject
     * @return {void}
     */
    static SetProperties(element, propertyObject) {
        if (DOMElement.IsElement(element)) {
            for (let propertyName in propertyObject) {
                element[propertyName] = propertyObject[propertyName];
            }
        }
    }

    /**
     * Profile: O(1)
     * 
     * @param {HTMLElement|Element} element
     * @param {string} propertyName
     * @return {*}
     */
    static GetProperty(element, propertyName) {
        var value;
        if (DOMElement.IsElement(element)) {
            value = element[propertyName];
        }
        return value;
    }

    /**
     * Profile: O(1)
     * 
     * @param {HTMLElement|Element} element
     * @param {string} propertyName
     * @param {*} value
     * @return {void}
     */
    static SetProperty(element, propertyName, value) {
        if (DOMElement.IsElement(element)) {
            element[propertyName] = value;
        }
    }
}