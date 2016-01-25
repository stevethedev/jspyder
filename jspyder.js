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

(function (global, alias) {

    // Ensure that all jspyder references point to the same jspyder object.
    var jspyder = global["jspyder"],
        document = global["document"] || window["document"];

    if (!jspyder) {
        jspyder = _bootstrap(global);
    }
    if (!global[alias]) {
        global[alias] = jspyder;
    }

    /**************************************************************************
     * Bootstraps (create/configure) JSpyder engine.  Basic modules are:
     *  - lib
     *  - alg
     *  - data
     *  - dom
     *************************************************************************/
    function _bootstrap(global) {
        var js = global["jspyder"] = function () {

        }
        
        
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
        
        _bootstrapEnv(js);
        

        // js.lib
        // Stores library functions
        function jsLib(name, arg1) {
            var fn;

            fn = _jsLibFn[name];
            if (!fn) {
                return null;
            }



        }
        var _jsLibFn = {};
        Object.defineProperties(jsLib, {
            fn: { value: _jsLibFn }
        });

        // JSpyder Algorithms
        _bootstrapAlg(js);
        _bootstrapDom(js);
        
        return js;
    }

    /**************************************************************************
     * Builds and attaches the js.alg object
     *************************************************************************/
    function _bootstrapEnv(js) {
        var VERSION_OBJ = {
                MAJOR_VERSION: 0,
                MINOR_VERSION: 0,
                PATCH_VERSION: 0
            },
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
                else if (Reflect) { BROWSER_VERSION = 42; }
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
                if (JSON.stringify({foo: Symbol()}) === "{}") { BROWSER_VERSION = 13; }
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
            version: BROWSER_VERSION
        };
        Object.freeze(__browser);
        
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
    /**************************************************************************
     * Builds and attaches the js.alg object
     *************************************************************************/
    function _bootstrapAlg(js) {
        var js_alg;

        if (js["alg"]) {
            return js["alg"];
        }

        // js.alg
        js_alg = {

            /******************************************************************
             * Iterates through a provided object and executes fn() on each
             * step.  Uses a controller to manage the loop.
             * 
             * \param obj {Object}
             *      An object or array to iterate through.  If the element is
             *      invalid, then this function fails quietly and continues
             *      on.
             * 
             * \param fn {Function}
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
             * \param data {any} 
             *      A data source to pass as the fourth value in [fn]
             * 
             * \return {Object} JSpyder 
             *****************************************************************/
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
                        newVal = fn.apply(ctl, [obj[i], i, obj, data]);
                        if (newVal) {
                            obj[i] = newVal;
                        }
                        if (_break) {
                            break;
                        }
                    }
                }

                return js;
            },

            /******************************************************************
             * Uses the selected object as the [this] parameter for the 
             * executed function [fn].
             * 
             * \param _this {any}
             *      The [this] context to apply
             * 
             * \param fn {Function}
             *      The function to run
             * 
             * \param args {array}
             *      Any parameters to pass to the function, in "apply" format
             * 
             * \return
             *      The value returned by fn
             *****************************************************************/
            use: function (_this, fn, args) {
                if (!_this) { _this = null }
                return (typeof fn === "function"
                    ? fn.apply(_this, args)
                    : undefined);
            },

            /******************************************************************
             * Coerces any value to a boolean
             *****************************************************************/
            bool: function bool(b) { return b ? true : false },
            /******************************************************************
             * Coerces any value to a Javascript Number object
             *****************************************************************/
            "number": function (n) {
                var _n = +n;
                return ((_n == n || _n === _n) ? _n : 0);
            },
            /******************************************************************
             * Coerces any value to a INT8 value
             *****************************************************************/
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
            /******************************************************************
             * Coerces any value to a UNSIGNED INT8 value
             *****************************************************************/
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
            /******************************************************************
             * Coerces any value to a INT16 value
             *****************************************************************/
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
            /******************************************************************
             * Coerces any value to a UNSIGNED INT16 value
             *****************************************************************/
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
            /******************************************************************
             * Coerces any value to a INT32 value
             *****************************************************************/
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
            /******************************************************************
             * Coerces any value to a UNSIGNED INT32 value
             *****************************************************************/
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
            /******************************************************************
             * Coerces any value to a FLOAT value
             *****************************************************************/
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
            /******************************************************************
             * Coerces any value to a DOUBLE value
             *****************************************************************/
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
        };

        if (js) {
            Object.defineProperty(js, "alg", { value: js_alg });
        }
        return js_alg;
    }

    /**************************************************************************
     * Builds and attaches the js.dom object
     *************************************************************************/
    function _bootstrapDom(js) {
        if (js["dom"]) {
            return js["dom"];
        }

        /**********************************************************************
         * Returns TRUE if the node is a DOM Node
         *********************************************************************/
        function _isNode(o) {
            return js.alg.bool(typeof Node === "object"
                ? o instanceof Node
                : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
        }

        /**********************************************************************
         * Returns TRUE if the node is a DOM Element
         *********************************************************************/
        function _isElement(o) {
            return js.alg.bool(typeof HTMLElement === "object"
                ? o instanceof HTMLElement
                : o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string");
        }
        
        /**********************************************************************
         * Gets the DOM object's classes as an array
         *********************************************************************/
        function _getDomClasses(element) {
            return (_isElement(element)
                ? element.className.replace(/(^\s+)|(\s(?=\s))|(\s+$)/g, "").split(" ")
                : []);
        }
        
        /**********************************************************************
         * Sets the DOM object's class based on the enable flag
         *********************************************************************/
        function _setDomClass(element, cls, enable) {
            var clss = _getDomClasses(element),
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
        
        /**********************************************************************
         * Sets the DOM object's class based on the enable flag
         *********************************************************************/
        function _getDomClass(element, cls) {
            return (_getDomClasses(element).indexOf(cls) !== -1);
        }

        /**********************************************************************
         * Converts the string provided into an array of DOM elements and
         * returns them as an array (or blank array if invalid)
         *********************************************************************/
        function _parseHtml(s) {
            var div = document.createElement("div"),
                arr = [];

            div.innerHTML = s;
            for (var i = 0; i < div.children.length; i++) {
                arr.push(div.children[i]);
            }

            return arr;
        }

        /**********************************************************************
         * Creates a wrapper around the DOM element
         * 
         * \param element {Selector} 
         *      Returns a group of selectors
         * 
         * \param args {Array} 
         *      The parameters to use on the jsDom object
         * 
         * \return {Object} 
         *      jsDom Object, based on js.dom.fn as the prototype
         *********************************************************************/
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


                if (_isElement(element)) {
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

        // Template for selected objects: js.dom.fn
        js_dom.fn = {
            _element: [],
            _export: null,
            exp: function () {
                return this._export;
            },

            get count() { return this._element.length; },

            /******************************************************************
             * Iterates through all of the elements in the jsDom object.
             * 
             * \param fn {Function}
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
             * \param data {any} 
             *      A data source to pass as the fourth value in [fn]
             *****************************************************************/
            each: function (fn, data) {
                js.alg.each(this._element, fn, data);
                return this;
            },

            /******************************************************************
             * Uses the current jsDom object within the specified function
             * 
             * \param fn {Function}
             *      The function to run
             * 
             * \param args {Array}
             *      Any parameters to pass to the function, in "apply" format
             *****************************************************************/
            use: function (fn, args) {
                this._export = js.alg.use(this, fn, args);
                return this;
            },

            /******************************************************************
             * Applies the specified CSS template to all of the elements in
             * the jsDom object
             * 
             * \param css {Object}
             *      A JavaScript Object where keys correspond to attributes.
             *      If more than one value must be applied, then both values
             *      should be placed in an array; or can be passed as a comma-
             *      separated list in a string.
             * 
             * \param fn {Function}
             *      A callback, which takes [css] as a parameter and uses
             *      [this] as the context.
             *****************************************************************/
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

            /******************************************************************
             * Gathers whether the specified CSS attributes have been assigned,
             * and then calls [fn] with the context of the jsDom object, and
             * the parameter being the css object passed in.
             * 
             * \param css {Object}
             *      A JavaScript Object where keys correspond to attributes.
             *      Values will be loaded into the object reference.
             * 
             * \param fn {Function}
             *      A callback, which takes [css] as a parameter and uses
             *      [this] as the context.
             *****************************************************************/
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

            /******************************************************************
             * Gathers whether the specified DOM attributes have been assigned,
             * and then calls [fn] with the context of the jsDom object, and
             * the parameter being the [attrs] object passed in.
             * 
             * \param attrs {Object}
             *      A JavaScript Object where keys correspond to attributes.
             *      Values will be loaded into the object reference.
             * 
             * \param fn {Function}
             *      A callback, which takes [attrs] as a parameter and uses
             *      [this] as the context.
             *****************************************************************/
            getAttrs: function (attrs, fn) {
                if (attrs && typeof attrs === "object") {
                    var o = Object.create(attrs);
                    var _each = js.alg.each;

                    // iterate each element
                    this.each(function (el, i, _2, attrs) {
                        attrs = (!i ? attrs.first : attrs.others);
                        // iterate each attribute
                        _each(attrs, function (_, a, attrs) {
                            attrs[a] = a.getAttribute(a);
                        });
                        // callback
                        if (typeof fn === "function") { js_dom(el, fn, [attrs]); }
                    }, { first: attrs, others: o });
                }
                this._export = attrs;
                return this;
            },
            
            /******************************************************************
             * Gathers whether the specified DOM attributes have been assigned,
             * and then calls [fn] with the context of the jsDom object, and
             * the parameter being the [attrs] object passed in.
             * 
             * \param attrs {Object}
             *      A JavaScript Object where keys correspond to attributes.
             *      Values will be loaded into the object reference.
             * 
             * \param fn {Function}
             *      A callback, which takes [attrs] as a parameter and uses
             *      [this] as the context.
             *****************************************************************/
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
            
            /******************************************************************
             * Gets the parent(s) of the elements in the node, and runs the
             * function [fn].  Exports the first DOM node.
             * 
             * \param fn {Function}
             *****************************************************************/
            parents: function (fn) {
                var self = this;
                this.each(function (element, i, elements) {
                    var d = js_dom(element.parentNode, fn, [element]);

                    if (!js.alg.number(i)) { self._export = d; }
                });
                return this;
            },
            
            /******************************************************************
             * Gets the children of the elements in the node
             * 
             * \param fn {Function}
             *****************************************************************/
            children: function (fn) {
                this.each(function (i, element, elements) {
                    for (var j = 0; j < element.children.length; j++) {
                        js_dom(element.children[j], fn, [element.children[j]]);
                    }
                });
                return this;
            },
            
            /******************************************************************
             * Applies function [fn] to the [n]th item in the jsDom using the
             * same format as if it were selected with js.dom().
             *
             * \param n {Number}
             *      Index of the item to grab  
             * \param fn {Function}
             *****************************************************************/
            at: function (n, fn) {
                n = js.alg.uint(n);
                return js_dom(this._element[n] || null, fn);
            },
            
            /******************************************************************
             * Applies function [fn] to the [n]th element in the jsDom using
             * the same format as if it were selected with js.dom().
             *
             * \param n {Number} 
             *      Index of the element to grab
             * \param fn {Function}
             *****************************************************************/
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
            
            /******************************************************************
             * Attaches the elements from the jsDom to the first element
             * identified in the parent object.
             *
             * \param parent {any}
             *      The element/string/etc. to which this jsDom shuld be 
             *      attached
             * 
             * \param fn {Function}
             *      A callback which takes the parent as the context, and
             *      this jsDom object as the first parameter.
             *****************************************************************/
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
            
            /******************************************************************
             * Attaches the element identified by [child] to the first element
             * identified in the jsDom object..
             *
             * \param parent {any}
             *      The element/string/etc. which should be attached to this
             *      jsDom object.
             *****************************************************************/
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
            
            /******************************************************************
             * Removes all of the elements defined in this jsDom object from
             * their parent nodes.
             *
             * \param parent {any}
             *      The element/string/etc. which should be attached to this
             *      jsDom object.
             *****************************************************************/
            remove: function () {
                this.each(function (child) {
                    child.parentNode ? child.parentNode.removeChild(child) : null;
                });
                return this;
            },
            
            /******************************************************************
             * Adds the defined classes to all of the elements in this jsDom 
             * object.
             *
             * \param classes {Object}
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
             *****************************************************************/
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
            
            /******************************************************************
             * Retrieves the defined classes from all of the elements in this 
             * jsDom object, and then runs the designated callback function.
             *
             * \param classes {Object}
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
             *****************************************************************/
            getClasses: function (classes, fn) {
                // for every element jsDom...
                this.each(function (element, i, _2, classes) {
                    // iterate the classes...
                    classes = (js.alg.number(i) ? classes.first : classes.second);
                    js.alg.each(classes, function (_1, className, _2, o) {
                        o.classes[className] = _getDomClass(o.element, className);
                    }, { el: element, classes: classes });
                    
                    // run the callback
                    js_dom(element, fn, [classes]);
                }, { first: classes, second: Object.create(classes) });
                this._export = classes;
                return this;
            },
            
            /******************************************************************
             * Inserts an event handler on all of the jsDom elements, for each
             * event in a space-separated list.
             *
             * \param events {String}
             *      An space-separated list of event types to trigger the
             *      callback on.
             * 
             * \param handler {Function}
             *      A callback function to use for the event callback.
             *****************************************************************/
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
            }
        };

        if (js) {
            Object.defineProperty(js, "dom", { value: js_dom });
        }
        return js_dom;
    }

    /**************************************************************************
     * Creates a hidden registry, and returns an interface to interact with it
     * 
     * - fetch(key, Function({ key: key, value: value })) 
     * - stash(key, value)  
     *************************************************************************/
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