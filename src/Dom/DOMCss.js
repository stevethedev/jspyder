import {Looper} from "Algorithms/Looper/Looper";
import {Functions} from "Algorithms/Functions/Functions";

export class DOMCss {
    static setCssOn(element, cssObject) {
        return Looper.ObjectEach(cssObject, DOMCss._setCssOnInternal, element);
    }
    
    static _setCssOnInternal(value, property, cssObject, element) {
        element["style"][property] = value;
    }
    
    static setCssOnLoop(element, index, elementList, cssObject) {
        return DOMCss.setCssOn(element, cssObject);
    }
    
    // getters
    static getCssFrom(element, cssObject) {
        var computedStyle = window.getComputedStyle(element);
        var elementStyle = element["style"];
        
        Looper.ObjectEach(cssObject, 
            DOMCss["_getCssFromInternal"], 
            computedStyle, 
            elementStyle);
            
        return cssObject;
    }
    
    static _getCssFromInternal(value, property, cssObject, computedStyle, elementStyle) {
        cssObject[property] = elementStyle[property] || computedStyle[property];
    }
    
    static getCssFromLoop(element, index, elementList, JSDom, cssObject, callbackFunction) {
        if(index > 0) {
            cssObject = Object.create(cssObject);
        }
        
        DOMCss.getCssFrom(element, cssObject);
        new JSDom(element, callbackFunction, [cssObject]);
    }
}