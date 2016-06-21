import {TestObject} from "TestObject";
import {Assert} from "Assert";

export class TestDOMElementInterface extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        super("Dom/DOMElement/DOMElementInterface");

        this.autoloadTests();
        this.startTests();
    }

    testSetHtml() {
        var div = document.createElement("div");
        var $div = this.jspyder.dom(div);
        const html = "test html";
        $div.setHtml(html);
        Assert.Equal(html, div.innerHTML);
    }

    testGetHtml() {
        Assert.Fail();
    }

    testExportHtml() {
        Assert.Fail();
    }

    testGetText() {
        Assert.Fail();
    }

    testSetText() {
        Assert.Fail();
    }

    testExportText() {
        Assert.Fail();
    }

    testFind() {
        Assert.Fail();
    }

    testFilter() {
        Assert.Fail();
    }

    testExclude() {
        Assert.Fail();
    }

    testAnd() {
        Assert.Fail();
    }

    testGetProps() {
        Assert.Fail();
    }

    testExportProps() {
        Assert.Fail();
    }

    testSetProps() {
        Assert.Fail();
    }

    testSetValue() {
        Assert.Fail();
    }

    testGetValue() {
        Assert.Fail();
    }

    testExportValue() {
        Assert.Fail();
    }
}