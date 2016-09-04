import {Arrays} from "Algorithms/Arrays/Arrays";
import {Objects} from "Algorithms/Objects/Objects";
import {Functions} from "Algorithms/Functions/Functions";
import {JSRegistry} from "Registry/JSRegistry";

const REGEX_DOM_TAG = /^(\s|\n)*(\\\<|\<)/;
const HTML_ELEMENT_EXISTS = "object" === typeof window["HTMLElement"];
const HTML_NODE_EXISTS = "object" === typeof window["Node"];

const REGISTRY_OBJECT = "__jsRegistry";

const NODE_TYPE_ELEMENT_NODE = 1;
const /** @deprecated */ NODE_TYPE_ATTRIBUTE_NODE = 2;
const NODE_TYPE_TEXT_NODE = 3;
const /** @deprecated */ NODE_TYPE_CDATA_SECTION_NODE = 4;
const /** @deprecated */ NODE_TYPE_ENTITY_REFERENCE_NODE = 5;
const /** @deprecated */ NODE_TYPE_ENTITY_NODE = 6;
const NODE_TYPE_PROCESSING_INSTRUCTION_NODE = 7;
const NODE_TYPE_COMMENT_NODE = 8;
const NODE_TYPE_DOCUMENT_NODE = 9;
const NODE_TYPE_DOCUMENT_TYPE_NODE = 10;
const NODE_TYPE_DOCUMENT_FRAGMENT_NODE = 11;
const /** @deprecated */ NODE_TYPE_NOTATION_NODE = 12;
const NODE_TYPE_SWITCHER = {
    [NODE_TYPE_ELEMENT_NODE]: true,
    [NODE_TYPE_TEXT_NODE]: true,
    [NODE_TYPE_PROCESSING_INSTRUCTION_NODE]: true,
    [NODE_TYPE_COMMENT_NODE]: true,
    [NODE_TYPE_DOCUMENT_NODE]: true,
    [NODE_TYPE_DOCUMENT_TYPE_NODE]: true,
    [NODE_TYPE_DOCUMENT_FRAGMENT_NODE]: true
};

export class DOMElement {
    /**
     * Converts arbitrary data into a DOM node array that JSpyder
     * can use.
     *
     * Profile: O(n), Q(1)
     *
     * @return {Array}
     */
    static ToElement(source) {
        if (DOMElement.IsElement(source)) {
            return [source];
        }
        else if ("string" === typeof source) {
            if (DOMElement.IsDomString(source)) {
                return DOMElement.ParseHtmlAsNodes(source);
            }
            else {
                return DOMElement.QuerySelectorAll(source);
            }
        }
        else {
            return Arrays.Slice(source);
        }
    }

    /**
     * Profile: O(1)
     * @param {*} element
     * @return {boolean}
     */
    static IsElement(element) {
        if (element) {
            // if (HTML_ELEMENT_EXISTS) {
            //     return element instanceof window.HTMLElement;
            // }
            // else
            if (DOMElement.IsNode(element)) {
                return element.nodeType === NODE_TYPE_ELEMENT_NODE;
            }
        }
        return false;
    }

    /**
     * Profile: O(1)
     * @param {*} object
     * @return {boolean}
     */
    static IsNode(object) {
        if (object) {
            // if (HTML_NODE_EXISTS) {
            //     return object instanceof window.Node;
            // }
            // else
            if ("object" === typeof object) {
                return NODE_TYPE_SWITCHER[object.nodeType] || false;
            }
        }
        return false;
    }

    /**
     * Determines if the string provided can be used to create
     * a DOM node.
     *
     * @return {boolean}
     */
    static IsDomString(source) {
        if ("string" !== typeof source) {
            return false;
        }

        var match = source.match(REGEX_DOM_TAG);

        return (match !== null) && (match.indexOf('<') > -1);
    }

    /**
     * Profile: O(n)
     *
     * @return {Array}
     */
    static ParseHtmlAsNodes(source) {
        let div = window["document"].createElement("div");
        div["innerHTML"] = source;
        return Arrays.Slice(div["children"], 0);
    }

    /**
     * Profile: O(n)
     *
     * @return {Array}
     */
    static QuerySelectorAll(selector, parent = window["document"]) {
        try {
            return Arrays.Slice(parent.querySelectorAll(selector));
        }
        catch (e) {
            return [];
        }
    }

    /**
     * Attaches a registry to the defined element, if a registry
     * has been created; otherwise, exits early.
     *
     * Profile: O(1)
     */
    static AttachRegistry(element) {
        if (!element[REGISTRY_OBJECT]) {
            element[REGISTRY_OBJECT] = new JSRegistry().GetInterface();
        }
    }

    /**
     * @param {HTMLElement|Element} element
     * @param {!string} key
     * @param {function(*)} [callback]
     * @return {*}
     */
    static RegistryFetch(element, key, callback) {
        return element[REGISTRY_OBJECT].fetch(key, callback);
    }
    
    /**
     * @param {HTMLElement|Element} element
     * @param {!string} key
     * @param {*} value
     * @return {*} value
     */
    static RegistryStash(element, key, value) {
        return element[REGISTRY_OBJECT].stash(key, value);
    }

    /**
     * Checks whether the provided element matches the provided CSS
     * selector
     * 
     * @param {HTMLElement|Element} element
     * @param {!string} cssSelector
     */
    static MatchesSelector(element, cssSelector) {
        if (DOMElement.IsNode(element)) {
            var matchFunction =
                element.matches ||
                element.matchesSelector ||
                element.msMatchesSelector ||
                element.mozMatchesSelector ||
                element.webkitMatchesSelector ||
                element.oMatchesSelector ||
                function (cssSelector) {
                    var doc = this.document || this.ownerDocument,
                        matches = doc.querySelectorAll(cssSelector),
                        i = matches.length;
                    while (--i >= 0) {
                        if (matches[i] === this) {
                            return true;
                        }
                    }
                    return false;
                };

            DOMElement.MatchesSelector = (element, cssSelector) => 
                matchFunction.call(element, cssSelector);
            
            return this.MatchesSelector(element, cssSelector);
        }
    }

    static SetDraggable(element) {
        
    }
}
