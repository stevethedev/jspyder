/**
 * Base JSpyder Object class.  All JSpyder objects should derive
 * from this one.
 */

import {FunctionChecker} from "FunctionChecker";

export class JSObject {
    /**
     * Extends a class with a new property, if the property name has not
     * already been assigned.
     */
    extend(name, property) {
        if(!this.prototype.hasOwnProperty(name)) {
            Object.defineProperty(this.prototype, name, { "value": property });
        }
        return this;
    }
    
    /**
     * Executes the function [propertyFunction] with the arguments [args],
     * and then executes this.extend with the name provided.
     */
    extendFn(name, propertyFunction, args) {
        var property = FunctionChecker.Use(this, propertyFunction, args);
        return this.extend(name, property);
    }
}
