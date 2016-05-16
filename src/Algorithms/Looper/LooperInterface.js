import {Looper} from "Algorithms/Looper/Looper";

export class LooperInterface {
    /**
     * Iterates through a provided object and executes fn() on each
     * step.  Uses a controller to manage the loop.
     * 
     * Profile: O(n)
     *
     * @param {Object} object
     *      An object or array to iterate through.  If the element is
     *      invalid, then this function fails quietly and continues
     *      on.
     *
     * @param {Function} loopFunction
     *      Function with the following parameters:
     *       1: The value of the current item
     *       2: The key of the current item
     *       3: A reference to [obj]
     *       4: A reference to [data]
     *
     *      The context of this variable points to a controller object
     *      with the members:
     *       - stop() -- stops iterations and breaks from the function
     *       - drop(n) -- deletes the current item from the array
     *
     *      If the Function returns a value, then that value will be
     *      inserted in the array at that position.
     * 
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    each(object, loopFunction, ...data) {
        Looper.ObjectEach(object, loopFunction, ...data);
        return this;
    }
    
    /**
     * Profile: O(n)
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    arrEach(array, loopFunction, ...data) {
        Looper.ArrayEach(array, loopFunction, ...data);
        return this;
    }

    /**
     * Iterates from [start] to [end], executing [fn] on each step and
     * using [data] as the fourth parameter to [data].  Other than not
     * iterating numerically rather than traversing an array, this
     * function operates exactly like js.alg.arrEach and js.alg.each
     * 
     * Profile: O(n)
     * 
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    iterate(start, end, iterator, ...data) {
        Looper.Iterate(start, end, iterator, ...data);
        return this;
    }
}
