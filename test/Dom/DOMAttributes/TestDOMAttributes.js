import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {DOMAttributes} from "Dom/DOMAttributes/DOMAttributes";

export class TestDOMAttributes extends TestObject {
    constructor() {
        super("Dom/DOMAttributes/DOMAttributes");
        
        this.autoloadTests();
        this.startTests();
    }
    
    testGetAttributes() {
        var div = document.createElement("div");
        div.setAttribute("data-attribute-1", "test1");
        div.setAttribute("data-attribute-2", "test2");
        
        var dataAttributes = { 
            "data-attribute-1": null,
            "data-attribute-2": null,
            "undefined-attribute": undefined
        };
        DOMAttributes.GetAttributes(div, dataAttributes);

        Assert.Equal("test1", dataAttributes["data-attribute-1"]);
        Assert.Equal("test2", dataAttributes["data-attribute-2"]);
        Assert.Equal(null, dataAttributes["undefined-attribute"]);
    }
    
    testSetAttributes() {
        var div = document.createElement("div");
        DOMAttributes.SetAttributes(div, { height: "30px", width: "20px" });
        
        Assert.Equal("30px", div.getAttribute("height"));
        Assert.Equal("20px", div.getAttribute("width"));
    }
    
    testGetAttribute() {
        var div = document.createElement("div");
        div.setAttribute("data-test-attribute", "test-value");
        Assert.Equal("test-value", DOMAttributes.GetAttribute(div, "data-test-attribute"));
        Assert.Equal(null, DOMAttributes.GetAttribute(div, "data-undefined-attribute"));
    }
    
    testSetAttribute() {
        var div = document.createElement("div");
        DOMAttributes.SetAttribute(div, "height", "300px");
        Assert.Equal("300px", div.getAttribute("height"));
    }
}