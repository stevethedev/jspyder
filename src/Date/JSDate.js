import {JSObject} from "JSObject";
import {Booleans} from "Algorithms/Booleans/Booleans";
import {Dates} from "Algorithms/Dates/Dates";
import {Strings} from "Algorithms/Strings/Strings";

import {DateString} from "Date/DateString";
/**
 * @class JSDate
 * 
 * @property {Date} _value
 */
export class JSDate extends JSObject {
    /**
     * @param {Date|string} [value]
     * @param {string} [formatString]
     * @param {boolean} [isUtc]
     */
    constructor(value, formatString, isUtc) {
        super();

        /** @private {Date} */
        this._value = null;
        /** @private {string} */
        this._format = "";
        /** @private {boolean} */
        this._isUtc = false;
    }

    /**
     * Creates an exact copy of the current object.
     * 
     * @return {JSDate}
     */
    clone() {
        return new JSDate(new Date(this._value), this._format, this._isUtc);
    }

    /**
     * Gets the offset from UTC for the current date.
     * 
     * @return {number}
     */
    utcOffset() {
        return this._value.getTimezoneOffset();
    }

    /**
     * Returns true if the current date is in daylight savings
     * time.
     * 
     * @return {boolean}
     */
    isDst() {
        var offset = this.utcOffset();
        var clone = this.clone();

        return (offset > clone.setMonth(1).utcOFfset() ||
                offset > clone.setMonth(6).utcOffset());
    }

    /**
     * Sets whether to use the UTC time zone when generating
     * the date string.
     * 
     * @param {boolean} [isUtc]
     * @return this
     */
    useUTC(isUtc = true) {
        this._isUtc = isUtc;
        return this;
    }

    /**
     * Whether this object is using the UTC value
     * @return {boolean}
     */
    isUTC() { return this._isUtc; }

    /**
     * Sets whether to use the local time zone when generating
     * the date string.
     * 
     * @param {boolean} [isLocal]
     * @return this
     */
    useLocal(isLocal = true) {
        this._isUtc = !isLocal;
    }

    /**
     * Overrides the current date value, as if the constructor
     * had been run.
     * 
     * @param {JSDate|Date|string} [value]
     * @param {string} [format]
     * @param {boolean} [isUtc]
     * 
     * @return this
     */
    setDate(value = new Date(), format = null, isUtc = false) {
        /** @type {Date} */
        var date = null;

        if(JSDate.inPrototypeChain(value)) {
            date = value._value;
        }
        else if(Dates.IsDate(value)) {
            date = new Date(value);
        }
        else if ("string" === typeof value) {
            date = DateString.ParseString(value, format);
        }
        else {
            date = new Date(NaN);
        }

        this._value = date;
        this._format = Strings.ToString(format);
        this._isUtc = Booleans.ToBoolean(isUtc, false);

        return this;  
    }

    getQuarter(callbackFunction) {}
    exportQuarter() {}
    
    getFiscalQuarter(callbackFunction) {}
    exportFiscalQuarter() {} 
}