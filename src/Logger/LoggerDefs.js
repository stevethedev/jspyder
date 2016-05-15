import {JSError} from "Error/JSError";

const ERROR_REGISTRY_INTERFACE = "Attempted to use abstract class RegistryInterface";

export class LoggerDefs extends Function {
    static warn(...args) {
        throw new JSError(ERROR_REGISTRY_INTERFACE);
    }
    static err(...args) {
        throw new JSError(ERROR_REGISTRY_INTERFACE);
    }
} 