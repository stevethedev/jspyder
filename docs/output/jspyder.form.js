Ext.data.JsonP.jspyder_form({"tagname":"class","name":"jspyder.form","autodetected":{},"files":[{"filename":"js-forms.js","href":"js-forms.html#jspyder-form"}],"owner":"jspyder","params":[{"tagname":"params","type":"Object","name":"config","optional":true,"doc":"<p>Configuration flags for building the forms element.</p>\n","properties":[{"tagname":"params","type":"Function","name":"success","optional":true,"doc":"<p>Function to trigger on form submission, if the validation\n    checks pass.  This can be overridden, later.  Expected\n    parameters are:</p>\n","properties":[{"tagname":"params","type":"Object","name":"values","optional":true,"doc":"<p>The values of each field in the form, where keys correspond\n    to field names and values correspond to their values.</p>\n","html_type":"Object"}],"html_type":"Function"},{"tagname":"params","type":"Function","name":"failure","optional":true,"doc":"<p>Function to trigger on form submission failure. For example,\n    if the validation checks failed.  This can be overridden,\n    later.</p>\n","properties":[{"tagname":"params","type":"Object","name":"values","optional":true,"doc":"<p>The values of each field in the form, where keys correspond\n    to field names and values correspond to their values.</p>\n","html_type":"Object"},{"tagname":"params","type":"Object","name":"invalid","optional":true,"doc":"<p>The values of each invalid field in the form, where keys\n    correspond to field names and values correspond to their\n    values.</p>\n","html_type":"Object"}],"html_type":"Function"},{"tagname":"params","type":"Function","name":"reset","optional":true,"doc":"<p>Function to trigger on form rest.  This can be overridden,\n    later.</p>\n","html_type":"Function"},{"tagname":"params","type":"Object","name":"fields","optional":true,"doc":"<p>An object of fields to insert into the document, where\n     the keys correspond to field names and the value scorrespond\n     to field definitions.</p>\n","html_type":"Object"}],"html_type":"Object"}],"return":{"type":"Object","name":"return","doc":"<p>JSpyder Function object.</p>\n","properties":null,"html_type":"Object"},"members":[{"name":"_dom","tagname":"property","owner":"jspyder.form","id":"property-_dom","meta":{"private":true}},{"name":"_fields","tagname":"property","owner":"jspyder.form","id":"property-_fields","meta":{"private":true}},{"name":"","tagname":"method","owner":"jspyder.form","id":"method-","meta":{"private":true}},{"name":"_checkboxValue","tagname":"method","owner":"jspyder.form","id":"method-_checkboxValue","meta":{"private":true}},{"name":"_failure","tagname":"method","owner":"jspyder.form","id":"method-_failure","meta":{"chainable":true,"private":true}},{"name":"_reset","tagname":"method","owner":"jspyder.form","id":"method-_reset","meta":{"chainable":true,"private":true}},{"name":"_success","tagname":"method","owner":"jspyder.form","id":"method-_success","meta":{"chainable":true,"private":true}},{"name":"addField","tagname":"method","owner":"jspyder.form","id":"method-addField","meta":{"chainable":true}},{"name":"addFields","tagname":"method","owner":"jspyder.form","id":"method-addFields","meta":{"chainable":true}},{"name":"attach","tagname":"method","owner":"jspyder.form","id":"method-attach","meta":{"chainable":true}},{"name":"exportField","tagname":"method","owner":"jspyder.form","id":"method-exportField","meta":{}},{"name":"exportFieldData","tagname":"method","owner":"jspyder.form","id":"method-exportFieldData","meta":{}},{"name":"getField","tagname":"method","owner":"jspyder.form","id":"method-getField","meta":{"chainable":true}},{"name":"getFieldData","tagname":"method","owner":"jspyder.form","id":"method-getFieldData","meta":{"chainable":true}},{"name":"reset","tagname":"method","owner":"jspyder.form","id":"method-reset","meta":{"chainable":true}},{"name":"submit","tagname":"method","owner":"jspyder.form","id":"method-submit","meta":{"chainable":true}},{"name":"validate","tagname":"method","owner":"jspyder.form","id":"method-validate","meta":{"chainable":true}},{"name":"values","tagname":"method","owner":"jspyder.form","id":"method-values","meta":{"chainable":true}}],"alternateClassNames":[],"aliases":{},"id":"class-jspyder.form","short_doc":"Initializes a JSpyder Form object. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/js-forms.html#jspyder-form' target='_blank'>js-forms.js</a></div></pre><div class='doc-contents'><p>Initializes a JSpyder Form object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object (optional)<div class='sub-desc'><p>Configuration flags for building the forms element.</p>\n<ul><li><span class='pre'>success</span> : Function (optional)<div class='sub-desc'><p>Function to trigger on form submission, if the validation\n    checks pass.  This can be overridden, later.  Expected\n    parameters are:</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : Object (optional)<div class='sub-desc'><p>The values of each field in the form, where keys correspond\n    to field names and values correspond to their values.</p>\n</div></li></ul></div></li><li><span class='pre'>failure</span> : Function (optional)<div class='sub-desc'><p>Function to trigger on form submission failure. For example,\n    if the validation checks failed.  This can be overridden,\n    later.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : Object (optional)<div class='sub-desc'><p>The values of each field in the form, where keys correspond\n    to field names and values correspond to their values.</p>\n</div></li><li><span class='pre'>invalid</span> : Object (optional)<div class='sub-desc'><p>The values of each invalid field in the form, where keys\n    correspond to field names and values correspond to their\n    values.</p>\n</div></li></ul></div></li><li><span class='pre'>reset</span> : Function (optional)<div class='sub-desc'><p>Function to trigger on form rest.  This can be overridden,\n    later.</p>\n</div></li><li><span class='pre'>fields</span> : Object (optional)<div class='sub-desc'><p>An object of fields to insert into the document, where\n     the keys correspond to field names and the value scorrespond\n     to field definitions.</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>JSpyder Function object.</p>\n</div></li></ul></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_dom' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-property-_dom' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-property-_dom' class='name expandable'>_dom</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p><a href=\"#!/api/jspyder.dom\" rel=\"jspyder.dom\" class=\"docClass\">jspyder.dom</a> object pointing to the created form element.</p>\n</div><div class='long'><p><a href=\"#!/api/jspyder.dom\" rel=\"jspyder.dom\" class=\"docClass\">jspyder.dom</a> object pointing to the created form element.</p>\n</div></div></div><div id='property-_fields' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-property-_fields' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-property-_fields' class='name expandable'>_fields</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>List of elements that the form is dealing with, to prevent having to\ndeal directly with making calls to the DOM.</p>\n</div><div class='long'><p>List of elements that the form is dealing with, to prevent having to\ndeal directly with making calls to the DOM.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-' class='name expandable'></a>( <span class='pre'>$input</span> ) : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Uses a generic value-retrieval method; this should be sufficient for\nmost single-value controls (e.g. ...</div><div class='long'><p>Uses a generic value-retrieval method; this should be sufficient for\nmost single-value controls (e.g. not checkboxes)</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>$input</span> : Object<div class='sub-desc'><p>JS-DOM object to retrieve a value from.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The value of the element.</p>\n</div></li></ul></div></div></div><div id='method-_checkboxValue' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-_checkboxValue' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-_checkboxValue' class='name expandable'>_checkboxValue</a>( <span class='pre'>$checkboxes</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Specialized value retrieval for checkbox elements. ...</div><div class='long'><p>Specialized value retrieval for checkbox elements.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>$checkboxes</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-_failure' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-_failure' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-_failure' class='name expandable'>_failure</a>( <span class='pre'>values, invalid</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span><span class='private' >private</span></span></div><div class='description'><div class='short'>Callback function which will execute if the form fails to submit\nsuccessfully (e.g. ...</div><div class='long'><p>Callback function which will execute if the form fails to submit\nsuccessfully (e.g. failed the validation check).</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : Object<div class='sub-desc'><p>An object where keys correspond to input names, and values\n     correspond to the values they are storing.</p>\n</div></li><li><span class='pre'>invalid</span> : Object<div class='sub-desc'><p>An object of invalid fields where keys correspond to input\n     names, and values correspond to the values they are storing.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-_reset' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-_reset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-_reset' class='name expandable'>_reset</a>( <span class='pre'></span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span><span class='private' >private</span></span></div><div class='description'><div class='short'>Callback function which will execute if the reset event is received. ...</div><div class='long'><p>Callback function which will execute if the reset event is received.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-_success' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-_success' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-_success' class='name expandable'>_success</a>( <span class='pre'>values</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span><span class='private' >private</span></span></div><div class='description'><div class='short'>Callback function which will execute if the form submits\nsuccessfully. ...</div><div class='long'><p>Callback function which will execute if the form submits\nsuccessfully.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : Object<div class='sub-desc'><p>An object where keys correspond to input names, and values\n     correspond to the values they are storing.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-addField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-addField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-addField' class='name expandable'>addField</a>( <span class='pre'>name, [config]</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Adds a new field to the form, if the name does not already exist,\nusing the name provided. ...</div><div class='long'><p>Adds a new field to the form, if the name does not already exist,\nusing the name provided.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>The name which will be used to refer to the generated field.</p>\n</div></li><li><span class='pre'>config</span> : Object (optional)<div class='sub-desc'><p>The configuration options which will be used to generate and\n     style the created field.</p>\n<ul><li><span class='pre'>type</span> : String (optional)<div class='sub-desc'><p>The type of field which should be created:\n     - <strong>input</strong> <em>default</em>: standard input field without\n         any special attributes or constraints.\n     - <strong>checkbox</strong>: A set of checkboxes will be created.  Each value\n         should be designated with label-value pairs stored in an\n         array (see below).\n     - <strong>dropdown</strong>: A dropdown control will be created.  Each value\n         should be designated with label-value pairs stored in an\n         array (see below).\n     - <strong>textarea</strong>: A standard multi-line text field.\n     - <strong>hidden</strong>: An abstract field which is not rendered to the\n         page, but in all other ways behaves like a standard <em>input</em>\n         field.</p>\n</div></li><li><span class='pre'>values</span> : Object[] (optional)<div class='sub-desc'><p>A list of text-value pairs.</p>\n<ul><li><span class='pre'>label</span> : String (optional)<div class='sub-desc'><p>The label to display in place of the value.  If this is omitted,\n     and a value is provided, then this will default to the value.</p>\n</div></li><li><span class='pre'>value</span> : String (optional)<div class='sub-desc'><p>The value for this particular option.  If this is omitted, and\n     a label is provided, then this will default to the label.</p>\n</div></li></ul></div></li><li><span class='pre'>section</span> : String (optional)<div class='sub-desc'><p>The name of a section to add this particular field to.  If\n     blank, then this field is not added directly to the list.</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-addFields' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-addFields' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-addFields' class='name expandable'>addFields</a>( <span class='pre'>fields</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Adds a group of fields using jspyder.form.addField where keys\ncorrespond to field names and values correspond to fiel...</div><div class='long'><p>Adds a group of fields using <a href=\"#!/api/jspyder.form-method-addField\" rel=\"jspyder.form-method-addField\" class=\"docClass\">jspyder.form.addField</a> where keys\ncorrespond to field names and values correspond to field templates.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fields</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-attach' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-attach' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-attach' class='name expandable'>attach</a>( <span class='pre'>[fn], [data]</span> ) : Object<span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Attaches the form to the specified dom node ...</div><div class='long'><p>Attaches the form to the specified dom node</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function (optional)<div class='sub-desc'><p>Optional callback function to execute, using the form js.dom\n     element as the context and the js.form object as the first\n     parameter.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>dom</span> : Object (optional)<div class='sub-desc'><p>DOM node created and attached to the document.</p>\n</div></li><li><span class='pre'>data</span> : Mixed (optional)<div class='sub-desc'><p>Data parameter passed into the function.</p>\n</div></li></ul></div></li><li><span class='pre'>data</span> : Mixed (optional)<div class='sub-desc'><p>Optional parameter to pass in as a second parameter for [fn].</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p><a href=\"#!/api/jspyder.dom\" rel=\"jspyder.dom\" class=\"docClass\">jspyder.dom</a> object.</p>\n</div></li></ul></div></div></div><div id='method-exportField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-exportField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-exportField' class='name expandable'>exportField</a>( <span class='pre'>name</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Retrieves the defined field by name. ...</div><div class='long'><p>Retrieves the defined field by name.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-exportFieldData' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-exportFieldData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-exportFieldData' class='name expandable'>exportFieldData</a>( <span class='pre'>name</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Retrieves the field object stored under the defined name. ...</div><div class='long'><p>Retrieves the field object stored under the defined name.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-getField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-getField' class='name expandable'>getField</a>( <span class='pre'>name, fn</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Gets the defined field by name, and then passes it as a parameter\ninto the function defined by fn. ...</div><div class='long'><p>Gets the defined field by name, and then passes it as a parameter\ninto the function defined by fn.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>fn</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-getFieldData' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-getFieldData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-getFieldData' class='name expandable'>getFieldData</a>( <span class='pre'>name, fn</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Gets the defined field object, and passes it as the parameter to the\nfunction defined by fn. ...</div><div class='long'><p>Gets the defined field object, and passes it as the parameter to the\nfunction defined by fn.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>fn</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-reset' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-reset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-reset' class='name expandable'>reset</a>( <span class='pre'>[fn]</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Triggers a manual form reset. ...</div><div class='long'><p>Triggers a manual form reset.  This will turn all of the form fields\nback to their initial values on creation.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function (optional)<div class='sub-desc'><p>Optional callback to execute after the reset has been completed.\n     See <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a> constructor for expected parameters.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-submit' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-submit' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-submit' class='name expandable'>submit</a>( <span class='pre'>[onSuccess], [onFail]</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Triggers a manual form submission. ...</div><div class='long'><p>Triggers a manual form submission.  If the form fails validation, or\nany other errors occur, then the failed callback is executed.<br/>\nOtherwise, the success function is executed.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>onSuccess</span> : Function (optional)<div class='sub-desc'><p>Overrides the success function provided in the configuration on\n     construction.  See <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a> constructor for expected\n     parameters.</p>\n</div></li><li><span class='pre'>onFail</span> : Function (optional)<div class='sub-desc'><p>Overrides the failure function provided in the configuration on\n     construction.  See <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a> constructor for expected\n     parameters.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-validate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-validate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-validate' class='name expandable'>validate</a>( <span class='pre'>[fn]</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Triggers a manual form validation. ...</div><div class='long'><p>Triggers a manual form validation.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function (optional)<div class='sub-desc'><p>Optional callback to execute after the validation has been\n     completed.  See <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a> constructor for expected\n     parameters.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-values' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-values' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-values' class='name expandable'>values</a>( <span class='pre'>fn</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Retrieves the values of all of the elements in the JS-Form. ...</div><div class='long'><p>Retrieves the values of all of the elements in the JS-Form.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>A callback function to execute after the values have been\n     calculated.  The context points back to the js-form.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : Object<div class='sub-desc'><p>The values of all of the form elements are pushed into the\n     first parameter of the function fn.</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});