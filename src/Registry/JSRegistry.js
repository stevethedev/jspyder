import {JSObject} from "JSObject";

import {Functions} from "Algorithms/Functions/Functions";

import {HasInterface} from "Object/Interface";

import {RegistryInterfaceDefs} from "Registry/RegistryInterfaceDefs";
import {RegistryInterface} from "Registry/RegistryInterface";

/**
 * @class JSRegistry
 * @implements HasInterface
 */
export class JSRegistry extends JSObject {
    constructor(cache = {}) {
        this._cache = cache;
    }

    /**
     * @return {RegistryInterfaceDefs}
     */
    GetInterface() {
        var registry = this;
        
        /**
         * @implements RegistryInterface
         */
        class JSRegistryInterface extends RegistryInterfaceDefs {
            constructor() { /* Intentionally Blank */ }
            
            fetch(key, callback = null) {
                return registry.Fetch(key, callback);
            }
            
            stash(key, value = null) {
                return registry.Stash(key, value);
            }
        }
        
        return new JSRegistryInterface();
    }
    
    Fetch(key, callback) {
        var value = {
            "key": key,
            "value": this._cache[key]
        };
        
        Functions.Run(callback, value);
        return value["value"];
    }
    
    Stash(key, value) {
        this._cache[key] = value;
        return value;
    }
}