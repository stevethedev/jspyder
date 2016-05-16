import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {JSCore} from "JSCore";

import {TestJSAlgorithms} from "Algorithms/TestJSAlgorithms";
import {TestJSDom} from "Dom/TestJSDom";
import {TestJSLibrary} from "Library/TestJSLibrary";

var JSpyder = window["JSpyder"];
class TestJSCore extends TestObject {
    constructor(jspyderName = "jspyder") {
        super();
        
        this.jspyderName = jspyderName;
        this.jspyder = JSpyder.Bootstrap(this.jspyderName, this);
        Assert(JSpyder.inPrototypeChain(this.jspyder), "Failed Prototype Chain test");
        
        this.addTest("JSpyder Constructor and Bootstrap", this.testConstructor);
        this.startTests();
        
        new TestJSAlgorithms(this.jspyder);
        new TestJSDom(this.jspyder);
        new TestJSLibrary(this.jspyder);
    }
    
    testConstructor() {
        Assert(this.jspyder, `Expected this.${this.jspyderName} to be defined`);
        Assert(this.jspyder.alg, `JSpyder Algorithms Module Detached`);
        Assert(this.jspyder.env, `JSpyder Environment Module Detached`);
        Assert(this.jspyder.log, `JSpyder Logger Module Detached`);
        Assert(this.jspyder.dom, `JSpyder DOM Module Detached`);

        return true;
    }
}

var div = document.createElement("pre");
document.body.appendChild(div);
TestObject.setLogger(function(message) {
    var d = new Date();
    
    message = message.replace(/\.{3} (Passed|Failed)/, function(msg, found) {
        var replace = (found === "Passed" 
            ? "<font color='darkgreen'>PASSED</font>" 
            : "<font color='darkred'>FAILED</font>")
            
        return msg.split(found).join(replace);
    })
    
    div.innerHTML += message;
});

window["Tests"] = new TestJSCore();
window["Tests"].startTests();
