import {TestObject} from "TestObject";
import {Assert} from "Assert";

export class TestDOMPosition extends TestObject {
    constructor() {
        super("Dom/DOMPosition/DOMPosition");
        
        this.autoloadTests();
        this.startTests();
    }
}