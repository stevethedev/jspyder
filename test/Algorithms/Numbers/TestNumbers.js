import {TestObject} from "TestObject";
import {Numbers} from "Algorithms/Numbers/Numbers";

import {Assert} from "Assert";

export class TestNumbers extends TestObject {
    constructor() {
        super("Algorithms/Numbers/Numbers");
        this.autoloadTests();
        this.startTests();
    }
    
    testToNumber() {
        Assert.Equal(1, Numbers.ToNumber(1), "1:1");
        Assert.Equal(1, Numbers.ToNumber("1"), "1:'1'");
        Assert.Equal(0, Numbers.ToNumber(null), "0:null");
        Assert.Equal(1, Numbers.ToNumber("1", 2), "1:'1':2");
        Assert.Equal(2, Numbers.ToNumber(null, 2), "2:null:2");
        Assert.Equal(2, Numbers.ToNumber(NaN, 2), "2:NaN:2");
        Assert.Equal("banana", Numbers.ToNumber(null, "banana"), "'banana':null:'banana'");
        Assert.Equal(1, Numbers.ToNumber(true), "Boolean True");
        Assert.Equal(0, Numbers.ToNumber(false), "Boolean False");
    }
    
    testMagnitude() {
        Assert.Fail();
    }
}