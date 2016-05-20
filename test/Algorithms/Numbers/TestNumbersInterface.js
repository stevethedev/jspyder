import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {NumbersInterface} from "Algorithms/Numbers/NumbersInterface";

export class TestNumbersInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Numbers/NumbersInterface");
        this.jspyder = jspyder;
        this.autoloadTests();
        this.startTests();
    }
    
    testMagnitude() {
        // Decimal
        Assert.Equal(10, this.jspyder.alg.magnitude(1));
        Assert.Equal(10, this.jspyder.alg.magnitude(5));
        Assert.Equal(10, this.jspyder.alg.magnitude(10));
        
        // Binary
        Assert.Equal(2, this.jspyder.alg.magnitude(1, 2));
        Assert.Equal(2, this.jspyder.alg.magnitude(2, 2));
        Assert.Equal(4, this.jspyder.alg.magnitude(3, 2));
        
        // Octal
        Assert.Equal(8, this.jspyder.alg.magnitude(1, 8));
        Assert.Equal(8, this.jspyder.alg.magnitude(4, 8));
        Assert.Equal(8, this.jspyder.alg.magnitude(8, 8));
        Assert.Equal(16, this.jspyder.alg.magnitude(9, 8));
        
        // Hexadecimal
        Assert.Equal(0x10, this.jspyder.alg.magnitude(9, 16));
        Assert.Equal(0x10, this.jspyder.alg.magnitude(15, 16));
        Assert.Equal(0x20, this.jspyder.alg.magnitude(17, 16));
        Assert.Equal(0xb0, this.jspyder.alg.magnitude(161, 16));
    }
    
    testNumber() {
        Assert.Equal(1, this.jspyder.alg.number(1), "1:1");
        Assert.Equal(1, this.jspyder.alg.number("1"), "1:'1'");
        Assert.Equal(0, this.jspyder.alg.number(null), "0:null");
        Assert.Equal(1, this.jspyder.alg.number("1", 2), "1:'1':2");
        Assert.Equal(2, this.jspyder.alg.number(null, 2), "2:null:2");
        Assert.Equal(2, this.jspyder.alg.number(NaN, 2), "2:NaN:2");
        Assert.Equal("banana", this.jspyder.alg.number(null, "banana"), "'banana':null:'banana'");
        Assert.Equal(1, this.jspyder.alg.number(true), "Boolean True");
        Assert.Equal(0, this.jspyder.alg.number(false), "Boolean False");
    }
    
    testMin() {
        Assert.Fail();
    }
    
    testMax() {
        Assert.Fail();
    }
    
    testByte() {
        Assert.Fail();
    }
    
    testUByte() {
        Assert.Fail();
    }
    
    testShort() {
        Assert.Fail();
    }
    
    testUShort() {
        Assert.Fail();
    }
    
    testInt() {
        Assert.Fail();
    }
    
    testUInt() {
        Assert.Fail();
    }
    
    testFloat() {
        Assert.Fail();
    }
    
    testDouble() {
        Assert.Fail();
    }
    
    testMakeEnum() {
        Assert.Fail();
    }
    
    testRad2Deg() {
        Assert.Fail();
    }
    
    testDeg2Rad() {
        Assert.Fail();
    }
}