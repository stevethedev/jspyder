/** @interface */
export class FunctionsInterface {
    /**
     * Uses the selected object as the [this] parameter for the
     * executed function [fn].
     *
     * @param {*} context
     *      The [this] context to apply
     *
     * @param {Function} functionReference
     *      The function to run
     *
     * @param {Array} argsArray
     *      Any parameters to pass to the function, in "apply" format
     *
     * @return
     *      The value returned by fn
     */
    use(context, functionReference, argsArray) {}
    
    /**
     * Executes the provided function [runFunction] without
     * any context, and using the arguments provided.
     * 
     * Profile: O(1)
     * 
     * @param {Function} functionReference
     * @param {Array} argsArray
     * 
     * @return The return value from the executed function.
     */
    run(functionReference, argsArray) {}
    
    /**
     * Binds a function for execution, later.  The parameters
     * listed under [args] are used as the first parameters,
     * while the rest of the parameters are appended to the end.
     * 
     * Profile: O(args.length)
     * 
     * @param {Object} context
     * @param {Function} functionReference
     * @param {Array} argsArray
     * 
     * @return {Function} Profile: O(arguments.length)
     */
    bindFn(context, functionReference, argsArray) {}
}