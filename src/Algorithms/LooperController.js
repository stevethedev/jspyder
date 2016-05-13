import {JSObject} from "JSObject";

/**
 * Loop Controller Classes
 */

export class LoopController extends JSObject {
    constructor() {
        this._break = false;
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
    constructor() {
        super();
    }
}

export class ArrayLoopController extends LoopController {
    constructor(array) {
        Object.define(this, {
            _array: { value: array }
        });

        super();
    }
    
    set index(index) {
        this._index = TypeChecker.Number(index);
    }
    
    drop(dropCount) {
        dropCount = TypeChecker.Number(dropCount, 1);
        this._array.splice(this.index--, dropCount);
        return this;
    }
}