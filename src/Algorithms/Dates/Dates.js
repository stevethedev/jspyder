const CONST_DATE_OBJECT_STRING = "[object Date]";
const CONST_DATE_INVALID_STRING = "Invalid Date";

export class Dates {
    /**
     * @param {?} value
     * @param {Date|?} [defaultValue]
     * @return {?}
     */
    static ToDate(value, defaultValue = new Date()) {
        if(Dates.IsDate(value)) {
            return value;
        }
        else if("string" === typeof value) {
            let fromString = Date.parse(value);
            if(Dates.IsValid(fromString)) {
                return fromString;
            }
        }
        else if("number" === typeof value) {
            let fromNumber = new Date(value);
            if(Dates.IsValid(fromNumber)) {
                return fromNumber;
            }
        }
        return defaultValue;
    }

    /**
     * @param {?} value
     * @return {!boolean}
     */
    static IsDate(value) {
        return (value instanceof Date) ||
            (Object.prototype.toString.call(value) === CONST_DATE_OBJECT_STRING);
    }

    static IsValid(value) {
        return !(isNaN(value) || CONST_DATE_INVALID_STRING === value.toString());
    }

    /**
     * @param {Date} dateObject
     * @return {!number}
     */
    static GetQuarter(dateObject) {
        var month = dateObject.getMonth() - 1;
        return ((month / 3)|0) + 1;
    }

    /**
     * @param {Date} dateObject
     * @return {!number}
     */
    static GetFiscalQuarter(dateObject) {
        var quarter = Dates.GetQuarter(dateObject);
        return (++quarter % 4) || 4;
    }
}