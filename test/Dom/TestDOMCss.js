import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {DOMCss} from "Dom/DOMCss";

export class TestDOMCss extends TestObject {
    constructor() {
        super();
        
        this.addTest("Dom/DOMCss/setCssOn", this.testSetCssOn);
        this.addTest("Dom/DOMCss/getCssFrom", this.testGetCssFrom);
        
        this.startTests();
    }
    
    testSetCssOn() {
        var div = document.createElement("div");
        
        DOMCss.setCssOn(div, { "position": "absolute", "width": "300px" });
        Assert.Equal("absolute",div["style"]["position"]);
        Assert.Equal("300px",div["style"]["width"]);
        
        DOMCss.setCssOn(div, { "position": "static", "width": "150px" });
        Assert.Equal("static", div["style"]["position"]);
        Assert.Equal("150px", div["style"]["width"]);
    }
    
    testGetCssFrom() {
        var div = document.createElement("div");
        var cssObject = { "position": null, "width": null };
        
        div["style"]["position"] = "absolute";
        div["style"]["width"] = "300px";
        DOMCss.getCssFrom(div, cssObject);
        Assert.Equal("absolute", cssObject["position"]);
        Assert.Equal("300px", cssObject["width"]);
        
        div["style"]["position"] = "static";
        div["style"]["width"] = "150px";
        DOMCss.getCssFrom(div, cssObject);
        Assert.Equal("static", cssObject["position"]);
        Assert.Equal("150px", cssObject["width"]);
    }
}