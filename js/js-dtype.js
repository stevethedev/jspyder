/*
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
 */
jspyder.extend.fn("dtype", function () {
    var js = this,
        js_alg = js.alg;

    /**
     * @class jspyder.dtype
     * @member jspyder
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
     */
    function js_dtype(obj, fn) {
        var dtype = Object.create(js_dtype.fn);
        dtype.obj = obj;
        js.alg.use(dtype, obj);
        return dtype;
    }

    /**
     * @private
     * Returns a TypeError based on a template. Private function standardizes
     * error message.
     *
     * @param {String} name
     *      Name assigned to the variable upon creation.
     *
     * @param {Mixed} val
     *      The value being assigned to the variable.
     *
     * @param {String} eType
     *      The expected data type.
     */
    function _typeError(name, val, eType) {
        throw new TypeError("Attempted to assign " + typeof val + "(" + val + ") to " + eType + " \"" + name + "\"");
    }

    /**
     * @private
     * Returns a TypeError based on a template. Private function standardizes
     * error message.
     *
     * @param {String} name
     *      Name assigned to the variable upon creation.
     *
     * @param {String} eType
     *      The expected data type.
     */
    function _constError(name, eType) {
        throw new TypeError("Attempted to set a value to a constant " + eType + " \"" + name + "\"");
    }

    /**
     * @private
     *
     * @param {String}    _name         Variable name
     * @param {String}    _jstype       JavaScript type name
     * @param {String}    _dtypeText    JS-DType type name
     * @param {Function}  _dtype        JS-DType coercion function
     * @param {Mixed}     _value        The initial value to use.
     * @param {Boolean}   _constant     Whether the variable should be assignable after initialization.
     * @param {Boolean}   _strict       Whether the variable should use the verification assignment function.
     * @param {Function} [_setFn]       Custom setter hook
     * @param {Function} [_getFn]       Custom getter hook
     * @param {Function} [_validateFn]  Custom validation hook for strict values
     *
     * @return {Object} Property definition
     */
    function _createInterface(_name, _jstype, _dtypeText, _dtype, _value, _constant, _strict, _setFn, _getFn, _validateFn) {
        var _interface = { },
            _baseSet = (typeof _setFn === "function"
                ? function(v) { _value = _dtype(_setFn(v)); }
                : function(v) { _value = _dtype(v); }),
            _strictSet = (typeof _validateFn === "function"
                ? function(v) { 
                    typeof v === _jstype || _typeError(_name, v, _jstype);
                    _baseSet(v);
                }
                : function(v) {
                    _validateFn(v) || _typeError(_name, v, _jstype);
                    _baseSet(v);
                }),
            _constSet = function(v) { _constError(_name, _jstype); },
            _baseGet = (typeof _getFn === "function"
                ? function() { return _getFn(_dtype(_value)); }
                : function() { return _dtype(_value); });

        _baseSet(_value);
        _interface["get"] = _baseGet;
        _interface["enumerable"] = true;

        if (_constant) { _interface["set"] = _constSet; }
        else if (_strict) { _interface["set"] = _strictSet; }
        else { _interface["set"] = _baseSet; }

        return _interface;                    
    }
    
    /**
     * @private
     * Binds the interface to the wrapped object.
     * 
     * @param {Object} obj          The object to bind to
     * @param {String} name         The name to bind the property under
     * @param {Object} _interface   The getter/setter property
     * 
     * @return {Object} obj parameter
     */
    function _createBinding(obj, name, _interface) {
        Object.defineProperty(obj, name, _interface);
        
        return obj;
    }

    js_dtype.fn = {
        /**
         * Attaches a signed byte (-0x80-0x7f) to object "o", with member name
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
         *          .byte("lazy", 5)
         *          .byte("strict", 5, true);
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
         * 
         * @alias jspyder.dtype.int8
         */
        "byte": js.alg.use(js_dtype, function bootstrap() {
            js_alg.byte();
            var int8 = js_alg["byte"];
            
            return function attachInt8(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "number", "byte", int8, value, constant, strict);

                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
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
         * 
         * @alias jspyder.dtype.uint8
         */
        "ubyte": js.alg.use(js_dtype, function bootstrap() {
            js_alg.ubyte();
            var ubyte = js_alg["ubyte"];

            return function attachUInt8(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "number", "unsigned byte", ubyte, value, constant, strict);

                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Attaches a signed short (-0x8000-0x7FFF) to object "o", with member name
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
         *          .short("lazy", 5)
         *          .short("strict", 5, true);
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
         * 
         * @alias jspyder.dtype.int16
         */
        "short": js.alg.use(js_dtype, function bootstrap() {
            js_alg.short();
            var int16 = js_alg["short"];

            return function attachInt16(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "number", "short", int16, value, constant, strict);

                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Attaches an unsigned short (0x0000-0xFFFF) to object "o", with member name
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
         *          .short("lazy", 5)
         *          .short("strict", 5, true);
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
         * 
         * @alias jspyder.dtype.uint16
         */
        "ushort": js.alg.use(js_dtype, function bootstrap() {
            js_alg.short();
            var ushort = js_alg["ushort"];

            return function attachUInt16(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "number", "unsigned short", ushort, value, constant, strict);

                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Attaches a signed int (-0x800000000-0x7FFFFFFF) to object "o", with member name
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
         *          .int("lazy", 5)
         *          .int("strict", 5, true);
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
         * 
         * @alias jspyder.dtype.int32
         */
        "int": js.alg.use(js_dtype, function bootstrap() {
            js_alg.int();
            var int32 = js_alg["int"];

            return function attachInt32(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "number", "integer", int32, value, constant, strict);

                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Attaches an unsigned int (0x00000000-0xFFFFFFFF) to object "o", with member name
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
         *          .uint("lazy", 5)
         *          .uint("strict", 5, true);
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
         * 
         * @alias jspyder.dtype.uint32
         */
        "uint": js.alg.use(js_dtype, function bootstrap() {
            js_alg.uint();
            var uint = js_alg["uint"];

            return function attachUInt32(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "number", "unsigned integer", uint, value, constant, strict);

                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Attaches a floating point number to object "o", with member name
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
         *          .float("lazy", 5)
         *          .float("strict", 5, true);
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
         */
        "float": js.alg.use(js_dtype, function bootstrap() {
            js_alg.float();
            var floatFn = js_alg["float"];

            return function attachFloat(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "number", "float", floatFn, value, constant, strict);

                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        
        /**
         * Attaches a double (Default JavaScript Number type) to object "o", with member name
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
         *          .double("lazy", 5)
         *          .double("strict", 5, true);
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
         */
        "double": js.alg.use(js_dtype, function bootstrap() {
            js_alg.double();
            var doubleFn = js_alg["double"];

            return function attachDouble(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "number", "double", doubleFn, value, constant, strict);

                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Attaches a signed fixed-point (-0x80000000-0x7FFFFFFF) to object "o", with member name
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
         *          .fixed("lazy", 5, 2)
         *          .fixed("strict", 5, 2, true);
         *
         *      o.lazy += "5" // = 5 + "5" = "55"
         *      o.strict += "5" // TypeError
         *      o.lazy = 0.123 // = 0.12
         *      o.lazy += 0.009 // = 0.12
         *
         * @param {String} name
         *      The name to identify the data-type with on object [o].
         *
         * @param {Number} [value=0]
         *      An initial assignment operation.  If this is a constant, then
         *      this is how the first assignment will be made.  If this is strict,
         *      then an invalid value will immediately throw a TypeError.
         * 
         * @param {Number} [decimals=0]
         *      The number of decimal points to use on this fixed point number.
         *      Once set, this value cannot be changed; but any any decimal points
         *      beyond this power of 10 will be truncated.
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
         */
        "fixed": js.alg.use(js_dtype, function bootstrap() {
            js_alg.int();
            var int32 = js_alg.int;
            function fixed(decimals) {
                decimals = js_alg.int(decimals);
                decimals = Math.pow(10, decimals);
                return function(value) {
                    return int32(value * decimals) / decimals;
                };
            }
            
            return function attachFixed(name, value, decimals, strict, constant) {
                var _fixed = fixed(decimals),
                    _obj = this.obj,
                    _interface = _createInterface(name, "number", "fixed", _fixed, value, constant, strict);
                    
                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Attaches a signed fixed-point (0x00000000-0xFFFFFFFF) to object "o", with member name
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
         *          .fixed("lazy", 5, 2)
         *          .fixed("strict", 5, 2, true);
         *
         *      o.lazy += "5" // = 5 + "5" = "55"
         *      o.strict += "5" // TypeError
         *      o.lazy = 0.123 // = 0.12
         *      o.lazy += 0.009 // = 0.12
         *
         * @param {String} name
         *      The name to identify the data-type with on object [o].
         *
         * @param {Number} [value=0]
         *      An initial assignment operation.  If this is a constant, then
         *      this is how the first assignment will be made.  If this is strict,
         *      then an invalid value will immediately throw a TypeError.
         * 
         * @param {Number} [decimals=0]
         *      The number of decimal points to use on this fixed point number.
         *      Once set, this value cannot be changed; but any any decimal points
         *      beyond this power of 10 will be truncated.
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
         */
        "ufixed": js.alg.use(js_dtype, function bootstrap() {
            js_alg.int();
            var uint = js_alg.int;
            function fixed(decimals) {
                decimals = js_alg.int(decimals);
                decimals = Math.pow(10, decimals);
                return function(value) {
                    return uint(value * decimals) / decimals;
                };
            }
            
            return function attachFixed(name, value, decimals, strict, constant) {
                var _fixed = fixed(decimals),
                    _obj = this.obj,
                    _interface = _createInterface(name, "number", "fixed", _fixed, value, constant, strict);
                    
                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Creates a 2-decimal fixed-point number.
         * 
         * @param {String} name
         * @param {Number} value
         * @param {Boolean} [strict=false]
         * @param {Boolean} [constant=false]
         */
        "currency": function(name, value, strict, constant) {
            return this.fixed(name, value, 2, strict, constant);
        },

        /**
         * Attaches a strong typed string to object "o", with member name
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
         *          .string("lazy", "5 + 5 = ")
         *          .string("strict", "5 + 5 = ", true);
         *
         *      o.lazy += "10" // = "5 + 5 = " + "10" = "5 + 5 = 10"
         *      o.strict += 10 // TypeError
         *
         * @param {String} name
         *      The name to identify the data-type with on object [o].
         *
         * @param {Number} [value=""]
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
         */
        "string": js.alg.use(js_dtype, function bootstrap() {
            js_alg.string();
            var string = js_alg["string"];

            return function attachDouble(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "string", "string", string, value, constant, strict);

                _createBinding(_obj, name, _interface);
                return this;
            };
        }),

        /**
         * Attaches a strong-typed unsigned char type to the object.  Of note,
         * this data type can take both numerical data (ushort) or character
         * data (single characters).
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
         *          .fixed("lazy", 5)
         *          .fixed("strict", 5, true);
         *
         *      o.lazy += "5" // = 5 + "5" = "55"
         *      o.strict += "5" // TypeError
         *      o.lazy = 0.123 // = 0.12
         *      o.lazy += 0.009 // = 0.12
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
         */
        "uchar": js.alg.use(js_dtype, function bootstrap() {
            js_alg.string();
            js_alg.ushort();
            
            var string = js_alg["string"],
                uint16 = js_alg["ushort"],
                isString = function(v) { return typeof v === "string"; },
                isNumber = function(v) { return typeof v === "number"; },
                uchar = function(v) {
                    if(isNumber(v)) { return uint16(v); }
                    v = string(v);
                    if(v.length) { return v.charCodeAt(0); }
                    return 0;
                },
                validate = function(v) { 
                    return (isString(v) && v.length === 1) || (isNumber(v));
                };
                
            return function attachUChar(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, null, "uchar", uchar, value, constant, strict, null, null, validate);
                    
                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Attaches a boolean to object "o", with member name
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
         *          .bool("lazy", true)
         *          .bool("strict", true, true);
         *
         *      o.lazy = 1 // = true
         *      o.strict = 1 // TypeError
         *
         * @param {String} name
         *      The name to identify the data-type with on object [o].
         *
         * @param {Number} [value=true]
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
         */
        "bool": js.alg.use(js_dtype, function bootstrap() {
            js_alg.bool();
            var bool = js_alg["bool"];
            
            return function attachBoolean(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "boolean", "bool", bool, value, constant, strict);
                    
                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Attaches a bit to object "o", with member name
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
         *          .bit("lazy", 1)
         *          .bit("strict", 1, true);
         *
         *      o.lazy = "1" // = 1
         *      o.strict = "1" // TypeError
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
         */
        "bit": js.alg.use(js_dtype, function bootstrap() {
            js_alg.bool();
            var bool = js_alg["bool"],
                bit = function(v) { return +bool(v); },
                test = function(v) { return (typeof v === "number" && (v === 1 || v === 0) ) || (typeof v === "boolean"); }
                
            return function attachBit(name, value, strict, constant) {
                var _obj = this.obj,
                    _interface = _createInterface(name, "number", "bit", bit, value, constant, strict, null, null, test);
                    
                _createBinding(_obj, name, _interface);
                return this;
            };
        }),
        
        /**
         * Attaches an enum interface to object "o", with member name
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
         *          .enum("lazy", 1, ["A","B","C","D"])
         *          .enum("strict", 1, ["A","B","C","D"], true);
         *
         *      o.lazy = 1 | 2 | 4 // o.lazy.A === true, o.lazy.B === true, o.lazy.C === true, o.lazy.D === false
         *      o.strict = "1" // TypeError
         * 
         *      o.lazy.A = true
         *      o.lazy.B = true
         *      o.lazy.C = false
         *      o.lazy.D = false
         * 
         *      o.lazy.valueOf() // 3 
         *
         * @param {String} name
         *      The name to identify the data-type with on object [o].
         *
         * @param {Number} [value=0]
         *      An initial assignment operation.  If this is a constant, then
         *      this is how the first assignment will be made.  If this is strict,
         *      then an invalid value will immediately throw a TypeError.
         * 
         * @param {Array|Object} [values=0]
         *      The possible values which can be assigned under this enum value.
         *      
         *      If an array is passed, then a list of enum values are generated
         *      automatically; this is sufficient for most uses if data is note
         *      stored between sessions.  
         * 
         *      If an object is passed, then the values from the object are used
         *      to generate the interface.  This method allows finer control over
         *      the available values, but does not ensure that each value is
         *      unique; duplicate or overlapping bit-flags can be provided.
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
         */
        "enum": js.alg.use(js_dtype, function bootstrap() {
            js_alg.makeEnum();
            var makeEnum = js_alg["makeEnum"],
                enumFactory = function(name, values, value, strict, constant) {
                    var _proxy = {},
                        _interface = {
                            valueOf: function() { return value; }
                        },
                        bitValues = [];
                        value = js.alg.number(value);
                        
                    js.alg.each(values, function(bits, key) {
                        if(key !== "valueOf") {
                            bitValues.push(bits);
                            function setConst(v) { _constError(name + "." + key, "number"); }
                            function setBasic(v) { value = js.alg.number((v) ? (value | bits) : (value - (value & bits)))|0; }
                            function setStrict(v) { if(typeof v !== "boolean" && typeof v !== "number") { _typeError(name + "." + key, v, "number/boolean"); } setBasic(v); }
                            _proxy[key] = {
                                "enumerable": true,
                                "get": function() { return js.alg.number(value & bits)|0; },
                                "set": (constant ? setConst : strict ? setStrict : setBasic)
                            };
                        }
                    });
                    js.alg.sortArrayNum(bitValues, true);
                    
                    Object.defineProperties(_interface, _proxy);
                    
                    function setEnumConst(v) { _constError(name, "enum"); }
                    function setEnumStrict(v) { if(typeof v !== "number") { _typeError(name, v, "enum"); } setEnumBasic(v); }
                    function setEnumBasic(v) {
                        v = js.alg.number(v)|0;
                        var val = 0;
                        js.alg.arrEach(bitValues, function(bit) {
                            if( (v & bit) === bit ) {
                                val |= bit;
                            }
                            if( v < bit ) {
                                this.stop();
                            }
                        });
                        value = val;
                    }
                    
                    return {
                        "enumerable": true,
                        "get": function() { return _interface; },
                        "set": (constant ? setEnumConst : strict ? setEnumStrict : setEnumBasic)
                    };
                };
            
            return function attachEnum(name, value, values, strict, constant) {
                var _obj = this.obj,
                    _interface = enumFactory(name, Array.isArray(values) ? makeEnum(values) : values, value, strict, constant);
                
                _createBinding(_obj, name, _interface);
                return this;
            };
        })
    };
    
    js.alg.use(js_dtype.fn, function() {
        this["int8"] = this["byte"];
        this["uint8"] = this["ubyte"];
        this["int16"] = this["short"];
        this["uint16"] = this["ushort"];
        this["int32"] = this["int"];
        this["uint32"] = this["uint"];
    });

    return js_dtype;
});