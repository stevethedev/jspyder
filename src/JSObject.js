/**
 * Base JSpyder Object class.  All JSpyder objects should derive
 * from this one.
 */

import {Functions} from "Algorithms/Functions/Functions";

export class JSObject {
    constructor() {}
    
    get prototype() {
        return this.constructor.prototype;
    }
    
    /**
     * Determines if the provided object is derived from the
     * class this method is executed from.
     * 
     * @param object
     * 
     * @template THIS
     * @this {THIS}
     * 
     * @return {boolean}
     */
    static inPrototypeChain(object) {
        return this.prototype.isPrototypeOf(object);
    }
    
    /**
     * Extends a class with a new property, if the property name has not
     * already been assigned.
     */
    extend(name, property) {
        Object.defineProperty(this, name, { "value": property });
        return this;
    }
    
    /**
     * Executes the function [propertyFunction] with the arguments [args],
     * and then executes this.extend with the name provided.
     */
    extendFn(name, propertyFunction, args) {
        var property = Functions.Use(this, propertyFunction, args);
        return this.extend(name, property);
    }
   
    use(functionDefinition, args = []) {
        Functions.Use(this, functionDefinition, args);
        return this;
    }
    
    static Mix(...Subs) {
        var Class = this;
        for(let i = 0; i < Subs.length; ++i) {
            let sub = Subs[i];
            let properties = Object.getOwnPropertyNames(sub.prototype);
            for(let j = 0; j < properties.length; ++j) {
                let property = properties[j];
                if(property !== "constructor") {
                    Object.defineProperty(Class.prototype,
                        property,
                        Object.getOwnPropertyDescriptor(
                            sub.prototype, property));
                }
            }
        }
        return Class;
    }
}

