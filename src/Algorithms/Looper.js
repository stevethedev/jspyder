import {TypeChecker} from "Algorithms/TypeChecker";
import {FunctionChecker} from "Algorithms/FunctionChecker";
import {LoopController, ObjectLoopController, ArrayLoopController} from "Algorithms/LooperController";

export class Looper {
    /**
     * Iterates through a provided object and executes fn() on each
     * step.  Uses a controller to manage the loop.
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
     * @param {Mixed} data
     *      A data source to pass as the fourth value in [fn]
     *
     * @return {Object} JSpyder
     */
    static ObjectEach(object, loopFunction, data) {
        // drop everything if we can't iterate
        if(object && typeof object === "object") {
            // create the loop controller
            var controller = new ObjectLoopController();
            
            for(var key in object) {
                if(controller.breaking) {
                    break;
                }
                
                FunctionChecker.Use(controller, loopFunction, [object[key], key, object, data]);
            }
        }
    }
    
    static ArrayEach(array, loopFunction, data) {
        // drop everything if we can't iterate
        if(array && typeof array === "object") {
            // create the loop controller
            var controller = new ArrayLoopController();
            for(controller.index = 0; controller.index < array.length; ++controller.index) {
                if(controller.breaking) {
                    break;
                }
                
                FunctionChecker.Use(controller, loopFunction, [object[controller.index], key, object, data]);
            }
        }
    }

    /**
     * Iterates from [start] to [end], executing [fn] on each step and
     * using [data] as the fourth parameter to [data].  Other than not
     * iterating numerically rather than traversing an array, this
     * function operates exactly like js.alg.arrEach and js.alg.each
     */
    static Iterate(start, end, iterator, data) {
        start = TypeChecker.Number(start);
        end = TypeChecker.Number(end);
        
        var controller = new LoopController();
        var step = (end < start ? -1 : 1);
        
        for(var i = start; i !== end; i += step) {
            if(controller.breaking) {
                break;
            }

            FunctionChecker.Use(controller, iterator, [i, data]);
        }
    }
}

