import {TestObject} from "TestObject";
import {Objects} from "Algorithms/Objects/Objects";

import {Assert} from "Assert";

export class TestObjects extends TestObject {
    constructor() {
        super("Algorithms/Objects/Objects");
        this.autoloadTests();
        this.startTests();
    }
    
    testToObject() {
        var defaultObject = {};
        
        Assert.Equal(defaultObject, Objects.ToObject(null, defaultObject));
        Assert.Equal(defaultObject, Objects.ToObject(true, defaultObject));
        Assert.Equal(defaultObject, Objects.ToObject(false, defaultObject));
        Assert.Equal(defaultObject, Objects.ToObject("test", defaultObject));
        Assert.Equal(defaultObject, Objects.ToObject(7, defaultObject));
        Assert.Equal(defaultObject, Objects.ToObject(defaultObject));
    }
    
    testIsObject() {
        Assert.Equal(true, Objects.IsObject({}), "Object");
        Assert.Equal(false, Objects.IsObject(null), "Null");
        Assert.Equal(true, Objects.IsObject(function() {}), "function() {}");
        Assert.Equal(true, Objects.IsObject(new Function()), "Function");
        Assert.Equal(false, Objects.IsObject(false), "false");
        Assert.Equal(false, Objects.IsObject(true), "true");
        Assert.Equal(false, Objects.IsObject("string"), "string");
    }
    
    testMergeObjects() {
        var object = { foo: { bar: false } };
        var merge = { foo: { bar: { baz: true } } };
        var merged = Objects.MergeObjects(object, merge);

        Assert.Equal(object, merged, "Returns param1");
        Assert.Equal(true, merged.foo.bar.baz, "Muti-level merge");
    }
    
    testCloneObject() {
        var object = { foo: { bar: { baz: true } } };
        var cloned = Objects.CloneObject(object);

        Assert.NotEqual(object, cloned, "Different Objects");
        Assert.Equal(object.foo, cloned.foo, "Shared level-2 values");
    }
    
    testDeepCloneObject() {
        var object = { foo: { bar: { baz: true } } };
        var cloned = Objects.DeepCloneObject(object);

        Assert.NotEqual(object, cloned, "Different Objects");
        Assert.NotEqual(object.foo, cloned.foo, "Different level-2 values");
        Assert.NotEqual(object.foo.bar, cloned.foo.bar, "Different level-3 values");
        Assert.Equal(object.foo.bar.baz, cloned.foo.bar.baz, "Shared Primitives");
    }
    
    testGetProperty() {
        var object = { foo: { bar: { baz: true } } };

        Assert.Equal(true, Objects.GetProperty(object, "foo", "bar", "baz"));
        Assert.Undefined(Objects.GetProperty(object, "undefinedProperty"));
    }
}