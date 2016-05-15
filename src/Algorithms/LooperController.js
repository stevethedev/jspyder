import {JSObject} from "JSObject";
import {TypeChecker} from "Algorithms/TypeChecker";

/**
 * Loop Controller Classes
 * 
 * @class LoopController
 */
export class LoopController extends JSObject {
    /**
     * @param {Object} source
     */
    constructor(source = []) {
        this._break = false;
        this._index = 0;
        this._source = source;
        Object.defineProperty(this, "_source", { "value": this._source });
    }
    
    stop() {
        this._break = true;
        return this;
    }
    
    get breaking() {
        return this._break === true;
    }
    
    get index() {
        return this._index;
    }
    
    set index(index) {
        this._index = index;
    }
    
    drop(dropCount) {
        return this;
    }
}

export class ObjectLoopController extends LoopController {
}

/**
 * @class ArrayLoopController
 * @extends LoopController
 */
export class ArrayLoopController extends LoopController {
    constructor(...args) {
        super(...args);
    }
    
    set index(index) {
        this._index = TypeChecker.Number(index);
    }
    
    get index() {
        return this._index;
    }
    
    drop(dropCount = 1) {
        dropCount = TypeChecker.Number(dropCount, 1);
        this._source.splice(this.index--, dropCount);
        return this;
    }
}