import {JSObject} from "JSObject";
import {JSRegistry} from "Registry/JSRegistry";

import {Functions} from "Algorithms/Functions";
import {Looper} from "Algorithms/Looper";
import {Arrays} from "Algorithms/Arrays";
import {HasInterface} from "Object/Interface";

/**
 * @class JSLibrary
 * @implements HasInterface
 */
export class JSLibrary {
    constructor(context) {
        var registry = new JSRegistry();
        
        this._registry = registry.GetInterface();
        this._context = context;
    }
    
    /**
     * @inheritDoc
     * @return {Function}
     */
    GetInterface() {
        var jsLibrary = this;
        
        /**
         * JSLibrary Interface
         */
        function JSLibraryInterface(...args) {
            jsLibrary.Execute(...args);
            return this;
        }
        
        JSLibraryInterface["register"] = function(...args) {
            jsLibrary.Register(...args);
            return this;
        }
        
        JSLibraryInterface["registerSet"] = function(...args) {
            jsLibrary.RegisterSet(...args);
            return this;
        }
        
        JSLibraryInterface["execute"] = function(...args) {
            return jsLibrary.Execute(...args);
        }
        
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
     * @param {String} functionName
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
            
            Looper.ObjectEach(object, JSLibrary.RegisterSetInternal, this, this._context); 
        }
    }
    
    static RegisterSetInternal(fnValue, fnName, object, self, context) {
        self.Register(context, fnName, fnValue);
    }
}
