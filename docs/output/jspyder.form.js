Ext.data.JsonP.jspyder_form({"tagname":"class","name":"jspyder.form","autodetected":{},"files":[{"filename":"js-forms.js","href":"js-forms.html#jspyder-form"}],"owner":"jspyder","params":[{"tagname":"params","type":"Object","name":"config","optional":true,"doc":"<p>Configuration flags for building the forms element.</p>\n","properties":[{"tagname":"params","type":"Function","name":"success","optional":true,"doc":"<p>Function to trigger on form submission, if the validation\n    checks pass.  This can be overridden, later.  Expected\n    parameters are:</p>\n","properties":[{"tagname":"params","type":"Object","name":"values","optional":true,"doc":"<p>The values of each field in the form, where keys correspond\n    to field names and values correspond to their values.</p>\n","html_type":"Object"}],"html_type":"Function"},{"tagname":"params","type":"Function","name":"failure","optional":true,"doc":"<p>Function to trigger on form submission failure. For example,\n    if the validation checks failed.  This can be overridden,\n    later.</p>\n","properties":[{"tagname":"params","type":"Object","name":"values","optional":true,"doc":"<p>The values of each field in the form, where keys correspond\n    to field names and values correspond to their values.</p>\n","html_type":"Object"},{"tagname":"params","type":"Object","name":"invalid","optional":true,"doc":"<p>The values of each invalid field in the form, where keys\n    correspond to field names and values correspond to their\n    values.</p>\n","html_type":"Object"}],"html_type":"Function"},{"tagname":"params","type":"Function","name":"reset","optional":true,"doc":"<p>Function to trigger on form rest.  This can be overridden,\n    later.</p>\n","html_type":"Function"}],"html_type":"Object"}],"return":{"type":"Object","name":"return","doc":"<p>JSpyder Function object.</p>\n","properties":null,"html_type":"Object"},"members":[{"name":"_dom","tagname":"property","owner":"jspyder.form","id":"property-_dom","meta":{"private":true}},{"name":"_fields","tagname":"property","owner":"jspyder.form","id":"property-_fields","meta":{"private":true}},{"name":"_failed","tagname":"method","owner":"jspyder.form","id":"method-_failed","meta":{"chainable":true,"private":true}},{"name":"_reset","tagname":"method","owner":"jspyder.form","id":"method-_reset","meta":{"chainable":true,"private":true}},{"name":"_submit","tagname":"method","owner":"jspyder.form","id":"method-_submit","meta":{"chainable":true,"private":true}},{"name":"addField","tagname":"method","owner":"jspyder.form","id":"method-addField","meta":{"chainable":true}},{"name":"export","tagname":"method","owner":"jspyder.form","id":"method-export","meta":{}},{"name":"reset","tagname":"method","owner":"jspyder.form","id":"method-reset","meta":{"chainable":true}},{"name":"submit","tagname":"method","owner":"jspyder.form","id":"method-submit","meta":{"chainable":true}},{"name":"validate","tagname":"method","owner":"jspyder.form","id":"method-validate","meta":{"chainable":true}}],"alternateClassNames":[],"aliases":{},"id":"class-jspyder.form","short_doc":"Initializes a JSpyder Form object. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/js-forms.html#jspyder-form' target='_blank'>js-forms.js</a></div></pre><div class='doc-contents'><p>Initializes a JSpyder Form object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object (optional)<div class='sub-desc'><p>Configuration flags for building the forms element.</p>\n<ul><li><span class='pre'>success</span> : Function (optional)<div class='sub-desc'><p>Function to trigger on form submission, if the validation\n    checks pass.  This can be overridden, later.  Expected\n    parameters are:</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : Object (optional)<div class='sub-desc'><p>The values of each field in the form, where keys correspond\n    to field names and values correspond to their values.</p>\n</div></li></ul></div></li><li><span class='pre'>failure</span> : Function (optional)<div class='sub-desc'><p>Function to trigger on form submission failure. For example,\n    if the validation checks failed.  This can be overridden,\n    later.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : Object (optional)<div class='sub-desc'><p>The values of each field in the form, where keys correspond\n    to field names and values correspond to their values.</p>\n</div></li><li><span class='pre'>invalid</span> : Object (optional)<div class='sub-desc'><p>The values of each invalid field in the form, where keys\n    correspond to field names and values correspond to their\n    values.</p>\n</div></li></ul></div></li><li><span class='pre'>reset</span> : Function (optional)<div class='sub-desc'><p>Function to trigger on form rest.  This can be overridden,\n    later.</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>JSpyder Function object.</p>\n</div></li></ul></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_dom' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-property-_dom' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-property-_dom' class='name expandable'>_dom</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p><a href=\"#!/api/jspyder.dom\" rel=\"jspyder.dom\" class=\"docClass\">jspyder.dom</a> object pointing to the created form element.</p>\n</div><div class='long'><p><a href=\"#!/api/jspyder.dom\" rel=\"jspyder.dom\" class=\"docClass\">jspyder.dom</a> object pointing to the created form element.</p>\n</div></div></div><div id='property-_fields' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-property-_fields' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-property-_fields' class='name expandable'>_fields</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>List of elements that the form is dealing with, to prevent having to\ndeal directly with making calls to the DOM.</p>\n</div><div class='long'><p>List of elements that the form is dealing with, to prevent having to\ndeal directly with making calls to the DOM.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-_failed' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-_failed' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-_failed' class='name expandable'>_failed</a>( <span class='pre'>values, invalid</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span><span class='private' >private</span></span></div><div class='description'><div class='short'>Callback function which will execute if the form fails to submit\nsuccessfully (e.g. ...</div><div class='long'><p>Callback function which will execute if the form fails to submit\nsuccessfully (e.g. failed the validation check).</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : Object<div class='sub-desc'><p>An object where keys correspond to input names, and values\n     correspond to the values they are storing.</p>\n</div></li><li><span class='pre'>invalid</span> : Object<div class='sub-desc'><p>An object of invalid fields where keys correspond to input\n     names, and values correspond to the values they are storing.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-_reset' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-_reset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-_reset' class='name expandable'>_reset</a>( <span class='pre'></span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span><span class='private' >private</span></span></div><div class='description'><div class='short'>Callback function which will execute if the reset event is received. ...</div><div class='long'><p>Callback function which will execute if the reset event is received.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-_submit' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-_submit' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-_submit' class='name expandable'>_submit</a>( <span class='pre'>values</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span><span class='private' >private</span></span></div><div class='description'><div class='short'>Callback function which will execute if the form submits\nsuccessfully. ...</div><div class='long'><p>Callback function which will execute if the form submits\nsuccessfully.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : Object<div class='sub-desc'><p>An object where keys correspond to input names, and values\n     correspond to the values they are storing.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-addField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-addField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-addField' class='name expandable'>addField</a>( <span class='pre'>name, [config]</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Adds a new field to the form, if the name does not already exist,\nusing the name provided. ...</div><div class='long'><p>Adds a new field to the form, if the name does not already exist,\nusing the name provided.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>The name which will be used to refer to the generated field.</p>\n</div></li><li><span class='pre'>config</span> : Object (optional)<div class='sub-desc'><p>The configuration options which will be used to generate and\n     style the created field.</p>\n<ul><li><span class='pre'>type</span> : String (optional)<div class='sub-desc'><p>The type of field which should be created:\n     - <strong>input</strong> <em>default</em>: standard input field without\n         any special attributes or constraints.\n     - <strong>checkbox</strong>: A set of checkboxes will be created.  Each value\n         should be designated with label-value pairs stored in an\n         array (see below).\n     - <strong>dropdown</strong>: A dropdown control will be created.  Each value\n         should be designated with label-value pairs stored in an\n         array (see below).\n     - <strong>textarea</strong>: A standard multi-line text field.\n     - <strong>hidden</strong>: An abstract field which is not rendered to the\n         page, but in all other ways behaves like a standard <em>input</em>\n         field.</p>\n</div></li><li><span class='pre'>values</span> : Object[] (optional)<div class='sub-desc'><p>A list of text-value pairs.</p>\n<ul><li><span class='pre'>label</span> : String (optional)<div class='sub-desc'><p>The label to display in place of the value.  If this is omitted,\n     and a value is provided, then this will default to the value.</p>\n</div></li><li><span class='pre'>value</span> : String (optional)<div class='sub-desc'><p>The value for this particular option.  If this is omitted, and\n     a label is provided, then this will default to the label.</p>\n</div></li></ul></div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-export' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-export' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-export' class='name expandable'>export</a>( <span class='pre'>[fn], [data]</span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Exports the jspyder.dom element. ...</div><div class='long'><p>Exports the <a href=\"#!/api/jspyder.dom\" rel=\"jspyder.dom\" class=\"docClass\">jspyder.dom</a> element.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function (optional)<div class='sub-desc'><p>Optional callback function to execute, using the form js.dom\n     element as the context and the js.form object as the first\n     parameter.</p>\n</div></li><li><span class='pre'>data</span> : Mixed (optional)<div class='sub-desc'><p>Optional parameter to pass in as a second parameter for [fn].</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>js.dom object.</p>\n</div></li></ul></div></div></div><div id='method-reset' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-reset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-reset' class='name expandable'>reset</a>( <span class='pre'>[fn]</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Triggers a manual form reset. ...</div><div class='long'><p>Triggers a manual form reset.  This will turn all of the form fields\nback to their initial values on creation.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function (optional)<div class='sub-desc'><p>Optional callback to execute after the reset has been completed.\n     See <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a> constructor for expected parameters.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-submit' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-submit' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-submit' class='name expandable'>submit</a>( <span class='pre'>[onSuccess], [onFail]</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Triggers a manual form submission. ...</div><div class='long'><p>Triggers a manual form submission.  If the form fails validation, or\nany other errors occur, then the failed callback is executed.<br/>\nOtherwise, the success function is executed.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>onSuccess</span> : Function (optional)<div class='sub-desc'><p>Overrides the success function provided in the configuration on\n     construction.  See <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a> constructor for expected\n     parameters.</p>\n</div></li><li><span class='pre'>onFail</span> : Function (optional)<div class='sub-desc'><p>Overrides the failure function provided in the configuration on\n     construction.  See <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a> constructor for expected\n     parameters.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-validate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.form'>jspyder.form</span><br/><a href='source/js-forms.html#jspyder-form-method-validate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.form-method-validate' class='name expandable'>validate</a>( <span class='pre'>[fn]</span> ) : <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Triggers a manual form reset. ...</div><div class='long'><p>Triggers a manual form reset.  This will turn all of the form fields\nback to their initial values on creation.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function (optional)<div class='sub-desc'><p>Optional callback to execute after the validation has been\n     completed.  See <a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a> constructor for expected\n     parameters.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.form\" rel=\"jspyder.form\" class=\"docClass\">jspyder.form</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});