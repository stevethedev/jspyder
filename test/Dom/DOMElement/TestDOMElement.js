import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {DOMElement} from "Dom/DOMElement/DOMElement";

export class TestDOMElement extends TestObject {
    constructor() {
        super("Dom/DOMElement/DOMElement");
        
        this.autoloadTests();        
        this.startTests();
    }
    
    testToElement() {
        const DOM_STRING = "<div>";
        const CSS_STRING = "body";
        const DOM_OBJECT = document.createElement("div");
        
        var domString = DOMElement.ToElement(DOM_STRING);
        var cssString = DOMElement.ToElement(CSS_STRING);
        var domObject = DOMElement.ToElement(DOM_OBJECT);
        
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
        
        Assert(DOMElement.IsElement(div), "DOMElement.IsElement(DOM)");
        Assert(!DOMElement.IsElement("div"), "DOMElement.IsElement(String)");
        Assert(DOMElement.IsElement(span), "DOMElement.IsElement(NS:DOM)");
        Assert(!DOMElement.IsElement(textNode), "DOMElement.IsElement(TextNode)");
    }
    
    testIsNode() {
        var textNode = document.createTextNode("Test Text Node");
        var elementNode = document.createElement("div");
        
        Assert(DOMElement.IsNode(textNode));
        Assert(DOMElement.IsNode(elementNode));
    }
    
    testIsDomString() {
        const DOM_STRING = "<div>";
        const NOT_DOM_STRING = "div";
        const DOMISH_STRING = " <div></div> ";
        const DOM_LIKE_STRING = " Text <div></div>";
        
        Assert(DOMElement.IsDomString(DOM_STRING), DOM_STRING);
        Assert(!DOMElement.IsDomString(NOT_DOM_STRING), NOT_DOM_STRING);
        Assert(DOMElement.IsDomString(DOMISH_STRING), DOMISH_STRING);
        Assert(!DOMElement.IsDomString(DOM_LIKE_STRING), DOM_LIKE_STRING);
    }
    
    testParseHtmlAsNodes() {
        const DOM_STRING = "<div></div><span></span><pre></pre>";
        
        var nodes = DOMElement.ParseHtmlAsNodes(DOM_STRING);
        Assert(nodes instanceof Array, "Should return an array");
        Assert.Equal(3, nodes.length, "Expected 3 elements");
        Assert.Equal("DIV", nodes[0]["tagName"], "Expected first element to be a DIV");
    }
    
    testQuerySelectorAll() {
        Assert(DOMElement.QuerySelectorAll("body") instanceof Array, "Should return an array");
        Assert(DOMElement.QuerySelectorAll("1") instanceof Array, "Should return an array");
    }
    
    testAttachRegistry() {
        var node = document.createElement("div");
        var nsNode = document.createElementNS("namespace", "div");
        
        Assert(!node["__jsRegistry"]);
        DOMElement.AttachRegistry(node);
        Assert(node["__jsRegistry"]);
        
        Assert(!nsNode["__jsRegistry"]);
        DOMElement.AttachRegistry(nsNode);
        Assert(nsNode["__jsRegistry"]);
    }

    testMatchesSelector() {
        const className = "test-class";

        var node = document.createElement("div");
        node.className = className;

        Assert(DOMElement.MatchesSelector(node, `.${className}`), "Expected element to match selector 1");
        Assert(!DOMElement.MatchesSelector(node, `.${className}-2`), "Expected element to fail selector 2");
    }
}