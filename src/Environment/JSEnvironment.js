import {JSObject} from "JSObject";
import {VERSION_OBJECT} from "Version";
import {Browser} from "Environment/Browser";

const VERSION_STRING = `${VERSION_OBJECT.MAJOR_VERSION}.${VERSION_OBJECT.MINOR_VERSION}.${VERSION_OBJECT.PATCH_VERSION}`;

const VERSION_NUMBER = (VERSION_OBJECT["MAJOR_VERSION"] << 16) +
                       (VERSION_OBJECT["MINOR_VERSION"] << 8) +
                       (VERSION_OBJECT["PATCH_VERSION"]);

/**
 * JSpyder environment variables. The values in this object are
 * immutable and cannot be changed once JSpyder has been bootstrapped.
 *
 * @property {String} version
 *      A 3-number string for the jspyder version number, represented
 *      as "M.N.P," where M is the major version, N is the minor
 *      version, and P is the patch version.
 *
 * @property {Number} versionNo
 *      An integer value representing the version of the jspyder
 *      library.  The numbers help to compare version numbers without
 *      having to parse the 3-decimal.  For example, differentiating
 *      between JSpyder v1.1.0 and JSpyder v1.10.0 would be a multi-
 *      step solution.  However, their numerical values (65792 and
 *      68096, respectively) are easily differentiable.
 *
 * @property {Object} browser
 *      A collection of browser information
 *
 * @property {String} browser.name
 *      The name of the browser being used (e.g. Firefox, IE, Chrome)
 *      based on feature testing.
 *
 * @property {Number} browser.version
 *      The version of the browser being used, based on feature-testing.
 */
export class JSEnvironment extends JSObject {
    static get version() { 
        return VERSION_STRING; 
    }
    
    static get versionNo() { 
        return VERSION_NUMBER; 
    }
    
    static get browser() { 
        return Browser; 
    }
    
    static toString() { 
        return `JSpyder ${this.version} on ${this.browser}`; 
    }
}
