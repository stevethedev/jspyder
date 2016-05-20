import {Numbers} from "Algorithms/Numbers/Numbers";

/** 
 * @interface 
 */
export class NumbersInterface {
    /**
     * Calculates the nearest multiple of an order of magnitude in the
     * given base number, which is further from zero than the provided
     * value [num].  For example:
     * 
     *     magnitude(9, 10);  // 10
     *     magnitude(9, 8);   // 16
     *     magnitude(9, 0xF); // 16
     *     magnitude(9, 2);   // 16
     * 
     * @param {number} num
     * @param {number} base
     * 
     * @return {number}
     */
    magnitude(num, base) {}
    
    /**
     * Coerces any value to a JavaScript Number primitive.
     * 
     * @param {*} value
     * @param {*} defaultValue
     * 
     * @return {number|?}
     */
    number(value, defaultValue) {}
    
    /**
     * Returns the smallest value from the list of arguments.
     * 
     * @param {...number} numbers
     * @return {number}
     */
    min(...numbers) {}
    
    /**
     * @param {...number} numbers
     * @return {number}
     */
    max(...numbers) {}
    
    /**
     * Coerces any value to an Int8 value
     */
    byte(value) {}
    
    /**
     * Coerces any value to UInt8 Value
     */
    ubyte(value) {}   
    short(value) {}
    ushort(value) {}
    int(value) {}
    uint(value) {}
    float(value) {}
    double(value) {}
    makeEnum(value) {}
    
    /**
     * Converts radians to degrees, taking the same arguments
     */
    rad2deg(number, defaultValue) {}
    deg2rad(number, defaultValue) {}
}