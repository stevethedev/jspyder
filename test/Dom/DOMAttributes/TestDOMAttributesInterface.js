import {TestObject} from "TestObject";
import {Assert} from "Assert";

export class TestDOMAttributesInterface extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        super("Dom/DOMAttributes/DOMAttributesInterface");
        
        this.autoloadTests();
        this.startTests();
    }
    
    testGetAttrs() {
        var div = document.createElement("div");
        div.setAttribute("data-attribute-1", "test1");
        div.setAttribute("data-attribute-2", "test2");
        
        var dataAttributes = { 
            "data-attribute-1": null,
            "data-attribute-2": null,
            "undefined-attribute": undefined
        };
        this.jspyder.dom(div).getAttrs(dataAttributes, (dataAttributes) => {            
            Assert.Equal("test1", dataAttributes["data-attribute-1"]);
            Assert.Equal("test2", dataAttributes["data-attribute-2"]);
            Assert.Equal(null, dataAttributes["undefined-attribute"]);
        });
    }
    
    testSetAttrs() {
        var div = document.createElement("div");
        this.jspyder.dom(div).setAttrs({ height: "30px", width: "20px" });
        
        Assert.Equal("30px", div.getAttribute("height"));
        Assert.Equal("20px", div.getAttribute("width"));
    }

    testExportAttrs() {
        var div = document.createElement("div");
        div.setAttribute("data-test-attribute", "test value");

        var attributeObject = this.jspyder.dom(div).exportAttrs({ "data-test-attribute": null });
        Assert.Equal("test value", attributeObject["data-test-attribute"]);
    }

    testGetAttr() {
        var div = document.createElement("div");
        div.setAttribute("data-test-attribute", "test-value");
        this.jspyder.dom(div)
            .getAttr("data-test-attribute", (dataTestAttribute) => 
                Assert.Equal("test-value", dataTestAttribute))
            .getAttr("data-undefined-attribute", (dataUndefinedAttribute) =>
                Assert.Equal(null, dataUndefinedAttribute));
    }

    testSetAttr() {
        var div = document.createElement("div");
        this.jspyder.dom(div).setAttr("height", "300px");
        Assert.Equal("300px", div.getAttribute("height"));
    }

    testExportAttr() {
        var div = document.createElement("div");
        div.setAttribute("data-test-attribute", "test value");

        var attribute = this.jspyder.dom(div).exportAttr("data-test-attribute");
        Assert.Equal("test value", attribute);
    }
}