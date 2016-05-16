import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {JSAlgorithms} from "Algorithms/JSAlgorithms";

import {TestArrays} from "Algorithms/Arrays/TestArrays";
import {TestBooleans} from "Algorithms/Booleans/TestBooleans";
import {TestDates} from "Algorithms/Dates/TestDates";
import {TestFunctions} from "Algorithms/Functions/TestFunctions";
import {TestLooper} from "Algorithms/Looper/TestLooper";
import {TestNumbers} from "Algorithms/Numbers/TestNumbers";
import {TestObjects} from "Algorithms/Objects/TestObjects";
import {TestStrinsg} from "Algorithms/Strings/TestStrings";

export class TestJSAlgorithms extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;

        super();

        this.addTest("Algorithms/JSAlgorithms.arrEach", this.testArrEach);
        this.addTest("Algorithms/JSAlgorithms.each", this.testEach);
        this.addTest("Algorithms", this.testAlgorithms);

        this.log("Algorithm Tests");
        this.logIndent(1);
        this.startTests();
        this.logIndent(-1);
    }

    testAlgorithms() {
        this.logIndent(1);
        new TestArrays();
        new TestBooleans();
        new TestFunctions();
        new TestLooper();
        new TestNumbers();
        this.logIndent(-1);
    }
}
