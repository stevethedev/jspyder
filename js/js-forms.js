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
                dval = js.alg.string(cfg.default, ""),
                val = js.alg.string(cfg.value, dval),
                option, i;
            
            // copy all of the config options over, if they exist.    
            js.alg.mergeObj(cfg, config);
            if (config.values) { cfg.values = js.alg.sliceArray(config.values); }

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

                case "button":
                    $field.and([
                            "<div class=\"js-control button ", 
                                js.alg.string(cfg.class,""), 
                                "\" name=\"", name, "\">",
                            (cfg.icon ? "<i class=\"" + cfg.icon + "\"></i>" : ""),
                            "<span class=\"button-text\">", cfg.text, "</span>",
                            "</div>"
                        ].join(''))
                        .setValue(val);
                    break;

                case "dropdown":
                    $field
                        .and(this._labelHtml(name, js.alg.string(cfg.text)))
                        .and(js.dom([
                                "<div name=\"", name, "\" class=\"input js-control dropdown\"", 
                                    js.alg.string(cfg.class, ""), ">",
                                    "<i class=\"dropdown-arrow arrow-drop-down\"></i>",
                                    "<span class=\"dropdown-text\">", "&nbsp;", "</span>",
                                "</div>"
                            ].join(''))
                            .on("click", this._boostrapDropdown_click(config.values))
                        );
                    break;
                    
                case "date":
                case "hidden":
                case "input":
                case "currency":
                default:
                    var textline = js.dom(this._textlineHtml(name, cfg.class, cfg.type)); 
                    $field
                        .and(this._labelHtml(name, js.alg.string(cfg.text)))
                        .and(textline);
                    
                    if (cfg.type === "date") {
                        textline.on("click", this._bootstrapDatepicker_click(config));
                    }

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
        
        _labelHtml: function(fieldName, labelText) {
            return (fieldName && labelText
                ? "<label for=\"" + fieldName + "\">" + labelText + "</label>"
                : "");
        },
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
        
        _bootstrapDatepicker_click: function(config) {
            var $doc = js.dom(document.documentElement),
                
                calendar = [
                    "<div class=\"js-control date-picker\">",
                        "<div>",
                            "<i class=\"chevron-left\"></i>",
                            "<h4>${YEAR}</h4>",
                            "<i class=\"chevron-right\"></i>",
                        "</div>",
                        "<div class=\"calendar-tiles\"></div>",
                    "</div>"
                ].join(''),
                
                // list of months
                months = config.months || [
                    "Jan", "Feb", "Mar", "Apr",
                    "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"],
                moCalendar = "";
                
            js.alg.each(months, function(month, i) {
                moCalendar += "<div class=\"month\" value=\"" + i + "\">" + month + "</div>";
            });
            
            return function(event) {
                var $calendar = js.dom(calendar, function() {
                    this.find(".calendar-tiles")
                        .append(moCalendar);
                });
                
                js.dom(this.parentNode).append($calendar);
                
                var pause = true;
                
                $doc.on("click", function click(event) {
                    if(pause) { return (pause = false); }
                    $calendar.remove();
                    $calendar = null;
                    $doc.off("click", click);
                });
                    
                return;
            };
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
                $checkboxes.each(function (checkbox) {
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
         * Triggers a manual form reset.  This will turn all of the form fields
         * back to their initial values on creation.
         * 
         * @param {Function} [fn]
         *      Optional callback to execute after the validation has been 
         *      completed.  See jspyder.form constructor for expected 
         *      parameters.
         */
        validate: function(fn) {
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
    
    
     
    return js_form;
 });