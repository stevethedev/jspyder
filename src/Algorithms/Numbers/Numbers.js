import {Objects} from "Algorithms/Objects/Objects";

const USE_INT8_ARRAY  = ("undefined" === typeof window.Int8Array);
const USE_UINT8_ARRAY = ("undefined" === typeof window.Uint8Array);
const USE_INT16_ARRAY  = ("undefined" === typeof window.Int16Array);
const USE_UINT16_ARRAY = ("undefined" === typeof window.Uint16Array);
const USE_INT32_ARRAY  = ("undefined" === typeof window.Int32Array);
const USE_UINT32_ARRAY = ("undefined" === typeof window.Uint32Array);
const USE_FLOAT_ARRAY = ("undefined" === typeof window.Float32Array);
const USE_DOUBLE_ARRAY = ("undefined" === typeof window.Float64Array);
const CONST_RAD_TO_DEG = 180 / Math.PI;
const CONST_DEG_TO_RAD = Math.PI / 180; 

export class Numbers {
    /**
     * @param {?} value
     * @param {?} defaultValue
     * 
     * @return {number|?}
     */
    static ToNumber(value, defaultValue = 0) {
        var num = +value;
        if(num == value && num === num) {
            return num;
        }
        else {
            return defaultValue;
        }
    }
    
    /**
     * Converts any value to an Int8 value, observing normal
     * buffer overflows.  This function has some lazy-optimization,
     * but is not memoized because the performance gain was negligible.
     * 
     * @template THIS
     * @this {THIS}
     */
    static ToInt8(value) {
        if(USE_INT8_ARRAY) {
            this.ToInt8 = (value) => {
                value = Numbers.ToNumber(value);
                value = (value === value ? value : 0) & 0xFF;

                // shift right into range.
                while(value < -0x80) { 
                    value += 0x100;
                }

                // shift left into range.
                while(value > 0x7F) { 
                    value -= 0x100;
                }

                return value;
            }
        }
        else {
            var buffer = new window.ArrayBuffer(1);
            var byteArray = new window.Int8Array(buffer);

            this.ToInt8 = (value) => {
                byteArray[0] = Numbers.ToNumber(value);
                return byteArray[0];
            }
        }

        return this.ToInt8(value);
    }

    /**
     * Converts any value to an UInt8 value, observing normal
     * buffer overflows.  This function has some lazy-optimization,
     * but is not memoized because the performance gain was negligible.
     * 
     * @template THIS
     * @this {THIS}
     */
    static ToUInt8(value) {
        if(USE_UINT8_ARRAY) {
            this.ToUInt8 = (value) => {
                value = Numbers.ToNumber(value);
                value = (value === value ? value : 0) & 0xFF;
                return (value < 0 ? -value : value);
            }
        }
        else {
            var buffer = new ArrayBuffer(1);
            var byteArray = new window.Uint8Array(buffer);
            this.ToUInt8 = (value) => {
                byteArray[0] = value;
                return byteArray[0];
            }
        }
        
        return this.ToUInt8(value);
    }

    /**
     * Converts any value to an Int16 value, observing normal
     * buffer overflows.  This function has some lazy-optimization,
     * but is not memoized because the performance gain was negligible.
     * 
     * @template THIS
     * @this {THIS}
     */
    static ToInt16(value) {
        if(USE_INT16_ARRAY) {
            this.ToInt16 = (value) => {
                value = Numbers.ToNumber(value);
                value = (value === value ? value : 0) & 0xFFFF;
                // Right-Shift Into Range
                while(value < -0x8000) {
                    value += 0x10000;
                }
                // Left-Shift Into Range
                while(value > 0x7FFF) {
                    value -= 0x10000;
                }
                
                return value;
            }
        }
        else {
            var buffer = new ArrayBuffer(1 << 1);
            var byteArray = new window.Int16Array(buffer);
            this.ToInt16 = function(value) {
                byteArray[0] = Numbers.ToNumber(value);
                return byteArray[0];
            }
        }
        return this.ToInt16(value);
    }

    /**
     * Converts any value to an UInt16 value, observing normal
     * buffer overflows.  This function has some lazy-optimization,
     * but is not memoized because the performance gain was negligible.
     * 
     * @template THIS
     * @this {THIS}
     */
    static ToUInt16(value) {
        if(USE_UINT16_ARRAY) { 
            this.ToUInt16 = (value) => {
                value = Numbers.ToNumber(value);
                value = (value === value ? value : 0) & 0xFFFF;
                return (value < 0 ? -value : value);
            }
        }
        else {
            var buffer = new ArrayBuffer(1 << 1);
            var byteArray = new window.Uint16Array(buffer);
            this.ToUInt16 = (value) => {
                byteArray[0] = Numbers.ToNumber(value);
                return byteArray[0];
            }
        }
        return this.ToUInt16(value);
    }

    /**
     * Converts any value to an Int32 value, observing normal
     * buffer overflows.  This function has some lazy-optimization,
     * but is not memoized because the performance gain was negligible.
     * 
     * @template THIS
     * @this {THIS}
     */
    static ToInt32(value) {
        if(USE_INT32_ARRAY) {
            this.ToInt32 = (value) => {
                value = Numbers.ToNumber(value);
                value = (value === value ? value : 0) & 0xFFFFFFFF;
                // Right-Shift Into Range
                while(value < -0x80000000) {
                    value += 0x100000000;
                }
                // Left-Shift Into Range
                while(value > 0x7FFFFFFF) {
                    value -= 0x100000000;
                }
                
                return value;
            }
        }
        else {
            var buffer = new ArrayBuffer(1 << 2);
            var byteArray = new window.Int32Array(buffer);
            this.ToInt32 = function(value) {
                byteArray[0] = Numbers.ToNumber(value);
                return byteArray[0];
            }
        }
        return this.ToInt32(value);
    }

