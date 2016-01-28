/******************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Steven Jimenez
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *****************************************************************************/
jspyder.extend.fn("dtype", function () {
    
    /**************************************************************************
     * @class jspyder.dtype
     * @extends jspyder
     * 
     * Attaches strong-typed fields to javascript objects, which cannot be
     * mutated from their initial data types (and can optionally be set
     * as constant values, or throw errors when invalid data types are
     * applied).
     * 
     * @param {Object} obj
     *      The object against which all of the other operations will be run
     *      against.
     * 
     * @param {Function} [fn]
     *      A callback function, which will be executed using the current
     *      jspyder.dtype object as the context, and the object [obj] as its
     *      first parameter.
     *************************************************************************/
    function js_dtype(obj, fn) {
        var dtype = Object.create(js_dtype);
        dtype.obj = obj;
        js.alg.use(dtype, obj);
        return dtype;
    }
    
    /**************************************************************************
     * @private
     * Returns a TypeError based on a template. Private function standardizes
     * error message.
     * 
     * @param {String} name
     *      Name assigned to the variable upon creation.
     * 
     * @param {Any} val
     *      The value being assigned to the variable.
     * 
     * @param {String} eType
     *      The expected data type. 
     *************************************************************************/
    function _typeError(name, val, eType) {
        return new TypeError("Attempted to assign " + typeof val + "(" + val + ") to " + eType + " \"" + name + "\"");
    }
    
    function _constError(name, eType) {
        return new TypeError("Attempted to set a value to a constant " + eType + " \"" + name + "\"");
    }
    
    /**************************************************************************
     * Attaches an unsigned byte (0x00-0xFF) to object "o", with member name
     * "name", with an initial value of "value".  Optionally, the value can
     * be set to a constant (locked value) or a strict (checks type upon
     * assignment).
     * 
     * If a variable is assigned as a "Constant", then it becomes read-only,
     * and trying to write to the variable throws an error.  If a variable is
     * assigned as a "Strict", then it will throw an error if an invalid data
     * type is assigned; rather than attempt to "guess" the appropriate action
     * based on JavaScript's assignment heirarchy.
     * 
     * The value of a "Strict" type can be illustrated with the following
     * example:
     * 
     *      var o = {};
     *      js.dtype(o)
     *          .ubyte("lazy", 5)
     *          .ubyte("strict", 5, true);
     * 
     *      o.lazy += "5" // = 5 + "5" = "55"
     *      o.strict += "5" // TypeError
     * 
     * @param {String} name
     *      The name to identify the data-type with on object [o].
     * 
     * @param {Number} [value=0]
     *      An initial assignment operation.  If this is a constant, then
     *      this is how the first assignment will be made.  If this is strict,
     *      then an invalid value will immediately throw a TypeError.
     * 
     * @param {Boolean} [strict=false]
     *      Whether to mark this object for on-assignment type-checking.  If
     *      true, then any assignment operations will trigger a type-check,
     *      and invalid types will throw a TypeError.
     * 
     * @param {Boolean} [constant=false]
     *      Whether to mark this object as a constant.  If identified as a
     *      constant, then the value cannot be changed from the value assigned
     *      by parameter [value].
     *************************************************************************/
    js_dtype.ubyte = function attachUByte(name, value, strict, constant) {
        var data = new Uint8Array(new ArrayBuffer(1)),
            _constant = false,
            o = this.obj;
            
        var _interface = {
            get: function () { return data[0]; },
            set: function (v) {
                if (!_constant) {
                    var num = (typeof v === "number" && v === v);
                    if (strict && !num) {
                        throw _typeError(name, v, "unsigned byte");
                    }
                    data[0] = v;
                    return data[0];
                }
                else {
                    throw _constError(name, "unsigned byte");
                }
            },
            enumerable: true
        };
        
        _interface.set(value);
        _constant = constant;
        Object.defineProperty(o, name, _interface);
        return this;
    };

    /** attaches a strong-typed string to the object */
    js_dtype["string"] = function attachString(name, value, strict, constant) {
        var data = String(value),
            _constant = false,
            o = this.obj;
            
        var _interface = {
            get: function () { return data; },
            set: function (v) {
                if (!_constant) {
                    if (strict && (typeof v !== "string")) {
                        throw _typeError(name, v, "string");
                    }
                    data = String(v);
                    return data;
                }
                else {
                    throw _constError(name, "string");
                }
            },
            enumerable: true
        };
        
        _interface.set(value);
        _constant = constant;
        Object.defineProperty(o, name, _interface);
        return this;
    };

    /** 
     * Attaches a strong-typed unsigned char type to the document.  Of note,
     * this data type can take both numerical data (ushort) or character
     * data (single characters). 
     */
    js_dtype.uchar = function attachChar(name, value, strict, constant) {
        var data = new Uint16Array(new ArrayBuffer(2)),
            _constant = false,
            o = this.obj;
        var _interface = {
            get: function () { return String.fromCharCode(data[0]); },
            set: function (v) {
                if (!_constant) {
                    var str = ((typeof v === "string") && (v.length === 1)),
                        num = ((typeof v === "number") && (v === v));
                    if (strict && !str && !num) {
                        throw _typeError(name, v, "uchar");
                    }
                    data[0] = (typeof v === "string" ? v.charCodeAt(0) : +v);
                }
                else {
                    throw _constError(name, "uchar");
                }
            },
            enumerable: true
        };
        _interface.set(value);
        _constant = constant;
        Object.defineProperty(o, name, _interface);
        return this;
    };
    
    /** Creates a jspyder-string object, which can (itself) be passed as a reference */
    js_dtype.jsstring = function attachJsString(name, value, strict, constant) {
        var data = "",
            _constant = false,
            o = this.obj;
            
        var _interface = {
            get: function () {
                return data.join('');
            },
            set: function (v) {
                if (!_constant) {
                    if (strict && typeof v !== "string") {
                        throw _typeError(name, v, "jsstring");
                    }
                    else {
                        if (typeof v === "undefined" || v === null) {
                            v = "";
                        }
                        data = v;
                    }
                }
                else {
                    throw _constError(name, "jsstring");
                }
            },
            enumerable: true
        };
        _interface.set(value);
        _constant = constant;
        Object.defineProperty(o, name, _interface);
        return this;
    }
    
    return js_dtype;
});