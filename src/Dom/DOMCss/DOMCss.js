import {Looper} from "Algorithms/Looper/Looper";
import {Functions} from "Algorithms/Functions/Functions";
import {Objects} from "Algorithms/Objects/Objects";

export class DOMCss {
    static GetStyleDescriptor(element) {
        return window.document.defaultView.getComputedStyle(element);
    }
    
    static setCssOn(element, cssObject) {
        return Looper.ObjectEach(cssObject,(value, property, cssObject) => {
            element["style"][property] = value;
        });
    }
    
    static setCssOnLoop(element, index, elementList, cssObject) {
        return DOMCss.setCssOn(element, cssObject);
    }
    
    // getters
    static getCssFrom(element, cssObject) {
        var computedStyle = DOMCss.GetStyleDescriptor(element);
        var elementStyle = element["style"];
        
        Looper.ObjectEach(cssObject, (value, property, cssObject) => {
                cssObject[property] = elementStyle[property] || computedStyle[property];
            });
                    
        return cssObject;
    }
    
    static getCssFromLoop(element, index, elementList, JSDom, cssObject, callbackFunction) {
        if(index > 0) {
            cssObject = Object.create(cssObject);
        }
        
        DOMCss.getCssFrom(element, cssObject);
        new JSDom(element, callbackFunction, [cssObject]);
    }
    
    
    /**
     * Profile: O(n**2)
     * 
     * This is an expensive operation, which inlines styles.
     */
    static InlineStyles(element) {
        var clientStyles = DOMCss.GetStyleDescriptor(element);
        var stylesheets = window.document.styleSheets;
        
        // for each stylesheet
        for(let i = 0, li = stylesheets.length; i < li; ++i) {
            let rules = Objects.GetProperty(stylesheets[i], "rules", "cssRules");
            // for each rule
            for(let j = 0, lj = rules.length; j < lj; ++j) {
                // check all of the keys
                let style = rules[j].style;
                if(!style) { continue; }
                for(let s = 0, ls = style.length; s < ls; ++s) {
                    element.style[style[s]] = clientStyles[style[s]];
                }
            }
        }

        for(let k = 0, lk = element.children; k < lk; ++k) {
            DOMCss.InlineStyles(element.children[k]);
        }
    }
}