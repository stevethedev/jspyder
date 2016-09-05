import {TestObject} from "TestObject";
import {Assert} from "Assert";

export class TestDOMEventInterface extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        super("Dom/DOMElement/DOMElementInterface");

        this.autoloadTests();
        this.startTests();
    }

    testOn() {
        var div = document.createElement("div");
        var dom = this.jspyder.dom(div);
        var triggered = false;

        dom.on("click", (event) => triggered = true);
        
        var event = document.createEvent("Event");
        event.initEvent("click", false, false);
        div.dispatchEvent(event);

        Assert(triggered, "Expected event to trigger");
    }

    testOff() {
        var div = document.createElement("div");
        var dom = this.jspyder.dom(div);
        var triggered = false;

        dom.on("click", (event) => triggered = true);
        dom.off("click");
        
        var event = document.createEvent("Event");
        event.initEvent("click", false, false);
        div.dispatchEvent(event);

        Assert(!triggered, "Expected event to not trigger");
    }

    testTrigger() {
        var div = document.createElement("div");
        var dom = this.jspyder.dom(div);
        var triggered = false;

        dom.on("click", (event) => triggered = true);
        dom.trigger("click");

        Assert(triggered, "Expected event to trigger");
    }
}