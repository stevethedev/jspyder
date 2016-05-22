/** @interface */
export class DOMPositionInterface {
    
    /**
     * @return {Object<number>}
     */
    exportPosition() {}
    
    /**
     * @return {Object<number>}
     */
    exportOffsetPosition() {}

    /**
     * @param {function(Object<number>)} [callbackFunction]
     * @return this
     */
    getPosition(callbackFunction) {}

    /**
     * @param {function(Object<number>)} [callbackFunction]
     * @return this
     */
    getOffsetPosition(callbackFunction) {}
}