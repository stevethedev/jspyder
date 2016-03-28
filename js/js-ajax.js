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

jspyder.extend.fn("ajax", function () {
    var js = this;
    
    /**
     * @class jspyder.ajax
     * @member jspyder
     * 
     * Abstracts Ajax calls for simple use via callbacks.
     * 
     * @param {String} url
     *      The URL to send the command against
     * 
     * @param {Object} data
     *      A data object, if one is necessary, consisting of the information
     *      to send to the server.  If one is not provided, then a blank 
     *      dataset is initialized.
     * 
     * @param {Function} fn
     *      The callback function to perform once the AJAX call has completed.
     */
    function js_ajax(url, data, fn) {
        var ajax = Object.create(js_ajax.fn);
        
        ajax.data = (typeof data === "object" && data ? data : {});
        ajax.url = (typeof url === "string" ? url : ajax.url);
        ajax.fn = (typeof fn === "function" ? fn : ajax.fn);
        
        if (typeof fn === "function") {
            fn.apply(ajax);
        }
        return ajax;
    } 
    
    /**
     * @private
     * 
     * Internals for running the AJAX query.
     */
    function __js_ajax_try(method, url, data, fn, context) {
        if (!url) { return this; }
             
        var xhttp = new XMLHttpRequest();
            
        xhttp.onreadystatechange = function xhttp_onreadystatechange() {
            if ((this.readyState === 4) && (typeof fn === "function")){
                js.alg.use(js, fn, [this, context]);
            }
            return null;
        };
        
        xhttp.open(method, url, true);
        
        if (!data) { data = {}; }
        if (data.contentType) {
            xhttp.setRequestHeader("Content-Type", data.contentType);
        }
        if (!data.cache) {
            xhttp.setRequestHeader("Cache-Control", "no-cache");
        }
        
        xhttp.send();
        return this;
    };

    js_ajax.fn = {
        /**
         * @property {Object} data
         * @member jspyder.ajax
         * 
         * Information which will be (or has been) sent to the server via the
         * Ajax call. 
         */
        data: {},
        
        /**
         * @property {String} url
         * @member jspyder.ajax
         * 
         * URL which data will be (or has been) setn to via the Ajax call.
         */
        url: "",
        
        /**
         * @property {Function} fn
         * @member jspyder.ajax
         * 
         * Function which will be executed after the Ajax call has returned.
         */
        fn: function () { },
        
        /**
         * @property {Function} get
         * @member jspyder.ajax
         * 
         * @param {Function} [fn]
         *      A function to execute in place of the stored callback function.
         *      If no function is provided, then the default function provided
         *      at initialization will be used.
         * 
         * Executes the Ajax template as a "GET" call 
         */
        "get": function (fn, context) {
            fn = (typeof fn === "function" ? fn : this.fn);
            __js_ajax_try("GET", this.url, this.data, fn, context);
            return this;
        },
        
        /**
         * @property {Function} head
         * @member jspyder.ajax
         * 
         * @param {Function} [fn]
         *      A function to execute in place of the stored callback function.
         *      If no function is provided, then the default function provided
         *      at initialization will be used.
         * 
         * Executes the Ajax template as a "HEAD" call 
         */
        "head": function (fn, context) {
            fn = (typeof fn === "function" ? fn : this.fn);
            __js_ajax_try("HEAD", this.url, this.data, fn, context);
            return this;
        },
        
        /**
         * @property {Function} post
         * @member jspyder.ajax
         * 
         * @param {Function} [fn]
         *      A function to execute in place of the stored callback function.
         *      If no function is provided, then the default function provided
         *      at initialization will be used.
         * 
         * Executes the Ajax template as a "POST" call 
         */
        "post": function (fn, context) {
            fn = (typeof fn === "function" ? fn : this.fn);
            __js_ajax_try("POST", this.url, this.data, fn, context);
            return this;
        }
    }
    
    return js_ajax;
});

