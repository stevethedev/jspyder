import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {StringsInterface} from "Algorithms/Strings/StringsInterface";

export class TestStringsInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Strings/StringsInterface");
        this.jspyder = jspyder;
        this.autoloadTests();
        this.startTests();
    }
    
    testString() {
        Assert.Fail();
    }

    testEscapeString() {
        Assert.Fail();
    }
}