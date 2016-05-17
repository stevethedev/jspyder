import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {JSDom} from "Dom/JSDom";
import {TestDOMCss} from "Dom/TestDOMCss";
import {TestDOMElement} from "Dom/TestDOMElement";

export class TestJSDom extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        
        super("Dom/JSDom");
        
        this.autoloadTests();
        this.startTests();

        new TestDOMCss();
        new TestDOMElement();
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
}