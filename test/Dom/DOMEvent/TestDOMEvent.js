import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {DOMEvent} from "Dom/DOMEvent/DOMEvent";
import {DOMElement} from "Dom/DOMElement/DOMElement";

export class TestDOMEvent extends TestObject {
    constructor() {
        super("Dom/DOMEvent/DOMEvent");
        
        this.autoloadTests();    
        this.startTests();
    }

    testGetEventHandlerList() {
        var element = document.createElement("div");
        const eventName = "click";

        DOMElement.AttachRegistry(element);

        var eventHandlerList = DOMEvent.GetEventHandlerList(element, eventName);
        Assert(eventHandlerList);

        Assert.Equal(eventHandlerList, DOMEvent.GetEventHandlerList(element, eventName));

        Assert.NotEqual(eventHandlerList, DOMEvent.GetEventHandlerList(element, `${eventName}-alt`));
    }
    
    testAddEventHandler() {
        // check that events are added to the handler
        var triggeredCount = 0;
        var manualCount = 0;

        const event1 = "event1";
        const event2 = "event2";

        const dispatchEvent = (element, eventName) => {
            var event = document.createEvent("Event");
            event.initEvent(eventName, false, false);
            element.dispatchEvent(event);
            Assert.Equal(++manualCount, triggeredCount);
        };

        var element1 = document.createElement("div");
        var element2 = document.createElement("div");

        element1.toString = () => "[Element 1]";
        element2.toString = () => "[Element 2]";

        DOMElement.AttachRegistry(element1);
        DOMElement.AttachRegistry(element2);

        function eventListener(event) {
            ++triggeredCount;
        }
        
        DOMEvent.AddEventHandler([element1, element2], [event1, event2], eventListener);

        dispatchEvent(element1, event1);
        dispatchEvent(element1, event2);
        dispatchEvent(element2, event1);
        dispatchEvent(element2, event2);
        
        DOMEvent.AddEventHandler([element1, element2], [event1, event2], eventListener);

        dispatchEvent(element1, event1);
        dispatchEvent(element1, event2);
        dispatchEvent(element2, event1);
        dispatchEvent(element2, event2);
    }

    testRemoveEventHandler() {
        const event = "event";
        var element1 = document.createElement("div");
        var element2 = document.createElement("div");

        DOMElement.AttachRegistry(element1);
        DOMElement.AttachRegistry(element2);

        var triggeredCount = 0;

        function eventHandler(event) { ++triggeredCount; }

        const dispatchEvent = (element, eventName) => {
            var event = document.createEvent("Event");
            event.initEvent(eventName, false, false);
            element.dispatchEvent(event);
        };

        DOMEvent.AddEventHandler([element1, element2], [event], eventHandler);

        DOMEvent.RemoveEventHandler([element1], [event]);
        dispatchEvent(element1, event);
        Assert.Equal(0, triggeredCount, "When generically removing event handlers, then all event handlers are removed");

        DOMEvent.RemoveEventHandler([element2], [event], function() {}, () => null);
        dispatchEvent(element2, event);
        Assert.Equal(1, triggeredCount, "Should not disable functions that are not explicitly defined in the list, if a list exists");

        DOMEvent.RemoveEventHandler([element2], [event], () => null, eventHandler);
        dispatchEvent(element2, event);
        Assert.Equal(1, triggeredCount, "Should be able to explicitly define event handlers to disable.");
    }
    
    testTriggerEventHandler() {
        const event = "event";
        var element = document.createElement("div");
        var triggeredCount = 0;
        function eventHandler(event) { ++triggeredCount; }

        DOMElement.AttachRegistry(element);
        DOMEvent.AddEventHandler([element], [event], eventHandler);

        DOMEvent.TriggerEventHandler(element, event);
        Assert.Equal(1, triggeredCount, "Expected event to trigger");

        DOMEvent.TriggerEventHandler(element, `${event}-1`);
        Assert.Equal(1, triggeredCount, "Expected event to not trigger");
    }
}