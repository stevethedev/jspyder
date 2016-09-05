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
        const html = "<b>test html</b>";

        var div = document.createElement("div");
        var $div = this.jspyder.dom(div);

        $div.setHtml(html);
        Assert.Equal(html, div.innerHTML);
    }

    testGetHtml() {
        const html = "<b>test html</b>";

        var div = document.createElement("div");
        var $div = this.jspyder.dom(div);

        div.innerHTML = html;
        $div.getHtml((myHtml) => Assert.Equal(html, myHtml));
    }

    testExportHtml() {
        const html = "<b>test html</b>";

        var div = document.createElement("div");
        var $div = this.jspyder.dom(div);

        div.innerHTML = html;

        Assert.Equal(html, $div.exportHtml());
    }

    testSetText() {
        const text = "< test";
        const html = "&lt; test";

        var div = document.createElement("div");
        var $div = this.jspyder.dom(div);

        $div.setText(text);

        Assert.Equal(html, div.innerHTML);
    }

    testGetText() {
        const text = "< test";
        const html = "&lt; test";

        var div = document.createElement("div");
        var $div = this.jspyder.dom(div);

        div.innerHTML = html;

        $div.getText((myText) => Assert.Equal(text, myText));
    }

    testExportText() {
        const text = "< test";
        const html = "&lt; test";

        var div = document.createElement("div");
        var $div = this.jspyder.dom(div);

        div.innerHTML = html;

        Assert.Equal(text, $div.exportText());
    }

    testGetProps() {
        var div = document.createElement("div");
        var $div = this.jspyder.dom(div);

        var props = { "tagName": null };

        $div.getProps(props, (props) => Assert.Equal(div.tagName, props.tagName));

        Assert.Equal(div.tagName, props.tagName)
    }

    testExportProps() {
        var div = document.createElement("div");
        var $div = this.jspyder.dom(div);

        var props = { "tagName": null };

        Assert.Equal(div.tagName, $div.exportProps(props).tagName);
        Assert.Equal(div.tagName, props.tagName);
    }

    testSetProps() {
        const property = "this-is-my-test-property";
        const value = true;

        var div = document.createElement("div");
        var $div = this.jspyder.dom(div);

        var props = { [property]: value };
        $div.setProps(props);

        Assert.Equal(value, div[property]);
    }

    testSetValue() {
        const value = "my value";

        var input = document.createElement("input");
        var $input = this.jspyder.dom(input);

        $input.setValue(value);

        Assert.Equal(value, input.value);
    }

    testGetValue() {
        const value = "my value";

        var input = document.createElement("input");
        var $input = this.jspyder.dom(input);

        input.value = value;

        $input.getValue((myValue) => Assert.Equal(value, myValue));
    }

    testExportValue() {
        const value = "my value";

        var input = document.createElement("input");
        var $input = this.jspyder.dom(input);

        input.value = value;

        Assert.Equal(value, $input.exportValue());
    }
}