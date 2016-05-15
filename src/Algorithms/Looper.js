import {TypeChecker} from "Algorithms/TypeChecker";
import {Functions} from "Algorithms/Functions";
import {LoopController, ObjectLoopController, ArrayLoopController} from "Algorithms/LooperController";

export class Looper {
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
     */
    static ObjectEach(object, loopFunction, ...data) {
        // drop everything if we can't iterate
        if(object && typeof object === "object") {
            // create the loop controller
            var controller = new ObjectLoopController(object);
            
            for(let key in object) {
                if(controller.breaking) {
                    break;
                }
                
                controller.index = key;
                Functions.Use(controller, loopFunction, [object[key], key, object, ...data]);
            }
        }
    }
    
    /**
     * Profile: O(n)
     */
    static ArrayEach(array, loopFunction, ...data) {
        console.log("ArrayEach");
        // drop everything if we can't iterate
        if(array && typeof array === "object") {
            console.log("Array Passes Check");
            // create the loop controller
            var controller = new ArrayLoopController(array);
            console.log(controller);
            console.log(`controller.index = ${controller.index} to ${array.length};`);
            for(controller.index = 0; controller.index < array.length; ++controller.index) {
                if(controller.breaking) {
                    console.log("breaking");
                    break;
                }
                
                console.log("Loop index: " + controller.index);
                Functions.Use(controller, loopFunction, [array[controller.index], controller.index, array, ...data]);
            }
        }
    }

    /**
     * Iterates from [start] to [end], executing [fn] on each step and
     * using [data] as the fourth parameter to [data].  Other than not
     * iterating numerically rather than traversing an array, this
     * function operates exactly like js.alg.arrEach and js.alg.each
     * 
     * Profile: O(n)
     */
    static Iterate(start, end, iterator, ...data) {
        start = TypeChecker.Number(start);
        end = TypeChecker.Number(end);
        
        var controller = new LoopController(null);
        var step = (end < start ? -1 : 1);
        
        for(let i = start; i !== end; i += step) {
            if(controller.breaking) {
                break;
            }

            Functions.Use(controller, iterator, [i, ...data]);
        }
    }
}

