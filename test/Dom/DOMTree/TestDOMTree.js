import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {DOMTree} from "Dom/DOMTree/DOMTree";

export class TestDOMTree extends TestObject {
    constructor() {
        super("Dom/DOMTree/DOMTree");
        this.autoloadTests();
        this.startTests();
    }
    
    testAttachNode() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        Assert(DOMTree.AttachChildNode(parent, child));
        Assert.Equal(1, parent.children.length);
        Assert.Equal(child, parent.children[0]);
    }
    
    testAttachNodeAtStart() {
        var parent = document.createElement("div");
        var child1 = document.createElement("div");
        var child2 = document.createElement("div");
        
        Assert(DOMTree.AttachChildNodeAtStart(parent, child2), "Inserting Second Child");
        Assert(DOMTree.AttachChildNodeAtStart(parent, child1), "Inserting First Child");
        
        Assert.Equal(2, parent.children.length);
        Assert.Equal(child1, parent.children[0]);
        Assert.Equal(child2, parent.children[1]);
    }
    
    testRemoveNodeFromParent() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        parent.appendChild(child);
        
        Assert(DOMTree.RemoveNodeFromParent(child));
        Assert.Equal(0, parent.children.length);
    }
    
    testInsertNodeBefore() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        var newChild = document.createElement("div");
        
        parent.appendChild(child);
        
        Assert(DOMTree.InsertNodeBefore(child, newChild));
        Assert.Equal(newChild, parent.children[0]);
        Assert.Equal(child, parent.children[1]);
    }
    
    testInsertNodeAfter() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        var newChild = document.createElement("div");
        
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(child);
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        
        Assert(DOMTree.InsertNodeAfter(child, newChild), "Insertion");
        Assert.Equal(newChild, parent.children[3], "Inserted to new position");
        Assert.Equal(newChild, child.nextElementSibling);
        Assert(!DOMTree.InsertNodeAfter(child, newChild), "No motion");
    }
    
    testGetParent() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        parent.appendChild(child);
        
        Assert.Equal(parent, DOMTree.GetParent(child));
        Assert.IsNull(DOMTree.GetParent(parent));
    }
    
    testGetChildren() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        parent.appendChild(child);
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        
        Assert.Equal(0, DOMTree.GetChildren(child).length);

        var children = DOMTree.GetChildren(parent);
        for(let i = 0, li = parent.children.length; i < li; ++i) {
            Assert.Equal(parent.children[i], children[i]);
        }
    }
}