import {JSObject} from "JSObject";

import {Browser} from "Environment/Browser";
import {BROWSER_FIREFOX} from "Environment/BrowserData";

export class JSError extends Error {
    constructor(message = "", 
                fileName = undefined, 
                lineNumber = undefined) {
                    
        if(BROWSER_FIREFOX === Browser.name) {
            super(message, fileName, lineNumber);
        }
        else {
            if(fileName) {
                let prefix = `${fileName}`;
                
                if(lineNumber) {
                    prefix += `:${lineNumber}`;
                }
                
                message = `[${prefix}] ${message}`;
            }
            super(message);
        }
    }
}