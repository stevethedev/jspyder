import {TestObject} from "TestObject";
import {Strings} from "Algorithms/Strings/Strings";

import {Assert} from "Assert";

export class TestStrings extends TestObject {
    constructor() {
        super("Algorithms/Strings/Strings");
        this.autoloadTests();
        this.startTests();
    }
    
    testToString() {
        Assert.Fail();
    }
    
    testEscapeString() {
        Assert.Fail();
    }
}