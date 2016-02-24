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

jspyder.extend.fn("form", function () {
    var js = this;
    
    /**
     * @class jspyder.form
     * @member jspyder
     * 
     * Initializes a JSpyder Form object.
     * 
     * @param {Object} [config]
     *      Configuration flags for building the forms element.
     * 
     * @param {Function} [config.success]
     *     Function to trigger on form submission, if the validation
     *     checks pass.  This can be overridden, later.  Expected
     *     parameters are:
     * 
     * @param {Object} [config.success.values]
     *     The values of each field in the form, where keys correspond
     *     to field names and values correspond to their values.
     * 
     * @param {Function} [config.failure]
     *     Function to trigger on form submission failure. For example,
     *     if the validation checks failed.  This can be overridden, 
     *     later.
     *      
     * @param {Object} [config.failure.values]
     *     The values of each field in the form, where keys correspond
     *     to field names and values correspond to their values.
     * 
     * @param {Object} [config.failure.invalid]
     *     The values of each invalid field in the form, where keys
     *     correspond to field names and values correspond to their
     *     values.
     * 
     * @param {Function} [config.reset]
     *     Function to trigger on form rest.  This can be overridden, 
     *     later.
     * 
     * @param {Object} [config.fields]
     *      An object of fields to insert into the document, where
     *      the keys correspond to field names and the value scorrespond
     *      to field definitions.
     * 
     * @return {Object}
     *      JSpyder Function object.
     */
    function js_form(config, fn) {
        var form = Object.create(js_form.fn, {
            _dom: { value: js.dom("<form></form>") },
            _template: { value: {} }
        });
        
        // load in the configuration options
        if (config) {
            // success function
            if (config.success) { form._success = config.success; }
            // failure function
            if (config.failure) { form._failure = config.failure; }
            // reset function
            if (config.reset) { form._reset = config.reset; }
            // form fields
            if (config.fields) {
                form.addFields(config.fields);
            }
        }

        if (typeof fn === "function") {
            fn.apply(this);
        }

        return form;
    }

    js_form.fn = {
        /**
         * @private
         * @method
         * 
         * Callback function which will execute if the form submits
         * successfully.
         * 
         * @param {Object} values
         *      An object where keys correspond to input names, and values
         *      correspond to the values they are storing.
         */
        _success: function (values, invalid) { return this; },
        
        /**
         * @private
         * @method
         * 
         * Callback function which will execute if the form fails to submit
         * successfully (e.g. failed the validation check). 
         * 
         * @param {Object} values
         *      An object where keys correspond to input names, and values
         *      correspond to the values they are storing.
         * 
         * @param {Object} invalid
         *      An object of invalid fields where keys correspond to input
         *      names, and values correspond to the values they are storing.
         */
        _failure: function (values, invalid) { return this; },
        
        /**
         * @private
         * @method
         * 
         * Callback function which will execute if the reset event is received.
         */
        _reset: function () { return this; },
        
        /**
         * @private
         * @property {Object}
         * 
         * jspyder.dom object pointing to the created form element.
         */
        _dom: null,
        
        /**
         * @private
         * @property {Object}
         * 
         * List of elements that the form is dealing with, to prevent having to
         * deal directly with making calls to the DOM.
         */
        _fields: null,
        
        each: function(fn, data) {
            js.alg.each(this._fields, fn, data);
            return this;
        },
        
        /**
         * @method
         * Adds a group of fields using jspyder.form.addField where keys
         * correspond to field names and values correspond to field templates.
         * 
         * @param {Object} fields
         */
        
        addFields: function(fields) {
            for (var name in fields) {
                this.addField(name, fields[name])
            }
            return this;
        },
        
        /**
         * @method
         * 
         * Adds a new field to the form, if the name does not already exist,
         * using the name provided.
         * 
         * @param {String} name
         *      The name which will be used to refer to the generated field.
         * 
         * @param {Object} [config]
         *      The configuration options which will be used to generate and
         *      style the created field.
         * 
         * @param {String} [config.type]
         *      The type of field which should be created:
         *      - **input** *default*: standard input field without
         *          any special attributes or constraints.
         *      - **checkbox**: A set of checkboxes will be created.  Each value
         *          should be designated with label-value pairs stored in an
         *          array (see below).
         *      - **dropdown**: A dropdown control will be created.  Each value
         *          should be designated with label-value pairs stored in an
         *          array (see below).
         *      - **textarea**: A standard multi-line text field.
         *      - **hidden**: An abstract field which is not rendered to the
         *          page, but in all other ways behaves like a standard *input*
         *          field.
         * 
         * @param {Object[]} [config.values]
         *      A list of text-value pairs.
         * 
         * @param {String} [config.values.label]
         *      The label to display in place of the value.  If this is omitted,
         *      and a value is provided, then this will default to the value.
         * 
         * @param {String} [config.values.value]
         *      The value for this particular option.  If this is omitted, and
         *      a label is provided, then this will default to the label.
         * 
         * @param {String} [config.section]
         *      The name of a section to add this particular field to.  If
         *      blank, then this field is not added directly to the list.
         */
        addField: function (name, config) {
            name = js.alg.string(name, "");
            config = js.alg.object(config, {});
            
            var cfg = Object.create(js_form.fn.fieldTemplate),
                dval = js.alg.string(config.default, ""),
                val = js.alg.string(config.value, dval),
                $field;
            
            // copy all of the config options over, if they exist.    
            js.alg.mergeObj(cfg, config, {
                "name": name,
                "default": dval,
                "value": val,
                "values": js.alg.sliceArray(config.values)
            });

            $field = this.buildControl(cfg);

            if (!this._fields) {
                this._fields = {};
            }
            this._fields[name] = {
                type: cfg.type,
                field: $field,
                validate: cfg.validate,
                exportValue: cfg.exportValue,
                getValue: cfg.getValue,
                setValue: cfg.setValue,
                ignore: cfg.ignore,
                config: cfg };
                
            this.setFieldValue(name, val);

            return this;
        },
        
        registerControl: function (typename, constructor) {
            js_form.fn.templates[typename] = constructor;
            return this;
        },
        registerControlFn: function (typename, preconstructor) {
            return this.registerControl(typename, js.alg.use(this, preconstructor));
        },
        buildControl: function (config, nolabel) {
            var tmp = this.templates[config.type] || this.templates["input"],
                ctl = tmp.apply(this, [config]),
                fieldname = js.alg.string(config.name),
                labeltext = js.alg.string(config.text),
                uselabel = !js.alg.bool(config.nolabel, nolabel),
                lbl = this.buildLabel(uselabel && fieldname, uselabel && labeltext);
                
            js.alg.each(config["events"], function(callback, event) { 
                ctl.on(event, callback);
            });
                
            return lbl.and(ctl);
        },
        buildLabel: function(fieldname, labeltext) {
            var html = (fieldname && labeltext
                    ? ["<label for=\"", fieldname, "\">", labeltext, "</label>"].join('')
                    : "");
                    
            return js.dom(html);
        },
        /**
         * @method
         * 
         * Gets the defined field by name, and then passes it as a parameter
         * into the function defined by fn.
         */
        getField: function(name, fn) {
            var field = this.exportField(name);
            js.alg.use(this, fn, [field]);
            return this;
        },
        /**
         * @method
         * 
         * Retrieves the defined field by name.
         */
        exportField: function (name) {
            var data = this.exportFieldData(name),
                field = (data ? data.field : null);
            return field;
        },
        /**
         * @method
         * 
         * Gets the defined field object, and passes it as the parameter to the
         * function defined by fn.
         */
        getFieldData: function (name, fn) {
            var data = this.exportFieldData(name);
            js.alg.use(this, fn, [data]);
            return this;
        },
        /**
         * @method
         * 
         * Retrieves the field object stored under the defined name.
         */
        exportFieldData: function (name) {
            return this._fields[name] || null;
        },
        
        setFieldValue: function (name, value) {
            var data = this.exportFieldData(name),
                field = this.exportField(name);
                
            if (field) {
                if (data && data.setValue) {
                    js.alg.use(field, data.setValue, [data, value]);
                }
                else {
                    field.setValue(value);
                }
            }
                
            return this;
        },
        
        getFieldValue: function(name, fn) {
            var args = [
                this.exportFieldValue(name)
            ];
            js.alg.use(this, fn, args);
            return this;
        },
        exportFieldValue: function (name) {
            var data = this.exportFieldData(name),
                field = this.exportField(name),
                value = null;
                
            if (field) {
                if (data && data.exportValue) {
                    value = js.alg.use(field, data.exportValue, [data]);
                }
                else if (data && data.getValue) {
                    js.alg.use(field, data.getValue, [data, function (v) { value = v; }]);
                }
                else {
                    value = field.exportValue();
                }
            }
            
            return value;
        },
        
        // _labelHtml: function(fieldName, labelText) {
        //     return (fieldName && labelText
        //         ? "<label for=\"" + fieldName + "\">" + labelText + "</label>"
        //         : "");
        // },
        _textlineHtml: function(fieldName, fieldClass, fieldType) {
            fieldName = js.alg.string(fieldName);
            fieldClass = js.alg.string(fieldClass);
            fieldType = js.alg.string(fieldType, "text");
            
            var html = "";
            switch(fieldType) {
                case "currency":
                    html += "<div class=\"js-control js-control-currency-prefix\"></div>";
                    fieldClass += " data-currency";
                    break;
            }
            
            html += "<input class=\"" + fieldClass + "\"" + 
                    " name=\"" + fieldName + "\"" +
                    " data-type=\"" + fieldType + "\"></input>";
                    
            return html;
        },
        
        templates: { }, 

        /**
         * @method
         * 
         * Retrieves the values of all of the elements in the JS-Form.
         * 
         * @param {Function} fn
         *      A callback function to execute after the values have been
         *      calculated.  The context points back to the js-form.
         * @param {Object} fn.values
         *      The values of all of the form elements are pushed into the
         *      first parameter of the function fn.
         */
        values: function (fn) {
            var values = {};
            // js.alg.each(this._fields, this._values, { self: this, values: values });
            
            var $field, $type, name, _export = function(v) { values[name] = $field; }
            for (name in this._fields) {
                $field = this._fields[name].field;
                $type = this._fields[name].type;
                values[name] = null;
                
                $field.getValue(_export);
            }
                
            fn.apply(this, [values]);
            return this;
        },
        
        /**
         * @method
         * @private
         * 
         * Uses a generic value-retrieval method; this should be sufficient for
         * most single-value controls (e.g. not checkboxes)
         * 
         * @param {Object} $input
         *      JS-DOM object to retrieve a value from.
         * 
         * @return {String}
         *      The value of the element.
         */
        // _genericValue: function ($input) {
        //     var value = "";
            
        //     if ($input) {
        //         $input.element(0, function () {
        //             value = this.value;
        //             if (typeof value === "undefined" || value === null) {
        //                 value = "";
        //             }
        //         });
        //     }
            
        //     return value;
        // },

        /**
         * @method
         * @private
         * 
         * Specialized value retrieval for checkbox elements.
         */
        _checkboxValue: function ($checkboxes) {
            var value = [];
                
            if ($checkboxes) {
                $checkboxes.arrEach(function (checkbox) {
                    if ((checkbox instanceof HTMLInputElement)
                        && (checkbox.getAttribute("type") === "checkbox")
                        && (checkbox.checked)) {
                        value.push(checkbox.value);
                    }
                });
            }
            
            return value;
        },
        
        fieldTemplate: {
            type: "input",
            values: [],
        },
        
        /**
         * @method
         * 
         * Triggers a manual form submission.  If the form fails validation, or
         * any other errors occur, then the failed callback is executed.  
         * Otherwise, the success function is executed.
         * 
         * @param {Function} [onSuccess]
         *      Overrides the success function provided in the configuration on
         *      construction.  See jspyder.form constructor for expected 
         *      parameters.
         * 
         * @param {Function} [onFail]
         *      Overrides the failure function provided in the configuration on
         *      construction.  See jspyder.form constructor for expected 
         *      parameters.
         */
        submit: function(onSuccess, onFail) {
            onSuccess = (typeof onSuccess === "function" ? onSuccess : this._success);
            onFail = (typeof onFail === "function" ? onFail : this._failure);
            
            this.validate(function (valid, invalid) {
                js.alg.use(this, (invalid ? onFail : onSuccess), [valid, invalid]);
                return;
            });
            
            return this;
        },
        
        /**
         * @method
         * 
         * Triggers a manual form reset.  This will turn all of the form fields
         * back to their initial values on creation.
         * 
         * @param {Function} [fn]
         *      Optional callback to execute after the reset has been completed.
         *      See jspyder.form constructor for expected parameters.
         */
        reset: function(fn) {
            return this;
        },
        
        /**
         * @method
         * 
         * Triggers a manual form validation.
         * 
         * @param {Function} [fn]
         *      Optional callback to execute after the validation has been 
         *      completed.  See jspyder.form constructor for expected 
         *      parameters.
         */
        validate: function(fn) {
            var form = this,
                valid = {},
                invalid = null;
                
            this.each(function(field, name) {
                var isValid = true;
                
                if(field.ignore) { return; }
                
                switch(typeof field.validate) {
                    case "function":
                        isValid = field.validate(form);
                        break;
                    case "boolean":
                        isValid = field.validate;
                        break;
                }
                
                var group = (isValid ? valid : (invalid || (invalid = {})));
                group[name] = form.exportFieldValue(name);
                
                return;
            });
            
            fn.apply(this, [valid, invalid]);
            
            return this;
        },
        
        /**
         * @method
         * Attaches the form to the specified dom node
         * 
         * @param {Function} [fn]
         *      Optional callback function to execute, using the form js.dom
         *      element as the context and the js.form object as the first
         *      parameter.
         * 
         * @param {Object} [fn.dom] 
         *      DOM node created and attached to the document.
         * 
         * @param {Mixed} [fn.data]
         *      Data parameter passed into the function.
         * 
         * @param {Mixed} [data]
         *      Optional parameter to pass in as a second parameter for [fn].
         * 
         * @return {Object} jspyder.dom object.
         */
        attach: function (fn, data) {
            var dom = this._dom,
                fields = this._fields,
                name, group;
                
            for (name in fields) {
                group = fields[name];
                // group{ type, field, section }
            }
            
            // cycle through fields
            
            if(typeof fn === "function") {
                fn.apply(dom, [this, dom, data]);
            }
            
            return this; 
        },
        
        compile: function(templateId, data, fn) {
            return this._compiler(templateId, data, fn, "compile");
        },
        
        compileExplicit: function(template, data, fn) {
            return this._compiler(template, data, fn, "compileExplicit");
        },
        
        _compiler: function(template, data, fn, compile) {
            var dom = null;
            
            js.template(data)
                [compile](template, null, function(text) {
                    dom = js.dom(text);
                });
                
            this._dom = dom;
            
            var fields = {};
            js.alg.each(this._fields, function(fieldSet, name) {
                fields[name] = fieldSet.field;
            });
            
            dom.template(fields || {});
            (typeof fn === "function") && fn.apply(this, [dom]);
                
            return dom;
        }
    };
    
    js_form.registerControl = js_form.fn.registerControl;
    js_form.registerControlFn = js_form.fn.registerControlFn;
    
    js_form
        .registerControl("input", function (cfg) {
            var fieldname = js.alg.string(cfg.name),
                fieldclass = js.alg.string(cfg.class),
                fieldtype = js.alg.string(cfg.type, "text"),
                html = [
                    "<input class=\"", fieldclass, "\"",
                    " name=\"", fieldname, "\"",
                    " data-type=\"", fieldtype, "\"></input>"
                ].join('');

            return js.dom(html);
        })
        .registerControlFn("date", function () {
            var $DOC = js.dom(document.documentElement);
            
            function __calStructFactory(config) {
                var calStruct = Object.create(__calStructFactory.fn);
                
                calStruct.today = js.date();
                calStruct.date = js.date(config.value, config.format);
                calStruct.format = js.alg.string(config.format, calStruct.format);
                
                return calStruct;
            }
            __calStructFactory.fn = {
                dom: null,
                title: null,
                tiles: null,
                prev: null,
                next: null,
                input: null,
                today: null,
                date: null,
                DOCDOM: js.dom(document.documentElement),
                
                navMonth: false,
                
                titleMonth: "mmm yyyy",
                titleYear: "yyyy", 
                format: "yyyy-mm-dd",
                
                clear: function() {
                    this.dom && this.dom.remove();
                    this.dom = null;
                    this.title = null;
                    this.tiles = null;
                    this.prev = null;
                    this.next = null;
                    this.input = null;
                    this.navMonth = false;
                    this.today = js.date();
                    return this;
                },
                load: function() {
                    var jsdom = js.dom(this.calendarHtml),
                        self = this;
                        
                    this.today = js.date();
                    this.dom = jsdom;
                    this.title = jsdom.find(".date-picker-title");
                    this.tiles = jsdom.find(".calendar-tiles");
                    this.prev = jsdom.find(".date-picker-prev");
                    this.next = jsdom.find(".date-picker-next");
                    
                    this.prev.on("click", function(event) { self.prevNextClick(-1); });
                    this.next.on("click", function(event) { self.prevNextClick(1); });
                    
                    this.setTitle();
                    this.monthlistInit();
                    
                    jsdom.on("click", this.preventClose);
                    
                    return this;
                },
                setTitle: function(override) {
                    var self = this;
                    
                    self.title.setHtml(
                        this.date.asString(
                            this.navMonth ? this.titleMonth : this.titleYear));
                            
                    this.input.getValue(function(v) {
                        (override || v) && this.setValue(self.date.asString(this.format));
                    });
                    
                    return this;
                },
                setTiles: function(data) {
                    this.tiles.setHtml(data);
                    return this;
                },
                enableClose: function() { this.pause = false; },
                preventClose: function() { this.pause = true; },
                prevNextClick: function(val) {
                    this.date[ this.navMonth ? "addMonths" : "addYears" ](val);
                    this.setTitle();
                    if(this.navMonth) {
                        this.monthClick(this);
                    }
                    else {
                        this.monthlistInit();
                    }
                    this.preventClose();
                    return;
                },
                monthlistInit: function() {
                    var calStruct = this;
                    this.months = "";
                
                    js.alg.arrEach(
                        this.date.getMonthList("mmm"), 
                        this.monthlistBuilder, 
                        this);
                        
                    function copyValue(v) {
                        calStruct.date.setMonth(v);
                        calStruct.monthClick(calStruct);
                    }
                
                    this.setTiles(calStruct.months);
                    this.tiles
                        .find(".month")
                        .on("click", function __monthClick(event) {
                            js.dom(this).getValue(copyValue);
                        });
                    
                    return;
                },
                monthlistBuilder: function (month, monthnum, months, data) {
                    var sameYear = data.today.getYear() === data.date.getYear(),
                        sameMonth = (monthnum + 1) === data.today.getMonth(); 
                        
                    data.months += [
                        "<div class=\"month ", (( sameYear && sameMonth ) ? "today" : ""), "\"",
                            " value=\"", (monthnum + 1), "\">",
                            month,
                        "</div>"
                    ].join('');
                    
                    return;
                },
                monthClick: function () {
                    var calStruct = this;
                    calStruct.today = js.date();
                    var weekdays = calStruct.date.getWeekdayList("DD"),
                        daylist = calStruct.date.getDayList("d"),
                        i = 0,
                        data = { 
                            html: "", 
                            wlen: weekdays.length,
                            offset: calStruct.date.getWeekdayOffset(),
                            calStruct: calStruct,
                            today: (calStruct.today.getMonth() === calStruct.date.getMonth()) && (js.date().getDay()) };
                    
                    js.alg.arrEach(weekdays, calStruct.buildWeekdays, data);
                        
                    for(i; i < data.offset; i++) {
                        this.buildNumberedDays("", i - data.offset, null, data);
                    }
                    
                    js.alg.arrEach(daylist, this.buildNumberedDays, data);
                    
                    calStruct.navMonth = true;
                    calStruct.setTiles(data.html);
                    calStruct.tiles.find(".date").on("click", function(event) {
                        js.dom(this).getValue(function(v) {
                            calStruct.date.setDay(v);
                            calStruct.setTitle(true);
                        });
                        calStruct.enableClose();
                    });
                    calStruct.setTitle();
                    calStruct.preventClose();
                    return;
                },
                buildWeekdays: function (weekday, daynum, daylist, data) {
                    data.html += [
                        "<div class=\"date-title date-title-index-", (daynum + 1),
                            "\" style=\"width:", (100 / data.wlen),"%\">",
                            weekday,
                        "</div>"
                    ].join('');
                    return;
                },
                buildNumberedDays: function (day, daynum, daylist, data) {
                    var sameYear = data.calStruct.today.getYear() === data.calStruct.date.getYear(),
                        sameMonth = data.calStruct.today.getMonth() === data.calStruct.date.getMonth(),
                        sameDate = data.calStruct.today.getDay() === (daynum + 1);
                            
                    data.html += [
                        "<div class=\"date ", (sameYear && sameMonth && sameDate ? "today":"") ,"\" value=\"", (daynum + 1), "\" ",
                            "style=\"",
                                "width:", (100 / data.wlen), "%;",
                                js.alg.bool(daylist) ? "" : "visibility: hidden;",
                            "\">",
                            day,
                        "</div>"
                    ].join('');
                    return;
                },
                calendarHtml: [
                    "<div class=\"js-control js-control-date-picker\">",
                        "<div class=\"date-picker-header\">",
                            "<i class=\"chevron-left date-picker-prev\"></i>",
                            "<h4 class=\"date-picker-title\">${YEAR}</h4>",
                            "<i class=\"chevron-right date-picker-next\"></i>",
                        "</div>",
                        "<div class=\"calendar-tiles\"></div>",
                    "</div>"
                ].join('')
            };
            
            function __clickFactory(config) {
                
                var calStruct = __calStructFactory(config);
                
                return function(event) {
                    var dateVal = this.value || config.value || config.default || new Date();
                    
                    calStruct.clear();
                    calStruct.input = js.dom(this);
                    
                    calStruct.date.setDate(dateVal, calStruct.format);
                    
                    calStruct
                        .load()
                        .preventClose();
                    
                    js.dom(this.parentNode)
                        .append(calStruct.dom);
                    
                    calStruct.DOCDOM.on("click", function __docClick(event) {
                        if(calStruct.pause) { return calStruct.enableClose(); }
                        calStruct.clear();
                        calStruct.DOCDOM.off("click", __docClick);
                    });
                        
                    return;
                };
            }
            
            var __override = {
                type: "input"
            };
            
            return function (cfg) {
                var $datepicker = this.buildControl(js.alg.mergeObj({}, cfg, __override), true);

                $datepicker.filter("input").on("click", __clickFactory(cfg));

                return $datepicker;
            }
        })
        .registerControlFn("button", function() {
            function button(cfg) {
                // ensure that no label is used
                cfg.nolabel = true;
                var btnclass = js.alg.string(cfg.class, ""),
                    btnicon = js.alg.string(cfg.icon, ""),
                    btntext = js.alg.string(cfg.text, ""),
                    btnname = js.alg.string(cfg.name, "");
                
                var html = [
                        "<div class=\"js-control js-control-button ", btnclass, "\"",
                            " name=\"", btnname, "\">",
                                (btnicon ? "<i class=\"" + btnicon + "\"></i>" : ""),
                                "<span class=\"button-text\">", btntext, "</span>",
                        "</div>"
                    ].join(''),
                    
                    $button = js.dom(html)
                        .setValue(cfg.value)
                        .on("click", cfg.click);
                
                return $button;
            }
            
            return button;
        })
        .registerControlFn("submit", function() {
            
            function __submitClickFactory(form) {
                return function __submitClick(event) {
                    form.submit();
                    return;
                }
            }
            
            var __override = {
                type: "button",
                nolabel: true
            };
            
            function submit(cfg) {
                var $button = this.buildControl(js.alg.mergeObj(cfg, __override), true);
                $button.on("click", __submitClickFactory(this));
                return $button;
            }
            
            return submit;
        })
        .registerControlFn("dropdown", function() {
            var $DOC = js.dom(document.documentElement);
            
            function __dropdownClickFactory(cfg) {
                function __dropdownClick(event) {
                    var $dropdown = js.dom(this);
                    
                    __createPopout($dropdown, cfg);
                    
                    $dropdown = null;
                }
                
                return __dropdownClick;
            }
            
            function __createPopout($dropdown, cfg) {
                var options = cfg.values,
                    $popout = js.dom("<ul class=\"dropdown-selection\"></ul>"),
                    option = null,
                    livalue = "",
                    litext = "",
                    lihtml = "",
                    pause = true,
                    i = 0;
                        
                for(i; i < options.length; i++) {
                    option = options[i];
                    litext = js.alg.string(option.text, option.value);
                    livalue = js.alg.string(option.value, option.text);
                    
                    lihtml = [
                        "<li class=\"item\" value=\"", livalue, "\">", litext, "</li>"].join('');
                    
                    $popout.append(lihtml);
                }
                
                function __copyValue(value) { $dropdown.setValue(value); }
                function __copyText(text) { $dropdown.find(".dropdown-text").setHtml(text); }
                
                $popout.on("click", function __popoutClick(event) {
                    if(event.target.parentNode === this) {
                        js.dom(event.target)
                            .getValue(__copyValue)
                            .getHtml(__copyText);
                    }
                        
                    $DOC.trigger("click");
                    event.stopPropagation && event.stopPropagation();
                    event.stopImmediatePropagation && event.stopImmediatePropagation();
                })
                .attach($dropdown);
                
                $DOC.on("click", function docclick(event) {
                    if(pause) { return (pause = false); }
                    $popout && $popout.remove();
                    $popout = null;
                    $dropdown = null;
                    $DOC.off("click", docclick);
                })
            }
            
            function setValue(data, value) {
                var options = data.config.values,
                    self = this;
                js.alg.each(options, function (option) {
                    var oVal = js.alg.string(option.value, option.text),
                        oTxt = js.alg.string(option.text, option.value);

                    if (value === oVal) {
                        self.setValue(oVal)
                            .find(".dropdown-text")
                            .setHtml(oTxt);
                    }
                });
            }
            
            function dropdown(cfg) {
                var cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    cfgvalue = js.alg.string(cfg.value, ""),
                    cfgdefault = js.alg.string(cfg.default, ""),
                
                    html = [
                        "<div name=\"", cfgname, "\" tabindex=\"0\"",
                            " class=\"input js-control js-control-dropdown ", cfgclass, "\">",
                            "<i class=\"dropdown-arrow arrow-drop-down\"></i>",
                            "<span class=\"dropdown-text\">", (cfgvalue || cfgdefault || "&nbsp;"), "</span>",
                        "</div>"
                    ].join(''),
                    
                    $dropdown = js.dom(html);
                    
                $dropdown.on("click", __dropdownClickFactory(cfg));
                cfg.setValue = setValue;
                
                return $dropdown;
            }
            
            return dropdown;
        })
        .registerControl("textarea", function(cfg) {
            var cfgname = js.alg.string(cfg.name, ""),
                cfgclass = js.alg.string(cfg.class, ""),
                html = [
                    "<textarea name=\"", cfgname, "\"",
                        " class=\"input ", cfgclass, "\">",
                    "</textarea>"
                ].join('');
                
            return js.dom(html);
        })
        .registerControl("radio-single", function(cfg) {
            var cfgtext = js.alg.string(cfg.text, ""),
                cfgvalue = js.alg.string(cfg.value, ""),
                cfgname = js.alg.string(cfg.name, ""),
                cfgclass = js.alg.string(cfg.class, ""),
                html = [
                    "<input value=\"", cfgvalue, "\"",
                        " name=\"", cfgname, "\"",
                        " type=\"radio\"",
                        " class=\"", cfgclass, "\">",
                    "</input>"
                ].join('');
            
            return js.dom(html).and(this.buildLabel(cfgname, cfgtext));
        })
        .registerControl("radio", function(cfg) {
            var cfgtext = js.alg.string(cfg.text, ""),
                cfgvalue = js.alg.string(cfg.value, ""),
                cfgname = js.alg.string(cfg.name, ""),
                cfgclass = js.alg.string(cfg.class, ""),
                options = cfg.values || [],
                option = null,
                $option = null,
                $radio = js.dom(), 
                i = 0;
                
            for(i; i < options.length; i++) {
                option = js.alg.mergeObj({ 
                    "name": cfgname, 
                    "class": cfgclass }, options[i]);
                option.type = "radio-single";
                option.class = cfgclass;
                $option = js.dom("<div></div>").append(this.buildControl(option, true));
                $radio.and($option);
            }
            
            return $radio;
        })
        .registerControlFn("checkbox-single", function() {
            function checkbox(cfg) {
                var cfgtext = js.alg.string(cfg.text, ""),
                    cfgvalue = js.alg.string(cfg.value, ""),
                    cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    html = [
                        "<input value=\"", cfgvalue, "\"",
                            " name=\"", cfgname, "\"",
                            " type=\"checkbox\"",
                            " class=\"", cfgclass, "\">",
                        "</input>"
                    ].join(''),
                    $checkbox = js.dom(html).and(this.buildLabel(cfgname, cfgtext));
                    
                return $checkbox;
            }
            return checkbox;
        })
        .registerControlFn("checkbox", function() {
            
            function __getValue(fn) {
                var value = [];
                
                var props = { checked: false };
                    
                this.find("input[type=checkbox]")
                    .each(function(input) {
                        js.dom(input)
                            .getProps(props)
                            .getAttrs({ "value": "" }, function(attrs) {
                                if(props.checked) {
                                    value.push(attrs["value"]);
                                }
                                return;
                            });
                    });
                
                this.use(fn, [value]);
                return this;
            }
            
            function exportValue(data) {
                var keys = [],
                    key,
                    values = data.config["data-values"] = (data.config["data-values"] || {});
                    
                for(key in values) {
                    if(values[key]) {
                        keys.push(key.substring(4));
                    }
                }
                
                return keys;
            }
            
            function setValue(data, values) {
                this.find("input[type=checkbox]")
                    .each(function (element) {
                        var attrs = { "value": "" },
                            props = { "checked": null },
                            old = null;

                        js.dom(element)
                            .getProps(props)
                            .getAttrs(attrs, function (attrs) {
                                old = props["checked"];
                                props["checked"] = values.indexOf(attrs.value) > -1;
                            })
                            .setProps(props)
                            .trigger(props["checked"] !== old ? "change" : "");

                        return;
                    });

                return this;
            }
            
            function checkbox(cfg) {
                var cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    options = cfg.values || [],
                    option = null,
                    $option = null,
                    $checkbox = js.dom(),
                    i = 0;
                    
                cfg["data-values"] = {};
                    
                for(i; i < options.length; i++) {
                    option = js.alg.mergeObj({ 
                        "name": cfgname, 
                        "class": cfgclass }, options[i]);
                    option.type = "checkbox-single";
                    option.class = cfgclass;
                    $option = js.dom("<div></div>").append(this.buildControl(option, true));
                    $checkbox.and($option);                    
                }
                
                $checkbox
                    .find("input")
                        .on("change", function (event) {
                            var checked = this.checked;
                            js.dom(this).getValue(function(v) {
                                cfg["data-values"]["val-" + js.alg.string(v)] = checked;
                            });
                        });
                
                cfg.exportValue = exportValue;
                cfg.setValue = setValue;
                
                return $checkbox;
            }
            
            return checkbox;
        })
        .registerControlFn("checkbox-bitwise", function () {
            function exportValue(data) {
                var values = js.alg.use(this, __baseExportValue, arguments),
                    value = 0;
                
                js.alg.each(values, function (cbValue) {
                    value = value | js.alg.number(cbValue);
                });
                
                return value;
            }
            
            function setValue(data, values) {
                values = js.alg.number(values, 0);
                this.find("input[type=checkbox]")
                    .each(function (element) {
                        var attrs = { "value": "" },
                            props = { "checked": null },
                            old = null;

                        js.dom(element)
                            .getProps(props)
                            .getAttrs(attrs, function (attrs) {
                                old = props["checked"];
                                
                                attrs["value"] = js.alg.number(attrs["value"], 0);
                                
                                props["checked"] = (values === attrs["value"]) || (values & attrs["value"]);
                            })
                            .setProps(props)
                            .trigger(props["checked"] !== old ? "change" : "");

                        return;
                    });

                return this;
            }
            
            var __baseExportValue = null,
                __override = {
                    "type": "checkbox",
                    "nolabel": true
                };
            
            function checkboxBitwise(cfg) {
                var tmp = js.alg.mergeObj({}, cfg, __override),
                    $checkbox = this.buildControl(tmp, true);
                    
                cfg["data-values"] = tmp["data-values"];
                    
                __baseExportValue = __baseExportValue || tmp.exportValue;
                cfg.exportValue = exportValue;
                cfg.setValue = setValue;
                    
                return $checkbox;
            }
            
            return checkboxBitwise;
        })
        .registerControlFn("hidden", function() {
            var __override = {
                    nolabel: true,
                    type: "input"
                },
                __css = { "display": "none" };
            
            function hidden(cfg) {
                cfg = js.alg.mergeObj({}, cfg, __override);
                return this.buildControl(cfg, true).setCss(__css);
            }
            
            return hidden;
        })
        .registerControlFn("autocomplete", function() {
            var __override = {
                    type: "input"
                };
            
            function autocomplete(cfg) {
                cfg = js.alg.merge({}, cfg, __override);
                var $autocomplete = this.buildControl(cfg, true);
                return $autocomplete;
            }
            
            return autocomplete;
        })
        .registerControlFn("currency", function() {
            var __override = {
                    type: "input",
                },
                __attrs = {
                    "data-type": "currency"
                };
            
            function currency(cfg) {
                cfg = js.alg.mergeObj({}, cfg, __override, {
                    "class": js.alg.string(cfg.class, "") + " data-currency"
                });
                var $input = this.buildControl(cfg, true).setAttrs(__attrs),
                    prefix = "<div class=\"js-control js-control-currency-prefix\"></div>";
                    
                return js.dom(prefix).and($input);
            }
            
            return currency;
        })
     
    return js_form;
 });