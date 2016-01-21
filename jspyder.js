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
             *       - The key of the current item
             *       - The value of the current item
             *       - A reference to [obj]
             *       - A reference to [data]
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
                        newVal = fn.apply(ctl, [i, obj[i], obj, data]);
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
            var s = element, el = Object.create(js_dom.fn);

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
            el._element = element;

            if (!element.__jspyder) {
                el.each(function (k, v) {
                    v.__jspyder = _createRegistry();
                });
            }

            el.use(fn, args);
            return el; 
        }

        // Template for selected objects: js.dom.fn
        js_dom.fn = {
            _element: [],
            get length() { return this._element.length; },

            /******************************************************************
             * Iterates through all of the elements in the jsDom object.
             * 
             * \param fn {Function}
             *      Function with the following parameters:
             *       - The key of the current item
             *       - The value of the current item
             *       - A reference to [obj]
             *       - A reference to [data]
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
            each: function(fn, data) {
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
            use: function(fn, args) {
                js.alg.use(this, fn, args);
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
                    this.each(function (_1, el, _2, css) {
                        // iterate each css field
                        _each(css, function (attr, val, _1, el) {
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
                    this.each(function (i, el, _2, css) {
                        var cStyle = getComputedStyle(el),
                            eStyle = el["style"];
                        css = (!(+i) ? css.first : css.others);

                        // iterate each css field
                        _each(css, function (attr, _, css, data) {                                
                            css[attr] = data.style[attr] || data.cStyle[attr];
                        }, { style: eStyle, cStyle: cStyle });

                        // callback
                        if (typeof fn === "function") { js_dom(el, fn, [css]); }
                    }, { first: css, others: o });
                }
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
                    this.each(function (i, el, _2, attrs) {
                        attrs = (!i ? attrs.first : attrs.others);
                        // iterate each attribute
                        _each(attrs, function (a, _, attrs) {
                            attrs[a] = a.getAttribute(a);
                        });
                        // callback
                        if (typeof fn === "function") { js_dom(el, fn, [attrs]); }
                    }, { first: attrs, others: o });
                }
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
                    this.each(function (i, el, _2, attrs) {
                        attrs = (!(+i) ? attrs.first : attrs.others);
                        // iterate each attribute
                        _each(attrs, function (a, v, attrs, el) {
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
             * Gets the parent(s) of the elements in the node
             * 
             * \param fn {Function}
             *****************************************************************/
            parents: function (fn) {
                this.each(function (i, element, elements) {
                    js_dom(element.parentNode, fn);
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
                    js_dom(element.children, fn);
                });
                return this;
            },
            
            // Applies function fn to the [n]th item from the list
            item: function (n, fn) {
                this._element[n] ? js_dom(this._element[n], fn) : null;
                return this;
            },
            
            element: function (n, fn) {
                this.item(n, function () {
                    if (this._element[0]) {
                        fn.apply(this._element[0]);
                    }
                });
                return this;
            },
            
            // Attaches the DOM nodes to the first item in the jsDom object
            attach: function (parent) {
                var children = this;
                js_dom(parent).element(0, function () {
                    var doc = new DocumentFragment();
                    children.each(function (_1, child, _2, doc) {
                        doc.appendChild(child);
                    }, doc);
                    this.appendChild(doc);
                });
                return this;
            },
            
            // Attaches new DOM nodes to this element
            append: function (child) {
                this.element(0, function () {
                    var doc = new DocumentFragment();
                    js_dom(child).each(function (_1, c, _2, doc) {
                        doc.appendChild(c);
                    }, doc);
                    this.appendChild(doc);
                })
                return this;
            },
            
            remove: function () {
                this.each(function (_1, child, _2) {
                    child.parentNode ? child.parentNode.removeChild(child) : null;
                });
                return this;
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
     * - fetch(key, Function({ value }) { }) 
     * - stash(key, value)  
     *************************************************************************/
    function _createRegistry() {
        var _registry = {};
        return {
            fetch: function (key, fn) {
                var val = { value: _registry[key] };
                fn(val);
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