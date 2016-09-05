import {TestObject} from "TestObject";
import {Numbers} from "Algorithms/Numbers/Numbers";

import {Assert} from "Assert";

const PI = (n) => Math.PI*n;

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
    
    testToInt8() {
        Assert.Equal(-128, Numbers.ToInt8(128));
        Assert.Equal(+127, Numbers.ToInt8(127));
        Assert.Equal(  -1, Numbers.ToInt8(255));
        Assert.Equal(   0, Numbers.ToInt8(256));
        Assert.Equal(   0, Numbers.ToInt8(  0));
    }
    
    testToUInt8() {
        Assert.Equal(+128, Numbers.ToUInt8(128));
        Assert.Equal(+127, Numbers.ToUInt8(127));
        Assert.Equal(+255, Numbers.ToUInt8(255));
        Assert.Equal(   0, Numbers.ToUInt8(256));
        Assert.Equal(   0, Numbers.ToUInt8(  0));
    }
    
    testToInt16() {
        Assert.Equal(-32768, Numbers.ToInt16(32768));
        Assert.Equal(+32767, Numbers.ToInt16(32767));
        Assert.Equal(    -1, Numbers.ToInt16(65535));
        Assert.Equal(     0, Numbers.ToInt16(65536));
        Assert.Equal(     0, Numbers.ToInt16(    0));
    }
    
    testToUInt16() {
        Assert.Equal(+32768, Numbers.ToUInt16(32768));
        Assert.Equal(+32767, Numbers.ToUInt16(32767));
        Assert.Equal(+65535, Numbers.ToUInt16(65535));
        Assert.Equal(     0, Numbers.ToUInt16(65536));
        Assert.Equal(     0, Numbers.ToUInt16(    0));
    }
    
    testToInt32() {
        Assert.Equal(-0x80000000, Numbers.ToInt32(0x80000000));
        Assert.Equal(+0x7FFFFFFF, Numbers.ToInt32(0x7FFFFFFF));
        Assert.Equal(         -1, Numbers.ToInt32(0xFFFFFFFF));
        Assert.Equal(          0, Numbers.ToInt32(0x100000000));
        Assert.Equal(          0, Numbers.ToInt32(       0x0));
    }
    
    testToUInt32() {
        Assert.Equal(+0x80000000, Numbers.ToUInt32(0x80000000));
        Assert.Equal(+0x7FFFFFFF, Numbers.ToUInt32(0x7FFFFFFF));
        Assert.Equal(+0xFFFFFFFF, Numbers.ToUInt32(0xFFFFFFFF));
        Assert.Equal(          0, Numbers.ToUInt32(0x100000000));
        Assert.Equal(          0, Numbers.ToUInt32(       0x0));
    }
    
    testToFloat() {
        Assert.Equal(.21212122, Numbers.ToFloat(.212121212));
    }
    
    testToDouble() {
        Assert.Equal(.212121212, Numbers.ToDouble(.212121212));
    }
    
    testMinimum() {
        const array = [9,0,8,1,7,2,6,3,5,4];
        Assert.Equal(0, Numbers.Minimum(...array));
    }
    
    testMaximum() {
        const array = [9,0,8,1,7,2,6,3,5,4];
        Assert.Equal(9, Numbers.Maximum(...array));
    }
    
    testDegreesToRadians() {
        const PI_7_6 = 3.6651914291880923; //< Precision is greater than 7*PI/6
        Assert.Equal(PI(0/1),  Numbers.DegreesToRadians(  0),   "0 Degrees");
        Assert.Equal(PI(1/6),  Numbers.DegreesToRadians( 30),  "30 Degrees");
        Assert.Equal(PI(1/4),  Numbers.DegreesToRadians( 45),  "45 Degrees");
        Assert.Equal(PI(1/3),  Numbers.DegreesToRadians( 60),  "60 Degrees");
        Assert.Equal(PI(1/2),  Numbers.DegreesToRadians( 90),  "90 Degrees");
        Assert.Equal(PI(2/3),  Numbers.DegreesToRadians(120), "120 Degrees");
        Assert.Equal(PI(3/4),  Numbers.DegreesToRadians(135), "135 Degrees");
        Assert.Equal(PI(5/6),  Numbers.DegreesToRadians(150), "150 Degrees");
        Assert.Equal(PI(1/1),  Numbers.DegreesToRadians(180), "180 Degrees");
        Assert.Equal(PI_7_6,   Numbers.DegreesToRadians(210), "210 Degrees");
        Assert.Equal(PI(5/4),  Numbers.DegreesToRadians(225), "225 Degrees");
        Assert.Equal(PI(4/3),  Numbers.DegreesToRadians(240), "240 Degrees");
        Assert.Equal(PI(3/2),  Numbers.DegreesToRadians(270), "270 Degrees");
        Assert.Equal(PI(5/3),  Numbers.DegreesToRadians(300), "300 Degrees");
        Assert.Equal(PI(7/4),  Numbers.DegreesToRadians(315), "315 Degrees");
        Assert.Equal(PI(11/6), Numbers.DegreesToRadians(330), "330 Degrees");
        Assert.Equal(PI(2/1),  Numbers.DegreesToRadians(360), "360 Degrees");
    }
    
    testRadiansToDegrees() {
        // Rounding is done in this test to compensate for hardware rounding errors.
        // Numbers.RadiansToDegrees(PI(1/6)) returns 29.999999999999996, expects 30
        const PI_7_6 = 3.6651914291880923; //< Precision is greater than 7*PI/6
        Assert.Equal(  0, Math.round(Numbers.RadiansToDegrees(PI(0/1))),    "0&pi; Radians");
        Assert.Equal( 30, Math.round(Numbers.RadiansToDegrees(PI(1/6))),  "1&pi;/6 Radians");
        Assert.Equal( 45, Math.round(Numbers.RadiansToDegrees(PI(1/4))),  "1&pi;/4 Radians");
        Assert.Equal( 60, Math.round(Numbers.RadiansToDegrees(PI(1/3))),  "1&pi;/3 Radians");
        Assert.Equal( 90, Math.round(Numbers.RadiansToDegrees(PI(1/2))),  "1&pi;/2 Radians");
        Assert.Equal(120, Math.round(Numbers.RadiansToDegrees(PI(2/3))),  "2&pi;/3 Radians");
        Assert.Equal(135, Math.round(Numbers.RadiansToDegrees(PI(3/4))),  "3&pi;/4 Radians");
        Assert.Equal(150, Math.round(Numbers.RadiansToDegrees(PI(5/6))),  "5&pi;/6 Radians");
        Assert.Equal(180, Math.round(Numbers.RadiansToDegrees(PI(1/1))),  "1&pi;/1 Radians");
        Assert.Equal(210, Math.round(Numbers.RadiansToDegrees(PI_7_6)),   "7&pi;/6 Radians");
        Assert.Equal(225, Math.round(Numbers.RadiansToDegrees(PI(5/4))),  "5&pi;/4 Radians");
        Assert.Equal(240, Math.round(Numbers.RadiansToDegrees(PI(4/3))),  "4&pi;/3 Radians");
        Assert.Equal(270, Math.round(Numbers.RadiansToDegrees(PI(3/2))),  "3&pi;/2 Radians");
        Assert.Equal(300, Math.round(Numbers.RadiansToDegrees(PI(5/3))),  "5&pi;/3 Radians");
        Assert.Equal(315, Math.round(Numbers.RadiansToDegrees(PI(7/4))),  "7&pi;/4 Radians");
        Assert.Equal(330, Math.round(Numbers.RadiansToDegrees(PI(11/6))), "1&pi;/6 Radians");
        Assert.Equal(360, Math.round(Numbers.RadiansToDegrees(PI(2/1))),  "2&pi;/1 Radians");
    }
    
    testMakeEnumeratedObject() {
        var keys = ["A","B","C","D","E","F"];
        var n = 1;
        var object = {};
        
        Numbers.MakeEnumeratedObject(keys, object);
        
        for(let i = 0, li = keys.length; i < li; ++i) {
            Assert.Equal(n, object[keys[i]]);
            n <<= 1;
        }
    }
}