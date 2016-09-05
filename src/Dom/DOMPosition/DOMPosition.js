import {JSObject} from "JSObject";
import {DOMElement} from "Dom/DOMElement/DOMElement";

export class DOMPosition {
    /**
     * Retrieves the current position for the node, relative to the
     * viewport.
     * 
     * @param {HTMLElement} element
     * @return {Object}
     */
    static GetPosition(element) {
        var elementPosition = element.getBoundingClientRect();
        return {
            left: elementPosition.left,
            right: elementPosition.right,
            top: elementPosition.top,
            bottom: elementPosition.bottom
        };
    }
    
    /**
     * Retrieves the current position for the node, relative to the 
     * first non-static positioned parent.
     */
    static GetOffsetPosition(element) {
        var elementPosition = DOMPosition.GetPosition(element);
        if(getComputedStyle(element).position === "fixed") {
            return elementPosition;
        }

        var parent = element;
        while(DOMElement.IsElement(parent.parentElement) && 
             (getComputedStyle(parent.parentElement).position === "static")) {
            parent = parent.parentElement;
        }
        var parentPosition = DOMPosition.GetPosition(parent);
        
        return {
            left: elementPosition.left - parentPosition.left,
            right: elementPosition.right - parentPosition.right,
            top: elementPosition.top - parentPosition.top,
            bottom: elementPosition.bottom - parentPosition.bottom
        };
    }
}
