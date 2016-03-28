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

jspyder.extend.fn("canvas", function () {
    var js = this;

    /**
     * @class jspyder.canvas
     * A wrapper for JavaScript & HTML5 Canvas manipulation.
     *
     * @param {Object} settings
     * @param {Number} [settings.canvas]        If defined, this canvas will be used instead of generating a new one.
     * @param {Number} [settings.height=150]    Canvas Height
     * @param {Number} [settings.width=300]     Canvas Width
     * @param {Object} [settings.css]           Canvas CSS Styles
     */
    function js_canvas(settings) {
        settings = settings || {};
        var c = js.dom(settings["canvas"] || "<canvas></canvas>"),
            css = settings["css"],
            attrs = {
                "height": js.alg.number(settings["height"], 150),
                "width": js.alg.number(settings["width"], 300)
            };

        if(!settings["canvas"]) {
            c.setCss(css)
                .setAttrs(attrs);
        }
        

        return Object.create(js_canvas.fn, {
            "canvas": { value: c },
            "queue": { value: [] },
            "context": { value: c["_element"][0] && c["_element"][0]["getContext"] && c["_element"][0].getContext("2d") },
        });
    }

    js_canvas["fn"] = {
        /**
         * The JS-DOM Canvas Element
         */
        "canvas": null,

        /**
         * The HTML5 2D Canvas Context
         */
        "context": null,

        /**
         * The queue of commands to be executed when rendered.
         */
        "queue": null,

        /**
         * An alias for js.dom.attach
         */
        "attach": function () {
            this["canvas"] && this["canvas"].attach(arguments);
            return this;
        },

        /**
         * An alias for js.dom.remove
         */
        "remove": function () {
            this["canvas"] && this["canvas"].remove();
            return this;
        },

        /**
         * Retrieves the size of the canvas element, and passes the value
         * into the identified function.
         *
         * @param {Function} fn
         *      The function to execute with [o] as the first parameter.
         *      Output keys are x (position), y (position), width, and
         *      height.
         */
        "getSize": function (fn) {
            js.alg.use(this, fn, [this.exportSize()]);
            return this;
        },

        /**
         * Exports the values retrieved by js.canvas.getSize to a new
         * variable.
         */
        "exportSize": function() {
            var size = {
                    "height": 0,
                    "width": 0,
                    "x": 0,
                    "y": 0
                },
                element = (this["canvas"] && this["canvas"]["_element"] && this["canvas"]["_element"][0]),
                rect;

            if (element) {
                rect = element.getBoundingClientRect();
                size["width"] = element["width"];
                size["height"] = element["height"];
                size["x"] = rect["x"];
                size["y"] = rect["y"];
            }

            return size;
        },
        
        /**
         * Creates an image of the defined type, and returns the value.
         * 
         * @param {String} type
         *      The type of image to generate (png, gif, jpg, etc.)
         */
        "exportImageUrl": function(type) {
            var dataUrl = "";
            if(this.canvas) {
                this.canvas.element(0, function() {
                    dataUrl = this.toDataURL("image/" + type);
                });
            }
            return dataUrl;
        },
        
        /**
         * Creates an image of the defined type, and exports the data-url into
         * the defined function.
         * 
         * @param {String} type
         *      The type of image to generate (png, gif, jpg, etc.)
         * @param {Function} fn
         *      The function to receive the generated data-url
         */
        "getImageUrl": function(type, fn) {
            js.alg.use(this, fn, [this.exportImageUrl(type)]);
            return this;
        },
        
        /**
         * Generates an image, and returns the image node.
         * 
         * @param {String} type
         */
        "exportImage": function(type) {
            return js.dom("<img></img>")
                .setAttrs({ "src": this.exportImageUrl(type) });
        },
        
        /**
         * Generates an image, and inserts it into the specified function.
         * 
         * @param {String} type
         * @param {Function} fn
         */
        "getImage": function(type, fn) {
            js.alg.use(this, fn, [this.exportImage(type)]);
            return this;
        },

        /**
         * Wipes all of the data from the canvas.
         */
        "clear": function () {
            var self = this;
            this.getSize(function (size) {
                self["context"].clearRect(0, 0, size["width"], size["height"]);
            });
            return this;
        },

        /**
         * Renders the queue to the canvas.
         */
        "render": function () {
            this.clear();
            if (this["context"]) {
                var self = this;
                js.alg.each(this["queue"], function (command) {
                    js.alg.use(self, command);
                });
            }
            return this;
        },

        /**
         * Queues a command from js.canvas.cmd to be rendered
         *
         * @param {String} type
         *      The name of the function in js.canvas.cmd to execute
         * @param {Object} settings
         *      The settings object to pass into the draw macro
         */
        "draw": function (type, settings) {
            var cmd = this.cmd[type],
                data;

            if (cmd) {
                data = function () { js.alg.use(this, cmd, [settings]); };
                if (typeof data === "function") {
                    data["settings"] = settings;
                    data["type"] = type;
                    this["queue"] && this["queue"].push(data);
                }
            }

            return this;
        },

        /**
         * Canvas Command Dictionary
         */
        "cmd": {
            /**
             * Queues a rectangle
             *
             * @param {Object} settings
             * @param {String} [settings.border]  The color of the border to render around the rectangle.
             * @param {Number} [settings.borderWidth]  The width of the border to render around the rectangle.
             * @param {Number} [settings.borderLeftWidth]  The width of the left-border of the rendered rectangle.
             * @param {Number} [settings.borderRightWidth] The width of the right-border of the rendered rectangle.
             * @param {Number} [settings.borderTopWidth]   The width of the top-border of the rendered rectangle.
             * @param {Number} [settings.borderBottomWidth] The width of the bottom-border of the rendered rectangle.
             * @param {String} [settings.fill]  The fill-color of the rendered rectangle.
             */
            "rectangle": function (settings) {
                settings = __mergeSettings(settings);

                this["context"]["fillStyle"] = settings["border"];
                this["context"].fillRect(
                    settings["x"],
                    settings["y"],
                    settings["width"],
                    settings["height"]);

                this["context"]["fillStyle"] = settings["fill"];
                this["context"]["fillRect"](
                    settings["x"] + settings["borderLeftWidth"],
                    settings["y"] + settings["borderTopWidth"],
                    settings["width"] - (settings["borderRightWidth"] + settings["borderLeftWidth"]),
                    settings["height"] - (settings["borderBottomWidth"] + settings["borderTopWidth"]));
            },

            /**
             * Qeues an Arc
             *
             * @param {Object} settings
             * @param {Number} settings.radius      The radius of the arc from the centerpoint (settings.x, settings.y)
             * @param {Number} settings.x           The x-position of the element
             * @param {Number} settings.y           The y-position of the element
             * @param {Number} settings.angle       The offset angle the arc should be tilted
             * @param {Number} settings.degrees     The number of degrees (360-based) the arc should span.
             * @param {Boolean} settings.anticlockwise  Whether the arc should rotate left (true) or right (falsey)
             * @param {Boolean} settings.fromcenter Whether to extend a line from the ends of the arc to the center point (x,y)
             * @param {String} settings.border      The color to use for the border of the arc
             * @param {String} settings.fill        The color to use for the fill of the arc
             */
            "arc": function (settings) {
                settings = __mergeSettings(settings);
                settings["radius"] = js.alg.number(settings["radius"], 0);
                settings["anticlockwise"] = js.alg.bool(settings["anticlockwise"], false);

                var angle = js.alg.deg2rad(settings["angle"], 0),
                    degrees = js.alg.deg2rad(settings["degrees"], 360) + angle;

                this["context"].beginPath();

                this["context"].arc(
                    settings["x"],
                    settings["y"],
                    settings["radius"],
                    angle,
                    degrees,
                    settings["anticlockwise"]);

                if (settings["fromcenter"]) {
                    this["context"].lineTo(settings["x"], settings["y"]);
                }
                if (settings.closepath) {
                    this["context"].closePath();
                }

                this["context"]["strokeStyle"] = settings["border"];
                this["context"].stroke();

                this["context"]["fillStyle"] = settings["fill"];
                this["context"].fill();
            },

            /**
             * Qeues a circle
             *
             * @param {Object} settings
             * @param {Number} settings.radius      The radius of the circle from the centerpoint (settings.x, settings.y)
             * @param {Number} settings.x           The x-position of the element
             * @param {Number} settings.y           The y-position of the element
             * @param {Number} settings.angle       The offset angle the circle should be tilted
             * @param {String} settings.border      The color to use for the border of the circle
             * @param {String} settings.fill        The color to use for the fill of the circle
             */
            "circle": function (settings) {
                settings = __mergeSettings(settings);
                settings["degrees"] = 360;

                js.alg.use(this, this["cmd"].arc, [settings]);
            },

            /**
             * Queues text rendering
             *
             * @param {Object} settings
             * @param {Number} [settings.size]
             * @param {String} [settings.font]
             * @param {String} [settings.text]
             * @param {Number} [settings.x]
             * @param {Number} [settings.y]
             * @param {String} [settings.outline]
             * @param {String} [settings.fill]
             * @param {String} [settings.textalign]
             */
            "text": function (settings) {
                settings = settings || {};
                settings["size"] = js.alg.number(settings["size"], 16);
                settings["font"] = js.alg.string(settings["font"], "Arial");
                settings["text"] = js.alg.string(settings["text"], "");
                settings["x"] = js.alg.string(settings["x"], 0);
                settings["y"] = js.alg.string(settings["y"], 0);
                settings["outline"] = js.alg.string(settings["outline"], "transparent");
                settings["fill"] = js.alg.string(settings["fill"], "black");
                settings["textalign"] = js.alg.string(settings["textalign"], "start");

                this["context"]["textAlign"] = settings["textalign"];
                this["context"]["font"] = settings["size"] + "px " + settings["font"];
                this["context"]["fillStyle"] = settings["fill"];
                this["context"].fillText(settings["text"], settings["x"], settings["y"]);
                this["context"]["strokeStyle"] = settings["outline"];
                this["context"].strokeText(settings["text"], settings["x"], settings["y"]);

                return;
            },

            /**
             * Queues a line for rendering
             *
             * @param {Object} settings
             * @param {Number} [settings.x=0]
             * @param {Number} [settings.y=0]
             * @param {Number} [settings.width=0]
             * @param {Number} [settings.height=0]
             * @param {String} [settings.color=black]
             * @param {Number} [settings.thickness=1]
             */
            "line": function(settings) {
                settings = settings || {};
                settings["x"] = js.alg.number(settings["x"], 0);
                settings["y"] = js.alg.number(settings["y"], 0);
                settings["width"] = js.alg.number(settings["width"], 0);
                settings["height"] = js.alg.number(settings["height"], 0);
                settings["color"] = js.alg.string(settings["color"], "black");
                settings["thickness"] = js.alg.number(settings["thickness"], 1);

                this["context"].strokeStyle = settings["color"];
                this["context"].lineWidth = settings["thickness"];
                this["context"].beginPath();
                this["context"].moveTo(settings["x"], settings["y"]);
                this["context"].lineTo(settings["x"] + settings["width"], settings["y"] + settings["height"]);
                this["context"].stroke();

                return;
            },

            /**
             * Renders a pie chart
             *
             * @param {Object} settings
             * @param {Number} [settings.radius=0]
             * @param {Number} [settings.angle=-90]
             * @param {Boolean} [settings.anticlockwise=false]
             */
            "pie": function (settings) {
                settings = __mergeSettings(settings);
                settings["radius"] = js.alg.number(settings["radius"], 0);
                settings["angle"] = js.alg.number(settings["angle"], -90);
                settings["anticlockwise"] = js.alg.bool(settings["anticlockwise"], false);
                settings["closepath"] = true;
                settings["degrees"] = 360;

                var canvas = this,
                    total = 0,
                    angle = 0;

                js.alg.use(canvas, canvas["cmd"].arc, [settings]);

                js.alg.each(settings["sections"], function(section) {
                    total += js.alg.number(section.value, 0);
                });

                js.alg.each(settings["sections"], function (section) {
                    var deg = (js.alg.number(section["value"], 0) / total) * 360,
                        arc = js.alg.mergeObj({}, settings, {
                            angle: angle + settings["angle"],
                            degrees: deg,
                            fill: section["fill"],
                            fromcenter: true,
                            closepath: true
                        });
                        angle += deg;

                    js.alg.use(canvas, canvas.cmd.arc, [arc]);
                });

                return;
            },

            /**
             * Queues a Bar Chart
             *
             * @param {Object} settings
             * @param {Object[]} settings.sections
             * @param {Number} [settings.borderWidth=1]
             * @param {Number} [settings.width]
             * @param {Number} [settings.height]
             * @param {Number} [settings.x=0]
             * @param {Number} [settings.y=0]
             * @param {String} [settings.color=white]
             * @param {String} [settings.fill=black]
             * @param {String[]} [settings.labels]
             * @param {Number} [settings.labelSize]
             * @param {String} [settings.linecolor]
             * @param {Number} [settings.min]
             * @param {Number} [settings.max]
             * @param {Function} [settings.format]
             */
            "barchart": function (settings) {
                settings = settings || {};
                var sections = settings["sections"] = (settings["sections"] || []),
                    size = this.exportSize(),
                    borderWidth = settings["borderWidth"] = js.alg.number(settings["borderWidth"], 1),
                    width = settings["width"] = js.alg.number(settings["width"], size["width"]),
                    height = settings["height"] = js.alg.number(settings["height"], size["height"]),
                    chartX = settings["x"] = js.alg.number(settings["x"], 0),
                    chartY = settings["y"] = js.alg.number(settings["y"], 0),
                    fill = settings["fill"] = js.alg.string(settings["fill"], "white"),
                    border = settings["border"] = js.alg.string(settings["border"], "black"),
                    lineColor = settings["lineColor"] = js.alg.string(settings["lineColor"], "rgba(0, 0, 0, 0.3)"),
                    labels = settings["labels"] = (settings["labels"] || []),
                    labelSize = settings["labelSize"] = js.alg.number(settings["labelSize"], 16),
                    min = settings["min"] = js.alg.number(settings["min"], Infinity),
                    max = settings["max"] = js.alg.number(settings["max"], -Infinity),
                    format = js.alg.bindFn(this, settings["format"] || function(n) { return n; }),
                    self = this,
                    cols,
                    columnSplit,
                    colWidth,
                    offsetY = labelSize * 1.5,
                    offsetX = 50;

                self.cmd.rectangle.call(this, {
                    "width": width,
                    "height": height,
                    "x": chartX,
                    "y": chartY,
                    "fill": fill,
                    "borderWidth": borderWidth,
                    "border": border
                });

                width -= borderWidth * 2;
                height -= borderWidth * 2;

                chartX += borderWidth;
                chartY += borderWidth;

                height -= offsetY;

                js.alg.arrEach(sections, function(group) {
                    var c = -1;

                    js.alg.arrEach(group.values, function(bar) {
                        c++;
                        min = js.alg.min(min, bar);
                        max = js.alg.max(max, bar);
                    });

                    cols = js.alg.max(++c, cols);
                });

                max = js.alg.magnitude(max) * 1.1;

                js.alg.iterate(0, 5, function(i) {
                    self.cmd.line.call(self, {
                        "x": chartX,
                        "y": (height * (5 - i)) / 5,
                        "width": width + chartX,
                        "height": 0,
                        "color": lineColor
                    });
                    self.cmd.text.call(self, {
                        "x": labelSize / 3,
                        "y": ((height * (5 - i)) / 5) - (labelSize / 3),
                        "size": labelSize,
                        "font": "Arial",
                        "text": format(((i / 5) * max)|0),
                        "textalign": "left"
                    });
                    self.cmd.text.call(self, {
                        "x": width - (labelSize / 3),
                        "y": ((height * (5 - i)) / 5) - (labelSize / 3),
                        "size": labelSize,
                        "font": "Arial",
                        "text": format(((i / 5) * max)|0),
                        "textalign": "right"
                    });
                });

                width -= offsetX;
                chartX += offsetX;
                columnSplit = (sections["length"] + 1) * (cols);
                colWidth = (width / columnSplit);

                var workArea = {
                    "x": chartX,
                    "y": chartY,
                    "height": height - chartY,
                    "width": width - chartX,
                    "vertWidth": (width - chartX) / cols
                };

                js.alg.iterate(0, cols + 1, function(i) {
                    var x = workArea["x"] + (workArea["vertWidth"] * i);

                    self.cmd.line.call(self, {
                        "x": x,
                        "y": workArea["y"],
                        "width": 0,
                        "height": workArea["height"],
                        "color": lineColor
                    });
                    self.cmd.text.call(self, {
                        "text": labels[i],
                        "font": "Arial",
                        "size": labelSize,
                        "x": workArea["x"] + (workArea["vertWidth"] * (i + i + 1)/2),
                        "y": workArea["height"] + labelSize,
                        "textalign": "center"
                    });
                });

                js.alg.arrEach(sections, function(group, g) {
                    var barColor = group["fill"] = js.alg.string(group["fill"], "black"),
                        barOutline = group["border"] = js.alg.string(group["border"], barColor),
                        barOutlineWidth = group["borderWidth"] = js.alg.number(group["borderWidth"], 1);

                    js.alg.arrEach(group && group.values, function(bar, b) {
                        var value = height * (js.alg.number(bar) / (max || 1)),
                            barY = (workArea["height"] - workArea["y"] - value),
                            barX = (colWidth / sections["length"]) + (g * colWidth) + (b * workArea["vertWidth"]);

                        self.cmd.rectangle.call(self, {
                            "x": workArea["x"] + barX,
                            "y": workArea["y"] + barY,
                            "width": colWidth,
                            "height": value,
                            "fill": barColor,
                            "border": barOutline,
                            "borderWidth": barOutlineWidth
                        });
                    });
                });

                return;
            },

            /**
             * Queues a Line Chart
             *
             * @param {Object} settings
             * @param {Object[]} settings.sections
             * @param {Number} [settings.borderWidth=1]
             * @param {Number} [settings.width]
             * @param {Number} [settings.height]
             * @param {Number} [settings.x=0]
             * @param {Number} [settings.y=0]
             * @param {String} [settings.color=white]
             * @param {String} [settings.fill=black]
             * @param {String[]} [settings.labels]
             * @param {Number} [settings.labelSize]
             * @param {String} [settings.linecolor]
             * @param {Number} [settings.min]
             * @param {Number} [settings.max]
             * @param {Function} [settings.format]
             */
            "linechart": function (settings) {
                settings = settings || {};
                var sections = settings["sections"] = (settings["sections"] || []),
                    size = this.exportSize(),
                    borderWidth = settings["borderWidth"] = js.alg.number(settings["borderWidth"], 1),
                    width = settings["width"] = js.alg.number(settings["width"], size["width"]),
                    height = settings["height"] = js.alg.number(settings["height"], size["height"]),
                    chartX = settings["x"] = js.alg.number(settings["x"], 0),
                    chartY = settings["y"] = js.alg.number(settings["y"], 0),
                    fill = settings["fill"] = js.alg.string(settings["fill"], "white"),
                    border = settings["border"] = js.alg.string(settings["border"], "black"),
                    labels = settings["labels"] = (settings["labels"] || []),
                    labelSize = settings["labelSize"] = js.alg.number(settings["labelSize"], 16),
                    lineColor = settings["linecolor"] = js.alg.string(settings["linecolor"], "rgba(0, 0, 0, 0.3)"),
                    min = js.alg.number(settings["min"], Infinity),
                    max = js.alg.number(settings["max"], -Infinity),
                    format = js.alg.bindFn(this, settings["format"] || function(n) { return n|0; }),
                    self = this,
                    cols,
                    offsetX = 50,
                    offsetY = labelSize * 1.5;

                self.cmd.rectangle.call(this, {
                    width: width,
                    height: height,
                    x: chartX,
                    y: chartY,
                    fill: fill,
                    borderWidth: borderWidth,
                    border: border
                });

                width -= borderWidth * 2;
                height -= borderWidth * 2;
                chartX += borderWidth;
                chartY += borderWidth;

                height -= offsetY;

                js.alg.arrEach(sections, function(group) {
                    var c = -1;

                    js.alg.arrEach(group.values, function(value) {
                        c++;
                        min = js.alg.min(min, value);
                        max = js.alg.max(max, value);
                    });

                    cols = js.alg.max(++c, cols);
                });

                max = js.alg.magnitude(max) * 1.1;

                js.alg.iterate(0, 5, function(i) {
                    self.cmd.line.call(self, {
                        x: chartX,
                        y: (height * (5 - i)) / 5,
                        width: width + chartX,
                        height: 0,
                        color: lineColor
                    });

                    self.cmd.text.call(self, {
                        x: labelSize / 3,
                        y: ((height * (5 - i)) / 5) - (labelSize / 3),
                        size: labelSize,
                        font: "Arial",
                        text: format(((i / 5) * max)),
                        textalign: "left"
                    });

                    self.cmd.text.call(self, {
                        x: width - (labelSize / 3),
                        y: ((height * (5 - i)) / 5) - (labelSize / 3),
                        size: labelSize,
                        font: "Arial",
                        text: format(((i / 5) * max)),
                        textalign: "right"
                    });
                });

                width -= offsetX;
                chartX += offsetX;

                var workArea = {
                    "x": chartX,
                    "y": chartY,
                    "height": height - chartY,
                    "width": width - chartX,
                    "vertWidth": (width - chartX) / (cols - 1)
                };

                js.alg.iterate(0, cols, function(i) {
                    var x = workArea["x"] + (workArea["vertWidth"] * i);
                    self.cmd.line.call(self, {
                        "x": x,
                        "y": workArea["y"],
                        "width": 0,
                        "height": workArea["height"],
                        "color": lineColor
                    });
                    self.cmd.text.call(self, {
                        "text": labels[i],
                        "font": "Arial",
                        "size": labelSize,
                        "x": x,
                        "y": workArea["height"] + labelSize,
                        "textalign": "center"
                    });
                });

                js.alg.arrEach(sections, function(group, g) {
                    var lineColor = group["fill"] = js.alg.string(group["fill"], "transparent"),
                        lineOutline = group["border"] = js.alg.string(group["border"], "black"),
                        lineOutlineWidth = group["borderWidth"] = js.alg.number(group["borderWidth"], 1),
                        dotColor = group["dotfill"] = js.alg.string(group["dotfill"], lineColor),
                        dotOutline = group["dotBorder"] = js.alg.string(group["dotBorder"], lineOutline),
                        dotOutlineWidth = group["dotBorderWidth"] = js.alg.string(group["dotBorderWidth"], lineOutlineWidth),
                        dotRadius = group["dotRadius"] = js.alg.number(group["dotRadius"], 4);

                    js.alg.arrEach(group && group.values, function(val, b, values) {

                        var v1 = workArea["height"] - (workArea["y"] + (workArea["height"] * js.alg.number(values[b-1]) / (max || 1))),
                            v2 = workArea["height"] - (workArea["y"] + (workArea["height"] * js.alg.number(val) / (max || 1))),
                            x = workArea["x"] + (workArea["vertWidth"] * (b - 1)),
                            dotX = workArea["x"] + (workArea["vertWidth"] * (b));

                        if(b) {
                            self.cmd.line.call(self, {
                                "x": x,
                                "y": v1,
                                "width": workArea["vertWidth"],
                                "height": (v2 - v1),
                                "color": lineOutline,
                                "thickness": lineOutlineWidth
                            });
                        }

                        self.cmd.circle.call(self, {
                            "y": v2,
                            "x": dotX,
                            "radius": dotRadius,
                            "fill": dotColor,
                            "border": dotOutline,
                            "thickness": dotOutlineWidth
                        });

                        self.cmd.circle.call(self, {
                            "y": v1,
                            "x": x,
                            "radius": dotRadius,
                            "fill": dotColor,
                            "border": dotOutline,
                            "thickness": dotOutlineWidth
                        });
                    });
                });

                return;
            }
        }
    };

    /**
     * @private
     */
    function __mergeSettings(settings) {
        settings = settings || {};

        settings["fill"] = js.alg.string(settings["fill"], "#FFF");
        settings["border"] = js.alg.string(settings["border"], "transparent");
        settings["borderWidth"] = js.alg.number(settings["borderWidth"], 0);
        settings["borderTopWidth"] = js.alg.number(settings["borderTopWidth"], settings["borderWidth"]);
        settings["borderRightWidth"] = js.alg.number(settings["borderRightWidth"], settings["borderWidth"]);
        settings["borderBottomWidth"] = js.alg.number(settings["borderBottomWidth"], settings["borderWidth"]);
        settings["borderLeftWidth"] = js.alg.number(settings["borderLeftWidth"], settings["borderWidth"]);
        settings["x"] = js.alg.number(settings["x"], 0);
        settings["y"] = js.alg.number(settings["y"], 0);
        settings["height"] = js.alg.number(settings["height"], 0);
        settings["width"] = js.alg.number(settings["width"], 0);

        return settings;
    }

    return js_canvas;
});