import {TestObject} from "TestObject";
import {Assert} from "Assert";

export class TestDOMPositionInterface extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        super("Dom/DOMPosition/DOMPositionInterface");
        
        this.autoloadTests();
        this.startTests();
    }
}