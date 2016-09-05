import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {DOMClasses} from "Dom/DOMClasses/DOMClasses";

export class TestDOMClasses extends TestObject {
    constructor() {
        super("Dom/DOMClasses/DOMClasses");
        
        this.autoloadTests();
        this.startTests();
    }
    
    testGetClasses() {
        var div = document.createElement("div");
        div.className = "    class1       class2      weird-class-names     ";
        var classArray = DOMClasses.GetClasses(div);
        Assert.Equal("class1", classArray[0]);
        Assert.Equal("class2", classArray[1]);
        Assert.Equal("weird-class-names", classArray[2]);
    }
    
    testSetClasses() {
        var div = document.createElement("div");

        DOMClasses.SetClass(div, "class1", true);
        Assert.Equal("class1", div.className);

        DOMClasses.SetClass(div, "class1", false);
        Assert.Equal("", div.className);
    }

    testHasClass() {
        var div = document.createElement("div");
        div.className = "    class1 class2     weird-class-names";
        
        Assert(DOMClasses.HasClass(div, "class1"));
        Assert(!DOMClasses.HasClass(div, "class3"));
    }
}