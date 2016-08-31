function Assert(test, failMessage = `Assertion Failed!`) {
    if(!test) {
        throw new Error(failMessage);
    }
    return test;
}

Assert.IsNull = function(object, failMessage = `Assert.IsNull Failed: ${object}`) {
    return Assert(object === null, failMessage);
}

Assert.NotNull = function(object, failMessage = `Assert.NotNull Failed: ${object}`) {
    return Assert(object !== null, failMessage);
}

Assert.Equal = function(expected, actual, failMessage = `Assert.Equal Failed: Expected ${expected}, Received ${actual}`) {
    return Assert(expected === actual, failMessage);
}

Assert.NotEqual = function(notExpected, actual, failMessage = `Assert.NotEqual Failed: Received ${actual}`) {
    return Assert(notExpected !== actual, failMessage);
}

Assert.Type = function(expectedType, object, failMessage = `Assert.Type Failed: Expected ${expectedType}, received ${typeof object}`) {
    return Assert.Equal(expectedType, typeof object, failMessage);
}

Assert.Undefined = function(object, failMessage = undefined) {
    return Assert.Type("undefined", object, failMessage);
}

Assert.Fail = function(failMessage = "Test Not Built") {
    return Assert(false, failMessage);
}

Assert.InArray = function(array, value, failMessage = `Assert.InArray Failed: Expected ${value} to be in array`) {
    var found = false;
    for(let i = 0, li = array.length; !found && i < li; ++i) {
        found = array[i] === value;
    }
    return Assert(found, failMessage);
}

Assert.NotInArray = function(array, value, failMessage = `Assert.InArray Failed: Expected ${value} to be absent from array`) {
    var found = false;
    for(let i = 0, li = array.length; !found && i < li; ++i) {
        found = array[i] === value;
    }
    return Assert(!found, failMessage);
}

export {Assert};