import {Numbers} from "Algorithms/Numbers/Numbers";

/** @interface */
export class NumbersInterface {
    magnitude(num, base) {}
    
    /**
     * Coerces any value to a JavaScript Number primitive.
     * 
     * @param {*} value
     * @param {*} defaultValue
     */
    number(value, defaultValue) {}
    
    /**
     * Returns the smallest value from the list of arguments.
     * 
     * @param {...number} numbers
     */
    min(...numbers) {}
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