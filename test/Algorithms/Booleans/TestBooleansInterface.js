import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {BooleansInterface} from "Algorithms/Booleans/BooleansInterface";

export class TestBooleansInterface extends TestObject {
    constructor(jspyder) {
        super();
        this.jspyder = jspyder;

        this.addTest("Algorithms/BooleansInterface.bool", this.testBool);

        this.startTests();
    }

    testBool() {
        Assert.Fail();
    }
}