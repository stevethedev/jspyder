import {JSObject} from "JSObject";
import {JSError} from "Error/JSError";

import {RegistryInterface} from "Registry/RegistryInterface"; 

const ERROR_REGISTRY_INTERFACE = "Attempted to use abstract class RegistryInterface";

/**
 * @implements RegistryInterface
 * 
 * Abstract RegistryInterface class, which lets 
 */
export class RegistryInterfaceDefs extends JSObject {
    /**
     * Retrieves a value from the registry
     *   
     * @param {!string} key
     * @param {function(*)} [callback]
     * @return {*}
     */
    fetch(key, callback) { }

    /**
     * Stores a value in the registry
     * 
     * @param {!string} key
     * @param {*} value
     */ 
    stash(key, value) { }
}
