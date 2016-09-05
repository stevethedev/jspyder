import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {NumbersInterface} from "Algorithms/Numbers/NumbersInterface";

const PI = (n) => Math.PI*n;

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
        var args = [9,0,8,1,7,2,6,3,5,4];
        Assert.Equal(0, this.jspyder.alg.min(...args));
    }
    
    testMax() {
        var args = [9,0,8,1,7,2,6,3,5,4];
        Assert.Equal(9, this.jspyder.alg.max(...args));
    }
    
    testByte() {
        Assert.Equal(-128, this.jspyder.alg.byte(128));
        Assert.Equal(+127, this.jspyder.alg.byte(127));
        Assert.Equal(  -1, this.jspyder.alg.byte(255));
        Assert.Equal(   0, this.jspyder.alg.byte(256));
        Assert.Equal(   0, this.jspyder.alg.byte(  0));
    }
    
    testUByte() {
        Assert.Equal(+128, this.jspyder.alg.ubyte(128));
        Assert.Equal(+127, this.jspyder.alg.ubyte(127));
        Assert.Equal(+255, this.jspyder.alg.ubyte(255));
        Assert.Equal(   0, this.jspyder.alg.ubyte(256));
        Assert.Equal(   0, this.jspyder.alg.ubyte(  0));
    }
    
    testShort() {
        Assert.Equal(-32768, this.jspyder.alg.short(32768));
        Assert.Equal(+32767, this.jspyder.alg.short(32767));
        Assert.Equal(    -1, this.jspyder.alg.short(65535));
        Assert.Equal(     0, this.jspyder.alg.short(65536));
        Assert.Equal(     0, this.jspyder.alg.short(    0));
    }
    
    testUShort() {
        Assert.Equal(+32768, this.jspyder.alg.ushort(32768));
        Assert.Equal(+32767, this.jspyder.alg.ushort(32767));
        Assert.Equal(+65535, this.jspyder.alg.ushort(65535));
        Assert.Equal(     0, this.jspyder.alg.ushort(65536));
        Assert.Equal(     0, this.jspyder.alg.ushort(    0));
    }
    
    testInt() {
        Assert.Equal(-0x80000000, this.jspyder.alg.int(0x80000000));
        Assert.Equal(+0x7FFFFFFF, this.jspyder.alg.int(0x7FFFFFFF));
        Assert.Equal(         -1, this.jspyder.alg.int(0xFFFFFFFF));
        Assert.Equal(          0, this.jspyder.alg.int(0x100000000));
        Assert.Equal(          0, this.jspyder.alg.int(       0x0));
    }
    
    testUInt() {
        Assert.Equal(+0x80000000, this.jspyder.alg.uint(0x80000000));
        Assert.Equal(+0x7FFFFFFF, this.jspyder.alg.uint(0x7FFFFFFF));
        Assert.Equal(+0xFFFFFFFF, this.jspyder.alg.uint(0xFFFFFFFF));
        Assert.Equal(          0, this.jspyder.alg.uint(0x100000000));
        Assert.Equal(          0, this.jspyder.alg.uint(       0x0));
    }
    
    testFloat() {
        Assert.Equal(.21212122, this.jspyder.alg.float(.212121212));
    }
    
    testDouble() {
        Assert.Equal(.212121212, this.jspyder.alg.double(.212121212));
    }
    
    testMakeEnum() {
        var keys = ["A","B","C","D","E","F"];
        var n = 1;
        var object = {};
        
        this.jspyder.alg.makeEnum(keys, object);
        
        for(let i = 0, li = keys.length; i < li; ++i) {
            Assert.Equal(n, object[keys[i]]);
            n <<= 1;
        }
    }
    
    testRad2Deg() {
        // Rounding is done in this test to compensate for hardware rounding errors.
        // Numbers.RadiansToDegrees(PI(1/6)) returns 29.999999999999996, expects 30
        const PI_7_6 = 3.6651914291880923; //< Precision is greater than 7*PI/6
        Assert.Equal(  0, Math.round(this.jspyder.alg.rad2deg(PI(0/1))),    "0&pi; Radians");
        Assert.Equal( 30, Math.round(this.jspyder.alg.rad2deg(PI(1/6))),  "1&pi;/6 Radians");
        Assert.Equal( 45, Math.round(this.jspyder.alg.rad2deg(PI(1/4))),  "1&pi;/4 Radians");
        Assert.Equal( 60, Math.round(this.jspyder.alg.rad2deg(PI(1/3))),  "1&pi;/3 Radians");
        Assert.Equal( 90, Math.round(this.jspyder.alg.rad2deg(PI(1/2))),  "1&pi;/2 Radians");
        Assert.Equal(120, Math.round(this.jspyder.alg.rad2deg(PI(2/3))),  "2&pi;/3 Radians");
        Assert.Equal(135, Math.round(this.jspyder.alg.rad2deg(PI(3/4))),  "3&pi;/4 Radians");
        Assert.Equal(150, Math.round(this.jspyder.alg.rad2deg(PI(5/6))),  "5&pi;/6 Radians");
        Assert.Equal(180, Math.round(this.jspyder.alg.rad2deg(PI(1/1))),  "1&pi;/1 Radians");
        Assert.Equal(210, Math.round(this.jspyder.alg.rad2deg(PI_7_6)),   "7&pi;/6 Radians");
        Assert.Equal(225, Math.round(this.jspyder.alg.rad2deg(PI(5/4))),  "5&pi;/4 Radians");
        Assert.Equal(240, Math.round(this.jspyder.alg.rad2deg(PI(4/3))),  "4&pi;/3 Radians");
        Assert.Equal(270, Math.round(this.jspyder.alg.rad2deg(PI(3/2))),  "3&pi;/2 Radians");
        Assert.Equal(300, Math.round(this.jspyder.alg.rad2deg(PI(5/3))),  "5&pi;/3 Radians");
        Assert.Equal(315, Math.round(this.jspyder.alg.rad2deg(PI(7/4))),  "7&pi;/4 Radians");
        Assert.Equal(330, Math.round(this.jspyder.alg.rad2deg(PI(11/6))), "1&pi;/6 Radians");
        Assert.Equal(360, Math.round(this.jspyder.alg.rad2deg(PI(2/1))),  "2&pi;/1 Radians");
    }
    
    testDeg2Rad() {
        const PI_7_6 = 3.6651914291880923; //< Precision is greater than 7*PI/6
        Assert.Equal(PI(0/1),  this.jspyder.alg.deg2rad(  0),   "0 Degrees");
        Assert.Equal(PI(1/6),  this.jspyder.alg.deg2rad( 30),  "30 Degrees");
        Assert.Equal(PI(1/4),  this.jspyder.alg.deg2rad( 45),  "45 Degrees");
        Assert.Equal(PI(1/3),  this.jspyder.alg.deg2rad( 60),  "60 Degrees");
        Assert.Equal(PI(1/2),  this.jspyder.alg.deg2rad( 90),  "90 Degrees");
        Assert.Equal(PI(2/3),  this.jspyder.alg.deg2rad(120), "120 Degrees");
        Assert.Equal(PI(3/4),  this.jspyder.alg.deg2rad(135), "135 Degrees");
        Assert.Equal(PI(5/6),  this.jspyder.alg.deg2rad(150), "150 Degrees");
        Assert.Equal(PI(1/1),  this.jspyder.alg.deg2rad(180), "180 Degrees");
        Assert.Equal(PI_7_6,   this.jspyder.alg.deg2rad(210), "210 Degrees");
        Assert.Equal(PI(5/4),  this.jspyder.alg.deg2rad(225), "225 Degrees");
        Assert.Equal(PI(4/3),  this.jspyder.alg.deg2rad(240), "240 Degrees");
        Assert.Equal(PI(3/2),  this.jspyder.alg.deg2rad(270), "270 Degrees");
        Assert.Equal(PI(5/3),  this.jspyder.alg.deg2rad(300), "300 Degrees");
        Assert.Equal(PI(7/4),  this.jspyder.alg.deg2rad(315), "315 Degrees");
        Assert.Equal(PI(11/6), this.jspyder.alg.deg2rad(330), "330 Degrees");
        Assert.Equal(PI(2/1),  this.jspyder.alg.deg2rad(360), "360 Degrees");
    }
}