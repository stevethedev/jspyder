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
        
        /**
         * @method
         * Iterates through all of the form fields, calling the function [fn] on
         * each field and using [data] as the fourth parameter.
         * 
         * @param {Function} fn     
         *      The function to call on each iteration.
         * @param {Object} [fn.field]
         *      The first parameter to fn; the field currently being iterated.
         * @param {String} [fn.name]
         *      The second parameter to fn; the name of the field, internal to
         *      JS-Form
         * @param {Object} [fn.fields]
         *      The field collection being itereated.
         * @param {Mixed} [fn.data]
         *      The context object passed in as the second parameter to 
         *      js.form.each
         * @param {Mixed} [data]
         *      The variable to pass as the fourth parameter to [fn].
         */
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
                dval = config.default,
                val = config.value,
                $field = null;
            
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
                
            this.resetFieldValue(name);
            
            this.bindEvents($field, cfg);

            return this;
        },
        
        /**
         * @method
         * Binds the events from the configuration object to the generated
         * field.
         * 
         * @param {Object} control
         *      JS-DOM node to bind events to
         * @param {Object} config
         *      The Configuration object the JS-DOM node was created with.
         * @param {Object} config.events
         *      An array of event types, in JS-DOM Event format, where keys
         *      are event names and values are the event functions.  Note,
         *      it *is* possible to double-bind a function to a control.
         *      Any functions bound through this method take the Event object
         *      as the first parameter, and the JS-Form object as the second.
         */
        bindEvents: function(control, config) {
            var form = this;
            
            js.alg.each(config && config["events"], function(callback, event) { 
                control.on(event, function(event) {
                    js.alg.use(this, callback, [event, form]);
                });
            });
            
            return this;
        },
        
        /**
         * @method
         * Registers a control constructor with JS-Form.
         * 
         * @param {String} typename
         *      The name by which this constructor will be referenced.
         * @param {Function} constructor
         *      The function to use as the constructor for the form control.
         * @param {Object} constructor.cfg
         *      The config object to be passed into the constructor function
         *      as the first parameter.
         */
        registerControl: function (typename, constructor) {
            js_form.fn.templates[typename] = constructor;
            return this;
        },
        
        /**
         * @method
         * Used to define more complex control constructors, the function
         * [preconstructor] is executed and the return value is passed to
         * js.form.registerControl
         * 
         * @param {String} typename
         *      The name by which this constructor will be referenced.
         * @param {Function} preconstructor
         *      A closure to execute; the return value will be used as the
         *      second parameter to js.form.registerControl
         */
        registerControlFn: function (typename, preconstructor) {
            this.registerControl(typename, js.alg.use(this, preconstructor));
            return this;
        },
        
        /**
         * @method
         * Builds a control, as defined by the configuration object [config].
         * 
         * @param {Object} config
         *      A configuration object to use to generate a control object.
         * @param {String} config.type
         *      The type of control to generate; corresponds to a value passed
         *      as [typename] to js.form.registerControl or js.form.registerControlFn
         * @param {String} [config.name]
         *      The name of the generated control within the form.
         * @param {String} [config.text]
         *      The text to use as the label for the generated control.
         * @param {Boolean} [config.nolabel]
         *      TRUE to generate a control without a label; overrides [nolabel]
         *      parameter.
         * @param {String} [config.class]
         *      The class name to attach to the generated control.
         * @param {String} [config.tooltip]
         *      The tooltip to display when hovering over an element.
         * @param {Boolean} [nolabel]
         *      If false, will not generate a label for the created field.  This
         *      parameter is overridden by [config.nolabel].
         * 
         * @return {Object}
         *      JS-DOM node for the generated control.
         */
        buildControl: function (config, nolabel) {
            var tmp = this.templates[config.type] || this.templates["input"],
                ctl = tmp.apply(this, [config]),
                fieldname = js.alg.string(config.name),
                labeltext = js.alg.string(config.text),
                uselabel = !js.alg.bool(config.nolabel, nolabel),
                lbl = this.buildLabel(uselabel && fieldname, uselabel && labeltext, config.class, config.tooltip),
                form = this;
                
            return lbl.and(ctl);
        },
        
        /**
         * @method
         * Constructs a label for a generated JS-Form control.
         * 
         * @param {String} [fieldname]
         *      The name of the field this label has been generated for.
         * @param {String} [labeltext]
         *      The text to display in the label
         * @param {String} [labelclass]
         *      The class to attach to the generated label element.
         * @param {String} [tooltip]
         *      The tooltip to apply to the generated label element.
         */
        buildLabel: function(fieldname, labeltext, labelclass, tooltip) {
            var html = (fieldname && labeltext
                    ? ["<label ", 
                            (fieldname  ? "for=\"" + fieldname + "\" " : ""), 
                            (labelclass ? "class=\"" + labelclass + "\"" : ""), 
                            (tooltip ? "title=\"" + tooltip + "\"" : ""), 
                        ">", labeltext, "</label>"].join('')
                    : "");
                    
            return js.dom(html);
        },
        
        /**
         * @method
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
         * Retrieves the defined field by name.
         */
        exportField: function (name) {
            var data = this.exportFieldData(name),
                field = (data ? data.field : null);
            return field;
        },
        
        /**
         * @method
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
         * Retrieves the field object stored under the defined name.
         */
        exportFieldData: function (name) {
            return this._fields[name] || null;
        },
        
        /**
         * @method
         * Resets the values of all of the identified JS-Form field to their 
         * initial values.
         * 
         * @param {String} name
         *      The name of the field to reset.
         */
        resetFieldValue: function (name) {
            var data = this.exportFieldData(name),
                dval = data.config.default,
                val = data.config.value;
                
            this.setFieldValue(name, typeof val !== "undefined" ? val : dval);
            return this;
        },
        
        /**
         * @method
         * Resets the values of all of the created JS-Form fields.
         */
        resetFieldValues: function () {
            this.each(this._resetFieldValues, this);;
        },
        
        /**
         * @private
         * @method
         * Iterator method for js.form.resetFieldValues
         */
        _resetFieldValues: function (field, name, fields, form) {
            form.resetFieldValue(name);
            return;
        },
        
        /**
         * @method
         * Sets the value of the identified field to the value passed as the
         * second parameter.
         * 
         * @param {String} name
         *      The name of the field to set a value against.
         * @param {Mixed} value
         *      The value to set the field to.
         */
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
        
        /**
         * @method
         * Retrieves the value from the identified field, and passes it as the
         * first parameter in [fn].
         * 
         * @param {String} name
         *      The name of the field to retrieve a value from.
         * @param {Function} fn
         *      The function to pass the value into.
         * @param {Mixed} fn.value
         *      The value retrieved from the field identified by [name].
         */
        getFieldValue: function(name, fn) {
            var args = [
                this.exportFieldValue(name)
            ];
            js.alg.use(this, fn, args);
            return this;
        },
        
        /**
         * @method
         * Returns the value from the identified field.
         * 
         * @param {String} name
         *      The name of the field to retrieve a value from.
         * 
         * @return {Mixed}
         */
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
        
        /**
         * @private
         * @dict
         * 
         * The library of constructors.
         */
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
                
            js.alg.use(this, fn, [valid, invalid]);
            return this;
        },
        
        /**
         * @private
         * The basic template to use when generating a new field config object
         */
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
        reset: function (fn) {
            this.resetFieldValues();
            
            js.alg.use(this, typeof fn === "function" ? fn : this._reset);
            
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
                var isValid = true,
                    value = form.exportFieldValue(name);
                
                if(field.ignore) { return; }
                
                switch(typeof field.validate) {
                    case "function":
                        isValid = field.validate(form);
                        break;
                    case "boolean":
                        isValid = field.validate;
                        break;
                }
                
                if(field.config.required && !value) {
                    isValid = false;
                }
                
                var group = (isValid ? valid : (invalid || (invalid = {})));
                group[name] = value;
                
                return;
            });
            
            js.alg.use(this, fn, [valid, invalid]);
            
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
        
        /**
         * @method
         * Compiles a template from memory, and inserts the fields by name.
         * For example, a field named "my_field" would be replace ${my_field}
         * in the loaded template.  However, this requires that field names
         * match the same naming convention as the JS-Template variables.
         * 
         * Note that any fields not inserted into the template are still
         * accessible through the form interface.  This can be used to obscure
         * fields from the user without having to write them to the DOM.
         * 
         * @param {String} templateId
         *      A Template ID, corresponding to a template which has been loaded
         *      into JS-Template.
         * @param {Object} data
         *      The data object to use when executing the template
         * @param {Function} fn
         *      The function to execute; the return value will be a JS-DOM
         *      object, containing the generated form elements.
         * 
         * @return {Object}
         *      JS-DOM node, containing the compiled template.
         */
        compile: function(templateId, data, fn) {
            return this._compiler(templateId, data, fn, "compile");
        },
        
        /**
         * @method
         * Compiles a template from [template], and inserts the fields by name.
         * For example, a field named "my_field" would be replace ${my_field}
         * in the loaded template.  However, this requires that field names
         * match the same naming convention as the JS-Template variables.
         * 
         * Note that any fields not inserted into the template are still
         * accessible through the form interface.  This can be used to obscure
         * fields from the user without having to write them to the DOM.
         * 
         * @param {String} template
         *      A Template ID, corresponding to a template which has been loaded
         *      into JS-Template.
         * @param {Object} data
         *      The data object to use when executing the template
         * @param {Function} fn
         *      The function to execute; the return value will be a JS-DOM
         *      object, containing the generated form elements.
         * 
         * @return {Object}
         *      JS-DOM node, containing the compiled template. 
         */
        compileExplicit: function(template, data, fn) {
            return this._compiler(template, data, fn, "compileExplicit");
        },
        
        /**
         * @method
         * Compiles a template from from a DOM node, and inserts the fields by name.
         * For example, a field named "my_field" would be replace ${my_field}
         * in the loaded template.  However, this requires that field names
         * match the same naming convention as the JS-Template variables.
         * 
         * Note that any fields not inserted into the template are still
         * accessible through the form interface.  This can be used to obscure
         * fields from the user without having to write them to the DOM.
         * 
         * This is the most flexible of all of the compilation options; taking
         * input as DOM nodes, JS-DOM nodes, HTML Strings, XML Strings, and CSS
         * Selectors.
         * 
         * @param {String|Object} dom
         *      Accepts any valid input for js.dom()
         * @param {Object} data
         *      The data object to use when executing the template
         * @param {Function} fn
         *      The function to execute; the return value will be a JS-DOM
         *      object, containing the generated form elements.
         */
        compileDom: function (dom, data, fn) {
            dom = js.dom(dom);
            if (dom && dom.getHtml) {
                var form = this;
                dom.getHtml(function (html) {
                    form._compiler(html, data, fn, dom);
                });
            }
            return dom;
        },
        
        /**
         * @private
         * @method
         * Internal constructor loop to js.form.compile
         */
        _compiler: function(template, data, fn, compile) {
            var dom = null;
            
            if (typeof compile !== "string") {
                dom = compile;
            }
            else {
                js.template(data)
                    [compile](template, null, function(text) {
                        dom = js.dom(text);
                    });
            }
                
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
        /**
         * @method input
         * @member jspyder.form.templates
         */
        .registerControlFn("input", function() {
            function setValue(data, v) {
                this.setValue(js.alg.string(v));
            }
            
            return function (cfg) {
                var fieldname = js.alg.string(cfg.name),
                    fieldclass = js.alg.string(cfg.class),
                    fieldtype = js.alg.string(cfg.type, "text"),
                    html = [
                        "<input class=\"", fieldclass, "\"",
                        " name=\"", fieldname, "\"",
                        (cfg.readonly ? " readonly=\"readonly\"" : ""),
                        " data-type=\"", fieldtype, "\"></input>"
                    ].join('');
                    
                cfg.setValue = setValue;

                return js.dom(html);
            }
        })
        /**
         * @method date
         * @member jspyder.form.templates
         */
        .registerControlFn("date", function () {
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
                        this.date.exportMonthList("mmm"), 
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
                    var sameYear = data.today.exportYear() === data.date.exportYear(),
                        sameMonth = (monthnum + 1) === data.today.exportMonth(); 
                        
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
                    var weekdays = calStruct.date.exportWeekdayList("DD"),
                        daylist = calStruct.date.exportDayList("d"),
                        i = 0,
                        data = { 
                            html: "", 
                            wlen: weekdays.length,
                            offset: calStruct.date.exportWeekdayOffset(),
                            calStruct: calStruct,
                            today: (calStruct.today.exportMonth() === calStruct.date.exportMonth()) && (js.date().exportDay()) };
                    
                    js.alg.arrEach(weekdays, calStruct.buildWeekdays, data);
                        
                    while (i < data.offset) {
                        this.buildNumberedDays("", i - data.offset, null, data);
                        i++;
                    }
                    
                    js.alg.arrEach(daylist, this.buildNumberedDays, data);
                    
                    calStruct.navMonth = true;
                    calStruct.setTiles(data.html);
                    calStruct.tiles.find(".date").on("click", function(event) {
                        js.dom(this).getValue(function(v) {
                            calStruct.date.setDay(v);
                            calStruct.setTitle(true);
                            js.dom(calStruct.input).trigger("change");
                        });
                        calStruct.enableClose();
                    });
                    calStruct.setTitle();
                    calStruct.preventClose();
                    js.dom(calStruct.input).trigger("change");
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
                    var sameYear = data.calStruct.today.exportYear() === data.calStruct.date.exportYear(),
                        sameMonth = data.calStruct.today.exportMonth() === data.calStruct.date.exportMonth(),
                        sameDate = data.calStruct.today.exportDay() === (daynum + 1);
                            
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
            
            var __override = {
                type: "input"
            };
            
            return function (cfg) {
                var $datepicker = this.buildControl(js.alg.mergeObj({}, cfg, __override), true),
                    calStruct = __calStructFactory(cfg);
                
                $datepicker.filter("input").on("click", function(event) {
                    var attrs = { "readonly": null };
                    js.dom(this).getAttrs(attrs);
                    
                    if(!attrs["readonly"]) {
                        var dateVal = this.value || cfg.value || cfg.default || new Date();
                         
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
                    }
                    return;
                });
                
                cfg.exportValue = function() {
                    return $datepicker.exportValue()
                        ? calStruct.date.asDate()
                        : null;
                };
                cfg.setValue = function(data, value) {
                    calStruct.date.setDate(value || NaN, calStruct.format);
                    this.setValue(calStruct.date.asString(calStruct.format));
                    return;
                };

                return $datepicker;
            }
        })
        /**
         * @method button
         * @member jspyder.form.templates
         */
        .registerControlFn("button", function() {
            
            function __clickFactory(form, fn) {
                return function(event) {
                    var attrs = { "readonly": null };
                    js.dom(this).getAttrs(attrs);
                    attrs["readonly"] || js.alg.use(this, fn, [event, form]);
                    return;
                }
            }
            
            function button(cfg) {
                // ensure that no label is used
                cfg.nolabel = true;
                var btnclass = js.alg.string(cfg.class, ""),
                    btnicon = js.alg.string(cfg.icon, ""),
                    btntext = js.alg.string(cfg.text, ""),
                    btnname = js.alg.string(cfg.name, ""),
                    btnvalue = js.alg.string(cfg.value, "");
                
                var html = [
                        "<div class=\"js-control js-control-button ", btnclass, "\"",
                            (cfg.readonly ? " readonly=\"true\"" : ""), " name=\"", btnname, "\">",
                                "<i class=\"" + btnicon + "\"></i>",
                                "<span class=\"button-text\" data-buttontext=\"" + btntext + "\"></span>",
                        "</div>"
                    ].join(''),
                    
                    $button = js.dom(html)
                        .setValue(btnvalue)
                        .on("click", __clickFactory(this, cfg.click));
                
                return $button;
            }
            
            return button;
        })
        /**
         * @method buttonset
         * @member jspyder.form.templates
         */
        .registerControlFn("buttonset", function () {
            var __override = {
                type: "button"
            };
            
            return function (cfg) {
                var buttons = js.dom();
                for (var i = 0; i < cfg.buttons.length; i++) {
                    var option = js.alg.mergeObj({ "readonly": cfg["readonly"] }, cfg.buttons[i], __override);
                    option.class += ' js-buttonset';
                    buttons.and(this.buildControl(option, true));
                }
                return buttons;
            };
        })
        /**
         * @method submit
         * @member jspyder.form.templates
         */
        .registerControlFn("submit", function() {
            
            function __submitClickFactory(form) {
                return function __submitClick(event) {
                    var attrs = { "readonly": null };
                    js.dom(this).getAttrs(attrs);
                    attrs["readonly"] || form.submit();
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
        /**
         * @method reset
         * @member jspyder.form.templates
         */
        .registerControlFn("reset", function() {
            
            function __resetClickFactory(form) {
                return function __resetClick(event) {
                    var attrs = { "readonly": null };
                    js.dom(this).getAttrs(attrs);
                    attrs["readonly"] || form.reset();
                    return;
                }
            }
            
            var __override = {
                type: "button",
                nolabel: true
            };
            
            function submit(cfg) {
                var $button = this.buildControl(js.alg.mergeObj(cfg, __override), true);
                $button.on("click", __resetClickFactory(this));
                return $button;
            }
            
            return submit;
        })
        /**
         * @method dropdown
         * @member jspyder.form.templates
         */
        .registerControlFn("dropdown", function() {
            var $DOC = js.dom(document.documentElement);
            
            function __dropdownClickFactory(cfg) {
                function __dropdownClick(event) {                    
                    var $dropdown = js.dom(this),
                        attrs = { "readonly": null };
                        
                    $dropdown.getAttrs(attrs);
                    if(!attrs["readonly"]) {
                        __createPopout($dropdown, cfg);
                    }
                    
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
                        
                while(i < options.length) {
                    option = options[i];
                    litext = js.alg.string(option.text, option.value);
                    livalue = js.alg.string(option.value, option.text);
                    
                    lihtml = [
                        "<li class=\"item\" value=\"", livalue, "\" title=\"", litext, "\">", litext, "</li>"].join('');
                    
                    $popout.append(lihtml);
                    i++
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
                value = js.alg.string(value);
                var options = data.config.values,
                    self = this;
                    
                js.alg.each(options, function (option) {
                    var oVal = js.alg.string(option.value, option.text),
                        oTxt = js.alg.string(option.text, option.value);

                    if (value === oVal) {
                        self.setValue(oVal)
                            .find(".dropdown-text")
                            .setHtml(oTxt);
                            
                        this.stop();
                    }
                    
                    return;
                });
            }
            
            function dropdown(cfg) {
                var cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    cfgvalue = js.alg.string(cfg.value, ""),
                    cfgdefault = js.alg.string(cfg.default, ""),
                
                    html = [
                        "<div name=\"", cfgname, "\" tabindex=\"0\"",
                            (cfg.readonly ? " readonly=\"true\"" : ""),
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
        /**
         * @method textarea
         * @member jspyder.form.templates
         */
        .registerControlFn("textarea", function() {
            function setValue(data, v) {
                v = js.alg.string(v, "");
                this.setValue(v);
            }
            
            return function(cfg) {
                var cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    html = [
                        "<textarea name=\"", cfgname, "\"",
                            (cfg.readonly ? " readonly=\"true\"" : ""),
                            " class=\"input ", cfgclass, "\">",
                        "</textarea>"
                    ].join('');
                    
                cfg.setValue = setValue;
                    
                var textarea = js.dom(html);
                
                return textarea;
            }
        })
        /**
         * @method textarea-autosize
         * @member jspyder.form.templates
         */
        .registerControlFn("textarea-autosize", function() {
            function setValue(data, v) {
                v = js.alg.string(v, "");
                this.setValue(v);
            }
            
            function input(event) {
                var attrs = { "readonly": null };
                js.dom(this).getAttrs(attrs);
                if(!attrs["readonly"]) {
                    div = document.createElement("div");
                    var css = {
                        "font-family": null,
                        "font-size": null,
                        "font-weight": null,
                        "padding-left": null,
                        "padding-right": null,
                        "padding-bottom": null,
                        "padding-top": null,
                        "border-left": null,
                        "border-right": null,
                        "border-top": null,
                        "border-bottom": null,
                        "line-height": null,
                        "word-wrap": null
                    };

                    div.style["position"] = "fixed";
                    div.style["left"] = -0xFFFF + "px";
                    div.style["white-space"] = "pre-wrap";
                    div.style["white-space"] = "-moz-pre-wrap";
                    div.style["white-space"] = "-pre-wrap";
                    div.style["white-space"] = "-o-pre-wrap";
                    div.style["width"] = div.style["min-width"] = div.style["max-width"] = this.clientWidth + "px";
                    document.body.appendChild(div);
                    
                    var textarea = js.dom(this).getCss(css);
                    js.dom(div)
                        .setText(this.value)
                        .setCss(css)
                        .getPosition(function(pos) {
                            textarea.setCss({
                                "height": (pos.height + 20) + "px"
                            });
                        }).remove();
                }
                return;
            }
            
            return function(cfg) {
                var cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    html = [
                        "<textarea name=\"", cfgname, "\"",
                            " class=\"input js-control js-control-autosize ", cfgclass, "\">",
                        "</textarea>"
                    ].join('');
                    
                cfg.setValue = setValue;
                    
                var textarea = js.dom(html);
                
                textarea.on("input", input);
                
                return textarea;
            }
        })
        /**
         * @method radio
         * @member jspyder.form.templates
         */
        .registerControlFn("radio", function () {
            function single(cfg) {
                var cfgtext = js.alg.string(cfg.text, ""),
                    cfgvalue = js.alg.string(cfg.value, ""),
                    cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    html = [
                        "<input value=\"", cfgvalue, "\"",
                            " name=\"", cfgname, "\"",
                            " type=\"radio\"",
                            (cfg["readonly"] ? " readonly=\"true\"" : ""),
                            " class=\"", cfgclass, "\">",
                        "</input>"
                    ].join('');
                
                return js.dom(html).and(js.form.fn.buildLabel(cfgname, cfgtext, cfgclass));
            }
            
            function exportValue(data) {
                return (data.config["data-value"] || null);
            }
            
            function setValue(data, values) {
                this.find("input[type=radio]")
                    .each(function (element) {
                        var attrs = { "value": "" },
                            props = { "checked": null },
                            old = null;

                        js.dom(element)
                            .getProps(props)
                            .getAttrs(attrs, function (attrs) {
                                old = props["checked"];
                                if (values && values.indexOf) {
                                    props["checked"] = values.indexOf(attrs.value) > -1;
                                }
                            })
                            .setProps(props)
                            .trigger(props["checked"] !== old ? "change" : "");

                        return;
                    });

                return this;
            }
            
            return function(cfg) {
                var cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    options = cfg.values || [],
                    option = null,
                    $option = null,
                    $radio = js.dom(),
                    i;
                    
                cfg["data-values"] = {};
                
                for(i = 0; i < options.length; i++) {
                    option = js.alg.mergeObj({ 
                        "name": cfgname, 
                        "class": cfgclass,
                        "readonly": cfg.readonly }, options[i]);
                    option.class = cfgclass + js.alg.string(options[i].class);
                    $option = js.dom("<div></div>").append(single(option));
                    $radio.and($option);
                }
                
                var form = this;
                
                $radio
                    .find("input")
                        .on("change", function (event) {
                            var attrs = { "readonly": null };
                            var $me = js.dom(this);
                            $me.getAttrs(attrs);
                            if(!attrs["readonly"]) {
                                $me.getValue(function(v) {
                                    cfg["data-value"] = v;
                                });
                            }
                            else {
                                form.setFieldValue(cfgname, form.exportFieldValue(cfgname));
                            }
                        });
                
                cfg.exportValue = exportValue;
                cfg.setValue = setValue;
                
                return $radio;
            };
        })
        /**
         * @method checkbox
         * @member jspyder.form.templates
         */
        .registerControlFn("checkbox", function() {
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
                                if (values && values.indexOf) {
                                    props["checked"] = values.indexOf(attrs.value) > -1;
                                }
                            })
                            .setProps(props)
                            .trigger(props["checked"] !== old ? "change" : "");

                        return;
                    });

                return this;
            }
            
            function checkbox(cfg) {
                var cfgtext = js.alg.string(cfg.text, ""),
                    cfgvalue = js.alg.string(cfg.value, ""),
                    cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    html = [
                        "<input value=\"", cfgvalue, "\"",
                            " name=\"", cfgname, "\"",
                            " type=\"checkbox\"",
                            (cfg.readonly ? " readonly=\"true\"" : ""),
                            " class=\"", cfgclass, "\">",
                        "</input>"
                    ].join(''),
                    $checkbox = js.dom(html).and(js.form.fn.buildLabel(cfgname, cfgtext, cfgclass));
                    
                return $checkbox;
            }
            
            return function (cfg) {
                var cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    options = cfg.values || [],
                    option = null,
                    $option = null,
                    $checkbox = js.dom(),
                    i;
                    
                cfg["data-values"] = {};
                    
                for(i = 0; i < options.length; i++) {
                    option = js.alg.mergeObj({ 
                        "name": cfgname, readonly: cfg.readonly }, options[i]);
                    option.class = cfgclass + js.alg.string(options[i].class);
                    $option = js.dom("<div></div>").append(checkbox(option));
                    $checkbox.and($option);                    
                }
                
                $checkbox
                    .find("input")
                        .on("change", function (event) {
                            var checked = this.checked,
                                self = js.dom(this),
                                attrs = { "readonly": null };
                            
                            self.getAttrs(attrs);
                            
                            if(attrs["readonly"]) {
                                this.checked = !checked;
                            }
                            else {
                                self.getValue(function(v) {
                                    cfg["data-values"]["val-" + js.alg.string(v)] = checked;
                                });
                            }
                        });
                
                cfg.exportValue = exportValue;
                cfg.setValue = setValue;
                
                return $checkbox;
            }
        })
        /**
         * @method toggles
         * @member jspyder.form.templates
         */
        .registerControlFn("toggles", function() {
            function exportValue(data) {
                var keys = [];
                    
                this.filter(".js-buttonset").each(function (el) {
                    js.dom(el).getAttrs({ "data-value": null, "data-checked": null }, function (attrs) {
                        if (attrs["data-checked"]) {
                            keys.push(attrs["data-value"]);
                        }
                    })
                });
                
                return keys;
            }
            
            function setValue(data, values) {
                this.filter(".js-buttonset")
                    .each(function (element) {
                        var attrs = {
                                "data-value": "",
                                "data-checked": null
                            },
                            old = null;

                        js.dom(element)
                            .getAttrs(attrs, function (attrs) {
                                old = attrs["data-checked"];
                                if (values && values.indexOf) {
                                    attrs["data-checked"] = (values.indexOf(attrs["data-value"]) > -1 ? true : null);
                                }
                                return;
                            })
                            .setAttrs(attrs)
                            .trigger(attrs["data-checked"] !== old ? "change" : "");

                        return;
                    });

                return this;
            }
            
            function checkbox(cfg) {
                var cfgtext = js.alg.string(cfg.text, ""),
                    cfgvalue = js.alg.string(cfg.value, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    $button = js.form.fn.buildControl({
                        type: "button",
                        text: cfgtext,
                        class: cfgclass + " js-buttonset",
                        readonly: cfg.readonly,
                        click: function (data, event) {
                            js.dom(this)
                                .getAttrs({ "data-checked": false, "readonly": false }, function (attrs) {
                                    if(!attrs["readonly"]) {
                                        attrs["data-checked"] = (js.alg.bool(attrs["data-checked"]) ? null : true);
                                        this.setAttrs(attrs);
                                    }
                                    return;
                                });
                            return;
                        }
                    });
                    
                return $button.setAttrs({ "data-checked": null, "data-value": cfgvalue });
            }
            
            return function (cfg) {
                var cfgname = js.alg.string(cfg.name, ""),
                    cfgclass = js.alg.string(cfg.class, ""),
                    options = cfg.values || [],
                    option = null,
                    $option = null,
                    $checkbox = js.dom(),
                    i;
                    
                cfg["data-values"] = {};
                    
                for(i = 0; i < options.length; i++) {
                    option = js.alg.mergeObj({ 
                        "name": cfgname,
                        "readonly": cfg.readonly 
                    }, options[i]);
                    option.class = cfgclass + " " + js.alg.string(options[i].class);
                    $option = js.dom(checkbox(option));
                    $checkbox.and($option);
                }
                
                cfg.exportValue = exportValue;
                cfg.setValue = setValue;
                
                return $checkbox;
            }
        })
        /**
         * @method toggles-radio
         * @member jspyder.form.templates
         */
        .registerControlFn("toggles-radio", function() {
            function exportValue(data) {
                var value = null;
                    
                this.filter(".js-buttonset[data-checked]").at(0)
                    .getAttrs({ "data-value": null, "data-checked": null }, function (attrs) {
                        value = attrs["data-value"];
                        return;
                    });
                
                return value;
            }
            
            function setValue(data, values) {
                this.filter(".js-buttonset[data-checked]:not([data-value=\"" + values + "\"])")
                    .setAttrs({ "data-checked": null })
                    .trigger("change");
                    
                this.filter(".js-buttonset[data-value=\"" + values + "\"]:not([data-checked])")
                    .setAttrs({ "data-checked": true })
                    .trigger("change");

                return this;
            }
            
            var __override = {
                    "type": "toggles",
                    "nolabel": true
                };
            
            return function (cfg) {
                var tmp = js.alg.mergeObj({}, cfg, __override),
                    $checkbox = this.buildControl(tmp, true),
                    form = this;
                    
                $checkbox.on("click", function (event) {
                    var self = js.dom(this);
                    js.alg.each(cfg.values, function (valObj) {
                        self.getAttrs({ "data-value": null, "readonly": null }, function (attrs) {
                            attrs["readonly"] || form.setFieldValue(cfg.name, attrs["data-value"]);
                        });
                        return;
                    });
                });
                    
                cfg.exportValue = exportValue;
                cfg.setValue = setValue;
                    
                return $checkbox;
            }
        })
        /**
         * @method toggles-bitwise
         * @member jspyder.form.templates
         */
        .registerControlFn("toggles-bitwise", function() {
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
                this.filter(".js-buttonset")
                    .each(function (element) {
                        var attrs = {
                                "data-value": "",
                                "data-checked": null
                            },
                            old = null;

                        js.dom(element)
                            .getAttrs(attrs, function (attrs) {
                                old = attrs["data-checked"];
                                attrs["data-value"] = js.alg.number(attrs["data-value"], 0);
                                attrs["data-checked"] = ((values === attrs["data-value"]) || (values & attrs["data-value"])) ? true : null;
                                return;
                            })
                            .setAttrs(attrs)
                            .trigger(attrs["data-checked"] !== old ? "change" : "");

                        return;
                    });

                return this;
            }
            
            var __baseExportValue = null,
                __override = {
                    "type": "toggles",
                    "nolabel": true
                };
            
            return function (cfg) {
                var tmp = js.alg.mergeObj({}, cfg, __override),
                    $checkbox = this.buildControl(tmp, true);
                    
                cfg["data-values"] = tmp["data-values"];
                    
                __baseExportValue = __baseExportValue || tmp.exportValue;
                cfg.exportValue = exportValue;
                cfg.setValue = setValue;
                    
                return $checkbox;
            }
        })
        /**
         * @method checkbox-bitwise
         * @member jspyder.form.templates
         */
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
        /**
         * @method hidden
         * @member jspyder.form.templates
         */
        .registerControlFn("hidden", function() {
            var __override = {
                    nolabel: true,
                    type: "input"
                },
                __css = { "display": "none" };
            
            function hidden(cfg) {
                var cfg2 = js.alg.mergeObj({}, cfg, __override);
                var ctl = this.buildControl(cfg2, true).setCss(__css);
                
                cfg.setValue = cfg2.setValue;
                
                return ctl;
            }
            
            return hidden;
        })
        /**
         * @method autocomplete
         * @member jspyder.form.templates
         */
        .registerControlFn("autocomplete", function() {
            var __override = {
                    type: "input"
                };
            
            function buildFunctions(form, autocomplete, config) {
                var found = js.dom("<ul class=\"js-control js-autocomplete-search\"></ul>");
                
                function searchClick(event) {
                    js.dom(this)
                        .getAttrs({ "data-value": null }, function (attrs) {
                            var value = attrs["data-value"];
                            form.setFieldValue(config.name, value);
                            return;
                        });
                    
                    return;
                }
                
                autocomplete
                    .on("keydown", function (event) {
                        var attrs = { "readonly": null };
                        js.dom(this).getAttrs(attrs);
                        if(attrs["readonly"]) { return ; }
                        var up = false;
                        switch (event.keyCode) {
                            case js.alg.keycodes.KC_UpArrow:
                                up = true;
                            case js.alg.keycodes.KC_DownArrow:
                                var selId = -1;

                                found.find(".search-item").each(function (item, i) {
                                    var cls = { "selected": false };
                                    js.dom(item).getClasses(cls);

                                    if (cls["selected"]) {
                                        selId = i;
                                    }
                                    return;
                                });

                                found.find(".search-item")
                                    .setClasses({ "selected": false })
                                    .at(selId + (up ? -1 : 1))
                                    .setClasses({ "selected": true });

                                break;

                            case js.alg.keycodes.KC_Tab:
                            case js.alg.keycodes.KC_Enter:
                                found.find(".search-item.selected").trigger("mousedown");
                                break;
                        }
                        return;
                    })
                    .on("blur", function (event) {
                        var attrs = { "readonly": null };
                        js.dom(this).getAttrs(attrs);
                        if(attrs["readonly"]) { return ; }
                        if(this.value === ""){ 
                            js.dom(this).setAttrs({ "data-value": "" });
                        }
                        else if (config["strict"]) {
                            var match = searchValue(config, this.value, true);
                            if(!match) {
                                this.value = "";
                                js.dom(this).setAttrs({ "data-value": "" });
                            }
                            
                            else {
                                this.value = match.text;
                                js.dom(this).setAttrs({ "data-value": match.value });
                            }
                        }
                        fns.hide();
                        return;
                    });
                
                var fns =  {
                    show: function search(value) {
                        var values = config.values || [],
                            minlen = js.alg.number(config.minlen, 3),
                            data = {
                                match: [],
                                regexp: new RegExp(js.alg.escapeString(value), "i"),
                                depth: js.alg.number(config.length, 5)
                            };

                        if (value.length >= minlen) {
                            js.alg.arrEach(values, __searchLoop, data);
                            
                            var css = { width: 0 };
                            this.getCss(css);

                            found
                                .setHtml(data.match.join(""))
                                .attachEnd(this)
                                .setCss(css)
                                .find(".search-item").on("mousedown", searchClick);
                        }
                        else {
                            found.remove();
                        }
                    },
                    hide: function () {
                        found.remove();
                    },
                    getFirst: function () {
                        
                    }
                };
                
                return fns;
            }
            
            function __searchLoop(valObj, i, values, data) {
                var value = js.alg.string(valObj.value),
                    text = js.alg.string(valObj.text, value);

                if (data.regexp.test(text)) {
                    data.match.push("<li class=\"search-item\" data-value=\"" + value + "\" title=\"" + text + "\">" + text + "</li>");
                }

                if (data.match.length >= data.depth) {
                    this.stop();
                }

                return;
            }
            
            function __searchValue(valObj, i, values, data) {
                var value = js.alg.string(valObj.value),
                    text = js.alg.string(valObj.text, value);

                if (data.find.test(data.searchText ? text : value)) {
                    data.match = ({ value: value, text: text });
                    this.stop();
                }

                return;
            }
            
            function searchValue(config, value, searchText) {
                var data = {
                    match: null,
                    find: new RegExp("^" + value + "$"),
                    searchText: searchText
                };
                
                js.alg.arrEach(config.values, __searchValue, data);
                return data.match;
            }
            
            function setValue(data, value) {
                var config = data.config,
                    field = data.field,
                    strict = js.alg.bool(config.strict),
                    values = data.config.values,
                    text = "",
                    attrs = {},
                    match = searchValue(data.config, value, false);
                
                if (match) {
                    attrs["data-value"] = match.value;
                    text = match.text;
                }
                else {
                    if (!strict) {
                        attrs["data-value"] = js.alg.string(value, "");
                        text = js.alg.string(value, "");
                    }
                    else {
                        attrs["data-value"] = "";
                        text = "";
                    }
                }
                
                field.setAttrs(attrs).setValue(text);
                
                return;
            }
            
            function exportValue(data, v) {
                var value = "";
                
                data.field.getAttrs( { "data-value": null }, function (attrs) {
                        value = attrs["data-value"];
                    });
                    
                if(!value && !data.config.strict) {
                    data.field.getProps({ "value": null }, function(props) {
                        value = props["value"];
                    });
                }
                    
                return value;
            }
            
            return function (cfg) {
                var cfg2 = js.alg.mergeObj({}, cfg, __override),
                    $autocomplete = this.buildControl(cfg2, true),
                    form = this,
                    search = null;
                
                cfg.setValue = setValue;
                cfg.exportValue = exportValue;
                
                search = buildFunctions(form, $autocomplete, cfg);
                
                $autocomplete
                    .on("focus input", function (event) {
                        var attrs = { "readonly": null };
                        js.dom(this).getAttrs(attrs);
                        attrs["readonly"] || $autocomplete.getValue(search.show);
                    });
                
                return $autocomplete;
            }
        })
        /**
         * @method number
         * @member jspyder.form.templates
         */
        .registerControlFn("number", function() {
            var __override = {
                    type: "input",
                };
                
            function setValue(data, v) {
                v = js.alg.string(v, "");
                
                data.field.filter("input").getAttrs({ "data-focus": false },
                    function (attrs) {
                        if (attrs["data-focus"]) {
                            v = toNumber(v, data.config.acc);
                        }
                        else {
                            v =  toString(v, data.config.tsep, data.config.dec, data.config.acc);
                        }
                        this.setValue(v);
                    });
                
                return;
            }
            
            function exportValue(data, v) {
                v = this.filter("input").exportValue();
                
                v = v.replace(/([^\d\.])/g, "");
                
                return toNumber(v);
            }
            
            function toNumber(n, a) {
                n = js.alg.string(n, '');
                
                var reStrip = /([^\-\d\.]+)/g,
                    parts = null;
                    
                n = n.replace(reStrip, '');
                parts = n.split('.');
                if (parts) {
                    parts[0] = js.alg.number(parts[0], 0);
                    parts[1] = js.alg.string(parts[1], "0");
                    n = js.alg.number(parts[0] + '.' + parts[1], 0);
                }
                else {
                    n = 0;
                }
                
                if (typeof a !== "undefined") {
                    n = n.toFixed(a);
                }
                
                return n;
            }
            
            function toString(n, c, d, a) {
                if (js.alg.string(n, "") === "") {
                    return n;
                }
                n = js.alg.number(n, 0);
                c = js.alg.string(c, ',');
                d = js.alg.string(d, '.');
                
                if (typeof a !== "undefined") {
                    n = n.toFixed(a);
                }
                
                var reCommaSearch = /\B(?=(\d{3})+(?!\d))/g,
                    str = js.alg.string(n, ""),
                    part = str.split('.'),
                    num = [];
                    
                num[0] = (part[0] || "").replace(reCommaSearch, c);
                if (part[1]) { num.push(part[1]); }
                
                return num.join(d);
            }
            
            function change(event) {
                var num = js.dom(this);
                num.setValue(null, num.exportValue());
                return;
            }
            
            function number(cfg) {
                var cfg2 = js.alg.mergeObj({}, cfg, __override, {
                    "class": js.alg.string(cfg.class, "") + " data-number"
                });
                var $input = this.buildControl(cfg2, true),
                    form = this;
                    
                cfg.setValue = setValue;
                cfg.exportValue = exportValue;
                
                $input.filter("input")
                    .on("blur", function (event) {
                        var $input = js.dom(this).setAttrs({ "data-focus": null });
                        form.setFieldValue(cfg.name, $input.exportValue());
                        return;
                    })
                    .on("focus", function (event) {
                        var attrs = { "readonly": null };
                        js.dom(this).getAttrs(attrs);
                        
                        if(!attrs["readonly"]) {
                            var $input = js.dom(this).setAttrs({ "data-focus": true });
                            form.setFieldValue(cfg.name, $input.exportValue());
                        }
                        
                        return;
                    });
                    
                return $input;
            }
            
            return number;
        })
        /**
         * @method currency
         * @member jspyder.form.templates
         */
        .registerControlFn("currency", function() {
            var __override = {
                type: "number",
            };
            
            function currency(cfg) {
                var cfg2 = js.alg.mergeObj({}, cfg, __override, {
                        "class": js.alg.string(cfg.class, "") + " data-currency"
                    }),
                    $input = this.buildControl(cfg2, true),
                    prefix = "<div class=\"js-control js-control-currency-prefix\">" + js.alg.string(cfg.prefix, "$") + "</div>";
                
                Object.defineProperty(cfg, "acc", {
                    get: function() { return cfg2.acc; },
                    set: function(v) { cfg2.acc = v; }
                })
                
                cfg.setValue = cfg2.setValue;
                cfg.exportValue = cfg2.exportValue;
                cfg.acc = js.alg.number(cfg.acc, 2);
                    
                return js.dom(prefix).and($input);
            }
            
            return currency;
        });
     
    return js_form;
 });