import {Arrays} from "Algorithms/Arrays/Arrays";
import {JSRegistry} from "Registry/JSRegistry";

const REGEX_DOM_TAG = /^(\s|\n)*(\\\<|\<)/;
const HTML_ELEMENT_EXISTS = "object" === typeof window["HTMLElement"];
const HTML_NODE_EXISTS = "object" === typeof window["Node"];

export class DOMElement {
    /**
     * Converts arbitrary data into a DOM node array that JSpyder
     * can use.
     * 
     * Profile: O(n), Q(1)
     * 
     * @return {Array}
     */
    static toElement(source) {
        if (DOMElement.isElement(source)) {
            return [source];
        }
        else if ("string" === typeof source) {
            if (DOMElement.isDomString(source)) {
                return DOMElement.parseHtmlAsNodes(source);
            }
            else {
                return DOMElement.querySelectorAll(source);
            }
        }
        else {
            return Arrays.Slice(source);
        }
    }

    /**
     * @return {boolean}
     */
    static isElement(element) {
        if (element) {
            if (HTML_ELEMENT_EXISTS) {
                return element instanceof window["HTMLElement"];
            }
            else if ("object" === typeof element
                && element["nodeType"] === 1
                && "string" === typeof element["nodeName"]) {
                return true;
            }
        }
        return false;
    }

    static isNode(object) {
        if (object) {
            if (HTML_NODE_EXISTS) {
                return object instanceof window["Node"];
            }
            else if ("object" === typeof object
                && object["nodeType"] === 1
                && "string" === typeof object["nodeName"]) {
                return true;
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
    static isDomString(source) {
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
    static parseHtmlAsNodes(source) {
        let div = window["document"].createElement("div");
        div["innerHTML"] = source;
        return Arrays.Slice(div["children"], 0);
    }

    /**
     * Profile: O(n)
     * 
     * @return {Array}
     */
    static querySelectorAll(selector, parent = window["document"]) {
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
     * PRofile: O(1)
     */
    static attachRegistry(element) {
        if (!element["__jsRegistry"]) {
            element["__jsRegistry"] = new JSRegistry().GetInterface();
        }
    }
}
