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
    /** @ignore */
    var js = window["jspyder"];
    
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
    
    var win = window,
        // doc = win.document,
        safeType = "application/octet-stream",
        URL = (window.URL || window.webkitURL || window),
        getObjUrl = function(blob) { return URL.createObjectURL(blob); },
        killObjUrl = function(url) { setTimeout(js.alg.bindFn(URL, URL.revokeObjectURL, [url]), 300000 /* 5 minutes */); },
        Blob = (win.Blob || win.MozBlob || win.WebKitBlob || null),
        sliceBlob = Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice),
        __reDataUrl = /^data\:[\w+\-]+\/[\w+\-]+[,;]/,
        saveBlob = (win["navigator"]["msSaveOrOpenBlob"] || win["navigator"]["msSaveBlob"])
            ? function() { 
                var nav = win["navigator"],
                    fn = nav["msSaveOrOpenBlob"] || nav["msSaveBlob"];
                return js.alg.use(nav, fn, arguments);
            }
            : null;
    
    var __decode = function(text) {
        var btoa = win.btoa;
        
        if(win.btoa) {
            __decode = function(text) {
                return ";base64," + btoa(text);
            }
        } 
        else {
            __decode = function(text) {
                return "," + encodeURIComponent(text);
            }
        }
        
        return __decode(text);
    }
    
    var __encode = function(data, name) {
        var p = data.split(/[:;,]/),
            type = p[1],
            toBinary = p[2] === "base64" ? atob : decodeURIComponent, //< if we can't handle atob then there should be a fallback
            binary = toBinary(p.pop()),
            size = binary.length,
            arr = new Uint8Array(size);

        js.alg.iterate(0, size, function(i) {
            arr[i] = binary.charCodeAt(i);
        });

        return new Blob([arr], { type: type });
    }
    
    function __save(name, type, blob) {
        "use strict";
        
        type = js.alg.string(type, safeType);
        name = js.alg.string(name, "download.txt");
        
        if(__reDataUrl.test(blob)) {
            return saveBlob ? saveBlob(__encode(blob), name) : __triggerSave(name, blob);
        }
        
        blob = (blob instanceof Blob ? blob : new Blob([blob], { type: type }));
        
        if (saveBlob) {
            return saveBlob(blob, name);
        }
        else if (URL) {
            if(js.env.browser.name === "Chrome"){
                if(type !== safeType) {
                    blob = sliceBlob.call(blob, 0, blob.size, safeType);
                }
            }
            return __triggerSave(name, getObjUrl(blob));
        }
        else {
            if(typeof blob === "string" || blob instanceof String) {
                return __triggerSave( name, "data:" + type + __decode(blob) );
            }
            
            var filereader = new FileReader();
            filereader.onload = function(e) { __triggerSave(name, this.result); };
            filereader.readAsDataURL(blob);
        }
        
        return true;
    }
    
    var __replaceUrl = /^data:([\w\/\-\+]+)/;
    function __triggerSave(filename, url) {
        var props = { "download": null },
            attrs = { "href": url, "download": filename },
            $a = js.dom("<a></a>").getProps(props),
            altUrl = "data:" + url.replace(__replaceUrl, safeType);
            
        if(props["download"] !== null) {
            $a.setAttrs(attrs)
                .on("send-click", function(event) { this.click(); $a.remove(); killObjUrl(url); })
                .attach(document.body)
                .trigger("send-click");
            return true;
        }
        else if(js.env.browser.name === "Safari") {
            if(!window.open(altUrl)) {
                location.href = altUrl;
                killObjUrl(url);
            }
            return true;
        }
        else {
            js.dom("<iframe></iframe>")
                .setCss({ "position": "fixed", "left": "-9000000px", "width": "1em", "height": "1em" })
                .setProps({ "src": altUrl })
                .on("load", function(event) { this.remove(); killObjUrl(url); })
                .attach(document.body);
                
            return true;
        }
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
                extension = js.alg.string(extension, "");
                
                if(extension) {
                    filename += "." + extension;
                }
                
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
                
                var saveTxtWindow = window.frames.saveTxtWindow;
                if (!saveTxtWindow) {
                    saveTxtWindow = document.createElement('iframe');
                    saveTxtWindow.id = 'saveTxtWindow';
                    saveTxtWindow.style.display = 'none';
                    document.body.insertBefore(saveTxtWindow, null);
                    saveTxtWindow = window.frames.saveTxtWindow;
                    if (!saveTxtWindow) {
                        saveTxtWindow = window.open('', '_temp', 'width=100,height=100');
                        if (!saveTxtWindow) {
                            window.alert('Sorry, download file could not be created.');
                            return false;
                        }
                    }
                }

                var doc = saveTxtWindow.document;
                doc.open('text/html', 'replace');
                doc.charset = charset;
                if (/\.htm(l)?$/i.test(name)) {
                    doc.close();
                    doc.body.innerHTML = '\r\n' + content + '\r\n';
                }
                else
                {
                    if (!/\.txt$/i.test(name)) { 
                        name += '.txt';
                    }
                    doc.write(content);
                    doc.close();
                }

                ret = doc.execCommand('SaveAs', null, name);
                saveTxtWindow.close();
                    
                return ret;
            }
        }
        
        return __saveText.apply(this, arguments);
    }
    
    return download;
});
