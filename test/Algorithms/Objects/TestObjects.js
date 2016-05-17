import {TestObject} from "TestObject";
import {Objects} from "Algorithms/Objects/Objects";

import {Assert} from "Assert";

export class TestObjects extends TestObject {
    constructor() {
        super("Algorithms/Objects/Objects");
        this.autoloadTests();
        this.startTests();
    }
}