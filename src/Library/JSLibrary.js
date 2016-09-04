import {JSObject} from "JSObject";
import {JSRegistry} from "Registry/JSRegistry";

import {Functions} from "Algorithms/Functions/Functions";
import {Looper} from "Algorithms/Looper/Looper";
import {Arrays} from "Algorithms/Arrays/Arrays";
import {HasInterface} from "Object/Interface";
import {Objects} from "Algorithms/Objects/Objects";

import {LibraryInterfaceDefs} from "Library/LibraryInterfaceDefs";

/**
 * @class JSLibrary
 * @implements HasInterface
 */
export class JSLibrary extends JSObject {
    constructor(context = Objects.CreateBlankObject()) {
        super();
        
        var registry = new JSRegistry();
        
        this._registry = registry.GetInterface();
        this._context = context;
    }
    
    /**
     * @return {function():function()}
     */
    GetInterface() {
        var jsLibrary = this;
        
        /**
         * JSLibrary Interface
         * 
         * @template THIS
         * @this {THIS}
         * @return {THIS}
         */
        function JSLibraryInterface(...args) {
            jsLibrary.Execute(...args);
            return JSLibraryInterface;
        }
        
        JSLibraryInterface.lib = function(...args) {
            jsLibrary.Execute(...args);
            return JSLibraryInterface;
        };
            
        JSLibraryInterface.register = function(...args) {
            jsLibrary.Register(...args);
            return JSLibraryInterface;
        };
            
        JSLibraryInterface.registerSet = function(...args) {
            jsLibrary.RegisterSet(...args);
            return JSLibraryInterface;
        };
            
        JSLibraryInterface.execute = function(...args) {
            return jsLibrary.Execute(...args);
        };
        
        return JSLibraryInterface;
    }
    
    Execute(functionName, argumentArray = [], callbackFunction = null, callbackArguments = []) {
        argumentArray = Arrays.Slice(argumentArray);
        callbackArguments = Arrays.Slice(callbackArguments);
        
        var lookupFunction = this._registry.fetch(functionName);
        var returnValue = null;
        
        returnValue = Functions.Use(this._context, lookupFunction, argumentArray);
        Functions.Use(this._context, callbackFunction, [returnValue, ...callbackArguments]);
        
        return returnValue;
    }
    
    /** 
     * @param {string} functionName
     * 
     *      Name of the function to stash in the library object
     * 
     * @param {Function|null} functionValue
     * 
     *      Function to store in the registry
     */
    Register(functionName, functionValue = null) {
        if("string" === typeof functionName) {
            if("function" === typeof functionValue || functionValue === null) {
                this._registry.stash(functionName, functionValue);
            }
        }
    }
    
    RegisterSet(object) {
        if(object && "object" === typeof object) {
            Looper.ObjectEach(object, (fnValue, fnName) => { this.Register(fnName, fnValue); }); 
        }
    }
}
