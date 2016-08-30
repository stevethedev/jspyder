import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {DOMCss} from "Dom/DOMCss/DOMCss";

export class TestDOMCss extends TestObject {
    constructor() {
        super("Dom/DOMCss/DOMCss");
        
        this.autoloadTests();
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
    
    testInlineStyles() {
        var style = document.createElement("style");
        style.innerHTML = ".test { border: 1px solid black; }";
        document.body.appendChild(style);

        var div = document.createElement("div");
        div.className = "test";
        document.body.appendChild(div);

        DOMCss.InlineStyles(div);
        document.body.removeChild(style);
        
        Assert.Equal('1px', div.style.borderWidth);
        Assert.Equal('solid', div.style.borderStyle);
        Assert.Equal('rgb(0, 0, 0)', div.style.borderColor);
    }
}