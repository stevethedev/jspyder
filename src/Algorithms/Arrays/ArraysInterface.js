import {Arrays} from "Algorithms/Arrays/Arrays";

export class ArraysInterface {
    /**
     * Coerces any value to an array.
     * 
     * @param {*} value
     * @param {*} [defaultValue]
     * 
     * @return {Array}
     */
    array(value, defaultValue = []) {
        return Arrays.ToArray(value, defaultValue);
    }
    
    /**
     * Applies an array slice against an object, if it is 
     * capable of being performed.  If it cannot be performed, 
     * then returns a blank array.
     *
     * @param {Object} array
     *      The object to attempt a slice against.
     *
     * @param {number} index
     *      The argument to pass to the slice attempt.
     * 
     * @return {Array}
     */
    sliceArray(array = [], index = 0) {
        return Arrays.SliceArray(array, index);
    }
    
    /**
     * Performs an in-place concatenation of the 2nd-Nth parameter
     * arrays into arrRef.  Variadic function.
     *
     * @param {Array|?} arrayRef
     *      The array to merge into.
     *
     * @param {...(Array|?)} [arraysFrom]
     *      (Variadic) The arrays to merge from.
     *
     * @return {Array} arrayRef parameter
     */
    joinArray(arrayRef, ...arraysFrom) {
        for(let i = 0; i < arraysFrom.length; ++i) {
            Arrays.WidePush(arrayRef, arraysFrom[i]);
        }
        return arrayRef;
    }

    /**
     * Sorts an array of objects, based on a specified key-tree.  For
     * example:
     *
     *      var a1 = { foo: { bar: 1 } },
     *          a2 = { foo: { bar: 2 } },
     *          a3 = { foo: { bar: 3 } },
     *          array = [ a2 , a3 , a1 ];
     *
     *      js.alg.sortArrayObj(arr, true, "foo", "bar"); // a1, a2, a3
     *      js.alg.sortArrayObj(arr, false, "foo", "bar"); // a3, a2, a1
     *
     * @param {Object[]} array
     * @param {boolean} ascending
     * @param {...String} fields
     */
    sortArrayObj(array, ascending = true, ...fields) {
        return Arrays.SortArrayObjects(array, ascending, ...fields);
    }
    
    /**
     * Sorts an array of numbers, to compensate for the fact that vanilla
     * JavaScript coerces array values to a string when comparing during a
     * sort.
     *
     *      var array = [ 1, 2, 3, 10, 20, 30 ];
     *      array.sort(); // [1, 10, 2, 20, 3, 30]
     *      js.alg.sortArrayNum(array); // [1, 2, 3, 10, 20, 30]
     *
     * @param {Array<number>} array
     * @param {Boolean} ascending
     */
    sortArrayNum(array, ascending = true) {
        return Arrays.SortArrayNumbers(array, ascending);
    }
}