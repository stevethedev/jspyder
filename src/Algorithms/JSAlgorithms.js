import {JSObject} from "JSObject";
import {Looper} from "Algorithms/Looper";

/**
 * JSpyder Algorithm Class
 */
export class JSAlgorithms extends JSObject {
    static each(object, loopFunction, ...data) {
        Looper.ObjectEach(object, loopFunction, ...data);
        return this;
    }
    
    static arrEach(array, loopFunction, ...data) {
        Looper.ArrayEach(array, loopFunction, ...data);
        return this;
    }
}
