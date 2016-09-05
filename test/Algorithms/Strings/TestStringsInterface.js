import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {StringsInterface} from "Algorithms/Strings/StringsInterface";

export class TestStringsInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Strings/StringsInterface");
        this.jspyder = jspyder;
        this.autoloadTests();
        this.startTests();
    }
    
    testString() {
        var object = { toString: function() { return "test" } };
        Assert.Equal("test", this.jspyder.alg.string(object), "String Conversion");
        Assert.Equal(object.toString(), this.jspyder.alg.string(object), "Object Conversion with toString");
        Assert.Equal("", this.jspyder.alg.string(null), "Null to blank string");
        Assert.Equal("0", this.jspyder.alg.string(0), "Zero");
        Assert.Equal("1", this.jspyder.alg.string(1), "One");
        Assert.Equal("true", this.jspyder.alg.string(true), "True");
        Assert.Equal("false", this.jspyder.alg.string(false), "False");
        Assert.Equal(false, this.jspyder.alg.string(null, false), "Null,False");
    }

    testEscapeString() {
        Assert.Equal("\\-\\*\\+\\?\\.\\\\\\^\\$\\|", this.jspyder.alg.escapeString("-*+?.\\^$|"));
        Assert.Equal("\\[\\]", this.jspyder.alg.escapeString("[]"));
        Assert.Equal("\\{\\}", this.jspyder.alg.escapeString("{}"));
        Assert.Equal("\\(\\)", this.jspyder.alg.escapeString("()"));
    }
}