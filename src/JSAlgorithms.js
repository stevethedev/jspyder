import "JSObject";
import "Algorithms/Looper";

export class JSAlgorithms extends JSObject {
    each(object, loopFunction, data) {
        Looper.ObjEach(object, loopFunction, data);
        return this;
    }
    
    arrEach(array, loopFunction, data) {
        Looper.ArrayEach(array, loopFunction, data);
        return this;
    }
}


