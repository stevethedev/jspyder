import {TestObject} from "TestObject";
import {Assert} from "Assert";

export class TestDOMClassesInterface extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        super("Dom/DOMClasses/DOMClassesInterface");
        
        this.autoloadTests();
        this.startTests();
    }
    
    testGetClasses() {
        this.jspyder.dom('<div class="    class1     class2    weird-class-names    "></div>')
            .getClasses((classArray) => {
                Assert.Equal("class1", classArray[0]);
                Assert.Equal("class2", classArray[1]);
                Assert.Equal("weird-class-names", classArray[2]);
            })
    }
    
    testSetClasses() {
        var div = document.createElement("div");

        this.jspyder.dom(div).setClasses({ class1: true });
        Assert.Equal("class1", div.className);

        this.jspyder.dom(div).setClasses({ class1: false });
        Assert.Equal("", div.className);
    }
}