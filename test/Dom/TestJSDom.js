import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {JSDom} from "Dom/JSDom";

import {TestDOMAttributes} from "Dom/DOMAttributes/TestDOMAttributes";
import {TestDOMClasses} from "Dom/DOMClasses/TestDOMClasses";
import {TestDOMCss} from "Dom/DOMCss/TestDOMCss";
import {TestDOMElement} from "Dom/DOMElement/TestDOMElement";
import {TestDOMPosition} from "Dom/DOMPosition/TestDOMPosition";
import {TestDOMTree} from "Dom/DOMTree/TestDOMTree";

import {TestDOMAttributesInterface} from "Dom/DOMAttributes/TestDOMAttributesInterface";
import {TestDOMClassesInterface} from "Dom/DOMClasses/TestDOMClassesInterface";
import {TestDOMCssInterface} from "Dom/DOMCss/TestDOMCssInterface";
import {TestDOMElementInterface} from "Dom/DOMElement/TestDOMElementInterface";
import {TestDOMPositionInterface} from "Dom/DOMPosition/TestDOMPositionInterface";
import {TestDOMTreeInterface} from "Dom/DOMTree/TestDOMTreeInterface";

export class TestJSDom extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        
        super("Dom/JSDom");
        
        this.autoloadTests();
        this.startTests();

        new TestDOMAttributes();
        new TestDOMClasses();
        new TestDOMCss();
        new TestDOMElement();
        new TestDOMPosition();
        new TestDOMTree();

        new TestDOMAttributesInterface(jspyder);
        new TestDOMClassesInterface(jspyder);
        new TestDOMCssInterface(jspyder);
        new TestDOMElementInterface(jspyder);
        new TestDOMPositionInterface(jspyder);
        new TestDOMTreeInterface(jspyder);
    }
    
    testConstructor() {
        var jsDomExternal, jsDomInternal;
        
        jsDomExternal = new JSDom("<div>", function() {
            jsDomInternal = this;
        });
        
        Assert.Equal(jsDomExternal, jsDomInternal, "Constructor Context");
    }
    
    testCount() {
        var jsDom = new JSDom("<div>");
        Assert.Equal(1, jsDom.count);
    }
    
    testEach() {
        var jsDom = new JSDom("<div>Element 1</div><div>Element 2</div>");
        jsDom.each(function(element, index, collection, arg1, arg2) {
            Assert.Equal(`Element ${++index}`, element.innerHTML);
            Assert.Equal(true, arg1, "Extra Argument 1");
            Assert.Equal(false, arg2, "Extra Argument 2");
        }, true, false);
    }
    
    testCss() {
        var jsDom = new JSDom("<div>");
        var cssObject = { "position": "absolute", "height": "50px" };
        var getCssObject = { "position": null, "height": null };
        
        jsDom.setCss(cssObject, function(output) {
                Assert.Equal(cssObject, output, "setCss Argument Failure");
            })
            .getCss(getCssObject, function(output) {
                Assert.Equal(getCssObject, output, "getCss Argument Failure");
            });
            
        Assert.Equal(cssObject["position"], getCssObject["position"]);
        Assert.Equal(cssObject["height"], getCssObject["height"]);
    }
    
    testAt() {
        
    }
}