import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {DatesInterface} from "Algorithms/Dates/DatesInterface";

export class TestDatesInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Dates/DatesInterface");
        this.jspyder = jspyder;

        this.autoloadTests();
        this.startTests();
    }
    
    testDate() {
        Assert.Fail();
    }
}