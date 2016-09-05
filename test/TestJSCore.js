import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {JSCore} from "JSCore";

import {TestJSAlgorithms} from "Algorithms/TestJSAlgorithms";
import {TestJSDom} from "Dom/TestJSDom";
import {TestJSLibrary} from "Library/TestJSLibrary";

var JSpyder = window["JSpyder"];
class TestJSCore extends TestObject {
    constructor(jspyderName = "jspyder") {
        super("JSCore");
        
        this.jspyderName = jspyderName;
        this.jspyder = JSpyder.Bootstrap(this.jspyderName, this);
        Assert(JSpyder.inPrototypeChain(this.jspyder), "Failed Prototype Chain test");
        
        this.autoloadTests();
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

var total = 0, passed = 0;

var div = document.createElement("pre");
document.body.appendChild(div);
TestObject.setLogger(function(message) {
    var d = new Date();
    
    message = message.replace(/\.{3} (Passed|Failed)/, function(msg, found) {
        var replace = (found === "Passed" 
            ? "<font color='darkgreen'>PASSED</font>" 
            : "<font color='darkred'>FAILED</font>")
            
        passed += (found === "Passed");
        total++;
            
        return msg.split(found).join(replace);
    });
    
    message = message.replace(/(\d+) of (\d+) tests passed/, function(msg, num1, num2) {
        num1 = +num1;
        num2 = +num2;
        
        var color = (num2 <= num1) ? "darkgreen": "darkred";
        
        return `<font color="${color}">${num1}/${num2} TESTS PASSED</font>`;
    });
    
    div.innerHTML += message;
});

window["Tests"] = new TestJSCore();

alert(`${passed} of ${total} Tests Passed: ${((passed/total)*100)|0}%`);
