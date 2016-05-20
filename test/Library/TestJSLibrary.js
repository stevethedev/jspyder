import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {JSLibrary} from "Library/JSLibrary";
import {LibraryInterfaceDefs} from "Library/LibraryInterfaceDefs";

export class TestJSLibrary extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        
        super("Library/JSLibrary");
        this.autoloadTests();
        this.startTests();
    }
    
    testConstructor() {
        var jsLibrary = new JSLibrary(this);
        
        Assert(jsLibrary._registry, "Expected a registry object");
        Assert.Equal(this, jsLibrary._context, "Expected to be the context of the library");
    }
    
    testGetInterface() {
        function storedFunction(arg1, arg2) {
            Assert.Equal(0, arg1, `Stored Function Argument 1: ${arg1}`);
            Assert.Equal(1, arg2, `Stored Function Argument 2: ${arg2}`);
            return true;
        }
        
        // test register & execute
        this.jspyder.lib.register("test", storedFunction);
        var executed = this.jspyder.lib.execute("test", [0,1]);
        Assert.Equal(true, executed, `Expected function 'test' to return true; returned ${executed}`);
        
        // test core execution
        executed = false;
        this.jspyder.lib("test", [0,1], function(result) {
            Assert.Equal(true, result, `Expected callback to return true; returned ${result}`);
            executed = true;
        });
        Assert(executed, "Callback function failed to execute");
        
        // test registerSet
        var i = 0;
        this.jspyder.lib.registerSet({
            "set1": function() { return ++i; },
            "set2": function() { return ++i; }
        });
        
        this.jspyder.lib("set1", null, function(x) { 
            Assert.Equal(1, x);
            Assert.Equal(i, x);
        })("set2", null, function(x) {
            Assert.Equal(2, x);
            Assert.Equal(i, x);
        });
        Assert.Equal(2, i, `Expected JSLibrary to execute 2 functions after registerSet; executed ${i}`);
    }
    
    testExecute() {
        var library = new JSLibrary();
        library.Register("test", function() { return true; });
        Assert.Equal(true, library.Execute("test"));
    }
    
    testRegister() {
        var library = new JSLibrary();
        function test() { return true; }
        library.Register("test", test);
        
        Assert.Equal(test, library._registry.fetch("test"));
    }
    
    testRegisterSet() {
        var i = 0;
        var library = new JSLibrary();

        library.RegisterSet({
            "set1": function() { return ++i; },
            "set2": function() { return ++i; }
        });
        
        library.Execute("set1", null, function(x) { 
            Assert.Equal(1, x);
            Assert.Equal(i, x);
        });
        library.Execute("set2", null, function(x) {
            Assert.Equal(2, x);
            Assert.Equal(i, x);
        });
        Assert.Equal(2, i, `Expected JSLibrary to execute 2 functions after registerSet; executed ${i}`);
    }
}