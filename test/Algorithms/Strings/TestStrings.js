import {TestObject} from "TestObject";
import {Strings} from "Algorithms/Strings/Strings";

import {Assert} from "Assert";

export class TestStrings extends TestObject {
    constructor() {
        super("Algorithms/Strings/Strings");
        this.autoloadTests();
        this.startTests();
    }

    testToString() {
        var object = { toString: function() { return "test" } };
        Assert.Equal("test", Strings.ToString(object), "String Conversion");
        Assert.Equal(object.toString(), Strings.ToString(object), "Object Conversion with toString");
        Assert.Equal("", Strings.ToString(null), "Null to blank string");
        Assert.Equal("0", Strings.ToString(0), "Zero");
        Assert.Equal("1", Strings.ToString(1), "One");
        Assert.Equal("true", Strings.ToString(true), "True");
        Assert.Equal("false", Strings.ToString(false), "False");
        Assert.Equal(false, Strings.ToString(null, false), "Null,False");
    }

    testEscapeString() {
        Assert.Equal("\\-\\*\\+\\?\\.\\\\\\^\\$\\|", Strings.EscapeString("-*+?.\\^$|"));
        Assert.Equal("\\[\\]", Strings.EscapeString("[]"));
        Assert.Equal("\\{\\}", Strings.EscapeString("{}"));
        Assert.Equal("\\(\\)", Strings.EscapeString("()"));
    }
}