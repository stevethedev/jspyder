/**
 * @interface
 */
export class DOMEventInterface {
    /**
     * @param {!string|Array<!string>} eventString
     * @param {!function(Event)} handlerFunction
     * @return this
     */
    on(eventString, handlerFunction) { }
    /**
     * @param {!string|Array<!string>} eventString
     * @param {...!function(Event)} [handlerFunction]
     * @return this
     */
    off(eventString, ...handlerFunction) { }
    /**
     * @param {!string|Array<!string>|Event} eventString
     * @return this
     */
    trigger(eventString) { }
}