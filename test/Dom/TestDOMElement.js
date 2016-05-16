import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {DOMElement} from "Dom/DOMElement";

export class TestDOMElement extends TestObject {
    constructor() {
        super();
        
        this.addTest("Dom/DOMElement/toElement", this.testToElement);
        this.addTest("Dom/DOMElement/isElement", this.testIsElement);
        this.addTest("Dom/DOMElement/isDomString", this.testIsDomString);
        this.addTest("Dom/DOMElement/parseHtmlAsNodes", this.testParseHtmlAsNodes);
        this.addTest("Dom/DOMElement/querySelectorAll", this.testQuerySelectorAll);
        this.addTest("Dom/DOMElement/attachRegistry", this.testAttachRegistry);
        
        this.startTests();
    }
    
    testToElement() {
        const DOM_STRING = "<div>";
        const CSS_STRING = "body";
        const DOM_OBJECT = document.createElement("div");
        
        var domString = DOMElement.toElement(DOM_STRING);
        var cssString = DOMElement.toElement(CSS_STRING);
        var domObject = DOMElement.toElement(DOM_OBJECT);
        
        Assert(domString instanceof Array, "Expected domString to return an array");
        Assert.Equal("DIV", domString[0].tagName, "Expected domString to create a DIV node");
        
        Assert(cssString instanceof Array, "Expected cssString to return an array");
        Assert.Equal("BODY", cssString[0].tagName, "Expected cssString to return body node");
        
        Assert(domObject instanceof Array, "Expected domObject to return an array");
        Assert.Equal("DIV", domObject[0].tagName, "Expected domObject to be a DIV element");
        Assert.Equal(DOM_OBJECT, domObject[0], "Expected DOM_OBJECT to be the first node returned");
    }
    
    testIsElement() {
        var div = document.createElement("div");
        var span = document.createElementNS("myTest", "span");
        var textNode = document.createTextNode("text node");
        
        Assert(DOMElement.isElement(div), "DOMElement.isElement(DOM)");
        Assert(!DOMElement.isElement("div"), "DOMElement.isElement(String)");
        Assert(DOMElement.isElement(span), "DOMElement.isElement(NS:DOM)");
        Assert(!DOMElement.isElement(textNode), "DOMElement.isElement(TextNode)");
    }
    
    testIsDomString() {
        const DOM_STRING = "<div>";
        const NOT_DOM_STRING = "div";
        const DOMISH_STRING = " <div></div> ";
        const DOM_LIKE_STRING = " Text <div></div>";
        
        Assert(DOMElement.isDomString(DOM_STRING), DOM_STRING);
        Assert(!DOMElement.isDomString(NOT_DOM_STRING), NOT_DOM_STRING);
        Assert(DOMElement.isDomString(DOMISH_STRING), DOMISH_STRING);
        Assert(!DOMElement.isDomString(DOM_LIKE_STRING), DOM_LIKE_STRING);
    }
    
    testParseHtmlAsNodes() {
        const DOM_STRING = "<div></div><span></span><pre></pre>";
        
        var nodes = DOMElement.parseHtmlAsNodes(DOM_STRING);
        Assert(nodes instanceof Array, "Should return an array");
        Assert.Equal(3, nodes.length, "Expected 3 elements");
        Assert.Equal("DIV", nodes[0]["tagName"], "Expected first element to be a DIV");
    }
    
    testQuerySelectorAll() {
        Assert(DOMElement.querySelectorAll("body") instanceof Array, "Should return an array");
        Assert(DOMElement.querySelectorAll("1") instanceof Array, "Should return an array");
    }
    
    testAttachRegistry() {
        var node = document.createElement("div");
        var nsNode = document.createElementNS("namespace", "div");
        
        Assert(!node["__jsRegistry"]);
        DOMElement.attachRegistry(node);
        Assert(node["__jsRegistry"]);
        
        Assert(!nsNode["__jsRegistry"]);
        DOMElement.attachRegistry(nsNode);
        Assert(nsNode["__jsRegistry"]);
    }
}