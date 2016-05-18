import {JSError} from "Error/JSError";

const ABSTRACT_ERROR = "LibraryInterfaceDefs is an abstract function!";
const FILENAME = "JSpyder/Library/LibraryInterfaceDefs";

/** 
 * Abstract library interface object
 * 
 * @class LibraryInterfaceDefs
 * @constructor
 * @return {LibraryInterfaceDefs}
 */
function LibraryInterfaceDefs(...args) {
    throw new JSError(ABSTRACT_ERROR, FILENAME);
}
LibraryInterfaceDefs.register = function(...args) {
    throw new JSError(ABSTRACT_ERROR, FILENAME, "register()");
}
LibraryInterfaceDefs.registerSet = function(...args) {
    throw new JSError(ABSTRACT_ERROR, FILENAME, "register()");
}
LibraryInterfaceDefs.execute = function(...args) {
    throw new JSError(ABSTRACT_ERROR, FILENAME, "register()");
}

export {LibraryInterfaceDefs};