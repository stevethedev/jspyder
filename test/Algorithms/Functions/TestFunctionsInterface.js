import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {FunctionsInterface} from "Algorithms/Functions/FunctionsInterface";

export class TestFunctionsInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Functions/FunctionsInterface");
        this.jspyder = jspyder;

        this.autoloadTests();
        this.startTests();
    }
    
    testUse() {
        function fn() {
            Assert.Equal(context, this);
            Assert.Equal(args.length, arguments.length);
            for(let i = 0; i < arguments.length; ++i) {
                Assert.Equal(args[i], arguments[i]);
            }
            return retval;
        }
        var context = {};
        var args = [1,2,3];
        var retval = {};
        
        Assert.Equal(retval, this.jspyder.alg.use(context, fn, args) );
    }
    
    testRun() {
        function fn() {
            Assert.Equal(args.length, arguments.length);
            for(let i = 0; i < arguments.length; ++i) {
                Assert.Equal(args[i], arguments[i]);
            }
            return retval;
        }
        var args = [1,2,3];
        var retval = {};
        
        Assert.Equal(retval, this.jspyder.alg.run(fn, args));
    }
    
    testBindFn() {
        function fn() {
            Assert.Equal(context, this, "Bind Context Failed");
            Assert.Equal(args1.length + args2.length, arguments.length);
            var i, j;
            for(i = 0; i < args1.length; ++i) {
                Assert.Equal(args1[i], arguments[i])
            }
            for(j = 0; j < args2.length; ++j) {
                Assert.Equal(args2[j], arguments[i + j]);
            }
            
            return retval;
        }
        
        var args1 = [1,2,3];
        var args2 = [4,5,6];
        var retval = {};
        var context = {};
        
        var boundFn = this.jspyder.alg.bindFn(context, fn, args1);
        
        Assert.Type("function", boundFn);
        Assert.Equal(retval, boundFn(...args2), "Bind Return Value Failed");
    }
}