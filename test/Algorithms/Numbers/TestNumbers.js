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
        // Decimal
        Assert.Equal(10, Numbers.Magnitude(1));
        Assert.Equal(10, Numbers.Magnitude(5));
        Assert.Equal(10, Numbers.Magnitude(10));
        
        // Binary
        Assert.Equal(2, Numbers.Magnitude(1, 2));
        Assert.Equal(2, Numbers.Magnitude(2, 2));
        Assert.Equal(4, Numbers.Magnitude(3, 2));
        
        // Octal
        Assert.Equal(8, Numbers.Magnitude(1, 8));
        Assert.Equal(8, Numbers.Magnitude(4, 8));
        Assert.Equal(8, Numbers.Magnitude(8, 8));
        Assert.Equal(16, Numbers.Magnitude(9, 8));
        
        // Hexadecimal
        Assert.Equal(0x10, Numbers.Magnitude(9, 16));
        Assert.Equal(0x10, Numbers.Magnitude(15, 16));
        Assert.Equal(0x20, Numbers.Magnitude(17, 16));
        Assert.Equal(0xb0, Numbers.Magnitude(161, 16));
    }
}