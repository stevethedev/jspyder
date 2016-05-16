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
        this.extend("alg", new JSAlgorithms(this));
        // TODO: bootstrap DOM
        // TODO: loadScript
    }
    
    /**
     * @method
     * @param {string} alias
     * @param {Object} global
     */
    static Bootstrap(alias = "jspyder", global = window) {
        var jspyder = global[alias] = new JSCore();
        return jspyder;
    }
    
    /**
     * @method
     */
    get alg() { return JSAlgorithms; }
    
    /**
     * @method
     */
    get env() { return JSEnvironment; }
    
    /**
     * @method
     */
    get log() { return JS_LOGGER_INTERFACE; }
    
    /**
     * @method
     */
    dom(...args) {
        return new JSDom(...args);
    }
}

if(!window["JSpyder"]) {
    window["JSpyder"] = JSCore;
}
