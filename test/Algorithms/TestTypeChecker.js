import {TestObject} from "TestObject";
import {TypeChecker} from "Algorithms/TypeChecker";

import {Assert} from "Assert";

export class TestTypeChecker extends TestObject {
    constructor() {
        super();
        
        this.addTest("Algorithms/TypeChecker/Boolean", this.testBoolean);
        this.addTest("Algorithms/TypeChecker/Number", this.testNumber);
        
        this.startTests();
    }
    
    testBoolean() {
        Assert.Equal(false, TypeChecker.Boolean(null), "false:null");
        Assert.Equal(false, TypeChecker.Boolean(false), "false:false");
        Assert.Equal(true, TypeChecker.Boolean(true), "true:true");
        Assert.Equal(true, TypeChecker.Boolean("true"), "true:'true'");
        Assert.Equal(true, TypeChecker.Boolean("TRUE"), "true:'TRUE'");
        Assert.Equal(false, TypeChecker.Boolean("false"), "false:'false'");
        Assert.Equal(false, TypeChecker.Boolean("FALSE"), "false:'FALSE'");
        Assert.Equal(false, TypeChecker.Boolean("failed"));
        Assert.Equal(true, TypeChecker.Boolean("failed", true), "true:'failed':true");
        Assert.Equal("banana", TypeChecker.Boolean("failed", "banana"), "'banana':'failed':'banana");
    }
    
    testNumber() {
        Assert.Equal(1, TypeChecker.Number(1), "1:1");
        Assert.Equal(1, TypeChecker.Number("1"), "1:'1'");
        Assert.Equal(0, TypeChecker.Number(null), "0:null");
        Assert.Equal(1, TypeChecker.Number("1", 2), "1:'1':2");
        Assert.Equal(2, TypeChecker.Number(null, 2), "2:null:2");
        Assert.Equal(2, TypeChecker.Number(NaN, 2), "2:NaN:2");
        Assert.Equal("banana", TypeChecker.Number(null, "banana"), "'banana':null:'banana'");
        Assert.Equal(1, TypeChecker.Number(true), "Boolean True");
        Assert.Equal(0, TypeChecker.Number(false), "Boolean False");
    }
}