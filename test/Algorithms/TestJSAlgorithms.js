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
import {TestStrings} from "Algorithms/Strings/TestStrings";

import {TestArraysInterface} from "Algorithms/Arrays/TestArraysInterface";
import {TestBooleansInterface} from "Algorithms/Booleans/TestBooleansInterface";
import {TestDatesInterface} from "Algorithms/Dates/TestDatesInterface";
import {TestFunctionsInterface} from "Algorithms/Functions/TestFunctionsInterface";
import {TestLooperInterface} from "Algorithms/Looper/TestLooperInterface";
import {TestNumbersInterface} from "Algorithms/Numbers/TestNumbersInterface";
import {TestObjectsInterface} from "Algorithms/Objects/TestObjectsInterface";
import {TestStringsInterface} from "Algorithms/Strings/TestStringsInterface";

export class TestJSAlgorithms extends TestObject {
    constructor(jspyder) {
        super("Algorithms/JSAlgorithms");

        this.jspyder = jspyder;
        this.autoloadTests();
        this.startTests();

        new TestArrays();
        new TestBooleans();
        new TestDates();
        new TestFunctions();
        new TestLooper();
        new TestNumbers();
        new TestObjects();
        new TestStrings();

        new TestArraysInterface(this.jspyder);
        new TestBooleansInterface(this.jspyder);
        new TestDatesInterface(this.jspyder);
        new TestFunctionsInterface(this.jspyder);
        new TestLooperInterface(this.jspyder);
        new TestNumbersInterface(this.jspyder);
        new TestObjectsInterface(this.jspyder);
        new TestStringsInterface(this.jspyder);
    }

}
