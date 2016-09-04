import {DOMElement} from "Dom/DOMElement/DOMElement";
import {Objects} from "Algorithms/Objects/Objects";

const REGISTRY_EVENT_LIST = "__eventList";
const DISABLED_FLAG = "__disabled__";
const EVENTS_BUBBLE = true;
const EVENTS_CANCEL = false;

export class DOMEvent {
    /**
     * Enables the specified event/handler pair on each element 
     * by adding it to the list of events.
     * 
     * @param {Array<!Element|HTMLElement>} elementList 
     * @param {Array<!string>} eventNameList
     * @param {function(Event)} eventHandler 
     */
    static AddEventHandler(elementList, eventNameList, eventHandler) {
        const li = elementList.length;
        const lj = eventNameList.length;

        for (let i = 0; i < li; ++i) {
            var element = elementList[i];
            for (let j = 0; j < lj; ++j) {
                var eventName = eventNameList[j];
                var eventHandlerList = DOMEvent.GetEventHandlerList(element, eventName);

                var index = eventHandlerList.indexOf(eventHandler);
                if (index > -1) {
                    eventHandlerList.splice(index, 1);
                }
                eventHandlerList.push(eventHandler);
            }
        }
    }

    /**
     * @param {Element} element
     * @param {string} eventName
     */
    static GetEventHandlerList(element, eventName) {
        // Create event dictionary, if it does not exist
        var eventDictionary = DOMElement.RegistryFetch(element, REGISTRY_EVENT_LIST);
        if (!eventDictionary) {
            eventDictionary = Objects.CreateBlankObject();
            DOMElement.RegistryStash(element, REGISTRY_EVENT_LIST, eventDictionary);
        }

        var eventHandlerList = eventDictionary[eventName];
        if (!eventHandlerList) {
            eventHandlerList = eventDictionary[eventName] = [];
            var eventHandler = DOMEvent.CreateEventHandler(eventHandlerList);
            element.addEventListener(eventName, eventHandler);
        }

        return eventHandlerList;
    }

    /**
     * @param {Array<function(Event)>} eventHandlerList
     * @return {!function(Event)}
     */
    static CreateEventHandler(eventHandlerList) {
        function eventHandler(event) {
            for (let i = 0, li = eventHandlerList.length; i < li; ++i) {
                var eventHandler = eventHandlerList[i];
                // ensure this event handler isn't disabled
                if (!eventHandler[DISABLED_FLAG]) {
                    // eventHandler result
                    var eventHandlerResult = eventHandler.apply(this, arguments);

                    // reasons to quit:
                    if (eventHandlerResult === false) {
                        break;
                    }
                }
            }
        }
        eventHandlerList.eventHandler = eventHandler;
        return eventHandler;
    }

    /**
     * If event handlers are explicitly defined, then those event
     * handlers are removed for the specified element/event pair.
     * If no event handlers are specified, then all event handlers
     * are removed.
     * 
     * @param {Array<!HTMLElement|Element>} elementList
     * @param {Array<!string>} eventNameList
     * @param {...function(Event)} removeEventHandlerList
     */
    static RemoveEventHandler(elementList, eventNameList, ...removeEventHandlerList) {
        var li = elementList.length;
        var lj = eventNameList.length;
        var disableLength = removeEventHandlerList.length;

        for (let i = 0; i < li; ++i) {
            var element = elementList[i];
            for (let j = 0; j < lj; ++j) {
                var eventName = eventNameList[j];
                var eventHandlerList = DOMEvent.GetEventHandlerList(element, eventName);

                if(!disableLength) {
                    eventHandlerList.length = 0;
                }
                else for(let k = 0, lk = eventHandlerList.length; k < lk; ++k) {
                    var eventHandler = eventHandlerList[k];
                    if(removeEventHandlerList.indexOf(eventHandler) > -1) {
                        eventHandlerList.splice(eventHandlerList.indexOf(eventHandler), 1);
                    }
                }
            }
        }
    }

    /**
     * @param {!HTMLElement|Element} element
     * @param {!string|Event} event
     */
    static TriggerEventHandler(element, event) {
        if ("string" === typeof event) {
            event = DOMEvent.CreateEvent(element.ownerDocument, event);
        }
        element.dispatchEvent(/** @type {!Event} */(event));
    }

    /**
     * Self-defining function cuts out the unnecessary code after 
     * the first run-through.
     * 
     * @param {Document} document
     * @param {!string} eventName
     */
    static CreateEvent(document, eventName) {
        var event;
        try {
            event = new Event(eventName);
            DOMEvent.CreateEvent = (document, eventName) => new Event(eventName,
                { "bubbles": EVENTS_BUBBLE, "cancelable": EVENTS_CANCEL });
        }
        catch (e) {
            DOMEvent.CreateEvent = (document, eventName) => {
                var event = document.createEvent("Event");
                event.initEvent(eventName, EVENTS_BUBBLE, EVENTS_CANCEL);
                return event;
            }
        }

        return DOMEvent.CreateEvent(document, eventName);
    }
}