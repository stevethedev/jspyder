import {DOMElement} from "Dom/DOMElement/DOMElement";
import {Objects} from "Algorithms/Objects/Objects";

const REGISTRY_EVENT_LIST = "__eventList";

export class DOMEvent {
    /**
     * Enables the specified event/handler pair on each element
     * 
     * TODO: Finish writing this function
     * 
     * @param {Array<!Element|HTMLElement>} elementList 
     * @param {Array<!string>} eventNameList
     * @param {function()} eventHandler 
     */
    static EnableEvent(elementList, eventNameList, eventHandler) {
        const li = elementList.length;
        const lj = eventNameList.length;

        for(let i = 0; i < li; ++i) {
            var element = elementList[i];
            var eventList = DOMElement.RegistryFetch(element, REGISTRY_EVENT_LIST);
            if(!eventList) {
                eventList = Objects.CreateBlankObject();
                DOMElement.RegistryStash(element, REGISTRY_EVENT_LIST, eventList);
            }

            for(let j = 0; j < lj; ++j) {
                var eventName = eventNameList[j];
                var eventJList = eventList[eventName];
                if(!eventJList) {
                    eventJList = eventList[eventName] = [];
                }

                element.addEventListener(eventName, eventHandler);
            }
        }
    }
}