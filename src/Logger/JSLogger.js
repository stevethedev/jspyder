import {JSObject} from "JSObject";

import {Arrays} from "Algorithms/Arrays";
import {Functions} from "Algorithms/Functions";
import {HasInterface} from "Object/Interface";

import {LoggerDefs} from "Logger/LoggerDefs";

/**
 * JSpyder Logging Library
 * @implements HasInterface
 */
export class JSLogger extends JSObject {
    constructor() {
        /* intentionally left blank */
    }
    
    /**
     * @return {Function|LoggerDefs}
     */
    GetInterface() {
        function Logger(...args) {
            JSLogger.Log(...args);
        }

        Logger["warn"] = JSLogger["Warn"];
        Logger["err"] = JSLogger["Err"];
        
        return Logger;
    }

    /**
     * Outputs to the Log Console, 
     *     else fails
     */
    static Log(...args) {
        return console && console.log(...args);
    }

    /**
     * @ignore
     * 
     * Outputs to the Warn Console, 
     *     else the Log Console, 
     *     else fails
     */
    static Warn(...args) {
        return console && (console["warn"]
            ? console.warn(...args)
            : JSLogger.Log(...args));
    }

    /**
     * @ignore
     * 
     * Outputs to the Error Console,
     *     else the Warn Console, 
     *     else the Log Console, 
     *     else fails
     */
    static Err(...args) {
        return console && (console["warn"]
            ? console.error(...args)
            : JSLogger.Warn(...args));
    }
}
