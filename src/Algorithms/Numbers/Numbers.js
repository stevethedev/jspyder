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
}
