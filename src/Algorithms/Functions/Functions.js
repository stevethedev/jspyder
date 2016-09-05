import {Arrays} from "Algorithms/Arrays/Arrays";
import {Objects} from "Algorithms/Objects/Objects";

export class Functions {
    /**
     * Profile: O(1)
     * @return True if the object is a function.
     */
    static IsFunction(checkFunction) {
        return "function" === typeof checkFunction;
    }

    /**
     * Executes the function [useFunction] with the given [context],
     * if it is valid.
     * 
     * Profile: O(1)  
     * 
     * @return The return value from the executed function.
     */
    static Use(context, useFunction, args) {
        context = context || null;
        
        if(Functions.IsFunction(useFunction)) {
            return useFunction.apply(context, args);
        }
        
        return undefined;
    }
    
    /**
     * Executes the provided function [runFunction] without
     * any context, and using the arguments provided.
     * 
     * Profile: O(1)
     * 
     * @return The return value from the executed function.
     */
    static Run(runFunction, args) {
        if(Functions.IsFunction(runFunction)) {
            return runFunction(...args);
        }
        
        return undefined;
    }
    
    /**
     * Binds a function for execution, later.  The parameters
     * listed under [args] are used as the first parameters,
     * while the rest of the parameters are appended to the end.
     * 
     * Profile: O(args.length)
     * 
     * @param {Object} context
     * @param {Function|Object} useFunction
     * @param {Array} args
     * 
     * @return {Function} Profile: O(arguments.length)
     */
    static Bind(context, useFunction, args = []) {
        args = Arrays.Slice(args);
        
        return function() {
            args = args.concat(Arrays.Slice(arguments));
            return Functions.Use(context, useFunction, args);
        }
    }
    
    static Memoize(memoizeFunction) {
        var memo = Objects.CreateBlankObject();

        return function(...args) {
            if(memo.hasOwnProperty(args)) {
                return memo[args];
            }
            return memo[args] = memoizeFunction(...args);
        }
    }

    static BlankFunction() { }
}