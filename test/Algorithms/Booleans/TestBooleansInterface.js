import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {BooleansInterface} from "Algorithms/Booleans/BooleansInterface";

export class TestBooleansInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Booleans/BooleansInterface");
        this.jspyder = jspyder;

        this.autoloadTests();
        this.startTests();
    }

    testBool() {
        Assert.Equal(true, this.jspyder.alg.bool(true));
        Assert.Equal(false, this.jspyder.alg.bool(false));
        Assert.Equal(false, this.jspyder.alg.bool(null));
        Assert.Equal(true, this.jspyder.alg.bool(null, true));

        Assert.Equal(true, this.jspyder.alg.bool("true"));
        Assert.Equal(true, this.jspyder.alg.bool("TRUE"));
        Assert.Equal(true, this.jspyder.alg.bool("TrUe"));
        Assert.Equal(null, this.jspyder.alg.bool("----", null));

        Assert.Equal(true, this.jspyder.alg.bool(7, null));
        Assert.Equal(false, this.jspyder.alg.bool(0, null));
    }
}