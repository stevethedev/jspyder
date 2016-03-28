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

jspyder.extend.fn("dialog", function () {
    var js = this;
    
    /**
     * @class jspyder.dialog
     * 
     */
    function js_dialog(cfg) {
        cfg = cfg || {};
        var element = js.dom(js_dialog.fn._template),
            dialog = Object.create(js_dialog.fn, {
                _element: { value: element },
                _buttonDefs: { value: [] }
            });
        
        dialog.setDimensions(cfg.width, cfg.height);
        
        element.find("i.button-close").on("click", function (event) {
            dialog.remove();
        });
        
        if(cfg.noclose) {
            element.find("i.button-close").remove();
        }
        
        if (cfg.title) { dialog.setTitle(cfg.title); }
        else if (cfg.titleHtml) { dialog.setTitleHtml(cfg.titleHtml); }
        
        if (cfg.body) { dialog.setBody(cfg.body); }
        else if (cfg.bodyHtml) { dialog.setBodyHtml(cfg.bodyHtml); }
        
        //! CREATE BUTTONS WITH CALLBACKS
        if (cfg.buttons) { dialog.setButtons(cfg.buttons); }
        
        if(cfg.parent) { dialog.attach(cfg.parent); }
        
        return dialog;
    }
    
    js_dialog.alert = function(cfg) {
        var dlg = js_dialog({
            titleHtml: js.alg.string(cfg.title, "Alert"),
            bodyHtml: js.alg.string(cfg.message, ""),
            noclose: true,
            parent: cfg.parent || document.body,
            height: cfg.height,
            width: cfg.width,
            buttons: [
                { 
                    text: "OK", 
                    value: "OK", 
                    click: function(event) { 
                        dlg.remove(); 
                        (typeof cfg.callback === "function") && (cfg.callback());
                    } 
                }
            ]
        });
        return dlg;
    };
    
    js_dialog.confirm = function(cfg) {
        var dlg = js_dialog({
            titleHtml: js.alg.string(cfg.title, "Alert"),
            bodyHtml: js.alg.string(cfg.message, ""),
            noclose: true,
            parent: cfg.parent || document.body,
            height: cfg.height,
            width: cfg.width,
            buttons: [
                { 
                    text: "OK", 
                    value: "OK", 
                    click: function(event) {
                        dlg.remove(); 
                        (typeof cfg.callback === "function") && (cfg.callback(true));
                    } 
                },
                { 
                    text: "Cancel", 
                    value: "Cancel", 
                    click: function(event) {
                        dlg.remove(); 
                        (typeof cfg.callback === "function") && (cfg.callback(false)); 
                    } 
                }
            ]
        });
        return dlg;
    };
    
    js_dialog.query = function(cfg) {
        var dlg = js_dialog({
            titleHtml: js.alg.string(cfg.title, "Alert"),
            bodyHtml: js.alg.string(cfg.message, ""),
            noclose: true,
            parent: cfg.parent || document.body,
            height: cfg.height,
            width: cfg.width,
            buttons: [
                { 
                    text: "Yes", 
                    value: "Yes", 
                    click: function(event) {
                        dlg.remove(); 
                        (typeof cfg.callback === "function") && (cfg.callback(true));
                    } 
                },
                { 
                    text: "No", 
                    value: "No", 
                    click: function(event) {
                        dlg.remove(); 
                        (typeof cfg.callback === "function") && (cfg.callback(false)); 
                    } 
                }
            ]
        });
        return dlg;
    };
    
    js_dialog.fn = {
        _element: null,
        _buttonDefs: null,
        _template: [
            "<div class=\"js-dialog-background\">",
                "<div class=\"js-dialog\">",
                    "<div class=\"js-dialog-header\">",
                        "<span class=\"title-container\"></span>",
                        "<span class=\"dialog-buttons\"><i class=\"button-close close\"></i></span>",
                    "</div>",
                    "<div class=\"js-dialog-body\">",
                        "<div class=\"body-container\"></div>",
                    "</div>",
                    "<div class=\"js-dialog-footer\">",
                        "<div class=\"footer-container\"></div>",
                    "</div>",
                "</div>",
            "</div>"
        ].join(''),
        
        _height: 237.2,
        _width: 498,
        
        _buttonFactory: function (text) {
            var html = [
                "<div>", text, "</div>"
            ].join('');
            return js.dom(html);
        },
        
        setBody: function (body) {
            (this._element) &&
                this._element.find(".body-container")
                    .setHtml("")
                    .append(body);
                
            return this;
        },
        
        setBodyHtml: function (body) {
            (this._element) &&
                this._element.find(".body-container")
                    .setHtml(body);

            return this;
        },
        
        setTitle: function (title) {
            (this._element) &&
                this._element.find(".title-container")
                    .setHtml("")
                    .append(title);
            
            return this;
        },
        
        setTitleHtml: function (title) {
            (this._element) &&
                this._element.find(".title-container")
                    .setHtml(title);
            
            return this;
        },
        
        setButtons: function(buttons) {
            if(this._element) {
                var container = this._element.find(".footer-container").setHtml(""),
                    form = js.form();
                    
                js.alg.each(buttons, function(button, i) {
                    button = js.alg.mergeObj({}, button, { type: "button" });
                    form.addField("button-" + i, button)
                    container.append(form.exportField("button-" + i));
                });
            }
            return this;
        },
        
        setDimensions: function (width, height) {
            return this.setHeight(height).setWidth(width);
        },
        
        setHeight: function (height) {
            if (this._element) {
                height = js.alg.number(height, this._height) + "px";
                this._element.find(".js-dialog-body").setCss({ "max-height": height });
            }
            return this;
        },
        
        setWidth: function (width) {
            if (this._element) {
                width = js.alg.number(width, this._width) + "px";
                this._element.find(".js-dialog-body").setCss({ "width": width });
            }
            return this;
        },
        
        attach: function (parent) {
            (this._element) && 
                this._element.attach(parent);
            
            return this;
        },
        
        remove: function () {
            (this._element) &&
                this._element.remove();
            
            return this;
        }
    };
    
    return js_dialog;
});