import {TestObject} from "TestObject";
import {Dates} from "Algorithms/Dates/Dates";

import {Assert} from "Assert";

export class TestDates extends TestObject {
    constructor() {
        super("Algorithms/Dates/Dates");

        this.autoloadTests();
        this.startTests();
    }
}