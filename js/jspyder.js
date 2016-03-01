/* ****************************************************************************
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
 * 
 * @author Steven Jimenez
 * */

(function (global, alias) {
    // Ensure that all jspyder references point to the same jspyder object.
    /** 
     * @class jspyder
     */
    var jspyder = global["jspyder"],
        document = global["document"] || window["document"];

    if (!jspyder) {
        jspyder = _bootstrap(global);
    }
    if (!global[alias]) {
        global[alias] = jspyder;
    }

    /**
     * @private
     * @member jspyder
     * 
     * Bootstraps (create/configure) JSpyder engine.  Basic modules are:
     *  - lib
     *  - alg
     *  - data
     *  - dom
     */
    function _bootstrap(global) {
        /**
         * @class jspyder
         */
        function jspyder () {

        }
        var js = global["jspyder"] = jspyder;
        
        // Extensible
        js.extend = function js_extend(name, obj) {
            Object.defineProperty(this, name, { value: obj });
            return this;
        };
        js.extend.fn = function js_extend_fn(name, fn, args) {
            js.extend(name, fn.apply(js, args));
            return this;
        }
        js.createRegistry = _createRegistry;
        js.registry = _createRegistry();

        _bootstrapLog(js);
        _bootstrapEnv(js);
        _bootstrapLib(js);

        // JSpyder Algorithms
        _bootstrapAlg(js);
        _bootstrapDom(js);
        
        js.loadScript = function(url) {
            js.ajax(url)
                .get(function(data) {
                    (new Function(data.responseText))();
                });
        }

        return js;
    }

    /**
     * @private
     * @member jspyder
     * 
     * Bootstrap jspyder to be able to log to the console with jspyder.log
     * 
     * @param {Object} js Jspyder Object
     */
    function _bootstrapLog(js) {
        // levels: 0 (log), 1 (warn), 2 (error) 
        
        /**
         * @method log
         * @member jspyder
         * 
         * Logging library for jspyder, to output data to the console.
         * 
         * @param {Number} level
         *      The error level to use (0: routine, 1: warning, 2: error).
         * 
         * @param {String} text
         *      The text to output to the console.
         */
        function log(level, text) {
            var offset = (arguments.length > 1 ? 1 : 0),
                args = js.alg.sliceArray(arguments, offset),
                err, warn, log;
                
            if(arguments.length === 1 || arguments) {
                level = 0;
            }
            
            if(console) {
                log = console.log || function() {};
                warn = console.warn || log;
                err = console.error || err;
                
                if(level === 2) { js.alg.use(console, err, args); }
                else if(level === 1) { js.alg.use(console, warn, args); }
                else { js.alg.use(console, log, args); }
            }
            
            return this;
        }
        
        /**
         * @method err
         * @member jspyder.log
         * 
         * Explicitly logs an error, without needing an initial parameter.
         * 
         * @param {String} text
         *      The text to output to the console.
         */
        log.err = function(text) {
            js.alg.use(js, log, [2].concat(js.alg.sliceArray(arguments, 0)));
            return this;
        }
        
        /**
         * @method warn
         * @member jspyder.log
         * 
         * Explicitly logs a warning, without needing an initial parameter.
         * 
         * @param {String} text
         *      The text to output to the console.
         */
        log.warn = function(text) {
            js.alg.use(js, log, [1].concat(js.alg.sliceArray(arguments, 0)));
            return this;
        }
        
        js.extend("log", log);
    }

    /**
     * @private
     * @member jspyder
     * 
     * Bootstrap jspyder's environment variable collection.
     * 
     * @param {Object} js Jspyder Object
     */
    function _bootstrapEnv(js) {
        var VERSION_OBJ = {
                MAJOR_VERSION: 0,
                MINOR_VERSION: 0,
                PATCH_VERSION: 0 },
            VERSION_STR = VERSION_OBJ.MAJOR_VERSION + "." + VERSION_OBJ.MINOR_VERSION + "." + VERSION_OBJ.PATCH_VERSION,
            BROWSER_NAME = "",
            BROWSER_VERSION = 0;

        (function _detectBrowser() {
            if (/*@cc_on!@*/false || !!document.documentMode) {
                BROWSER_NAME = "IE";
                if (!window.attachEvent) { BROWSER_VERSION = 11; }
                else if (/*@cc_on (document.documentMode == 10)!=@*/false) { BROWSER_VERSION = 10; }
                else if (!window.requestAnimationFrame) { BROWSER_VERSION = 9; }
                else if (!window.addEventListener) { BROWSER_VERSION = 8; }
                else { BROWSER_VERSION = 7; }
            }
            else if (typeof window.InstallTrigger !== 'undefined') {
                BROWSER_NAME = "Firefox";

                if (Int8Array && Int8Array.prototype.sort) { BROWSER_VERSION = 7; }
                else if (Node.innerText) { BROWSER_VERSION = 45; }
                else if (Document.charset) { BROWSER_VERSION = 44; }
                else if (Array.prototype.includes) { BROWSER_VERSION = 43; }
                else if (typeof window.Reflect !== "undefined") { BROWSER_VERSION = 42; }
                else { BROWSER_VERSION = 41; }
            }
            else if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
                BROWSER_NAME = "Opera";
                BROWSER_VERSION = 1;
            }
            else if (!!window.chrome) {
                BROWSER_NAME = "Chrome";
                BROWSER_VERSION = 45;
                //45 - 51;
            }
            else if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
                BROWSER_NAME = "Safari";
                if (window.CSS.supports) { BROWSER_VERSION = 9; }
                else if (!window.CSS.supports) { BROWSER_VERSION = 8; }
            }
            else if (window.MSInputMethodContext) {
                BROWSER_NAME = "Edge";
                if (JSON.stringify({ foo: Symbol() }) === "{}") { BROWSER_VERSION = 13; }
                else if (!window.RTCIceGatherOptions) { BROWSER_VERSION = 12; }
                else { BROWSER_VERSION = 11; }
            }
            else if (false) {
                BROWSER_NAME = "iOS Safari";
                BROWSER_VERSION = 8.4;
                9.2; 9.3;
            }
            else if (false) {
                BROWSER_NAME = "Opera Mini";
                BROWSER_VERSION = 8;
            }
            else if (false) {
                BROWSER_NAME = "Android Browser";
                BROWSER_VERSION = 4.3;
                4.4;
                4.44;
                46;
            }
            else if (false) {
                BROWSER_NAME = "Chrome for Android";
                BROWSER_VERSION = 47;
            }
        })();

        var __browser = {
            name: BROWSER_NAME,
            version: BROWSER_VERSION,
            toString: function() { return this.name + this.version }
        };
        Object.freeze(__browser);

        /**
         * @property env
         * @member jspyder
         * @singleton
         * 
         * JSpyder environment variables. The values in this object are
         * immutable and cannot be changed once JSpyder has been bootstrapped.
         * 
         * @property {String} env.version
         *      A 3-number string for the jspyder version number, represented
         *      as "M.N.P," where M is the major version, N is the minor
         *      version, and P is the patch version.
         * 
         * @property {Number} env.versionNo
         *      An integer value representing the version of the jspyder 
         *      library.  The numbers help to compare version numbers without
         *      having to parse the 3-decimal.  For example, differentiating
         *      between JSpyder v1.1.0 and JSpyder v1.10.0 would be a multi-
         *      step solution.  However, their numerical values (65792 and 
         *      68096, respectively) are easily differentiable.
         * 
         * @property {Object} env.browser
         *      A collection of browser information
         * 
         * @property {String} env.browser.name
         *      The name of the browser being used (e.g. Firefox, IE, Chrome)
         *      based on feature testing.
         * 
         * @property {Number} env.browser.version
         *      The version of the browser being used, based on feature-testing.
         */
        var js_env = {
            version: VERSION_STR,
            versionNo: (
                (VERSION_OBJ.MAJOR_VERSION << 16) +
                (VERSION_OBJ.MINOR_VERSION << 8) +
                (VERSION_OBJ.PATCH_VERSION)),
            browser: __browser
        };
        Object.freeze(js_env);

        js.extend("env", js_env);
    }
    
    /**
     * @private
     * @member jspyder
     * 
     * Bootstrap jspyder's algorithm collection.
     * 
     * @param {Object} js Jspyder Object
     */
    function _bootstrapAlg(js) {
        var js_alg;

        if (js["alg"]) {
            return js["alg"];
        }

        /**
         * @class jspyder.alg
         * @member jspyder
         * 
         * JSpyder algorithm collection.
         */
        js_alg = {
            // each: function each(obj, fn, data) {
            //     return (typeof obj.length === "number"
            //         ? js_alg.eachArray(obj, fn, data)
            //         : js_alg.eachObj(obj, fn, data));
            // },
            /**
             * Iterates through a provided object and executes fn() on each
             * step.  Uses a controller to manage the loop.
             * 
             * @param {Object} obj
             *      An object or array to iterate through.  If the element is
             *      invalid, then this function fails quietly and continues
             *      on.
             * 
             * @param {Function} fn
             *      Function with the following parameters:
             *       1: The value of the current item
             *       2: The key of the current item
             *       3: A reference to [obj]
             *       4: A reference to [data]
             * 
             *      The context of this variable points to a controller object
             *      with the members:
             *       - stop() -- stops iterations and breaks from the function
             *       - drop(n) -- deletes the current item from the array
             * 
             *      If the Function returns a value, then that value will be
             *      inserted in the array at that position.
             * 
             * @param {Mixed} data 
             *      A data source to pass as the fourth value in [fn]
             * 
             * @return {Object} JSpyder 
             */
            each: function each(obj, fn, data) {
                var ctl = {
                        "stop": function () {
                            _break = true;
                        },
                        "drop": function (n) {
                            
                        }
                    },
                    _break = false;

                if (obj && typeof obj === "object") {
                    for (var i in obj) {
                        fn.apply(ctl, [obj[i], i, obj, data]);
                        if (_break) {
                            break;
                        }
                    }
                }

                return js;
            },
            arrEach: function each(obj, fn, data) {
                var ctl = {
                        "stop": function () {
                            _break = true;
                            return this;
                        },
                        "drop": function(n) {
                            (obj instanceof Array) && obj.splice(i--, js.alg.number(n, 1));
                            return this;
                        }
                    },
                    _break = false;

                if (obj && typeof obj === "object") {
                    for(var i = 0; i < obj.length; i++) {
                        fn.apply(ctl, [obj[i], i, obj, data]);
                        if(_break) {
                            break;
                        }
                    }
                }

                return js;
            },
            
            escapeString: function (str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },

            /**
             * Uses the selected object as the [this] parameter for the 
             * executed function [fn].
             * 
             * @param {Mixed} _this
             *      The [this] context to apply
             * 
             * @param {Function} fn
             *      The function to run
             * 
             * @param {Array} args
             *      Any parameters to pass to the function, in "apply" format
             * 
             * @return
             *      The value returned by fn
             */
            use: function (_this, fn, args) {
                if (!_this) { _this = null }
                return (typeof fn === "function"
                    ? fn.apply(_this, args)
                    : undefined);
            },
            
            run: function (fn) {
                if (typeof fn === "function") { fn(); }
                return this;
            },

            /**
             * Coerces any value to a boolean
             */
            bool: function bool(b, d) {
                switch (typeof b) {
                    case "undefined":
                        return d || false;
                    case "string":
                        return (/true/i.test(b));
                } 
                return b ? true : false
            },
            
            /**
             * Coerces any value to a Javascript Number object
             */
            "number": function (n, d) {
                var _n = +n;
                return ((_n == n || _n === _n) ? _n : d || 0);
            },
            
            /**
             * coerces any value to a string
             */
            "string": function(s, d) {
                return (typeof s === "string" ? s :
                    (s || s === 0) ? "" + s : d || "");
            },
            
            "object": function(o, d) {
                return (o && typeof o === "object" ? o : d || {});
            },
            
            "date": function(v, d) {
                return ((input instanceof Date || Object.prototype.toString.call(input) === '[object Date]')
                    ? v
                    : new Date());
            },
            
            /**
             * Coerces any value to a INT8 value
             */
            byte: function (u) {
                if (typeof Int8Array === "undefined") {
                    u = +u;
                    u = (u === u ? u : 0) & 0xFF;
                    for (u; u < -0x80; u += 0x100);
                    for (u; u > 0x7F; u -= 0x100);
                    return u;
                }
                var buffer = new ArrayBuffer(1);
                var byteArray = new Int8Array(buffer);
                byteArray[0] = u;
                return byteArray[0];
            },
            
            /**
             * Coerces any value to a UNSIGNED INT8 value
             */
            ubyte: function (u) {
                if (typeof Uint8Array === "undefined") {
                    u = +u;
                    return (u === u ? u : 0) & 0xFF;
                }
                var buffer = new ArrayBuffer(1);
                var byteArray = new Uint8Array(buffer);
                byteArray[0] = u;
                return byteArray[0];
            },
            
            /**
             * Coerces any value to a INT16 value
             */
            short: function (u) {
                if (typeof Int16Array === "undefined") {
                    u = +u;
                    u = (u === u ? u : 0) & 0xFFFF;
                    for (u; u < -0x8000; u += 0x10000);
                    for (u; u > 0x7FFF; u -= 0x10000);
                    return u;
                }
                var buffer = new ArrayBuffer(2);
                var byteArray = new Int16Array(buffer);
                byteArray[0] = u;
                return byteArray[0];
            },
            
            /**
             * Coerces any value to a UNSIGNED INT16 value
             */
            ushort: function (u) {
                if (typeof Uint16Array === "undefined") {
                    u = +u;
                    return (u === u ? u : 0) & 0xFFFF;
                }
                var buffer = new ArrayBuffer(2);
                var byteArray = new Uint16Array(buffer);
                byteArray[0] = u;
                return byteArray[0];
            },
            
            /**
             * Coerces any value to a INT32 value
             */
            int: function (u) {
                if (typeof Int32Array === "undefined") {
                    u = +u;
                    u = (u === u ? u : 0) & 0xFFFFFFFF;
                    for (u; u < -0x80000000; u += 0x100000000);
                    for (u; u > 0x7FFFFFFF; u -= 0x100000000);
                    return u;
                }
                var buffer = new ArrayBuffer(4);
                var byteArray = new Int32Array(buffer);
                byteArray[0] = u;
                return byteArray[0];
            },
            
            /**
             * Coerces any value to a UNSIGNED INT32 value
             */
            uint: function (u) {
                if (typeof Int32Array === "undefined") {
                    u = +u;
                    u = (u === u ? u : 0) % 0x100000000;
                    return (u < 0 ? u * -1 : u);
                }
                var buffer = new ArrayBuffer(4);
                var byteArray = new Uint32Array(buffer);
                byteArray[0] = u;
                return byteArray[0];
            },
            
            /**
             * Coerces any value to a FLOAT value
             */
            float: function (u) {
                if (typeof Float32Array === "undefined") {
                    u = +((+u).toPrecision(8));
                    return (u == u ? u : 0);
                }
                var buffer = new ArrayBuffer(4);
                var byteArray = new Float32Array(buffer);
                byteArray[0] = u;
                return +(byteArray[0].toPrecision(8));
            },
            
            /**
             * Coerces any value to a DOUBLE value
             */
            double: function (u) {
                if (typeof Float64Array === "undefined") {
                    u = +((+u).toPrecision(16));
                    return (u == u ? u : 0);
                }
                var buffer = new ArrayBuffer(8);
                var byteArray = new Float64Array(buffer);
                byteArray[0] = u;
                return byteArray[0];
            },
            
            rad2deg: function (n, d) {
                return js.alg.number(n, d) * 180 / Math.PI;
            },
            
            deg2rad: function (n, d) {
                return js.alg.number(n, d) * Math.PI / 180;
            },
            
            /**
             * Applies an array slice against an object, if it is capable of
             * being performed.  If it cannot be performed, then returns a
             * blank array.
             * 
             * @param {Object} a
             *      The object to attempt a slice against.
             * 
             * @param {Number} [n = 0]
             *      The argument to pass to the slice attempt.
             */
            sliceArray: function(a, n) {
                var ret = a;
                try {
                    ret = Array.prototype.slice.call(a, n || 0);
                }
                catch(e) { ret = []; }
                return ret;
            },
            
            sortArrayObj: function(arr, asc, field /*, ... */) {
                var list = js.alg.sliceArray(arguments, 2);
                arr.sort(function (left, right) {
                    for (var i = 0; left && right && i < list.length; i++) {
                        left = left[list[i]];
                        right = right[list[i]];
                    }
                    
                    return (asc ? left >= right : left <= right);
                });
                return arr;
            },
            
            sortArrayNum: function(arr, asc) {
                arr.sort(function (left, right) {
                    return (asc
                        ? js.alg.number(left) - js.alg.number(right)
                        : js.alg.number(right) - js.alg.number(left));
                });
                return arr;
            },
            
            /**
             * Performs an in-place concatenation of the 2nd-Nth parameter
             * arrays into arrRef.  Variadic function.
             * 
             * @param {Array} arrRef
             *      The array to merge into.
             * 
             * @param {Array} [arrFrom]
             *      (Variadic) The arrays to merge from.
             * 
             * @return {Array} arrRef parameter
             */
            joinArray: function(arrRef, arrFrom /*, ... */) {
                // limit pulled from Google's closure library:
                // https://github.com/google/closure-library/commit/da353e0265ea32583ea1db9e7520dce5cceb6f6a
                var CHUNK_SIZE = 8192; 
                
                var i, chunk, j;
                for(i = 1; i < arguments.length; i++) {
                    // ensure we convert this to an array
                    arrFrom = js.alg.sliceArray(arguments[i]);
                    
                    // skip blank arrays
                    for(j = 0; j < arrFrom.length; j += CHUNK_SIZE) {
                        chunk = arrFrom.slice(j, j + CHUNK_SIZE);
                        Array.prototype.push.apply(arrRef, chunk);
                    }
                }
                
                return arrRef;
            },
            
            /**
             * Prepares a function for execution. If the function cannot be
             * executed, then returns null.
             * 
             * @param {Object} thisArg
             *      The context to use with the function.
             * 
             * @param {Function} fn
             *      The function to execute when the returned function is
             *      executed.
             * 
             * @param {Array} args
             *      An array of arguments to pass to [fn] when it is executed.
             *      Any additional functions passed to the prepared function
             *      will be appended to the end of args.
             * 
             * @return {Function}
             *      A prepared function, which will trigger [fn] when executed. 
             */
            bindFn: function(thisArg, fn, args) {
                args = (args && args.length
                    ? js.alg.sliceArray(args)
                    : !args
                        ? []
                        : [args]);
                        
                return function() {
                    var ret = null;
                    if(typeof fn === "function") { ret = fn.apply(thisArg, args.concat(js.alg.sliceArray(arguments))); }
                    return ret;
                };
            },
            
            /**
             * Variadic function to perform a shallow merge of two or more 
             * objects.
             * 
             * @param {Object} base
             *      The object to merge all other traits into.
             * 
             * @return {Object} Returns [base].
             */
            mergeObj: function(base /*, ... */) {
                var into = base,
                    args = js.alg.sliceArray(arguments, 1);
                    
                js.alg.each(args, __eachObject, into);
                
                function __eachObject(from, _1, _2, into) {
                    if(from && into) {
                        js.alg.each(from, __eachProperty, into);
                    }
                    return;
                }
                
                function __eachProperty(val, prop, from, into) {
                    if(from.hasOwnProperty(prop)) {
                        into[prop] = val;
                    }
                    return;
                }

                return base;
            },
            cloneObj: function(obj) {
                if(!obj || typeof obj !== "object") { return obj; }
                return js.alg.mergeObj(obj.constructor(), obj);
            },
            deepCloneObj: function(obj) {
                if(!obj || typeof obj !== "object") { return obj; }
                obj = this.cloneObj(obj);
                
                js.alg.each(obj, function(value, key, obj) {
                    obj[key] = js.alg.deepCloneObj(value);
                });
                
                return obj;
            },
            
            keycodes: {
                KC_Backspace: 8,
                KC_Tab: 9,
                KC_Enter: 13,
                KC_Shift: 16,
                KC_Ctrl: 17,
                KC_Alt: 18,
                KC_Pause: 19,
                KC_Break: 19,
                KC_CapsLock: 20,
                KC_Escape: 27,
                KC_Space: 32,
                KC_PageUp: 33,
                KC_PageDown: 34,
                KC_End: 35,
                KC_Home: 36,
                KC_LeftArrow: 37,
                KC_UpArrow: 38,
                KC_RightArrow: 39,
                KC_DownArrow: 40,
                KC_Insert: 45,
                KC_Delete: 46,
                KC_0: 48,
                KC_1: 49,
                KC_2: 50,
                KC_3: 51,
                KC_4: 52,
                KC_5: 53,
                KC_6: 54,
                KC_7: 55,
                KC_8: 56,
                KC_9: 57,
                KC_A: 65,
                KC_B: 66,
                KC_C: 67,
                KC_D: 68,
                KC_E: 69,
                KC_F: 70,
                KC_G: 71,
                KC_H: 72,
                KC_I: 73,
                KC_J: 74,
                KC_K: 75,
                KC_L: 76,
                KC_M: 77,
                KC_N: 78,
                KC_O: 79,
                KC_P: 80,
                KC_Q: 81,
                KC_R: 82,
                KC_S: 83,
                KC_T: 84,
                KC_U: 85,
                KC_V: 86,
                KC_W: 87,
                KC_X: 88,
                KC_Y: 89,
                KC_Z: 90,
                KC_LWin: 91,
                KC_RWin: 92,
                KC_Select: 93,
                KC_Num0: 96,
                KC_Num1: 97,
                KC_Num2: 98,
                KC_Num3: 99,
                KC_Num4: 100,
                KC_Num5: 101,
                KC_Num6: 102,
                KC_Num7: 103,
                KC_Num8: 104,
                KC_Num9: 105,
                KC_NumAsterisk: 106,
                KC_NumPlus: 107,
                KC_NumMinus: 109,
                KC_NumPeriod: 110,
                KC_NumSlash: 111,
                KC_F1: 112,
                KC_F2: 113,
                KC_F3: 114,
                KC_F4: 115,
                KC_F5: 116,
                KC_F6: 117,
                KC_F7: 118,
                KC_F8: 119,
                KC_F9: 120,
                KC_F10: 121,
                KC_F11: 122,
                KC_F12: 123,
                KC_NumLock: 144,
                KC_ScrollLock: 145,
                KC_SemiColon: 186,
                KC_Equal: 187,
                KC_Comma: 188,
                KC_Dash: 189,
                KC_Period: 190,
                KC_FSlash: 191,
                KC_BSlash: 220,
                KC_Grave: 192,
                KC_LBracket: 219,
                KC_RBracket: 221,
                KC_Apos: 222
            },
            
            min: function(a,b) {
                var min = a;
                js.alg.each(arguments, function(arg) {
                    min = (typeof min === "undefined" ? arg : min);
                    min = (min > arg ? arg : min);
                });
                return min;
            },
            
            max: function(a, b) {
                var max = a;
                js.alg.each(arguments, function(arg) {
                    max = (typeof max === "undefined" ? arg : max);
                    max = (max < arg ? arg : max);
                });
                return max;
            }
        };

        if (js) {
            Object.defineProperty(js, "alg", { value: js_alg });
        }
        return js_alg;
    }

    /**
     * @private
     * @member jspyder
     * 
     * Bootstraps the jspyder.dom library
     */
    function _bootstrapDom(js) {
        if (js["dom"]) {
            return js["dom"];
        }
        
        /**
         * @class jspyder.dom
         * 
         * @member jspyder
         * 
         * Creates a wrapper around the DOM element and allows chaining of
         * function calls against it.
         * 
         * @param {String|Object} element 
         *      - If a string is passed, then determines whether it represents
         *      a CSS selector or a set of HTML tags.  If the former, then 
         *      attempts a CSS Selector Query to get the data.  If the latter,
         *      then builds the DOM elements, and stores them as the affected
         *      elements.
         *      - If a DOM element is passed, then directly wraps the DOM element.
         *      - If a jspyder.dom object is passed, then returns the object.
         * 
         * @param {Function} [fn]
         *      The function to run against all of the DOM elements stored in
         *      the object immediately after initialization but before the
         *      next command.  It should accept parameters in the same format
         *      as jspyder.dom.each, where the fourth parameter is [args].
         * 
         * @param {Array} [args] 
         *      The fourth parameter to pass into [fn] when it is run against
         *      all of the elements in the object.
         * 
         * @return {Object} 
         *      Object, based on js.dom.fn as the prototype
         */
        function js_dom(element, fn, args) {
            element = element || [];
            var s = element, el;

            if (!(js.dom.fn.isPrototypeOf(element))) {

                if (typeof s === "string") {
                    try {
                        element = document.querySelectorAll(s);
                    } catch (e) {
                        element = _parseHtml(s);
                    }
                }


                if (__isElement(element)) {
                    element = [element];
                }

                element = Array.prototype.slice.call(element, 0);
                el = Object.create(js_dom.fn, {
                    _element: { value: element }
                });

                el.each(function (v) {
                    if (!v.__jspyder) {
                        v.__jspyder = _createRegistry();
                    }
                });
            }
            else {
                el = element;
            }

            el.use(fn, args);
            return el;
        }

        /**
         * @private
         * Returns TRUE if the node is a DOM Node
         */
        function __isNode(o) {
            return js.alg.bool(typeof Node === "object"
                ? o instanceof Node
                : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
        }

        /**
         * @private
         * Returns TRUE if the node is a DOM Element
         */
        function __isElement(o) {
            return js.alg.bool( (typeof HTMLElement === "object" && o instanceof HTMLElement) || 
                (o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string"));
        }
        
        /**
         * @private
         * Gets the DOM object's classes as an array
         */
        function __getDomClasses(element) {
            return (__isElement(element)
                ? element.className.replace(/(^\s+)|(\s(?=\s))|(\s+$)/g, "").split(" ")
                : []);
        }
        
        /**
         * @private
         * Sets the DOM object's class based on the enable flag
         */
        function _setDomClass(element, cls, enable) {
            var clss = __getDomClasses(element),
                index = clss.indexOf(cls),
                change = false;

            if (enable && index === -1) {
                clss.push(cls);
                change = true;
            }
            else if (!enable && index !== -1) {
                clss.splice(index, 1);
                change = true;
            }

            if (change) {
                element.className = clss.join(" ");
            }

            return change;
        }
        
        /**
         * @private
         * Sets the DOM object's class based on the enable flag
         */
        function _getDomClass(element, cls) {
            return (__getDomClasses(element).indexOf(cls) !== -1);
        }

        /**
         * @private
         * Converts the string provided into an array of DOM elements and
         * returns them as an array (or blank array if invalid)
         */
        function _parseHtml(s) {
            var div = document.createElement("div"),
                arr = [];

            div.innerHTML = s;
            for (var i = 0; i < div.children.length; i++) {
                arr.push(div.children[i]);
            }

            return arr;
        }

        // Template for selected objects: js.dom.fn
        js_dom.fn = {
            _element: [],

            get count() { return this._element.length; },

            /**
             * Iterates through all of the elements in the jsDom object.
             * 
             * @param {Function} fn
             *      Function with the following parameters:
             *       1. The value of the current item
             *       2. The key of the current item
             *       3. A reference to [obj]
             *       4. A reference to [data]
             * 
             *      The context of this variable points to a controller object
             *      with the members:
             *       - stop() -- stops iterations and breaks from the function
             * 
             *      If the Function returns a value, then that value will be
             *      inserted in the array at that position.
             * 
             * @param {Mixed} data 
             *      A data source to pass as the fourth value in [fn]
             */
            each: function (fn, data) {
                js.alg.arrEach(this._element, fn, data);
                return this;
            },

            /**
             * Uses the current jsDom object within the specified function
             * 
             * @param {Function} fn
             *      The function to run
             * 
             * @param {Array} args
             *      Any parameters to pass to the function, in "apply" format
             */
            use: function (fn, args) {
                js.alg.use(this, fn, args);
                return this;
            },

            /**
             * Applies the specified CSS template to all of the elements in
             * the jsDom object
             * 
             * @param {Object} css
             *      A JavaScript Object where keys correspond to attributes.
             *      If more than one value must be applied, then both values
             *      should be placed in an array; or can be passed as a comma-
             *      separated list in a string.
             * 
             * @param {Function} fn
             *      A callback, which takes [css] as a parameter and uses
             *      [this] as the context.
             */
            setCss: function (css, fn) {
                if (css && typeof css === "object") {
                    var _each = js.alg.each;

                    // iterate each dom item
                    this.each(function (el, _1, _2, css) {
                        // iterate each css field
                        _each(css, function (val, attr, _1, el) {
                            el["style"][attr] = val;
                        }, el);

                        if (typeof fn === "function") { js_dom(el, fn, [css]); }
                    }, css);
                }
                return this;
            },

            /**
             * Gathers whether the specified CSS attributes have been assigned,
             * and then calls [fn] with the context of the jsDom object, and
             * the parameter being the css object passed in.
             * 
             * @param {Object} css
             *      A JavaScript Object where keys correspond to attributes.
             *      Values will be loaded into the object reference.
             * 
             * @param {Function} fn
             *      A callback, which takes [css] as a parameter and uses
             *      [this] as the context.
             */
            getCss: function (css, fn) {
                if (css && typeof css === "object") {
                    var o = Object.create(css);
                    var _each = js.alg.each;

                    // iterate each element
                    this.each(function (el, i, _2, css) {
                        var cStyle = getComputedStyle(el),
                            eStyle = el["style"];
                        css = (!(+i) ? css.first : css.others);

                        // iterate each css field
                        _each(css, function (_, attr, css, data) {
                            css[attr] = data.style[attr] || data.cStyle[attr];
                        }, { style: eStyle, cStyle: cStyle });

                        // callback
                        if (typeof fn === "function") { js_dom(el, fn, [css]); }
                    }, { first: css, others: o });
                }
                return this;
            },
            
            getPosition: function (fn) {
                this.each(function (el) {
                    var pos = el.getBoundingClientRect();
                    js.dom(el).use(fn, [pos]);
                })
                return this;
            },
            exportPosition: function () {
                var pos = null;
                this.at(0).use(function() {
                    pos = this._element[0].getBoundingClientRect();
                });
                
                return pos;
            },
            
            getOffsetPosition: function(fn) {
                this.each(function () {
                    var el = this.parentNode,
                        ret = {
                            top: 0, left: 0, bottom: 0, right: 0, x: 0, y: 0, height: 0, width: 0
                        };
                    while (el && getComputedStyle(el).position === "static") {
                        el = el.parentNode;
                    }
                    
                    if (el) {
                        var me = this.getBoundingClientRect(),
                            pr = el.getBoundingClientRect();
                            
                        js.each(ret, function (v, p, ret) {
                            ret[p] = pr[p] - me[p];
                        });
                    }
                    
                    js.dom(this).use(fn, [ret]);
                    return;
                });
                return this;
            },

            /**
             * Gathers whether the specified DOM attributes have been assigned,
             * and then calls [fn] with the context of the jsDom object, and
             * the parameter being the [attrs] object passed in.
             * 
             * @param {Object} attrs
             *      A JavaScript Object where keys correspond to attributes.
             *      Values will be loaded into the object reference.
             * 
             * @param {Function} fn
             *      A callback, which takes [attrs] as a parameter and uses
             *      [this] as the context.
             */
            getAttrs: function (attrs, fn) {
                if (attrs && typeof attrs === "object") {
                    var o = Object.create(attrs);
                    var _each = js.alg.each;

                    // iterate each element
                    this.each(function (el, i, _2, attrs) {
                        attrs = (!i ? attrs.first : attrs.others);
                        // iterate each attribute
                        _each(attrs, function (_, a, attrs) {
                            attrs[a] = el.getAttribute(a);
                        });
                        // callback
                        if (typeof fn === "function") { js_dom(el, fn, [attrs]); }
                    }, { first: attrs, others: o });
                }
                return this;
            },
            
            /**
             * Gathers whether the specified DOM attributes have been assigned,
             * and then calls [fn] with the context of the jsDom object, and
             * the parameter being the [attrs] object passed in.
             * 
             * @param {Object} attrs
             *      A JavaScript Object where keys correspond to attributes.
             *      Values will be loaded into the object reference.
             * 
             * @param {Function} fn
             *      A callback, which takes [attrs] as a parameter and uses
             *      [this] as the context.
             */
            setAttrs: function (attrs, fn) {
                if (attrs && typeof attrs === "object") {
                    var o = Object.create(attrs);
                    var _each = js.alg.each;

                    // iterate each element
                    this.each(function (el, i, _2, attrs) {
                        attrs = (!(+i) ? attrs.first : attrs.others);
                        // iterate each attribute
                        _each(attrs, function (v, a, attrs, el) {
                            if (v === null || typeof v === "undefined") {
                                el.removeAttribute(a);
                            }
                            else {
                                el.setAttribute(a, v);
                            }
                        }, el);
                        // callback
                        if (typeof fn === "function") { js_dom(el, fn, [attrs]); }
                    }, { first: attrs, others: o });
                }
                return this;
            },
            
            /**
             * Gets the parent(s) of the elements in the node, and runs the
             * function [fn].  Exports the first DOM node.
             * 
             * @param {Function} fn
             */
            parents: function (fn) {
                this.each(function (element, i, elements) {
                    js_dom(element.parentNode, fn, [element]);
                });
                return this;
            },
            
            /**
             * Gets the children of the elements in the node
             * 
             * @param {Function} fn
             * @param {Mixed} [data]
             *      Information to pass to the parameter [fn].
             */
            children: function (fn, data) {
                this.each(function (element, i, elements) {
                    var child = element.firstElementChild;
                    while(child) {
                        js_dom(child, fn, [child, data]);
                        child = child.nextElementSibling;
                    }
                });
                return this;
            },
            
            /**
             * Applies function [fn] to the [n]th item in the jsDom using the
             * same format as if it were selected with js.dom().
             *
             * @param {Number} n
             *      Index of the item to grab  
             * 
             * @param {Function} fn
             */
            at: function (n, fn) {
                n = js.alg.uint(n);
                return js_dom(this._element[n] || null, fn);
            },
            
            /**
             * Applies function [fn] to the [n]th element in the jsDom using
             * the same format as if it were selected with js.dom().
             *
             * @param {Number} n 
             *      Index of the element to grab
             * 
             * @param {Function} fn
             */
            element: function (n, fn) {
                var self = this;
                this.at(n, function () {
                    var el = this._element[0];
                    if (el && typeof fn === "function") {
                        fn.apply(el, [this]);
                    }
                });
                return this;
            },
            
            /**
             * Attaches the elements from the jsDom to the first element
             * identified in the parent object.
             *
             * @param {Mixed} parent
             *      The element/string/etc. to which this jsDom shuld be 
             *      attached
             * 
             * @param {Function} fn
             *      A callback which takes the parent as the context, and
             *      this jsDom object as the first parameter.
             */
            attach: function (parent, fn) {
                var children = this;
                js_dom(parent).element(0, function (p) {
                    var doc = document.createDocumentFragment();
                    children.each(js_dom.fn._append, doc);
                    this.appendChild(doc);
                    p.use(fn, children);
                });
                return this;
            },
            
            attachBefore: function (parent, fn) {
                var children = this;
                js_dom(parent).element(0, function (p) {
                    var doc = document.createDocumentFragment();
                    children.each(js_dom.fn._append, doc);
                    this.parentNode && this.parentNode.insertBefore(doc, p);
                    p.use(fn, children);
                });
                return this;
            },
            
            attachAfter: function (parent, fn) {
                var children = this;
                js_dom(parent).element(0, function (p) {
                    var doc = document.createDocumentFragment();
                    children.each(js_dom.fn._append, doc);
                    this.parentNode && this.parentNode.insertBefore(doc, this.nextSibling);
                    p.use(fn, children);
                });
                return this;
            },
            
            /**
             * Attaches the element identified by [child] to the first element
             * identified in the jsDom object..
             *
             * @param {Mixed} child
             *      The element/string/etc. which should be attached to this
             *      jsDom object.
             */
            append: function (child) {
                this.element(0, function () {
                    var doc = document.createDocumentFragment();
                    js_dom(child).each(js_dom.fn._append, doc);
                    this.appendChild(doc);
                })
                return this;
            },
            
            _append: function (c, _1, _2, doc) {
                doc.appendChild(c);
            },
            
            insertBefore: function (child) {
                this.element(0, function () {
                    var doc = document.createDocumentFragment();
                    js_dom(child).each(js_dom.fn._append, doc);
                    this.parentNode && this.parentNode.insertBefore(doc, this);
                });
                return this;
            },
            
            insertAfter: function (child) {
                this.element(0, function () {
                    var doc = document.createDocumentFragment();
                    js_dom(child).each(js_dom.fn._append, doc);
                    this.parentNode && this.parentNode.insertBefore(doc, this.nextSibling);
                });
                return this;
            },
            
            /**
             * Attaches the element identified by [child] to the first element
             * identified in the jsDom object..
             *
             * @param {Mixed} child
             *      The element/string/etc. which should be attached to the top 
             *      of this jsDom object.
             */
            prepend: function(child) {
                this.element(0, function () {
                    var doc = document.createDocumentFragment();
                    js_dom(child).each(function (c, _1, _2, doc) {
                        doc.appendChild(c);
                    }, doc);
                    this.insertBefore(doc, this.firstChild);
                })
                return this;
            },
            
            /**
             * Removes all of the elements defined in this jsDom object from
             * their parent nodes.
             *
             * @param {Mixed} parent
             *      The element/string/etc. which should be attached to this
             *      jsDom object.
             */
            remove: function () {
                this.each(function (child) {
                    child.parentNode ? child.parentNode.removeChild(child) : null;
                });
                return this;
            },
            
            /**
             * Adds the defined classes to all of the elements in this jsDom 
             * object.
             *
             * @param {Object} classes
             *      An object which defines classes as the key, and identifies
             *      whether they should be defined as the value.  For example,
             *      the following line would turn one class on, another off,
             *      and a third class would toggle:
             * 
             *      js.dom("#test").setClasses({ 
             *          "turn-on": true, //< truthy
             *          "turn-off": false, //< falsy
             *          "toggle-class": "toggle" //< string literal
             *      });
             */
            setClasses: function (classes) {
                // for every element jsDom...
                this.each(function (element, _1, _2, classes) {
                    // iterate the classes...
                    js.alg.each(classes, function (classState, className, _1, element) {
                        if (classState === "toggle") {
                            classState = !_getDomClass(element, className);
                        }
                        _setDomClass(element, className, classState);
                    }, element)
                }, classes);
                return this;
            },
            
            /**
             * Retrieves the defined classes from all of the elements in this 
             * jsDom object, and then runs the designated callback function.
             *
             * @param {Object} classes
             *      An object which defines classes as the key, and identifies
             *      whether they should be defined as the value.  For example,
             *      the following line would turn one class on, another off,
             *      and a third class would toggle:
             * 
             *      js.dom("#test").setClasses({ 
             *          "turn-on": true, //< truthy
             *          "turn-off": false, //< falsy
             *          "toggle-class": "toggle" //< string literal
             *      });
             */
            getClasses: function (classes, fn) {
                // for every element jsDom...
                this.each(function (element, i, _2, classes) {
                    // iterate the classes...
                    classes = (!js.alg.number(i) ? classes.first : classes.second);
                    js.alg.each(classes, function (_1, className, _2, o) {
                        o.classes[className] = _getDomClass(o.el, className);
                    }, { el: element, classes: classes });
                    
                    // run the callback
                    js_dom(element, fn, [classes]);
                }, { first: classes, second: Object.create(classes) });
                return this;
            },
            
            /**
             * Inserts an event handler on all of the jsDom elements, for each
             * event in a space-separated list.
             *
             * @param {String} events
             *      An space-separated list of event types to trigger the
             *      callback on.
             * 
             * @param {Function} handler
             *      A callback function to use for the event callback.
             */
            on: function (events, handler) {
                events = (events || "").split(/\s+/);

                js.alg.each(events, function (event, _1, _2, self) {
                    js.alg.each(self._element, function (element) {
                        element.addEventListener(event, handler);
                        if (!element.__jspyder.fetch("js-events-" + event)) {
                            element.__jspyder.stash("js-events-" + event, [handler]);
                        }
                        else {
                            element.__jspyder.fetch("js-events-" + event).push(handler);
                        }
                    });
                }, this);

                return this;
            },
            
            off: function(events, handler) {
                events = (events || "").split(/\s+/);
                var self = this;

                js.alg.each(events, function(event) {
                    js.alg.each(self._element, function(element) {
                        var elist = element.__jspyder.fetch("js-events-" + event),
                            index = -1; 
                        element.removeEventListener(event, handler);
                        if(elist) {
                            while((index = elist.indexOf(handler)) >= 0) {
                                elist[index] = null;
                            }
                            elist.sort().splice(0,elist.indexOf(null));
                        }
                    });
                });
            },

            /// triggers the event(s) provided
            /**
             * Dispatches the event(s) identified for all of the wrapped DOM
             * elements.
             * 
             * @param {String} event
             *      All of the events to trigger for the wrapped DOM elements.
             */
            trigger: function (event) {
                event = (event || "").toString().split(/\s+/);

                var e;
                for (var i = 0; i < event.length; i++) {
                    if(!event[i]) { continue; }
                    try {
                        e = new Event(event[i], { "bubbles": true, "cancelable": false });
                    }
                    catch (_) {
                        e = document.createEvent("Event");
                        e.initEvent(event[i], true, true);
                    }
                    this.each(function (el) {
                        el.dispatchEvent(e);
                    });
                }

                return this;
            },

            /**
             * Sets the innerHTML For each of the wrapped elements with the
             * identified value.
             * 
             * @param {String} html
             *      New HTML to push into the wrapped elements.
             */
            setHtml: function (html) {
                this.each(function (element) {
                    element.innerHTML = html || "";
                });
                return this;
            },

            /// gets the inner html value.
            getHtml: function (fn) {
                if (typeof fn === "function") {
                    this.each(function (element) {
                        fn.call(element, element.innerHTML || "");
                    });
                }
                return this;
            },
            
            getText: function(fn) {
                if(typeof fn === "function") {
                    this.each(function(element) {
                        fn.call(element, element.textContent || "");
                    });
                }
                return this;
            },
            
            setText: function(text) {
                this.each(function(element) {
                    element.textContent = text || "";
                });
                return this;
            },
            
            /**
             * Searches through each object in the jspyder.dom element, and
             * returns an object containing the DOM nodes which match the 
             * provided CSS selector.
             * 
             * @param {Mixed} cssSelector
             *      CSS Selector to search for.
             * 
             * @return {Object}
             *      JSpyder DOM Element (jspyder.dom) containing all of the 
             *      found elements.
             */
            find: function(cssSelector) {
                var $found = js.dom(),
                    _found = $found._element;
                    
                this.each(function(element) {
                    var children = element.querySelectorAll(cssSelector);
                    js.alg.joinArray(_found, js.dom(children)._element);
                });
                
                return $found;
            },
            
            filter: function (cssSelector) {
                var $found = js.dom(),
                    _found = $found._element;
                    
                this.each(function (element) {
                    if (js_dom.fn._matches(element, cssSelector)) {
                        _found.push(element);
                    }
                });
                
                return $found;
            },
            _matches: function (element, selector) {
                var fn = "";
                if(element.matches) { fn = "matches"; }
                else if (element.matchesSelector) { fn = "matchesSelector"; }
                else if (element.msMatchesSelector) { fn = "msMatchesSelector"; }
                else if (element.mozMatchesSelector) { fn = "mozMatchesSelector"; }
                else if (element.webkitMatchesSelector) { fn = "webkitMatchesSelector"; }
                else if (element.oMatchesSelector) { fn = "oMatchesSelector"; }
                else {
                    // polyfill from MDN
                    js_dom.fn._matches = function (element, selector) {
                        var matches = (element.document || element.ownerDocument).querySelectorAll(selector),
                            i = matches.length;
                        while (--i >= 0 && matches.item(i) !== element);
                        return i > -1;
                    }
                }
                
                js_dom.fn._matches = function (element, selector) {
                    return fn && element[fn](selector);
                }
                return this._matches(element, selector);
            },
            
            /**
             * Adds the specified elements to this selection.  Takes the same
             * selection format as jspyder.dom.
             */
            and: function(elements) {
                js_dom(elements, this._and, [this._element]);
                return this;
            },
            
            /** @private */
            _and: function(_elements) {
                js.alg.joinArray(_elements, this._element);
            },
            
            /**
             * Cycles through the wrapped elements to input the identified 
             * objects 
             */
            template: function(fields) {
                this.each(this._template, { 
                    self: this,  
                    fields: fields
                });
                return this;
            },
            
            /** @private */
            _template: function(element, i, elements, o) {
                o.self._template_parse(element, o.fields);
                return;
            },
            /** @private */
            _template_parse: function(tDOM, fields) {
                var names = Object.keys(fields),
                    n, name, field;

                for (n = 0; n < names.length; n++) {
                    name = names[n];
                    field = fields[name];

                    this._template_insert(tDOM, '${' + name + '}', field);
                }
                return tDOM;
            },
            /** @private */
            _template_insert: function(tDOM, text, element) {
                var children = tDOM.childNodes,
                    child, c;

                for (c = 0; c < children.length; c++) {
                    child = children[c];
                    if (child.nodeType === 3) {
                        this._template_replace(child, text, element);
                    }
                    else {
                        this._template_insert(child, text, element);
                    }
                }

                return true;
            },
            /** @private */
            _template_replace: function(node, text, element) {
                var index = node.data.indexOf(text),
                    parent = node.parentNode,
                    next;

                if (index === -1) { return false; }
                
                next = node.splitText(index);
                next.data = next.data.substr(text.length);
                js.dom(element)
                    .each(function(element) {
                        parent.insertBefore(element, next);
                    });
                // parent.insertBefore(element, next);
                return true;
            },
            
            /**
             * Sets the value of the selected elements
             */
            setValue: function(val, fn) {
                return this.each(function(element) {
                    if(typeof element.value !== "undefined" && element.tagName !== "LI") {
                        element.value = val;
                    }
                    else {
                        element.setAttribute("value", val);
                    }
                }).use(fn);
            },
            
            setOverride: function(name, fn) {
                this.each(function(element) {
                    element.__jspyder.override = (element.__jspyder.override || {});
                    element.__jspyder.override[name] = fn; 
                });
                return this;
            },
            getOverride: function(name) {
                var fn = null;
                this.each(function(element) {
                    if(element.__jspyder.override && element.__jspyder.override[name]) {
                        fn = element.__jspyder.override[name];
                        this.stop();
                    }
                });
                return fn;
            },
            
            /**
             * Gets the value of the wrapped elements
             */
            getValue: function(fn) {
                var self = this;
                return self.each(function(element) {
                    var $me = js.dom(element),
                        override = $me.getOverride("getValue");
                        
                    if(override) {
                        $me.use(override, [fn]);
                        return;
                    }
                    
                    var value = (typeof element.value !== "undefined"
                        ? element.value : element.getAttribute("value"));
                        
                    if(element.tagName === "LI") {
                        value = element.getAttribute("value");
                    }
                         
                    if(value !== "undefined") {
                        // get value types
                        self.use(fn, [value]);
                    }
                });
            },
            exportValue: function() {
                var value = null;
                this.getValue(function(v) { value = v; });
                return value;
            },
            getProps: function(obj, fn) {
                this.each(function(element) {
                    js.alg.each(obj, function(val, name, obj) {
                        obj[name] = element[name];
                    });
                });
                this.use(fn, [obj]);
                return this;
            },
            setProps: function(obj) {
                this.each(function(element) {
                    js.alg.each(obj, function(val, name) {
                        element[name] = val;
                    });
                });
                return this;
            }
        };

        if (js) {
            Object.defineProperty(js, "dom", { value: js_dom });
        }
        return js_dom;
    }

    /**
     * Bootstraps the jspyder lib plugin
     * 
     * @private
     * @member jspyder
     */
    function _bootstrapLib(js) {
        var _js_lib_repo = _createRegistry();
        
        /**
         * @method lib
         * @member jspyder
         * 
         * Retrieves the stored functions pushed in by jspyder.lib.register
         */
        function js_lib(name, args, fn) {
            var _fn = _js_lib_repo.fetch(name),
                ret = null;
            if (_fn && typeof _fn === "function") {
                ret = _fn.apply(js, args);
            }
            if (typeof fn === "function") {
                fn.call(this, ret);
            }
            return this;
        }
        /**
         * @method register
         * @member jspyder.lib
         * 
         * Stores custom functions in the jspyder registry 
         */
        js_lib.register = function (name, fn) {
            if (typeof name == "string") {
                if (typeof fn === "function" || fn === null) {
                    _js_lib_repo.stash(name, fn);
                }
            }

            return this;
        };
        /**
         * @method registerSet
         * @member jspyder.lib
         * 
         * Stores a set of custom functions in the jspyder registry, where the
         * name of the function is defined by the object keys and the function
         * definitions are stored as the object values.
         */
        js_lib.registerSet = function (o) {
            if (o && typeof o === "object") {
                js.alg.each(o, function (fn, name) {
                    js_lib.register(name, fn);
                });
            }
            return this;
        };

        js.extend("lib", js_lib);
    }
    
    /**
     * Creates a hidden registry, and returns an interface to interact with it
     * 
     * - fetch(key, Function({ key: key, value: value })) 
     * - stash(key, value)  
     */
    function _createRegistry() {
        var _registry = {};
        return {
            fetch: function (key, fn) {
                var val = { key: key, value: _registry[key] };
                (typeof fn === "function") && fn(val);
                return val.value;
            },
            stash: function (key, val) {
                _registry[key] = val;
                return val;
            }
        };
    }

    return jspyder;
})(window, "js");
