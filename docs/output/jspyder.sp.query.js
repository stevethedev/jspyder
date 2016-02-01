Ext.data.JsonP.jspyder_sp_query({"tagname":"class","name":"jspyder.sp.query","autodetected":{},"files":[{"filename":"js-sp.js","href":"js-sp.html#jspyder-sp-query"}],"extends":"jspyder.sp","members":[{"name":"_list","tagname":"property","owner":"jspyder.sp.query","id":"property-_list","meta":{"private":true}},{"name":"_rows","tagname":"property","owner":"jspyder.sp.query","id":"property-_rows","meta":{"private":true}},{"name":"__parseRows","tagname":"method","owner":"jspyder.sp.query","id":"method-__parseRows","meta":{"chainable":true,"private":true}},{"name":"clone","tagname":"method","owner":"jspyder.sp.query","id":"method-clone","meta":{}},{"name":"data","tagname":"method","owner":"jspyder.sp.query","id":"method-data","meta":{"chainable":true}},{"name":"filter","tagname":"method","owner":"jspyder.sp.query","id":"method-filter","meta":{"chainable":true}},{"name":"filters","tagname":"method","owner":"jspyder.sp.query","id":"method-filters","meta":{"chainable":true}},{"name":"reset","tagname":"method","owner":"jspyder.sp.query","id":"method-reset","meta":{"chainable":true}},{"name":"sum","tagname":"method","owner":"jspyder.sp.query","id":"method-sum","meta":{"chainable":true}}],"alternateClassNames":[],"aliases":{},"id":"class-jspyder.sp.query","short_doc":"This class should not generally be directly created in scripts. ...","component":false,"superclasses":["jspyder.sp"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/jspyder.sp' rel='jspyder.sp' class='docClass'>jspyder.sp</a><div class='subclass '><strong>jspyder.sp.query</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/js-sp.html#jspyder-sp-query' target='_blank'>js-sp.js</a></div></pre><div class='doc-contents'><hr />\n\n<p>This class should not generally be directly created in scripts. Instead,\nit should be either created by a call to <a href=\"#!/api/jspyder.sp.list-method-query\" rel=\"jspyder.sp.list-method-query\" class=\"docClass\">jspyder.sp.list.query</a>() or a\ncall to <a href=\"#!/api/jspyder.sp.query-method-clone\" rel=\"jspyder.sp.query-method-clone\" class=\"docClass\">jspyder.sp.query.clone</a> in order to ensure that it was properly\nconfigured at creation and before use.</p>\n\n<hr />\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_list' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.sp.query'>jspyder.sp.query</span><br/><a href='source/js-sp.html#jspyder-sp-query-property-_list' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.sp.query-property-_list' class='name expandable'>_list</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Overwritten at creation.</p>\n</div><div class='long'><p>Overwritten at creation.</p>\n</div></div></div><div id='property-_rows' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.sp.query'>jspyder.sp.query</span><br/><a href='source/js-sp.html#jspyder-sp-query-property-_rows' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.sp.query-property-_rows' class='name expandable'>_rows</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Overwritten at creation and reset.</p>\n</div><div class='long'><p>Overwritten at creation and reset.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-__parseRows' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.sp.query'>jspyder.sp.query</span><br/><a href='source/js-sp.html#jspyder-sp-query-method-__parseRows' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.sp.query-method-__parseRows' class='name expandable'>__parseRows</a>( <span class='pre'>value, id, _rows, filterData</span> ) : <a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a><span class=\"signature\"><span class='chainable' >chainable</span><span class='private' >private</span></span></div><div class='description'><div class='short'>Separated from jspyder.sp.query.filter for memory efficiency. ...</div><div class='long'><hr />\n\n<p>Separated from <a href=\"#!/api/jspyder.sp.query-method-filter\" rel=\"jspyder.sp.query-method-filter\" class=\"docClass\">jspyder.sp.query.filter</a> for memory efficiency.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'><p>Row from this._rows</p>\n</div></li><li><span class='pre'>id</span> : Number<div class='sub-desc'><p>Row index from row</p>\n</div></li><li><span class='pre'>_rows</span> : Array<div class='sub-desc'><p>this._rows</p>\n</div></li><li><span class='pre'>filterData</span> : Object<div class='sub-desc'><p>Collection of filters.  See <a href=\"#!/api/jspyder.sp.query-method-filter\" rel=\"jspyder.sp.query-method-filter\" class=\"docClass\">jspyder.sp.query.filter</a></p>\n\n<hr />\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-clone' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.sp.query'>jspyder.sp.query</span><br/><a href='source/js-sp.html#jspyder-sp-query-method-clone' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.sp.query-method-clone' class='name expandable'>clone</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Creates a copy of the jspyder.sp.query object; pointing to the same\njspyder.sp.list object, but with its own context ...</div><div class='long'><hr />\n\n<p>Creates a copy of the <a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a> object; pointing to the same\n<a href=\"#!/api/jspyder.sp.list\" rel=\"jspyder.sp.list\" class=\"docClass\">jspyder.sp.list</a> object, but with its own context of data copied from\nthe current cache.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p><a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a> object clone.</p>\n\n<hr />\n</div></li></ul></div></div></div><div id='method-data' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.sp.query'>jspyder.sp.query</span><br/><a href='source/js-sp.html#jspyder-sp-query-method-data' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.sp.query-method-data' class='name expandable'>data</a>( <span class='pre'>fn</span> ) : <a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Retrieves all stored data, and runs the function defined by [fn]\nwith the context [this] and the parameter pointing t...</div><div class='long'><hr />\n\n<p>Retrieves all stored data, and runs the function defined by [fn]\nwith the context [this] and the parameter pointing to a copy of the\ndata set.  Note that any changes to the array will mark the row for\nchange in the owning list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>Function to execute, with the context of the <a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a>\n     object, and the first argument being the stored row references\n     as an array.</p>\n\n<hr />\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-filter' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.sp.query'>jspyder.sp.query</span><br/><a href='source/js-sp.html#jspyder-sp-query-method-filter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.sp.query-method-filter' class='name expandable'>filter</a>( <span class='pre'>filterData</span> ) : <a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Applies a single filter against the data stored in the cache. ...</div><div class='long'><hr />\n\n<p>Applies a single filter against the data stored in the cache.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>filterData</span> : Object<div class='sub-desc'><p>A filter definition, with the following property set:\n      - column: Required.  Name of the column being filtered.\n      - geq:  \"Field value >= this.geq\"       (3 >= 3)\n      - leq:  \"Field value &lt;= this.leq\"       (3 &lt;= 3)\n      - gt:   \"Field value > this.gt\"         (3 > 2)\n      - lt:   \"Field value &lt; this.lt\"         (3 &lt; 4)\n      - eq:   \"Field value == this.eq\"        (3 == \"3\")\n      - seq:  \"Field value === this.seq\"      (3 === 3)\n      - neq:  \"Field value != this.neq\"       (3 != 4)\n      - snq:  \"Field value !== this.snq\"      (3 !== \"3\")\n      - test: \"Field value matches this.test\" (/^3/.test(3000))</p>\n\n<hr />\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-filters' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.sp.query'>jspyder.sp.query</span><br/><a href='source/js-sp.html#jspyder-sp-query-method-filters' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.sp.query-method-filters' class='name expandable'>filters</a>( <span class='pre'>filterArray</span> ) : <a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Applies a set of filters against the data stored in the cache. ...</div><div class='long'><hr />\n\n<p>Applies a set of filters against the data stored in the cache. Due\nto the nature of the filtering algorithm, this is the more efficient\nof the two methods, as it requires fewer passes to apply multiple\nfilters.  (See: <a href=\"#!/api/jspyder.sp.query-method-filter\" rel=\"jspyder.sp.query-method-filter\" class=\"docClass\">jspyder.sp.query.filter</a>)</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>filterArray</span> : Array<div class='sub-desc'><p>Array of filter collections</p>\n\n<hr />\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-reset' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.sp.query'>jspyder.sp.query</span><br/><a href='source/js-sp.html#jspyder-sp-query-method-reset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.sp.query-method-reset' class='name expandable'>reset</a>( <span class='pre'></span> ) : <a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Resets the query object to include all of the available rows in the\nassociated list's cache. ...</div><div class='long'><hr />\n\n<p>Resets the query object to include all of the available rows in the\nassociated list's cache.</p>\n\n<hr />\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-sum' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='jspyder.sp.query'>jspyder.sp.query</span><br/><a href='source/js-sp.html#jspyder-sp-query-method-sum' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jspyder.sp.query-method-sum' class='name expandable'>sum</a>( <span class='pre'>columns, fn</span> ) : <a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Retrieves the sum of all of the stored data, if it is numerical. ...</div><div class='long'><hr />\n\n<p>Retrieves the sum of all of the stored data, if it is numerical.\nIt not numerical, then makes no change to the default value\nprovided.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>columns</span> : Object<div class='sub-desc'><p>Object using column names (See: <a href=\"#!/api/jspyder.sp.list\" rel=\"jspyder.sp.list\" class=\"docClass\">jspyder.sp.list</a>) as the keys.\n     Values are pushed into the object, and then [fn] is executed,\n     with the context of the <a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a> object, and the\n     [columns] object as the first argument.</p>\n</div></li><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>A callback function, using the <a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a> object as the\n     context, and the columns object as the first argument.</p>\n\n<hr />\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/jspyder.sp.query\" rel=\"jspyder.sp.query\" class=\"docClass\">jspyder.sp.query</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});