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

(function (js) {
    if (!js) {
        console.error("Attempted to load module js-template without loading JSpyder");
        return null;
    }

    var _templates = js.createRegistry(),
        __master_key = ((Math.random() * 0xFFFFFFFF)|0).toString(32);
    
    /**************************************************************************
     * Loads the passed template into memory under the identified [name], and
     * allows the user to manipulate the template with the rest of the 
     * commands.
     * 
     * \param name {String}
     *      The name of a saved template to load from the library.  These can
     *      be stored in memory using js.template.store(name, template);
     * 
     * \param data {Object}
     *      An object defining match-variables in the key, and the values to
     *      substitute as the value.
     *************************************************************************/
    function js_template(name, data) {
        var template = _templates.fetch(name, function (data) {
            // Firefix will turn null values to blank strings by default, but
            // IE will turn [null] to "null" and [undefined] to "undefined"
            data.value = (data.value || "");
        });

        if (!data || typeof data !== "object") {
            data = {};
        }

        function _setData(key, d) {
            if (key === __master_key) {
                this.data = d;
            }
        }
        
        var jsTmp = Object.create(js_template.fn, {
            _name: { value: name },
            _data: { value: data },
            _setData: { value: _setData }
        });
        return jsTmp;
    }


    js_template.fn = {
        /**********************************************************************
         * Loads the passed template into memory under the identified [name], 
         * and allows the user to manipulate the template with the rest of the 
         * commands.
         * 
         * \param name {String}
         *      Identifier to use when referring to this template.
         * 
         * \param template {Any=}
         *      Template string to load into the template, or [null] to remove
         *      a template.
         *********************************************************************/
        compile: function (template, data) {
            return this;
        },
        store: function (name, template) {
            _templates.stash(name, (template || "").toString());
            return this;
        }
    };

    js_template.store = js_template.fn.store;
    js_template.compile = js_template.fn.compile;

    js.template = js_template;
    return js_template;
})(window.jspyder);