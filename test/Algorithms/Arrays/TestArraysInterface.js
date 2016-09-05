import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {ArraysInterface} from "Algorithms/Arrays/ArraysInterface";

export class TestArraysInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Arrays/ArraysInterface");
        this.jspyder = jspyder;

        this.autoloadTests();
        this.startTests();
    }

    testArray() {
        var array = [];
        var object = {};
        var string = "";
        var number = 7;
        var boolean = true;

        Assert.Equal(array, this.jspyder.alg.array(array));
        Assert.NotEqual(object, this.jspyder.alg.array(object));
        Assert.Equal(0, this.jspyder.alg.array(object).length);
        Assert.Equal(number, this.jspyder.alg.array(object, number));
    }

    testJoinArray() {
        var array = [0];
        this.jspyder.alg.joinArray(array, [1], [2], [3], [4]);

        Assert.Equal(5, array.length, `Expected array length to be 5, received ${array.length}`);
        for (let i = 0; i < array.length; ++i) {
            Assert.Equal(i, array[i]);
        }
    }

    testSliceArray() {
        var array1 = [1, 2, 3, 4, 5, 6];
        var array2 = this.jspyder.alg.sliceArray(array1);
        var array3 = this.jspyder.alg.sliceArray(array1, 2);
        var array4 = this.jspyder.alg.sliceArray(array1, 2, 3);

        for (let i = 0; i < array1.length; ++i) {
            Assert.Equal(array1[i], array2[i], `Expected array1 and array2 to match: ${array1[i]} vs ${array2[i]}`);
        }

        for (let i = 2; i < array1.length; ++i) {
            Assert.Equal(array1[i], array3[i - 2], `Expected array1 and array3 to have matching elements: ${array1[i]} vs ${array3[i]}`);
        }
        
        for (let i = 2; i < 3; ++i) {
            Assert.Equal(array1[i], array3[i - 2], `Expected array1 and array3 to have matching elements: ${array1[i]} vs ${array4[i]}`);
        }
    }

    testSortArrayNum() {
        var array = [0,9,1,8,2,7,3,6,4,5];
        this.jspyder.alg.sortArrayNum(array);
        
        for(let i = 1; i < array.length; ++i) {
            Assert(array[i] >= array[i - 1]);
        }
        
        this.jspyder.alg.sortArrayNum(array, false);
        for(let i = 1; i < array.length; ++i) {
            Assert(array[i] <= array[i - 1]);
        }
    }

    testSortArrayObj() {
        var array = [
            { "foo": { "bar": { "baz": 0 } } },
            { "foo": { "bar": { "baz": 9 } } },
            { "foo": { "bar": { "baz": 2 } } },
            { "foo": { "bar": { "baz": 7 } } },
            { "foo": { "bar": { "baz": 4 } } },
            { "foo": { "bar": { "baz": 5 } } },
            { "foo": { "bar": { "baz": 6 } } },
            { "foo": { "bar": { "baz": 3 } } },
            { "foo": { "bar": { "baz": 8 } } },
            { "foo": { "bar": { "baz": 1 } } },
        ];
        
        this.jspyder.alg.sortArrayObj(array, true, "foo", "bar", "baz");
        for(let i = 1; i < array.length; ++i) {
            Assert(array[i]["foo"]["bar"]["baz"] >= array[i - 1]["foo"]["bar"]["baz"]);
        }
        
        this.jspyder.alg.sortArrayObj(array, false, "foo", "bar", "baz");
        for(let i = 1; i < array.length; ++i) {
            Assert(array[i]["foo"]["bar"]["baz"] <= array[i - 1]["foo"]["bar"]["baz"]);
        }
    }
}