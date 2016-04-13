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
jspyder.extend.fn("tutorial", function() {
    var js = this;
    
    /**
     * @class  jspyder.tutorial
     * @member jspyder
     * 
     * Creates a tutorial overlay.
     */
    function js_tutorial() {
        var h = Object.create(js_tutorial["fn"], {
            "_window" : { "value": js.dom("<div class=\"js-tutorial-viewport\"></div>") },
            "_message": { "value": js.dom("<div class=\"js-tutorial-message\"></div>")  },
            "_obscure": { "value": js.dom("<div class=\"js-tutorial-obscure\"></div>")  },
            "_messageText": { "value": js.dom("<div class=\"js-tutorial-message-internal\"></div>") },
            "_closeButton": { "value": js.dom("<i class=\"js-tutorial-cancel cancel\"></i>") },
            "_then"   : { "value": []                                                   }
        });
        
        var lastFn = null;
        h["_next"] = function(event) {
            if(lastFn && "function" === typeof lastFn["callback"]) {
                lastFn["callback"].call(h, h["_target"]);
            }
            
            lastFn = h["_then"].pop();
            
            if("function" === typeof lastFn) {
                lastFn.call(h);
            }
            else {
                h.end();
            }
        };
        
        h["_window"].on("click", h["_next"]);
        h["_closeButton"].on("click", js.alg.bindFn(h, h["end"]));
        h["_message"]
            .append(h["_closeButton"])
            .append(h["_messageText"]);
        
        return h;
    }
    
    /**
     * @property fn
     * @member jspyder.tutorial
     * 
     * Prototype for created jspyder.tutorial objects
     */
    js_tutorial["fn"] = {
        "_window": null,
        "_target": null,
        "_message": null,
        "_then": null,
        "_running": false,
        
        /**
         * @method start
         * @member jspyder.tutorial
         * 
         * Begins the tutorial where it left off, or at the start.
         */
        "start": function() {
            this["_obscure"].attach(window["document"]["body"]);
            this["_window"].attach(window["document"]["body"]);
            this["_message"].attach(window["document"]["body"]);
            this["_closeButton"].attach(this["_message"]);
            return this;
        },
        
        /**
         * @method step
         * @member jspyder.tutorial
         * 
         * Adds a new step to the tutorial
         * 
         * @param {Object}    config
         * @param {String}    config.selector        CSS selector to attach to
         * @param {String}    config.message         Message to display for this help text
         * @param {Function}  [config.callback]      Function to execute after this step ends
         * @param {boolean}   [atEnd]                TRUE to insert step at the end of the queue, FALSE to insert as next step
         */
        "step": function(config, atEnd) {
            atEnd = ("boolean" !== typeof atEnd) || atEnd;
            config = config || {};
            var selector = config["selector"],
                message = config["message"],
                callback = config["callback"];
                
            var fn = function() {
                this["_target"] = window["document"].querySelector(selector);
                var rect = this["_target"].getBoundingClientRect(),
                    css = {
                        "top":    rect["top"]    + "px",
                        "left":   rect["left"]   + "px",
                        "height": rect["height"] + "px",
                        "width":  rect["width"]  + "px"
                    };
                    
                this["_window"].setCss(css);
                this["_messageText"].setHtml(message);
            }
            fn["callback"] = callback;
            
            this["_then"][atEnd ? "unshift" : "push"](fn);
            
            if(!this._running) {
                this._running = true;
                this._next();
            }
            
            return this;
        },
        
        /**
         * @method end
         * @member jspyder.tutorial
         * 
         * Kills the tutorial
         */
        "end": function() {
            this["_window"].remove();
            this["_message"].remove();
            this["_obscure"].remove();
            return this;
        }
    };
    
    return js_tutorial;
});
