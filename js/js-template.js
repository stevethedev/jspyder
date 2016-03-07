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
 * ***************************************************************************/
jspyder.extend.fn("template", function () {
    var js = this;
    if (!js) {
        console.error("Attempted to load module js-template without loading JSpyder");
        return null;
    }

    var _templates = js.createRegistry(),
        _library = js.createRegistry(),
        __master_key = ((Math.random() * 0xFFFFFFFF) | 0).toString(32);
    
    /**
     * @class jspyder.template
     * @member jspyder
     * 
     * Loads the passed template into memory under the identified [name], and
     * allows the user to manipulate the template with the rest of the 
     * commands.
     * 
     * @param {String} name
     *      The name of a saved template to load from the library.  These can
     *      be stored in memory using js.template.store(name, template);
     * 
     * @param {Object} data
     *      An object defining match-variables in the key, and the values to
     *      substitute as the value.
     */
    function js_template(data) {
        if (!data || typeof data !== "object") {
            data = {};
        }

        function _setData(key, d) {
            if (key === __master_key) {
                data = d;
            }
        }
        
        var compiled = "";
        // obscures the interface for updating the compiled value,
        // so that it can only be done from within the javascript object.
        function _setCompiled(key, c) {
            if (key === __master_key) {
                compiled = c;
            }
        }

        var jsTmp = Object.create(js_template.fn, {
            _data: { get: function () { return data; } },
            _compiled: { get: function () { return compiled; } },
            _setData: { value: _setData },
            _setCompiled: { value: _setCompiled }
        });
        return jsTmp;
    }

    // build the expressions to search for
    var resIdentifier = "\\D[a-z0-9_]*",
        resString = "\"(?:[^\"\\\\]|\\\\.)*\"",
        resCommandLiteral = "\`(?:[^\`\\\\]|\\\\.)*\`",
        resNumber = "\\d+(?:\\.\\d+)?",
        resVariable = "\\$\\{" + resIdentifier + "\\}",
        resFuncName = "\\@" + resIdentifier,
        resFuncSep = "(?:\\s*,\\s*(?!\\)))?",
        resFuncArgs = "\\s*(" + resCommandLiteral + "|" + resString + "|" + resNumber + "|" + resVariable + ")" + resFuncSep,
        resFunction = [resFuncName, "\\((?:",
            resFuncArgs,
            ")*\\)"].join(''),
        resSymbol = '(' + resFunction + '|' + resVariable + ')',

        // reIdentifier = new RegExp(resIdentifier, "i"),
        reFuncArgs = new RegExp(resFuncArgs, "i"),
        reString = new RegExp(resString, "i"),
        reCommandLiteral = new RegExp(resCommandLiteral, "i"),
        reNumber = new RegExp(resNumber),
        reVariable = new RegExp(resVariable, "i"),
        reFuncName = new RegExp(resFuncName, "i"),
        reFunction = new RegExp(resFunction, "i"),
        reSymbol = new RegExp(resSymbol, "i");

    // Retrieves a value [name] from the context [ctx] object
    function __parseVar(ctx, name) {
        var value = ctx.data[name.substring(2, name.length - 1)];
        return (typeof value === "undefined"
            ? name
            : value !== null
                ? value
                : "");
    }

    // parses and executes a function, if it exists, using the format:
    // @[name](${var}, "string", 0.5);
    function __parseFunction(tmp, ctx) {
        var name, args = [], arg, result, len, cut;

        name = tmp.match(reFuncName)[0].substring(1);
        tmp = tmp.substring(tmp.indexOf("(") + 1, tmp.lastIndexOf(")"));
        while (arg = reFuncArgs.exec(tmp)) {
            cut = arg[0].length;
            len = arg.length;
            arg = arg[len - 1];
            tmp = tmp.substring(cut);

            if (!arg.search(reFunction)) {
                args.push(__parse(arg, ctx.data));
            }
            else if (!arg.search(reCommandLiteral)) {
                args.push(__parse(arg.substring(1, arg.length - 1), ctx.data));
            }
            else if (!arg.search(reString)) {
                args.push(arg.substring(1, arg.length - 1));
            }
            else if (!arg.search(reVariable)) {
                args.push(__parse(arg, ctx.data));
            }
            else if (!arg.search(reNumber)) {
                args.push(+arg);
            }
            else {
                args.push(__parse(arg, ctx.data));
            }
        }

        var fn = ctx.lib.fetch(name);
        if (fn) {
            result = fn.apply(ctx.data, args);
            if (typeof result !== "undefined" && result !== null) {
                tmp = result;
            }
        }
        else {
            tmp = "@" + name + "(" + args.join(", ") + ")";
        }
        
        return tmp;
    }
    
    function __parse(tmp, data) {
        // build the context object            
        var ctx = {
            data: data,
            tmp: tmp,
            lib: _library
        };
        
        var found = null, str = "", index = 0, length;
        while (found = reSymbol.exec(ctx.tmp)) {
            index = found.index;
            found = found[0];
            length = found.length;
            
            str += ctx.tmp.substring(0, index);
            ctx.tmp = ctx.tmp.substring(index + length);
            
            if (reFunction.test(found)) {
                found = __parseFunction(found, ctx);
            }
            if (reVariable.test(found)) {
                found = __parseVar(ctx, found);
            }
            
            str += found;
        }
        str += ctx.tmp; // remaining string
        
        return str;
    }

    js_template.fn = {
        /**
         * @member jspyder.template
         * 
         * Loads the passed template into memory under the identified [name], 
         * and allows the user to manipulate the template with the rest of the 
         * commands.
         * 
         * @param {String} name
         *      Identifier for a previously stored template.
         * 
         * @param {Object=} data
         *      Data object to use when running the template, where keys
         *      correspond to template values, and values correspond to the
         *      data to substitute into the template.  If omitted (or null), 
         *      then uses the object selected
         * 
         * @param {Function=} fn
         *      An optional callback function to run immediately after the
         *      template has completed parsing. Context is [data], parameter
         *      is the completed template.  
         */
        compile: function (name, data, fn) {
            var template = _templates.fetch(name);
            return this.compileExplicit(template, data, fn);
        },

        /**
         * @member jspyder.template
         * 
         * Loads the passed template into memory under the identified [name], 
         * and allows the user to manipulate the template with the rest of the 
         * commands.
         * 
         * @param {String} template
         *      A string to run as the template.
         * 
         * @param {Object=} data
         *      Data object to use when running the template, where keys
         *      correspond to template values, and values correspond to the
         *      data to substitute into the template.  If omitted (or null), 
         *      then uses the object selected
         * 
         * @param {Function=} fn
         *      An optional callback function to run immediately after the
         *      template has completed parsing. Context is [data], parameter
         *      is the completed template.  
         */
        compileExplicit: function (template, data, fn) {
            if (typeof data === "function" && !fn) {
                fn = data;
                data = null;
            }
            if (typeof template === "undefined") {
                template = "";
            }
            // template = template.replace(/[\n\r\f\s]+/gi, " ");
            var o = Object.create(this._data);
            js.alg.each(data || {}, function (v, k, _, o) {
                o[k] = v;
            }, o);
            var tmp = __parse(template, o);
            
            this._setCompiled(__master_key, tmp);
            
            typeof fn === "function" && fn.apply(this, [tmp]);
            return this;
        },
        
        output: function () { return this._compiled; },
        
        /**
         * @member jspyder.template
         * 
         * Loads the passed template into memory under the identified [name], 
         * and allows the user to manipulate the template with the rest of the 
         * commands.
         * 
         * @param {String} name
         *      Identifier to use when referring to this template.
         * 
         * @param {Mixed=} template
         *      Template string to load into the template library, or [null] 
         *      to remove the template from storage.
         */
        storeTemplate: function (name, template) {
            template = js.alg.string(template, "");
            template = template.replace(/\<\!\-\-[^\<]+\-\-\>/g, "").replace(/\<([^\s\>]+)([^\>]+)\/\>/i, "<$1 $2></$1>");
            _templates.stash(name, template);
            return this;
        },
        
        /**
         * @member jspyder.template
         * 
         * Loads templates from the specified XML file, using the following 
         * format:
         * 
         * ```#!xml
         * <templates>
         *   <template name="template-name">
         *     Template Contents
         *   </template>
         * </templates>
         * ```
         * 
         * This function requires jspyder.ajax to function
         * 
         * @param {String} filename
         *      The URL to the template file, to be called via AJAX
         * 
         * @param {Function} [fn]
         *      The callback function to execute after the template is loaded.
         */
        storeTemplateXml: function (filename, fn) {
            var errorMsg = "Attempted to call jspyder.template.storeTemplateXml() without loading jspyder.ajax module!";
            filename = js.alg.string(filename);
                
            if (js.ajax) {
                var data = {
                    // self: this,
                    xmls: new XMLSerializer(),
                    fn: fn
                };
                    
                js.ajax(filename)
                    .get(js_template.fn._storeTemplateXml_ajax, data);
            }
            else {
                js.log.error(errorMsg);
            }
            return this;
        },
        
        /** @private */
        _storeTemplateXml_ajax: function (xhttp, data) {
            var $xml = js.dom(xhttp.responseXML.firstChild);
            $xml.children(js_template.fn._storeTemplateXml_children, data);
            js.alg.run(data.fn);
        },
        
        /** @private */
        _storeTemplateXml_children: function (child, data) {
            js_template.fn.storeTemplate(
                child.getAttribute("name"),
                data.xmls.serializeToString(child)
                    .replace(/\<[\/]?template[^\>]*\>/g, ""));
            return;
        },
        
        /**
         * @member jspyder.template
         * 
         * Pulls the selected template, and runs [fn] with the template as the
         * context. 
         * 
         * @param {String} name
         *      Identifier to use when referring to this template.
         * 
         * @param {Function} fn
         *      Callback to run with the template as the context.
         */
        getTemplate: function (name, fn) {
            _templates.fetch(name, fn);
            return this;
        },
        
        /**
         * @member jspyder.template
         * 
         * Registers a function with the templates library, to make it
         * available within the templates.
         * 
         * @param {String} name
         *      Identifier to within the templates.  Accessible by name()
         * 
         * @param {Function} fn
         *      Function to call when invoked by name() in the templates.
         */
        register: function (name, fn) {
            if (typeof fn === "function") {
                _library.stash(name, fn);
            }
            return this;
        },
        
        /**
         * @member jspyder.template
         * 
         * Registers a set of functions through js.template.register()
         * 
         * @param {Object} o
         *      Registers o's keys as function names, and o's values as
         *      the functions to execute when @key() is invoked within a
         *      template.
         */
        registerSet: function (o) {
            var self = this;
            js.alg.each(o, function (v, k) { self.register(k, v); });
            return this;
        }
    };

    js_template.storeTemplate = js_template.fn.storeTempate;
    js_template.storeTemplateXml = js_template.fn.storeTemplateXml;
    js_template.getTemplate = js_template.fn.getTemplate;
    js_template.compile = js_template.fn.compile;
    js_template.compileExplicit = js_template.fn.compileExplicit;
    js_template.register = js_template.fn.register;
    js_template.registerSet = js_template.fn.registerSet;
    
    js_template.registerSet({
        // matches an array [frm] in data
        // pushes results tp [push] in [template]
        each: function (frm, push, template) {
            var data = this[frm] || {},
                pushObj = Object.create(this),
                ret = "",
                $t = js_template(data);
                
            js.alg.each(data, function (v, k, data, ctx) {
                pushObj[push] = v;
                ret += $t.compileExplicit(template, pushObj).output();
            }, this);
            
            return ret;
        },
        
        // fetches the template by [name], compiles it, and inserts
        // it into the calling template.
        insert_template: function (name) {
            var tmp = "";
            var o = Object.create(this);
            
            for(var i = 1; i < arguments.length; ++i) {
                o[arguments[i]] = o[arguments[++i]];
            }
            
            o.arguments = js.alg.sliceArray(arguments, 1);
            
            js_template(o).compile(name, function (v) { tmp = v; });
            return tmp; 
        },
        
        arguments: function (n) {
            n = js.alg.number(n);
            return (this.arguments ? this.arguments[n] || "" : "");
        },
        
        // branching logic.  If [test] is true, then inserts [pass],
        // else inserts [fail].
        // TODO: Make this native support, so that it won't have
        // to parse both paths ad infinitum before executing the
        // function.
        iif: function (test, pass, fail) {
            var $t = js_template(this);
            
            if (typeof test === "string") {
                test = $t.compileExplicit(test).output();
            }
            
            if (!!test) {
                return $t.compileExplicit(pass).output();
            }
            else {
                return $t.compileExplicit(fail).output();
            }
        },
        
        // gets the size of an array
        size: function (arrayName) {
            var data = this[arrayName];
            
            return (data && data.length
                ? data.length
                : typeof data === "undefined"
                    ? 0
                    : 1); 
        },
        
        // adds two numbers together
        add: function (n, a) {
            return js.alg.number(js.alg.number(n) + js.alg.number(a));
        },
        
        "var": function (name, value) {
            if (arguments.length === 1) {
                return this[name] || "";
            }
            this[name] = value;
            return "";
        },
        
        // @map("myMap", "key", "value", "key", "value", ...)
        map: function (name) {
            var map = {};
            
            for (var i = 1; i < arguments.length; i += 2) {
                map[arguments[i]] = arguments[i + 1];
            }
            
            this[name] = map;
            return "";
        },
        
        map_item: function (map, id) {
            map = this[map];
            return (map ? map[id] : id);
        },
        
        
        js_registry: function (key) {
            var data = js.registry.fetch(key);
            return (data === null || typeof data === "undefined"
                ? "" : data);
        },
        
        js_log: function (data) {
            console.log(data);
        },
        
        concat: function(str) {
            for(var i = 1; i < arguments.length; i++) {
                str += arguments[i];
            }
            return str;
        },
        
        html: function(str) {
            js.dom("<div>" + str + "</div>").getText(function(v) { str = v; });
            return str;
        },
        
        escape: function (str) {
            var ret = [];
            str = str.split(/\r?\n/);
            js.alg.arrEach(str, function (str) {
                var t = [];
                js.alg.iterate(0, str.length, function (i) {
                    t.push("&#", str.charCodeAt(i), ";");
                });
                ret.push(t.join(''));
            });
            return ret.join('<br />');
        },
        
        tag: function (tag, props) {
            tag = js.alg.string(tag, "br");
            props = js.alg.string(props, "");
            var voidElement = /^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)\b/i.test(tag);
            return "<" + tag + " " + props + (voidElement ? " /" : "></" + tag ) + ">";
        }
    });
    
    js.template = js_template;
    return js_template;
});