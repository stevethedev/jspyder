export class FunctionChecker {
    // returns True if the object is a function.
    static IsFunction(checkFunction) {
        return "function" === typeof checkFunction;
    }

    // executes a function, with the given context, if it is valid.
    // then returns the return value of the executed function.
    static Use(context, useFunction, args) {
        context = context || null;
        
        if(FunctionChecker.IsFunction(useFunction)) {
            return useFunction.apply(context, args);
        }
        
        return undefined;
    }
    
    // runs the provided function, without any context.
    static Run(runFunction) {
        if(FunctionChecker.IsFunction(runFunction)) {
            return runFunction();
        }
        
        return undefined;
    }
}