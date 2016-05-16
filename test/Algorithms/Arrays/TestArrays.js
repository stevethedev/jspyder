import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {Arrays} from "Algorithms/Arrays/Arrays";

export class TestArrays extends TestObject {
    constructor() {
        super();

        this.addTest("Algorithms/Arrays/Slice", this.testSlice);
        this.addTest("Algorithms/Arrays/SortArrayNumbers", this.testSortArrayNumbers);
        this.addTest("Algorithms/Arrays/SortArrayObjects", this.testSortArrayObjects);
        this.addTest("Algorithms/Arrays/WidePush", this.testWidePush);
        this.addTest("Algorithms/Arrays/ToArray", this.testToArray);

        return this.startTests();
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
        Assert.Fail();
    }

    testSortArrayObjects() {
        Assert.Fail();
    }

    testWidePush() {
        Assert.Fail();
    }

    testToArray() {
        Assert.Fail();
    }
}
