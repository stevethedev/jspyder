import {TestObject} from "TestObject";
import {Assert} from "Assert";

export class TestDOMCssInterface extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        super("Dom/DOMCss/DOMCssInterface");
        
        this.autoloadTests();
        this.startTests();
    }

    testCss() {
        var div = document.createElement("div");
        var cssObject = this.jspyder.dom(div)
                .setCss({ position: "absolute", width: "300px" })
                .getCss({ position: null, width: null }, 
                    (cssObject) => {
                        Assert.Equal("absolute", cssObject.position);
                        Assert.Equal("300px", cssObject.width);
                    })
                .exportCss({ position: null, width: null });

        Assert.Equal("absolute", cssObject.position);
        Assert.Equal("300px", cssObject.width);
    }
    
    testInlineStyles() {
        var style = document.createElement("style");
        style.innerHTML = ".test { border: 1px solid black; }";
        document.body.appendChild(style);
        
        var div = document.createElement("div");
        div.className = "test";
        document.body.appendChild(div);
        
        this.jspyder.dom(div).inlineStyles();
        document.body.removeChild(style);
        
        var divStyle = div.style;
        Assert.Equal('1px', divStyle.borderWidth);
        Assert.Equal('solid', divStyle.borderStyle);
        Assert.Equal('rgb(0, 0, 0)', divStyle.borderColor);
    }
}