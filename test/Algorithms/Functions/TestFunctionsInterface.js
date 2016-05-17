import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {FunctionsInterface} from "Algorithms/Functions/FunctionsInterface";

export class TestFunctionsInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Functions/FunctionsInterface");
        this.jspyder = jspyder;

        this.autoloadTests();
        this.startTests();
    }
    
    testUse() {
        Assert.Fail();
    }
    
    testRun() {
        Assert.Fail();
    }
    
    testBindFn() {
        Assert.Fail();
    }
}