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
        _submit: function (values, invalid) { return this; },
        
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
        _failed: function (values, invalid) { return this; },
        
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
            
            var $field = js.dom(),
                cfg = Object.create(js_form.fn.fieldTemplate),
                dval = js.alg.string(config.default, ""),
                val = js.alg.string(config.value, dval),
                option, i;
            
            // copy all of the config options over, if they exist.    
            js.alg.mergeObj(cfg, config);
            if (config.values) { cfg.values = js.alg.sliceArray(config.values); }
            cfg.value = val;
            cfg.default = dval;
            cfg.name = name;

            switch (cfg.type) {
                case "checkbox":
                    // js.alg.each(cfg.values, this._createCheckboxes, { $field: $field, cfg: cfg, name: name });
                    cfg.text && $field.and("<label for=\"" + name + "\">" + cfg.text + "</label>");
                    for (i = 0; i < config.values.length; i++) {
                        option = config.values[i];
                        $field.and(
                            "<div><input value=\"" + (option.value || option.text) +
                            "\" name=\"" + name + "\" type=\"checkbox\"" +
                            " class=\"" + js.alg.string(cfg.class, "") + "\"></input>" +
                            this._labelHtml(name, js.alg.string(option.text, option.value)),
                            "</div>");
                    }
                    break;
                    
                case "radio":
                    // js.alg.each(cfg.values, this._createCheckboxes, { $field: $field, cfg: cfg, name: name });
                    cfg.text && $field.and("<label for=\"" + name + "\">" + cfg.text + "</label>");
                    for (i = 0; i < config.values.length; i++) {
                        option = config.values[i];
                        $field.and(
                            "<div><input value=\"" + (option.value || option.text) +
                            "\" name=\"" + name + "\" type=\"radio\"" +
                            " class=\"" + js.alg.string(cfg.class, "") + "\"></input>" +
                            this._labelHtml(name, js.alg.string(option.text, option.value)),
                            "</div>");
                    }
                    break;

                case "textarea":
                    $field.and([
                            this._labelHtml(name, js.alg.string(cfg.text)),
                            "<textarea name=\"" + name + "\" class=\"" + js.alg.string(cfg.class, "") + "\">"
                        ].join(''))
                        .setValue(val);
                    break;

                case "submit":
                case "reset":
                case "button":
                case "dropdown":
                case "date":
                case "hidden":
                case "input":
                case "currency":
                default:
                    // var tmp = this.templates[cfg.type] || this.templates["input"];
                    // tmp.apply(this, [$field, cfg]);
                    $field.and(this.buildControl(config));

                    if (cfg.type === "hidden") {
                        $field.setCss({ "display": "none !important" });
                    }

                    if (cfg.type === "autocomplete") {
                        // do autocomplete stuff (similar to dropdown)
                    }
                    
                    $field.setValue(val);

                    break;
            }

            if (!this._fields) {
                this._fields = {};
            }
            this._fields[name] = { type: cfg.type, field: $field, section: config.section || null };

            return this;
        },
        
        registerControl: function (typename, constructor) {
            js_form.fn.templates[typename] = constructor;
            return this;
        },
        buildControl: function (config, nolabel) {
            var tmp = this.templates[config.type] || this.templates["input"],
                ctl = tmp.apply(this, [config]),
                fieldname = js.alg.string(config.name),
                labeltext = js.alg.string(config.text),
                lbl;
                
            nolabel = js.alg.bool(config.nolabel, nolabel),
            lbl = js.dom(fieldname && labeltext && !nolabel
                    ? ["<label for=\"", fieldname, "\">", labeltext, "</label>"].join('')
                    : "");
                
            return lbl.and(ctl);
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
                    html += "<div class=\"js-control currency-prefix\"></div>";
                    fieldClass += " data-currency";
                    break;
            }
            
            html += "<input class=\"" + fieldClass + "\"" + 
                    " name=\"" + fieldName + "\"" +
                    " data-type=\"" + fieldType + "\"></input>";
                    
            return html;
        },
        _boostrapDropdown_click: function(options) {
            var $doc = js.dom(document.documentElement);
            
            return function (event) {
                var $self = js.dom(this),
                    $popout = js.dom("<ul></ul>", function() {
                        var $popout = this,
                            option = null,
                            value = "",
                            text = "";
                    
                        for(var i = 0; i < options.length; i++) {
                            option = options[i];
                            text = js.alg.string(option.text, option.value);
                            value = js.alg.string(option.value, option.text);
                                
                            $popout.append([
                                "<li class=\"item\" value=\"", value,
                                "\">", text, "</li>"].join(''));
                        }
                    })
                    .setClasses({ "dropdown-selection": true })
                    .on("click", function(event) {
                        js.dom(event.target)
                            .getValue(function(value) {
                                $self.setValue(value);
                                return;
                            })
                            .getHtml(function(html) {
                                $self
                                    .find(".dropdown-text")
                                    .setHtml(html);
                            });
                            
                        $doc.trigger("click");
                        event.stopPropagation && event.stopPropagation();
                        event.stopImmediatePropagation && event.stopImmediatePropagation();
                    })
                    .attach(this);
                
                var pause = true;
                
                $doc.on("click", function click(event) {
                    if(pause) { return (pause = false); }
                    $popout.remove();
                    $popout = null;
                    $doc.off("click", click);
                });
            };
        },
        
        templates: {
            // generic button
            "button": function($field, cfg) {
                var html = [
                        "<div class=\"js-control button ", 
                            js.alg.string(cfg.class,""), 
                            "\" name=\"", name, "\">",
                            (cfg.icon ? "<i class=\"" + cfg.icon + "\"></i>" : ""),
                            "<span class=\"button-text\">", cfg.text, "</span>",
                        "</div>"
                    ].join(''),
                    
                    $button = js.dom(html)
                        .setValue(cfg.value)
                        .on("click", cfg.click);
                    
                $field.and($button);
                
                return $button;
            },
            
            // submit value
            "submit": function($field, cfg) {
                var $button = js_form.fn.templates["button"]($field, cfg),
                    $form = this;
                
                // submit value
                $button.on("click", function(event) {
                    $form.submit();
                });
                
                return $button;
            },
            
            // dropdown value
            "dropdown": function($field, cfg) {
                $field
                    .and(this._labelHtml(cfg.name, js.alg.string(cfg.text)))
                    .and(js.dom([
                            "<div name=\"", cfg.name, "\" class=\"input js-control dropdown\"", 
                                js.alg.string(cfg.class, ""), ">",
                                "<i class=\"dropdown-arrow arrow-drop-down\"></i>",
                                "<span class=\"dropdown-text\">", (cfg.value || cfg.default || "&nbsp;"), "</span>",
                            "</div>"
                        ].join(''))
                        .on("click", js_form.fn._boostrapDropdown_click(cfg.values))
                    );
            }
        }, 

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
            
            var $field, $type, name;
            for (name in this._fields) {
                $field = this._fields[name].field;
                $type = this._fields[name].type;
                values[name] = null;

                switch ($type) {
                    case "checkbox":
                        values[name] = self._checkboxValue($field);
                        break;
                    default:
                        values[name] = self._genericValue($field);
                        break;
                }
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
        _genericValue: function ($input) {
            var value = "";
            
            if ($input) {
                $input.element(0, function () {
                    value = this.value;
                    if (typeof value === "undefined" || value === null) {
                        value = "";
                    }
                });
            }
            
            return value;
        },

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
            onSuccess = (typeof onSuccess === "function" ? onSuccess : this._submit);
            onFail = (typeof onFail === "function" ? onFail : this._failed);
            
            this.validate(function(valid, invalid) {
                if(invalid) {
                    onFail.apply(this, [valid, invalid]);
                    console.log("FAILED");
                }
                else {
                    onSuccess.apply(this, [valid, invalid]);
                    console.log("SUBMITTED");
                }
                    console.table(valid);
                    console.table(invalid);
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
                valid = null,
                invalid = null,
                _copyInto = function(b,n) { 
                    o = b 
                        ? valid || (valid = {}) 
                        : invalid || (invalid = {});
                         
                    return function(v) { o[n] = v; } };
                
            this.each(function(field, name) {
                switch(typeof field.validate) {
                    case "function":
                        field.field.getValue(_copyInto(field.validate(form), name));
                        break;
                    case "boolean":
                        field.field.getValue(_copyInto(field.validate, name));
                        break;
                    default:
                        field.field.getValue(_copyInto(true, name));
                        break;
                }
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
        .registerControl("date", js.alg.use(null, function () {
            
            function __clickFactory(config) {
                var $doc = js.dom(document.documentElement),
                
                calendar = [
                    "<div class=\"js-control date-picker\">",
                        "<div class=\"date-picker-header\">",
                            "<i class=\"chevron-left date-picker-prev\"></i>",
                            "<h4 class=\"date-picker-title\">${YEAR}</h4>",
                            "<i class=\"chevron-right date-picker-next\"></i>",
                        "</div>",
                        "<div class=\"calendar-tiles\"></div>",
                    "</div>"
                ].join(''),
                
                format = js.alg.string(config.format, "dd-mmm-yyyy"),
                
                pause = true,
                preventClose = function() { pause = true; },
                enableClose = function() { pause = false; },
                
                calStruct = {
                    dom: null,
                    title: null,
                    tiles: null,
                    prev: null,
                    next: null,
                    input: null,
                    today: js.date(),
                    date: js.date(config.value, config.format),
                    
                    navMonth: false,
                    
                    titleMonth: "mmm yyyy",
                    titleYear: "yyyy", 
                    
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
                    load: function(jsdom) {
                        this.today = js.date();
                        this.dom = jsdom;
                        this.title = jsdom.find(".date-picker-title");
                        this.tiles = jsdom.find(".calendar-tiles");
                        this.prev = jsdom.find(".date-picker-prev");
                        this.next = jsdom.find(".date-picker-next");
                        return this;
                    },
                    setTitle: function() {
                        this.title.setHtml(
                            this.date.asString(
                                this.navMonth ? this.titleMonth : this.titleYear));
                                
                        this.input.setValue(this.date.asString(format));
                        return this;
                    },
                    setTiles: function(data) {
                        this.tiles.setHtml(data);
                        return this;
                    },
                    enableClose: enableClose
                };
            
            function __dom_internal() {
                this.on("click", preventClose);
                
                preventClose();
                
                calStruct
                    .load(this)
                    .setTitle(calStruct.titleYear);
                
                __monthlist_init(calStruct);
                    
                calStruct.prev
                    .on("click", function __prevClick(event) {
                        __prevnext_click(calStruct, -1);
                    });
                    
                calStruct.next
                    .on("click", function __nextClick(event) {
                        __prevnext_click(calStruct, 1);
                    });
            }
            
            function __docClick(event) {
                if(pause) { return enableClose(); }
                calStruct.clear();
                $doc.off("click", __docClick);
            }
            
            return function(event) {
                calStruct.clear();
                calStruct.input = js.dom(this);
                
                calStruct.date.setDate(this.value || config.value || config.default || new Date(), format);
                
                js.dom(calendar, __dom_internal);
                
                js.dom(this.parentNode).append(calStruct.dom);
                
                $doc.on("click", __docClick);
                    
                return;
            };
        }
        
        function __prevnext_click(calStruct, val) {
            calStruct.date[ calStruct.navMonth ? "addMonths" : "addYears" ](val);
            calStruct.setTitle();
            if(calStruct.navMonth) {
                __month_click(calStruct);
            }
            else {
                __monthlist_init(calStruct);
            }
            return;
        }
        
        // builds month list and attaches it to the dom
        function __monthlist_init(calStruct) {
            calStruct.months = "";
            
            js.alg.arrEach(
                calStruct.date.getMonthList("mmm"), 
                __month_builder, 
                calStruct);
            
            calStruct.setTiles(calStruct.months);
            calStruct.tiles
                .find(".month")
                .on("click", function __monthClick(event) {
                    js.dom(this).getValue(function(v) {
                        calStruct.date.setMonth(v);
                        __month_click(calStruct);
                    });
                });
                
            return;
        }
        // builds month list
        function __month_builder(month, monthnum, months, data) {
            var sameYear = data.today.getYear() === data.date.getYear(),
                sameMonth = (monthnum + 1) === data.today.getMonth(); 
                
            data.months += [
                "<div class=\"month ", (( sameYear && sameMonth ) ? "today" : ""), "\"",
                    " value=\"", (monthnum + 1), "\">",
                    month,
                "</div>"
            ].join('');
            
            return;
        }
        
            // assigns month value within the month's click event
            function __month_click(calStruct) {
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
                
                js.alg.arrEach(weekdays, __build_weekdays, data);
                    
                for(i; i < data.offset; i++) {
                    __build_numberedDays("", i - data.offset, null, data);
                }
                
                js.alg.arrEach(daylist, __build_numberedDays, data);
                
                calStruct.navMonth = true;
                calStruct.setTiles(data.html);
                calStruct.tiles.find(".date").on("click", function(event) {
                    js.dom(this).getValue(function(v) {
                        calStruct.date.setDay(v);
                        calStruct.setTitle();
                    });
                    calStruct.enableClose();
                });
                calStruct.setTitle();
                return;
            }
        
            function __build_weekdays(weekday, daynum, daylist, data) {
                data.html += [
                    "<div class=\"date-title date-title-index-", (daynum + 1),
                        "\" style=\"width:", (100 / data.wlen),"%\">",
                        weekday,
                    "</div>"
                ].join('');
                return;
            }
            function __build_numberedDays(day, daynum, daylist, data) {
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
            }
            
            return function (cfg) {
                var $field = this.buildControl("input");

                $field.filter("input").on("click", __clickFactory(cfg));

                return $field;
            }
        }))
     
    return js_form;
 });