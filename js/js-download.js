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
 
js.extend.fn("download", function () {
    
    /**
     * @class jspyder.download
     * @member jspyder
     */
    function download(def) {
        var dl = Object.create(download.fn);
        
        def = def || {};
        dl.setName(def.name)
            .setType(def.type)
            .setData(def.data)
            .setCharset(def.charset);
        
        return dl;
    }
    
    download.fn = {
        save: function(def) {
            def = def || {};
            var name = def.name || this._name,
                type = def.type || this._type,
                data = def.data || this._data;
                
            __save(name, type, data);
            return this;
        },
        saveText: function(def) {
            def = def || {};
            var name = (def.name || this._name),
                data = (def.data || this._data),
                charset = (def.charset || this._charset);
                
            __saveText(data, name, charset);
            return this;
        },
        saveMime: function(def) {
            def = def || {};
            var name = (def.name || this._name).split('.'),
                data = (def.data || this._data),
                type = (def.type || this._type),
                charset = (def.charset || this._charset),
                extension = ".txt";
                
            if(name.length > 1) {
                extension = name.pop();
            }
            name = name.join('');
            
            __saveTextWithMime(data, name, extension, type, charset);
            return this;
        },
        
        setName: function(name) { this._name = js.alg.string(name, "download"); return this; },
        getName: function() { return this._name; },
        
        setType: function(type) { this._type = js.alg.string(type, safeType); return this; },
        getType: function() { return this._type; },
        
        setData: function(data) { this._data = data || ""; return this; },
        getData: function() { return this._data; },
        
        setCharset: function(charset) { this._charset = charset || "UTF-8"; return this; },
        getCharset: function() { return this._charset; }
    }
    
    var doc = window.document,
        URL = window.URL || window.webkitURL || window,
        getObjUrl = function(blob) { return URL.createObjectURL(blob); },
        killObjUrl = function(url) { return URL.revokeObjectURL(url); },
        safeType = "application/octet-stream",
        sliceBlob = Blob.prototype.slice || Blob.prototype.webkitSlice,
        reqFilesystem = window.requestFileSystem || window.webkitRequestFileSystem || window.mozRequestFileSystem;
    
    function __save(name, type, blob) {
        "use strict";
        name = js.alg.string(name, "download");
        type = js.alg.string(type, safeType);
        
        var saveLink = js.dom(doc.createElementNS("http://w3.org/19999/xhtml", "a")),
            props = { "download": null },
            url = getObjUrl(blob),
            changed = false;
            saveLink.getProps(props);
            
        if(window.externalHost && typeof props.download !== "undefined") {
            saveLink
                .setProps({ href: url, download: name })
                .on("click", function(event) { killObjUrl(url); })
                .trigger("click");
        }
        
        if(js.env.browser === "Chrome"){
            if(type !== safeType) {
                blob = sliceBlob.call(blob, 0, blob.size, safeType);
                killObjUrl(url);
                getObjUrl(blob);
            }
            if(name !== "download") {
                name += ".download";
            }
        }

        window.open(url, "_blank");
        killObjUrl(url);
    }
    
    // helps with endian-ness
    var __encoding = {
        "UTF-8": "", //"\xEF\xBB\xBF",
        "UTF-16": "\uFEFF", //< LE: \uFFEF
        "UTF-32": "\u0000\uFEFF",
        "UTF-7": "\x2B\x2F\x76\x38",
        "UTF-1": "\xF7\x64\x4C"
    }
    
    var __saveTextWithMime = function(content, filename, extension, dataType, charset) {
        if(window.Blob) {
            __saveTextWithMime = function(content, filename, extension, dataType, charset) {
                charset = js.alg.string(charset, "UTF-8");
                filename = js.alg.string(filename, "download");
                content = content || '';
                
                var blobData = { type: dataType + ";charset=" + charset }, 
                    blobPrefix = (__encoding[charset]||""), 
                    blobDef = [blobPrefix + content],
                    blob = new window.Blob(blobDef, blobData);
                __save(filename, dataType, blob); 
                
                return;
            };
        }
        else if(js.env.browser === "IE" && js.env.browserVersion <= 9) {
            __saveTextWithMime = function (content, filename, extension, dataType, charset) {
                charset = js.alg.string(charset, "UTF-8");
                filename = js.alg.string(filename, "download");
                content = content || '';
                
                js.dialog.alert({
                    title: "Alert",
                    message: ["Because you are using Internet Explorer ", js.env.browserVersion,
                        ", your download \"", filename,".",extension, "\" has been changed to \"", 
                        filename,".txt\".  It is recommended that this value be changed in the",
                        " save menu, or after the file has been downloaded."].join('')
                });
                
                __saveText(content, filename, charset);
                return;
            };
        }
        else {
            __saveTextWithMime = function (content, filename, extension, dataType, charset) {
                charset = js.alg.string(charset, "UTF-8");
                filename = js.alg.string(filename, "download");
                content = content || '';
                filename = filename + '.' + extension;
                __saveText(content, filename, charset);
                return;
            };
        }
        
        return __saveTextWithMime.apply(this, arguments);
    }
    
    var __saveText = function(content, name, charset) {
        content = content.replace(/\r?\n/g, "\r\n");
        if(window.Blob) {
            __saveText = function(content, name, charset) {
                charset = js.alg.string(charset, "UTF-8");
                name = js.alg.string(name, "download");
                content = content || '';
                
                var blob = new Blob([content], { type: "text/plain;charset=" + charset });
                __save(name, "text/text", blob);
                return;
            }
        }
        else {
            __saveText = function(content, name, charset) {
                charset = js.alg.string(charset, "UTF-8");
                name = js.alg.string(name, "download");
                content = content || '';
                
                var ret = "";
                
                js.dom("<iframe></iframe>")
                    .setCss({"display": "none"})
                    .attach(document.body)
                    .element(0, function(el) {
                        el.document.open("text/html", "replace");
                        el.document.charset = charset;
                        if(/(.html|.htm)$/i.test(name)) {
                            el.document.close();
                            el.document.body.innerHTML = "\r\n" + content + "\r\n";
                        }
                        else {
                            if(!/.txt$/i.test(name)) {
                                name += ".txt";
                            }
                            
                            el.document.write(content);
                            el.document.close();
                        }
                        
                        ret = el.document.execCommand("SaveAs", null, name);
                        el.close();
                    });
                    
                return ret;
            }
        }
        
        return __saveText.apply(this, arguments);
    }
    
    return download;
});
