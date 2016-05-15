import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {Looper} from "Algorithms/Looper";

export class TestLooper extends TestObject {
    constructor() {
        super();
        
        this.addTest("Algorithms/Looper/ObjectEach", this.testObjectEach);
        this.addTest("Algorithms/Looper/ArrayEach", this.testArrayEach);
        this.addTest("Algorithms/Looper/Iterate", this.testIterate);
        
        this.startTests();
    }
    
    testObjectEach() {
        var object = ["0", "1", "2", "3", "4", "5"];
        Looper.ObjectEach(object, function(value, key, obj) {
            Assert.Equal(object, obj);
            Assert.Equal(obj[key], value);
            Assert.Equal(object[key], value);
        });
    }
    
    testArrayEach() {
        var array = [0,1,2,3,4,5];
        var i = 0;
        
        Looper.ArrayEach(array, function(value, index, arr) {
            Assert.Equal(array, arr);
            Assert.Equal(value, arr[index]);
            Assert.Equal(array[i], arr[index]);
            Assert.Equal(value, index);
            i += 1;
        });
        Assert.Equal(array.length, i);
        
        i = 0;
        Looper.ArrayEach(array, function(value, index) {
            this.drop();
            i = index;
        });
        
        Assert.Equal(0, array.length);
        Assert.Equal(0, i);
        
        return true;
    }
    
    testIterate() {
        var i = 0;
        var data1 = {};
        var data2 = {};
        
        // Iterate Upward
        Looper.Iterate(0, 5, function(index, d1, d2) {
            Assert.Equal(i++, index);
        }, data1, data2);
        
        Assert.Equal(5, i);
        
        // Iterate Downward
        i = 5;
        Looper.Iterate(5, 0, function(index) {
            Assert.Equal(i--, index);
        });
        Assert.Equal(0, i);
        
        return true;
    }
}