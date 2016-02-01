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
                BROWSER_VERSION = 1;
            }
            else if (window.MSInputMethodContext) {
                BROWSER_NAME = "Edge";
                if (JSON.stringify({ foo: Symbol() }) === "{}") { BROWSER_VERSION = 13; }
                else if (!window.RTCIceGatherOptions) { BROWSER_VERSION = 12; }
                else { BROWSER_VERSION = 11; }
            }
            else if (false) {
                BROWSER_NAME = "Safari"; 9.1;
                if (window.CSS.supports) { BROWSER_VERSION = 9; }
                else if (!window.CSS.supports) { BROWSER_VERSION = 8; }
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
                        _break = false;
                    }
                },
                    _break = false;

                if (obj && typeof obj === "object") {
                    var newVal;
                    for (var i in obj) {
                        fn.apply(ctl, [obj[i], i, obj, data]);
                        if (_break) {
                            break;
                        }
                    }
                }

                return js;
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
            bool: function bool(b) { return b ? true : false },
            
            /**
             * Coerces any value to a Javascript Number object
             */
            "number": function (n) {
                var _n = +n;
                return ((_n == n || _n === _n) ? _n : 0);
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

            if (!(element instanceof js.dom)) {

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
            return js.alg.bool(typeof HTMLElement === "object"
                ? o instanceof HTMLElement
                : o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string");
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
            _export: null,
            exp: function () {
                return this._export;
            },

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
                js.alg.each(this._element, fn, data);
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
                this._export = js.alg.use(this, fn, args);
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
                this._export = css;
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
                this._export = attrs;
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
                var self = this;
                this.each(function (element, i, elements) {
                    var d = js_dom(element.parentNode, fn, [element]);

                    if (!js.alg.number(i)) { self._export = d; }
                });
                return this;
            },
            
            /**
             * Gets the children of the elements in the node
             * 
             * @param {Function} fn
             */
            children: function (fn) {
                this.each(function (element, i, elements) {
                    for (var j = 0; j < element.children.length; j++) {
                        js_dom(element.children[j], fn, [element.children[j]]);
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
                    self._export = el;
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
                    children.each(function (child, _1, _2, doc) {
                        doc.appendChild(child);
                    }, doc);
                    this.appendChild(doc);
                    p.use(fn, children);
                });
                return this;
            },
            
            /**
             * Attaches the element identified by [child] to the first element
             * identified in the jsDom object..
             *
             * @param {Mixed} parent
             *      The element/string/etc. which should be attached to this
             *      jsDom object.
             */
            append: function (child) {
                this.element(0, function () {
                    var doc = document.createDocumentFragment();
                    js_dom(child).each(function (c, _1, _2, doc) {
                        doc.appendChild(c);
                    }, doc);
                    this.appendChild(doc);
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
                this._export = classes;
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

            /// triggers the event(s) provided
            trigger: function (event) {
                event = (event || "").toString().split(/\s+/);

                var e
                for (var i = 0; i < event.length; i++) {
                    try {
                        e = new Event("mousedown", { "bubbles": true, "cancelable": false });
                    }
                    catch (_) {
                        e = document.createEvent("Event");
                        e.initEvent("mousedown", true, true);
                    }
                    this.each(function (el) {
                        el.dispatchEvent(e);
                    });
                }

                return this;
            },

            /// Sets the inner html value
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
                    js.alg.joinArray(_found, element.querySelectorAll(cssSelector));
                });
                
                return $found;
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
                js.alg.joinArray(_elements, this._elements);
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