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

jspyder.extend.fn("ajax", function () {
    var js = this;
    
    /**************************************************************************
     * Abstracts AJAX calls for simple use
     *************************************************************************/
    function js_ajax(method, url, data, fn) {
        if (!url) { return this; }
             
        var xhttp = new XMLHttpRequest();
            
        xhttp.onreadystatechange = function xhttp_onreadystatechange() {
            if ((this.readyState === 4) && (typeof fn === "function")){
                fn.apply(js, [this]);
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
    
    js_ajax.get = function js_ajax_get(url, fn) {
        return js_ajax("GET", url, fn);
    };
    js_ajax.post = function js_ajax_post(url, fn) {
        return js_ajax("POST", url, fn);
    };
    
    return js_ajax;
});
