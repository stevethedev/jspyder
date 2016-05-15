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
    fetch(key, callback = null) {
        throw new JSError(ERROR_REGISTRY_INTERFACE);
    }
    stash(key, value = null) {
        throw new JSError(ERROR_REGISTRY_INTERFACE);
    }
}
