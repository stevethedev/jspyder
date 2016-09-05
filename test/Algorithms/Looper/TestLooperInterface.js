import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {LooperInterface} from "Algorithms/Looper/LooperInterface";

export class TestLooperInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Looper/LooperInterface");
        this.jspyder = jspyder;
        this.autoloadTests();
        this.startTests();
    }

    testArrEach() {
        var array = [0,1,2,3,4];
        var i = 0;

        const STOP_POINT = 3;

        var context1 = {};
        var context2 = {};

        this.jspyder.alg.arrEach(array, function(value, index, arr, ctx1, ctx2) {
            // Ensure we are reading the right array
            Assert.Equal(array, arr);

            // Ensure index is an appropriate value
            Assert.Equal(i, index);

            // Ensure we are getting the right value
            Assert.Equal(array[i], value);

            // Ensure the contexts have come
            Assert.Equal(context1, ctx1);
            Assert.Equal(context2, ctx2);

            // Check a stopper
            if(STOP_POINT === index) {
                this.stop();
            }
            else {
                ++i;
            }
        }, context1, context2);

        Assert.Equal(STOP_POINT, i);
    }

    testEach() {
        var object = ["0", "1", "2", "3", "4", "5"];
        this.jspyder.alg.each(object, function(value, key, obj) {
            Assert.Equal(object, obj);
            Assert.Equal(obj[key], value);
            Assert.Equal(object[key], value);
        });
    }
}