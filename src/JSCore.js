import {JSObject} from "JSObject";
import {JSAlgorithms} from "Algorithms/JSAlgorithms";
import {JSLogger} from "Logger/JSLogger";
import {JSRegistry} from "Registry/JSRegistry";
import {JSEnvironment} from "Environment/JSEnvironment";
import {JSLibrary} from "Library/JSLibrary";
import {JSDom} from "Dom/JSDom";

const JS_LOGGER_INTERFACE = new JSLogger().GetInterface();

/**
 * @class JSCore
 * @extends JSObject
 * @inheritDoc
 */
export class JSCore extends JSObject {
    constructor() {
        // Create the base JSpyder Registry
        this.extend("registry", new JSRegistry().GetInterface());
        
        // bootstrap lib
        this.extend("lib", new JSLibrary(this).GetInterface());

        // TODO: bootstrap DOM
        // TODO: loadScript
    }
    
    static Bootstrap(alias = "jspyder", global = window) {
        var jspyder = global[alias] = new JSCore();
        return jspyder;
    }
    
    // algorithms
    get alg() { return JSAlgorithms; }
    
    // Environment Variables
    get env() { return JSEnvironment; }
    
    // logger is a constant
    get log() { return JS_LOGGER_INTERFACE; }
    
    // bootstrap dom
    dom(...args) {
        return new JSDom(...args);
    }
}

if(!window["JSpyder"]) {
    window["JSpyder"] = JSCore;
}
