import {DOMElement} from "Dom/DOMElement/DOMElement";
import {Arrays} from "Algorithms/Arrays/Arrays";

export class DOMTree {
    /**
     * Attaches the child node to the parent node.
     * 
     * @param {Node} parent
     * @param {Node} child
     * 
     * @return {boolean}
     */
    static AttachChildNode(parent, child) {
        if(DOMElement.IsNode(parent) && DOMElement.IsNode(child)) {
            parent.appendChild(child);
            return true;
        }
        return false;
    }
    
    /**
     * Attaches the child node to the front of the parent.
     * 
     * @param {Node} parent
     * @param {Node} child
     * 
     * @return {boolean}
     */
    static AttachChildNodeAtStart(parent, child) {
        if(DOMElement.IsNode(parent) && DOMElement.IsNode(child)) {
            parent.insertBefore(child, parent.firstChild);
            return true;
        }
        return false;
    }
    
    /**
     * Removes the node from the parent
     * 
     * @param {Node} element
     * 
     * @return {boolean} true on success, false on failure or error
     */
    static RemoveNodeFromParent(element) {
        if(DOMElement.IsNode(element) && element.parentNode) {
            element.parentNode.removeChild(element);
            return true;
        }
        return false;
    }
    
    /**
     * Inserts one node before another node before another node in the DOM tree
     * 
     * @param {Node} beforeThisNode  The reference node to be prepended
     * @param {Node} insertThisNode  The node to insert
     * 
     * @return {boolean}
     */
    static InsertNodeBefore(beforeThisNode, insertThisNode) {
        var validNodes = DOMElement.IsNode(beforeThisNode) && DOMElement.IsNode(insertThisNode);
        if(validNodes && beforeThisNode.parentNode) {
            beforeThisNode.parentNode.insertBefore(insertThisNode, beforeThisNode);
            return true;
        }
        return false;
    }
    
    static InsertNodeAfter(afterThisNode, insertThisNode) {
        var validNodes = DOMElement.IsNode(afterThisNode) && DOMElement.IsNode(insertThisNode);
        if(validNodes && afterThisNode.parentNode && afterThisNode.nextSibling !== insertThisNode) {
            afterThisNode.parentNode.insertBefore(insertThisNode, afterThisNode.nextSibling);
            return true;
        }
        return false;
    }
    
    /**
     * Returns the parentNode of the element provided.
     * 
     * @param {Node} element
     * 
     * @return {Node|null} element.parentNode
     */
    static GetParent(element) {
        if(DOMElement.IsNode(element)) {
            return element.parentNode;
        }
        return null;
    }
    
    /**
     * Returns the child nodes of the element provided.
     * 
     * @param {Node} element
     * 
     * @return {Array<Node>} element.children
     */
    static GetChildren(element) {
        if(DOMElement.IsNode(element)) {
            return Arrays.Slice(element.children);
        }
        return [];
    }
    
    static CreateDocumentFragment(elementArray) {
        if(!elementArray) {
            elementArray = [];
        }

        var documentFragment = document.createDocumentFragment();
        for(let i = 0, li = elementArray.length; i < li; ++i) {
            // DOMTree.AttachChildNode(documentFragment, elementArray[i]);
            documentFragment.appendChild(elementArray[i]);
        }
        
        return documentFragment;
    }
    
    setHtml(html) {}
    getHtml(callbackFunction) {}
    exportHtml() {}
    
    setText(text) {}
    getText(callbackFunction) {}
    exportText() {}
    
    find(cssSelector) {}
    filter(cssSelector) {}
    exclude(cssSelector) {}
    and(elements) {}
}