    /**
     * Converts any value to an UInt32 value, observing normal
     * buffer overflows.  This function has some lazy-optimization,
     * but is not memoized because the performance gain was negligible.
     * 
     * @template THIS
     * @this {THIS}
     */
    static ToUInt32(value) {
        if(USE_UINT32_ARRAY) { 
            this.ToUInt32 = (value) => {
                value = Numbers.ToNumber(value);
                value = (value === value ? value : 0) % 0x100000000;
                return (value < 0 ? -value : value);
            }
        }
        else {
            var buffer = new ArrayBuffer(1 << 2);
            var byteArray = new window.Uint32Array(buffer);
            this.ToUInt32 = (value) => {
                byteArray[0] = Numbers.ToNumber(value);
                return byteArray[0];
            }
        }
        return this.ToUInt32(value);
    }

    /**
     * Converts any value to a Float value, observing normal
     * buffer overflows.  This function has some lazy-optimization,
     * but is not memoized because the performance gain was negligible.
     * 
     * @template THIS
     * @this {THIS}
     */
    static ToFloat(value) {
        if(USE_FLOAT_ARRAY) {
            this.ToFloat = (value) => {
                var sign = (value > 0 ? 1 : -1);
                var exp = 0;
                var base = value * sign;
                var frac = 0;

                while(base >= 2 || base < 1) {
                    if(base >= 2) { base /= 2; exp++; }
                    if(base < 1) { base *= 2; exp--; }
                }

                frac = (value / Math.pow(2, exp)) - 1;
                frac = (1 + Math.round(frac*0x800000)/0x800000);

                return +((sign * frac * Math.pow(2, exp) ).toPrecision(8));
            }
        }
        else {
            var buffer = new ArrayBuffer(1 << 2);
            var byteArray = new window.Float32Array(buffer);
            this.ToFloat = (value) => {
                byteArray[0] = Numbers.ToNumber(value);
                return +(byteArray[0].toPrecision(8));
            }
        }
        return this.ToFloat(value);
    }

    /**
     * Converts any value to a Double value, observing normal
     * buffer overflows.  This function has some lazy-optimization,
     * but is not memoized because the performance gain was negligible.
     * 
     * @template THIS
     * @this {THIS}
     */
    static ToDouble(value) {
        if(USE_DOUBLE_ARRAY) {
            this.ToDouble = (value) => {
                value = +(Numbers.ToNumber(value).toPrecision(16));
                return (value === value ? value : 0);
            }
        }
        else {
            var buffer = new ArrayBuffer(1 << 3);
            var byteArray = new window.Float64Array(buffer);
            this.ToDouble = (value) => {
                byteArray[0] = Numbers.ToNumber(value);
                return byteArray[0];
            }
        }
        return this.ToDouble(value);
    }

    /**
     * Rounds up to the nearest multiple of the order of magnitude for
     * the value [num].
     *
     * @param {number} num    The number to calculate a magnitude from.
     * @param {number=} base  The number to be used as a base.
     */
    static Magnitude(num, base=10) {
        num = Numbers.ToNumber(num)|0;
        var abs = (num < 0) 
            ? -num 
            : num;
            
        var pow = (abs|0).toString(base).length - 1 || 1;
        var width = Math.pow(base, pow);
        
        if(num < 0) {
            return Math.floor(num/width) * width;
        }
        else {
            return Math.ceil(num/width) * width;
        }
    }
    
    /**
     * @param {...number} numbers
     * @return {number} The smallest number in the parameters.
     */
    static Minimum(...numbers) {
        var minimum = numbers[0];
        for(let i = 1, li = numbers.length; i < li; ++i) {
            if(numbers[i] < minimum) {
                minimum = numbers[i];
            }
        }
        return minimum;
    }
    
    /**
     * @param {...number} numbers
     * @return {number} The largest number in the parameters.
     */
    static Maximum(...numbers) {
        var maximum = numbers[0];
        for(let i = 1, li = numbers.length; i < li; ++i) {
            if(numbers[i] > maximum) {
                maximum = numbers[i];
            }
        }
        return maximum;
    }
    
    /**
     * Converts radianst o degrees, taking the same arguments as
     * Numbers.ToNumber.
     */
    static DegreesToRadians(value, defaultValue = 0) {
        return Numbers.ToNumber(value, defaultValue) * CONST_DEG_TO_RAD;
    }

    /**
     * Converts radianst o degrees, taking the same arguments as
     * Numbers.ToNumber.
     */
    static RadiansToDegrees(value, defaultValue = 0) {
        return Numbers.ToNumber(value, defaultValue) * CONST_RAD_TO_DEG;
    }
    
    /**
     * Takes an array of keys, and generates an enumerated object
     * with them.
     */
    static MakeEnumeratedObject(keys, attachTo = Objects.CreateBlankObject()) {
        var value = 1;
        for(let i = 0, li = keys.length; i < li; ++i) {
            Object.defineProperty(attachTo, keys[i], { value: value });
            value <<= 1;
        }
        return attachTo;
    }
}
