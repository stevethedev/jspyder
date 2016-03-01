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

jspyder.extend.fn("canvas", function () {
    var js = this;
    function js_canvas(settings) {
        settings = settings || {};
        var c = js.dom("<canvas></canvas>"),
            attrs = {
                height: js.alg.number(settings.height, 150),
                width: js.alg.number(settings.width, 300)
            },
            css = settings.css,
            alt = settings.alt;

        c.setAttrs(attrs);
        c.setCss(css);
        c.setHtml(alt);

        return Object.create(js_canvas.fn, {
            canvas: { value: c },
            queue: { value: [] },
            context: { value: c._element[0] && c._element[0].getContext && c._element[0].getContext("2d") },
        });
    }

    js_canvas.fn = {
        canvas: null,
        context: null,
        queue: null,
        attach: function () {
            this.canvas && this.canvas.attach(arguments);
            return this;
        },
        remove: function () {
            this.canvas && this.canvas.remove();
            return this;
        },
        getSize: function (o, fn) {
            o = o || {};
            var element = this.canvas && this.canvas._element && this.canvas._element[0],
                rect;

            if (element) {
                rect = element.getBoundingClientRect();
                o.width = element.width;
                o.height = element.height;
                o.x = rect.x;
                o.y = rect.y;
                js.alg.use(this, fn, [o]);
            }
            return this;
        },
        exportSize: function() {
            var size = {};
            this.getSize(size);
            return size;
        },
        clear: function () {
            var self = this;
            this.getSize({}, function (size) {
                self.context.clearRect(0, 0, size.width, size.height);
            });
            return this;
        },
        render: function () {
            this.clear();
            if (this.context) {
                var self = this;
                js.alg.each(this.queue, function (command) {
                    js.alg.use(self, command);
                });
            }
            return this;
        },
        draw: function (type, settings) {
            var cmd = this.cmd[type],
                data;

            if (cmd) {
                data = function () { js.alg.use(this, cmd, [settings]); };
                if (typeof data === "function") {
                    data.settings = settings;
                    data.type = type;
                    this.queue && this.queue.push(data);
                }
            }

            return this;
        },
        cmd: {
            rectangle: function (settings) {
                settings = __mergeSettings(settings);

                this.context.fillStyle = settings.border;
                this.context.fillRect(
                    settings.x,
                    settings.y,
                    settings.width,
                    settings.height);

                this.context.fillStyle = settings.fill;
                this.context.fillRect(
                    settings.x + settings.borderLeftWidth,
                    settings.y + settings.borderTopWidth,
                    settings.width - (settings.borderRightWidth + settings.borderLeftWidth),
                    settings.height - (settings.borderBottomWidth + settings.borderTopWidth));
            },
            arc: function (settings) {
                settings = __mergeSettings(settings);
                settings.radius = js.alg.number(settings.radius, 0);
                settings.anticlockwise = js.alg.bool(settings.anticlockwise, false);
                
                var angle = js.alg.deg2rad(settings.angle, 0),
                    degrees = js.alg.deg2rad(settings.degrees, 360) + angle;
                
                this.context.beginPath();
                
                this.context.arc(
                    settings.x,
                    settings.y,
                    settings.radius,
                    angle,
                    degrees,
                    settings.anticlockwise);
                    
                if (settings.fromcenter) {
                    this.context.lineTo(settings.x, settings.y);
                }
                if (settings.closepath) {
                    this.context.closePath();
                }
                
                this.context.strokeStyle = settings.border;
                this.context.stroke();
                
                this.context.fillStyle = settings.fill;
                this.context.fill();
            },
            pie: function (settings) {
                settings = __mergeSettings(settings);
                settings.radius = js.alg.number(settings.radius, 0);
                settings.angle = js.alg.number(settings.angle, -90);
                settings.anticlockwise = js.alg.bool(settings.anticlockwise, false);
                settings.closepath = true;
                
                var canvas = this,
                    total = 0,
                    angle = 0;
                    
                settings.degrees = 360;
                    
                js.alg.use(canvas, canvas.cmd.arc, [settings]);
                    
                js.alg.each(settings.sections, function (section) {
                    total += js.alg.number(section.value, 0);
                })
                js.alg.each(settings.sections, function (section) {
                    var deg = (js.alg.number(section.value, 0) / total) * 360,
                        arc = js.alg.mergeObj({}, settings, {
                            angle: angle + settings.angle,
                            degrees: deg,
                            fill: section.fill,
                            fromcenter: true,
                            closepath: true
                        });
                        angle += deg;
                        
                    js.alg.use(canvas, canvas.cmd.arc, [arc]);
                });
                return;
            },
            text: function (settings) {
                settings.size = js.alg.number(settings.size, 16);
                settings.font = js.alg.string(settings.font, "Arial");
                settings.text = js.alg.string(settings.text, "");
                settings.x = js.alg.string(settings.x, 0);
                settings.y = js.alg.string(settings.y, 0);
                settings.outline = js.alg.string(settings.outline, "transparent");
                settings.fill = js.alg.string(settings.fill, "black");
                
                this.context.font = settings.size + "px " + settings.font;
                this.context.fillStyle = settings.fill;
                this.context.fillText(settings.text, settings.x, settings.y);
                this.context.strokeStyle = settings.outline;
                this.context.strokeText(settings.text, settings.x, settings.y);
                
                return;
            },
            barchart: function (settings) {
                var sections = js.alg.sliceArray(settings.sections) || [];
                
                var min, max, cols = 0, columnSplit = -1, width = 0, height = 0, self = this;
                
                js.alg.arrEach(sections, function(group) {
                    var c = 0;
                    
                    js.alg.arrEach(group.values, function(bar) {
                        ++c;
                        min = js.alg.min(min, bar);
                        max = js.alg.max(max, bar);
                    });
                    
                    cols = js.alg.max(++c, cols);
                });
                
                columnSplit = (sections.length + 1) * (cols - 1) - 1;
                
                var size = this.exportSize();
                width = size.width;
                height = size.height;
                
                var count = 0, chartBars = [], s = 0, 
                    w = (width / columnSplit)
                
                js.alg.arrEach(sections, function(group, g) {
                    var color = js.alg.string(group.color, "black"),
                        bars = js.alg.sliceArray(group.values) || [];

                    js.alg.arrEach(bars, function(bar, b) {
                        
                        var value = height * (js.alg.number(bar) / (max || 1)),
                            y = (height - value),
                            x = (g + b*(sections.length + 1)) * w,
                            h = (value);
                            
                        self.cmd.rectangle.call(self, {
                            x: x,
                            y: y,
                            width: w,
                            height: h,
                            fill: color
                        });
                    });
                    count++;
                });
                
                return;
            }
        }
    };
    
    function __mergeSettings(settings) {
        settings = settings || {};
        
        settings.fill = js.alg.string(settings.fill, "#FFF");
        settings.border = js.alg.string(settings.border, "transparent");
        settings.borderWidth = js.alg.number(settings.borderWidth, 0);
        settings.borderTopWidth = js.alg.number(settings.borderTopWidth, settings.borderWidth);
        settings.borderRightWidth = js.alg.number(settings.borderRightWidth, settings.borderWidth);
        settings.borderBottomWidth = js.alg.number(settings.borderBottomWidth, settings.borderWidth);
        settings.borderLeftWidth = js.alg.number(settings.borderLeftWidth, settings.borderWidth);
        settings.x = js.alg.number(settings.x, 0);
        settings.y = js.alg.number(settings.y, 0);
        settings.height = js.alg.number(settings.height, 0);
        settings.width = js.alg.number(settings.width, 0);
        
        return settings;
    }
    
    return js_canvas;
});