import {TestObject} from "TestObject";
import {Assert} from "Assert";

export class TestDOMTreeInterface extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        super("Dom/DOMTree/DOMTreeInterface");
        this.autoloadTests();
        this.startTests();
    }
    
    testCreateDocumentFragment() {
        var dom = this.jspyder.dom("<div></div><div></div><div></div>");
        var docFragment = dom.createDocumentFragment();
        
        Assert(docFragment);
        Assert.Equal(11, docFragment.nodeType);
    }
    
    testAttach() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        this.jspyder.dom(child).attach(parent);
        
        Assert.Equal(child, parent.children[0]);
    }
    
    testAttachStart() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        
        this.jspyder.dom(child).attachStart(parent);
        
        Assert.Equal(child, parent.children[0]);
    }
    
    testAttachBefore() {
        var parent = document.createElement("div");
        var child1 = document.createElement("div");
        var child2 = document.createElement("div");
        
        parent.appendChild(child1);
        
        this.jspyder.dom(child2).attachBefore(child1);
        
        Assert.Equal(child2, parent.children[0]);
    }
    
    testAttachAfter() {
        var parent = document.createElement("div");
        var child1 = document.createElement("div");
        var child2 = document.createElement("div");
        
        parent.appendChild(child1);
        
        this.jspyder.dom(child2).attachAfter(child1);
        
        Assert.Equal(child2, parent.children[1]);
    }
    
    testAppend() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        
        this.jspyder.dom(parent).append(child);
        
        Assert.Equal(child, parent.lastChild);
    }
    
    testPrepend() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        
        this.jspyder.dom(parent).prepend(child);
        
        Assert.Equal(child, parent.children[0]);
    }
    
    testAppendBefore() {
        var parent = document.createElement("div");
        var child1 = document.createElement("div");
        var child2 = document.createElement("div");
        
        parent.appendChild(child2);
        
        this.jspyder.dom(child2).appendBefore(child1);
        
        Assert.Equal(child1, parent.children[0]);
    }
    
    testAppendAfter() {
        var parent = document.createElement("div");
        var child1 = document.createElement("div");
        var child2 = document.createElement("div");
        
        parent.appendChild(child1);
        
        this.jspyder.dom(child2).appendAfter(child2);
        
        Assert.Equal(child2, parent.children[1]);
    }
    
    testRemove() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        parent.appendChild(child);
        
        this.jspyder.dom(child).remove();
        
        Assert.IsNull(child.parentNode);
    }
    
    testParents() {
        Assert.Fail();
    }
    
    testChildren() {
        Assert.Fail();
    }
}