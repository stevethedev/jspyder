import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {DatesInterface} from "Algorithms/Dates/DatesInterface";

export class TestDatesInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Dates/DatesInterface");
        this.jspyder = jspyder;

        this.autoloadTests();
        this.startTests();
    }

    testDate() {
        var dateInterface = new DatesInterface();
        var baseDate = new Date();

        Assert.Equal(baseDate, dateInterface.date("", baseDate), "Blank String");
        Assert.NotEqual(baseDate, dateInterface.date(-1, baseDate), "Negative Number");
        Assert.Equal(baseDate, dateInterface.date("a098a4a", baseDate), "Garbage String");
        Assert.NotNull(dateInterface.date("1 January 2015", null), "1 January 2015");
        Assert.NotNull(dateInterface.date(0, null), "Valid Number");
        Assert.Equal(baseDate, dateInterface.date(baseDate, null), "Valid Number");
    }
}