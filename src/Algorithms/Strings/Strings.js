const CONST_REGEXP_UNSAFE_CHARACTERS = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
const CONST_STRING_UNSAFE_REPLACEMENT = "\\$&";
const CONST_REGEXP_TO_STRING_MATCH = /^\/(.*)\/[a-z]*$/;

export class Strings {
    /**
     * @param {?} value
     * @param {?} [defaultValue]
     *
     * @return {string|?}
     */
    static ToString(value, defaultValue = "") {
        if(typeof value === "string") {
            return value;
        }
        else if(value && typeof value.toString === "function") {
            return value.toString();
        }
        else if(null !== value && "object" === typeof value && value.isPrototypeOf(RegExp)) {
            return ('' + value).replace(
                CONST_REGEXP_TO_STRING_MATCH, "$1");
        }
        else if(value || value === 0 || value === false) {
            return '' + value;
        }
        else {
            return defaultValue;
        }
    }

    static EscapeString(stringToEscape) {
        return Strings.ToString(stringToEscape).replace(
            CONST_REGEXP_UNSAFE_CHARACTERS,
            CONST_STRING_UNSAFE_REPLACEMENT);
    }
}
