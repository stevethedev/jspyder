import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {Arrays} from "Algorithms/Arrays/Arrays";

export class TestArrays extends TestObject {
    constructor() {
        super("Algorithms/Arrays/Arrays");

        this.autoloadTests();
        this.startTests();
    }

    testSlice() {
        var array = [0, 1, 2, 3, 4];

        // Ensure that our slice gives the correct length
        Assert.Equal(array.length, Arrays.Slice(array).length);

        // Check that parameters work
        Assert.Equal(array.slice(1, 2).length, Arrays.Slice(array, 1, 2).length);

        // Ensure that params return the same values
        Assert.Equal(array.slice(1, 2)[0], Arrays.Slice(array, 1, 2)[0]);

        // Ensure that weird objects return return a void array
        Assert.Equal(0, Arrays.Slice(null).length);

        return 1;
    }

    testSortArrayNumbers() {
        var array = [0, 1, 9, 2, 8, 3, 7, 4, 6, 5];
        Arrays.SortArrayNumbers(array, true);

        for (let i = 1; i < array.length; ++i) {
            Assert(array[i] >= array[i - 1]);
        }

        Arrays.SortArrayNumbers(array, false);
        for (let i = 1; i < array.length; ++i) {
            Assert(array[i] <= array[i - 1]);
        }
        
        return 1;
    }

    testSortArrayObjects() {
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

        Arrays.SortArrayObjects(array, true, "foo", "bar", "baz");
        for(let i = 1; i < array.length; ++i) {
            Assert(array[i]["foo"]["bar"]["baz"] >= array[i - 1]["foo"]["bar"]["baz"], `Ascending Sort is in the wrong order at index ${i-1}: ${array[i].foo.bar.baz} >= ${array[i-1].foo.bar.baz}`);
        }

        Arrays.SortArrayObjects(array, false, "foo", "bar", "baz");
        for(let i = 1; i < array.length; ++i) {
            Assert(array[i]["foo"]["bar"]["baz"] <= array[i - 1]["foo"]["bar"]["baz"], `Descending Sort is in the wrong order at index ${i-1}: ${array[i].foo.bar.baz} <= ${array[i-1].foo.bar.baz}`);
        }
    }

    testWidePush() {
        var array1 = [];
        for(let i = 0; i < 2E5; ++i) {
            array1.push(i);
        }
        
        var array2 = [];
        Arrays.WidePush(array2, array1);
        
        for(let i = 0; i < array1.length; ++i) {
            Assert.Equal(array1[i], array2[i]);
        }
    }

    testToArray() {
        var array = [];
        Assert.Equal(array, Arrays.ToArray(array, false));
        Assert.Equal(false, Arrays.ToArray({}, false));
    }
}
