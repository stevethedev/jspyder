import {DOMElement} from "Dom/DOMElement/DOMElement";
import {DOMAttributes} from "Dom/DOMAttributes/DOMAttributes";
import {DOMProperties} from "Dom/DOMProperties/DOMProperties";

const VALUE_PROPERTY = "value";
const INVALID_TAGS = /^(li)$/i
const TAG_NAME = "tagName";

export class DOMValue {
    /**
     * Profile: O(1)
     * 
     * @param {HTMLElement|Element} element
     * @param {*} value
     * @return {void}
     */
    static SetValue(element, value) {
        if (DOMElement.IsElement(element)) {
            var isInvalidTag = INVALID_TAGS.test(element[TAG_NAME]);
            var isValueProperty = VALUE_PROPERTY in element;
            if(isValueProperty && !isInvalidTag) {
                DOMProperties.SetProperty(element, VALUE_PROPERTY, value);
            }
            else {
                DOMAttributes.SetAttribute(element, VALUE_PROPERTY, value);
            }
        }
    }

    /**
     * Profile: O(1)
     * 
     * @param {HTMLElement|Element} element
     * @return {*}
     */
    static GetValue(element) {
        var value;
        if (DOMElement.IsElement(element)) {
            var isInvalidTag = INVALID_TAGS.test(element[TAG_NAME]);
            var isValueProperty = VALUE_PROPERTY in element;
            if(isValueProperty && !isInvalidTag) {
                value = DOMProperties.GetProperty(element, VALUE_PROPERTY);
            }
            else {
                value = DOMAttributes.GetAttribute(element, VALUE_PROPERTY);
            }
        }
        return value;
    }
}