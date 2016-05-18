import {DOMElement} from "Dom/DOMElement/DOMElement";

const REGEXP_INCONVENIENT_SPACES = /(^\s+)|(\s(?=\s))|(\s+$)/g;

export class DOMClasses {
    static GetClasses(element) {
        if(DOMElement.isElement(element)) {
            element.className
                .replace(REGEXP_INCONVENIENT_SPACES, "")
                .split(" ");
        }
        else {
            return [];
        }
    }
    
    /**
     * @param {HTMLElement} element
     * @param {!string} className
     * @param {!boolean} enabled
     */
    static SetClass(element, className, enabled) {
        var classNames = DOMClasses.GetClasses(element);
        var index = classNames.indexOf(className);
        var classesChanged = false;
        
        if(enabled && index === -1) {
            classNames.push(className);
            classesChanged = true;
        }
        else if(!enabled && index !== -1) {
            classNames.splice(index, 1);
            classesChanged = true;
        }
        
        if(classesChanged) {
            element.className = classNames.join(" ");
        }
        
        return classesChanged;
    }
    
    /**
     * @param {!HTMLElement} element
     * @param {!string} className
     * @return {!boolean}
     */
    static HasClass(element, className) {
        return DOMClasses.GetClasses(element).indexOf(className) !== -1;
    }
}
