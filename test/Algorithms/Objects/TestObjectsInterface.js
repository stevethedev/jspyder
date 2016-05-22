import {TestObject} from "TestObject";
import {Assert} from "Assert";

import {ObjectsInterface} from "Algorithms/Objects/ObjectsInterface";

export class TestObjectsInterface extends TestObject {
    constructor(jspyder) {
        super("Algorithms/Objects/ObjectsInterface");
        this.jspyder = jspyder;
        this.autoloadTests();
        this.startTests();
    }
    
    testObject() {
        var defaultObject = {};
        
        Assert.Equal(defaultObject, this.jspyder.alg.object(null, defaultObject));
        Assert.Equal(defaultObject, this.jspyder.alg.object(true, defaultObject));
        Assert.Equal(defaultObject, this.jspyder.alg.object(false, defaultObject));
        Assert.Equal(defaultObject, this.jspyder.alg.object("test", defaultObject));
        Assert.Equal(defaultObject, this.jspyder.alg.object(7, defaultObject));
        Assert.Equal(defaultObject, this.jspyder.alg.object(defaultObject));
    }
    
    testMergeObj() {
        var object = { foo: { bar: false } };
        var merge = { foo: { bar: { baz: true } } };
        var merged = this.jspyder.alg.mergeObj(object, merge);

        Assert.Equal(object, merged, "Returns param1");
        Assert.Equal(true, merged.foo.bar.baz, "Muti-level merge");
    }
    
    testCloneObj() {
        var object = { foo: { bar: { baz: true } } };
        var cloned = this.jspyder.alg.cloneObj(object);

        Assert.NotEqual(object, cloned, "Different Objects");
        Assert.Equal(object.foo, cloned.foo, "Shared level-2 values");
    }
    
    testDeepCloneObj() {
        var object = { foo: { bar: { baz: true } } };
        var cloned = this.jspyder.alg.deepCloneObj(object);

        Assert.NotEqual(object, cloned, "Different Objects");
        Assert.NotEqual(object.foo, cloned.foo, "Different level-2 values");
        Assert.NotEqual(object.foo.bar, cloned.foo.bar, "Different level-3 values");
        Assert.Equal(object.foo.bar.baz, cloned.foo.bar.baz, "Shared Primitives");
    }
    
    testProperty() {
        var object = { foo: { bar: { baz: true } } };

        Assert.Equal(object.foo, this.jspyder.alg.property(object, "undefinedProperty", "foo", "bar", "baz"));
        Assert.Undefined(this.jspyder.alg.property(object, "undefinedProperty"));
    }
}