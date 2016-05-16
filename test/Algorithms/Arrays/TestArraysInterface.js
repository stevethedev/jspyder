import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {ArraysInterface} from "Algorithms/Arrays/ArraysInterface";

export class TestArraysInterface extends TestObject {
    constructor(jspyder) {
        super();
        this.jspyder = jspyder;

        this.addTest("Algorithms/ArraysInterface.array", this.testArray);
        this.addTest("Algorithms/ArraysInterface.sliceArray", this.testSliceArray);
        this.addTest("Algorithms/ArraysInterface.joinArray", this.testJoinArray);
        this.addTest("Algorithms/ArraysInterface.sortArrayObj", this.testSortArrayObj);
        this.addTest("Algorithms/ArraysInterface.sortArrayNum", this.testSortArrayNum);

        this.startTests();
    }

    testArray() {
        Assert.Fail();
    }

    testJoinArray() {
        Assert.Fail();
    }

    testSliceArray() {
        Assert.Fail();
    }

    testSortArrayNum() {
        Assert.Fail();
    }

    testSortArrayObj() {
        Assert.Fail();
    }
}