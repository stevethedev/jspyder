import {TestObject} from "TestObject";
import {Booleans} from "Algorithms/Booleans/Booleans";

import {Assert} from "Assert";

export class TestBooleans extends TestObject {
    constructor() {
        super("Algorithms/Booleans/Booleans");

        this.autoloadTests();
        this.startTests();
    }

    testToBoolean() {
        Assert.Equal(false, Booleans.ToBoolean(null), "false:null");
        Assert.Equal(false, Booleans.ToBoolean(false), "false:false");
        Assert.Equal(true, Booleans.ToBoolean(true), "true:true");
        Assert.Equal(true, Booleans.ToBoolean("true"), "true:'true'");
        Assert.Equal(true, Booleans.ToBoolean("TRUE"), "true:'TRUE'");
        Assert.Equal(false, Booleans.ToBoolean("false"), "false:'false'");
        Assert.Equal(false, Booleans.ToBoolean("FALSE"), "false:'FALSE'");
        Assert.Equal(false, Booleans.ToBoolean("failed"));
        Assert.Equal(true, Booleans.ToBoolean("failed", true), "true:'failed':true");
        Assert.Equal("banana", Booleans.ToBoolean("failed", "banana"), "'banana':'failed':'banana");
    }
}