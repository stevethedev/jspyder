import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {ObjectsInterface} from "Algorithms/Objects/ObjectsInterface";

export class TestObjectsInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Objects/ObjectsInterface");
        this.jspyder = jspyder;
        this.autoloadTests();
        this.startTests();
    }
    
    testObject() {
        Assert.Fail();
    }
    
    testMergeObj() {
        Assert.Fail();
    }
    
    testCloneObj() {
        Assert.Fail();
    }
    
    testDeepCloneObj() {
        Assert.Fail();
    }
    
    testProperty() {
        Assert.Fail();
    }
}