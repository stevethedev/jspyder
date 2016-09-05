/**
 * Converts input lookup object into a format string
 */
function buildFormatRegexStringFrom(lookup, format) {
    var reArray = [],
        str = null,
        rex = null,
        val = {},
        rev = {};

    for(let i = 0, li = lookup.length; i < li; ++i) {
        var collection = lookup[i];
        var cs = collection[format];
        if (cs) {
            reArray.push(cs);
            val[cs] = i;
            rev[i] = cs; 
        }
    }
    
    // put bigger values to the left so they aren't obscured by shorter ones
    reArray.sort(function(a,b) { return b.length - a.length; });
    
    str = ("(" + reArray.join("|") + ")");
    rex = new RegExp(str, "g");
    
    return {
        string: str,
        regexp: rex,
        values: val,
        lookup: rev
    };
}

/**
 * @param {!Object} connectTo
 * @param {!Array<Object>} lookup
 * @param {!Array<string>} keys
 */
export function buildFormatRegexString(connectTo, lookup, keys) {
    for(let i = 0, li = keys.length; i < li; ++i) {
        connectTo[keys[i]] = buildFormatRegexStringFrom(lookup, keys[i]);
    }
}
