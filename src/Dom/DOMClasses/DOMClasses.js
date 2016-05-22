import {DOMElement} from "Dom/DOMElement/DOMElement";

const REGEXP_INCONVENIENT_SPACES = /(^\s+)|(\s(?=\s+))|(\s+$)/g;

export class DOMClasses {
    /**
     * Profile: O(n)
     * 
     * @param {HTMLElement|Element} element
     * @return {Array<string>} Classes on the element
     */
    static GetClasses(element) {
        var classes = [];
        if(DOMElement.IsElement(element)) { // O(1)
            classes = element.className
                .replace(REGEXP_INCONVENIENT_SPACES, "") // O(n)
                .split(" "); // O(1)
        }
        return classes;
    }
    
    /**
     * @param {HTMLElement|Element} element
     * @param {!string} className
     * @param {!boolean} enabled
     */
    static SetClass(element, className, enabled) {
        var classNames = DOMClasses.GetClasses(element);
        var index = classNames.indexOf(className);
        var classesChanged = false;
        
        if(enabled && index === -1) {
            if(classNames[0] === "") {
                classNames[0] = className;
            }
            else {
                classNames.push(className);
            }
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
     * @param {!HTMLElement|Element} element
     * @param {!string} className
     * @return {!boolean}
     */
    static HasClass(element, className) {
        return DOMClasses.GetClasses(element).indexOf(className) !== -1;
    }
}
