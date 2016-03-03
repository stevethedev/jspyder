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
 
js.extend.fn("sp", function () {
    /** @ignore */
    var js = window.jspyder;
    
    /** ***********************************************************************
     * @class jspyder.sp
     * @member jspyder
     * 
     * # Managed Objects:
     * ## JSpyder SharePoint List Reference (jspyder.sp.list)
     * ## JSpyder SharePoint Query Reference (jspyder.sp.query)
     * ***********************************************************************/
    function sp() {};
    
    /** ***********************************************************************
     * @class jspyder.sp.list
     * @extends jspyder.sp
     * 
     * @param {Object} config
     *      A configuration object for the initial setup of the SP list 
     *      reference. Though a valid object will return if this parameter
     *      is not included, it will not point anywhere and trying to use it
     *      may throw errors.
     * 
     * @param {String} [config.url]
     *      The site collection the sharepoint list belongs to.
     * 
     * @param {String} [config.name]
     *      The name of the sharepoint list to connect to.
     * 
     * @param {Function} [config.success]
     *      The default function to fire when a [sp.list.pull]{#sp.list.pull}
     *      command completes successfully.
     * 
     * @param {Function} [config.failure]
     *      The default function to fire when a [sp.list.pull]{#sp.list.pull}
     *      command fails.
     * 
     * @param {String} [config.caml]
     *      The CAML configuration to use when initializing the sharepoint
     *      list reference.
     * 
     * @return {Object} 
     *      A JSpyder SharePoint List Reference Object ([sp.list]{#sp.list})
     * ***********************************************************************/
    sp.list =  function spList(config, fn) {
         
        if (!window.SP) {
            js.log.warn(
                "Ensure that MicrosoftAjax.js, sp.runtime.js, and sp.js " +
                "have been loaded before using JSpyder SharePoint Interface");
        }

        var list = Object.create(sp.list.fn);

        if (config) {
            if (config.url) {
                list._url = config.url;
            }
            if (config.name) {
                list._name = config.name;
            }
            if (typeof config.success === "function") {
                list._success = config.success;
            }
            if (typeof config.failure === "function") {
                list._failure = config.failure;
            }
            if (config.caml) {
                list._caml = config.caml;
            }
        }
        
        list._columns = {};
        list._rows = [];
        list._dirtyRows = [];
        
        js.alg.use(list, fn);

        return list;
    }

    var __rowLimit = 10000;
    var __caml = "<View><Query><Where><Geq><FieldRef Name='ID' />"
        + "<Value Type='Number'>1</Value></Geq></Where></Query>"
        + "<RowLimit>" + __rowLimit + "</RowLimit></View>"

    sp.list.fn = {
        // private:
        _url: "",
        _name: "",
        _success: function () { },
        _failure: function () { },
        _caml: __caml,
        _columns: {},
        _rows: [],
        _dirtyRows: [],
        get length() {
            return this._rows.length;
        },
        
        /** *******************************************************************
         * Adds a single column to the SP List proxy
         * 
         * @param {String} name
         *      The way this column will be referred to in javascript
         * 
         * @param {Object} data
         *      The template overrides for the sharepoint list column 
         *      reference. The fields included will overwrite all default
         *      values except "name" or "list", as they are read-only 
         *      attributes pointing back to the defined name and list object, 
         *      respectively.   
         * 
         *          @param {String} [data.internal] 
         *              Name of the sharepoint field, to SharePoint.  If the
         *              list reference is expected to fill a value with data
         *              from the server, then this field must accurately reflect
         *              the actual name.
         * 
         *          @param {String} [data.text]     
         *              Name of the sharepoint field, to the user.  This will be
         *              the human-readable name, which can include spaces and
         *              punctuation.
         * 
         *          @param {String} [data.type]     
         *              SharePoint field data type, in all lower-case string.
         * 
         *          @param {String} [data.default]  
         *              Default value, if none can be found on a query.
         * 
         *          @param {Function} [data.macro]  
         *              Defines a custom value lookup.  This will override (and
         *              not consider) any values found if a data.internal parameter
         *              is provided.
         * *******************************************************************/
        addColumn: function(name, data) {
            var column = Object.create(sp.column.fn, {
                list: { value: this },
                name: { value: name }
            });
            
            js.alg.mergeObj(column, data);
            
            this._columns[name] = column;
            
            return this;
        },
        /** *******************************************************************
         * Adds a group of columns to the SP List proxy, via this.addColumn,
         * where keys correspond to the [name] parameter, and values correspond
         * to the [data] parameter.
         * 
         * @param {Object} dataObj
         * *******************************************************************/
        addColumns: function(dataObj) {
            js.alg.each(dataObj, function(data, name, dataObj, list) {
                list.addColumn(name, data);
            }, this);
            return this;
        },
        
        /** *******************************************************************
         * Gets the column template by name, as identified in js.sp.list.addColumn
         * 
         * @param {String} name
         *      The name of the field to retrieve the template for. Note that
         *      any changes to the template will change the template for all
         *      of the derived values within the table.
         * *******************************************************************/
        getColumn: function(name) {
            return (this._columns[name]
                ? this._columns[name] 
                : Object.create(sp.column.fn, {
                    list: { value: this },
                    name: { value: name }}));
        },
        
        /** *******************************************************************
         * Gets the row number from the cache of stored values.  Note that this
         * number does not necessarily correspond to the row ID within 
         * SharePoint.
         * 
         * @param {Number} n
         *      The row number to retrieve from the cache.
         * *******************************************************************/
        getRow: function(n) {
            return this._rows[js.alg.number(n, 0)] || null;
        },
        
        /**
         * 
         */
        getRowById: function(id) {
            var found = null,
                row = null,
                i = 0;
        
            while(row = this.getRow(i++)) {
                if(row["ID"]["value"] === id) {
                    found = row;
                    break;
                }
                
            }
            
            return found;
        },
        
        /**
         * Gets the dirty rows
         */
        eachDirtyRow: function(fn, data) {
            var list = this,
                dirty = this._dirtyRows;
                
            if(typeof fn === "function") {
                js.alg.each(dirty, fn, data);
            }
            
            return this;
        },
        
        _createListItem: function() {
            
        },
        
        /** *******************************************************************
         * Retrieves the number of rows within the cache.
         * 
         * @return {Number}
         * *******************************************************************/
        getRowCount: function(n) {
            return this._rows.length;
        },
        
        /** *******************************************************************
         * Executes an asynchronous read-query from the server to pull in 
         * fresh data. It is important to note, when using this function, that
         * any subsequent or chained functions will likely execute before this
         * query has returned.
         * 
         * @param {Function} [success]
         *      The function to execute after data has been loaded into the
         *      jsSPList object, iif the query was successful.  This function
         *      will be executed instead of the success function identified
         *      in the constructor.
         * 
         * @param {Function} [failure]
         *      The function to execute if the data query failed, accepting
         *      [sender, args] as the parameters.  This function will be 
         *      executed instead of the failure function identified in the
         *      constructor.
         * *******************************************************************/
        pull: function (success, failure) {
            var ctx = new window.SP.ClientContext(this._url),
                list = ctx.get_web().get_lists().getByTitle(this._name),
                caml = new window.SP.CamlQuery(),
                successFn = (typeof success === "function"
                    ? success
                    : this._success),
                failureFn = (typeof failure === "function"
                    ? failure
                    : this._failure);

            caml.set_viewXml(this.caml);
            var listItems = list.getItems(caml);

            ctx.load(listItems);
            ctx.executeQueryAsync(
                js.alg.bindFn(this, __successParse, [listItems, successFn]),
                js.alg.bindFn(this, __failureParse, [listItems, failureFn]));
            return this;
        },
        
        /** *******************************************************************
         * Creates a new query object. This function is synchronous, and 
         * executes data currently residing in the cache.
         * 
         * @param {Array} criteria
         *      A list of criteria to run against the list reference's cache.
         *      Expected as an array of query objects.  See jspyder.sp.query.filter
         * 
         * @return {Object}
         *      [Query Reference]{#sp.query}
         * *******************************************************************/
        query: function (criteria) {
            var query = sp.query(this).reset();
            return (criteria instanceof Array
                ? query.filters(criteria)
                : query.filter(criteria));
        },

        /** *******************************************************************
         * Clears all cached data within the list reference.  This is function
         * is automatically called when pulling data from the SharePoint List,
         * and should not be necessary for most implementations.
         * *******************************************************************/
        clearData: function () {
            this._rows = [];
            // this._dirtyRows = [];
            while(this._dirtyRows.pop()) {
                // nothing
            }
            js.alg.each(this._columns, function (colData) {
                colData.rowIDs = {}; //< stores RowID:[Value,Value,Value]
                colData.values = {}; //< stores Value:[RowID,RowID,RowID] 
            });
            return this;
        },
        
        /** *******************************************************************
         * Pushes changed data to the server.
         * 
         * !TODO: Implement the logic for this:
         *  1: Loop through all rows
         *  2: Loop through all columns
         *  3: Find relevant changes
         *  4: Stash them in ClientContext
         *  5: Push
         * 
         * Alternatively, I could cache the changed values when I mark them as
         * "dirty". 
         * *******************************************************************/
        push: function(success, failure) {
            var ctx = new window.SP.ClientContext(this._url),
                list = ctx.get_web().get_lists().getByTitle(this._name),
                itemInfo = null,
                listItem = null,
                data = {
                    clientContext: ctx,
                    items: [],
                    list: list,
                    self: this
                };

            this.eachDirtyRow(this._pushLoopDirtyRows, data);

            ctx.executeQueryAsync(
                js.alg.bindFn(this, __successPush, [data.items, success]),
                js.alg.bindFn(this, __failurePush, [data.items, failure]));
                
            return this;
        },
        _pushLoopDirtyRows: function(row, i, rows, data) {
            var rowID = row.ID.value,
                itemInfo = null,
                listItem = null;
            
            if(row.ID.value < 0) {
                itemInfo = new SP.ListItemCreationInformation();
                listItem = data.list.addItem(itemInfo);
                data.newrow = true;
            }
            else {
                listItem = data.list.getItemById(rowID);
                data.newrow = false;
            }
            
            // set all list item values
            data.listItem = listItem;
            js.alg.each(row, data.self._pushLoopDirtyRowColumns, data);
            // ----
            
            data.items.push(listItem);
            
            // cache data for update
            listItem.update();
            data.clientContext.load(listItem);
        },
        _pushLoopDirtyRowColumns: function(coldata, colname, columns, data) {
            if(coldata.internal && coldata.dirty && (coldata.internal !== "ID")) {
                data.listItem.set_item(coldata.internal, coldata.value);
            }
            return;
        },
        
        updateRow: function(id, values) {
            var row = this.getRowById(id),
                data = js.alg.mergeObj({}, values);
                
                if(row) {
                    js.alg.each(row, this._updateRowEach, data);
                }
            
            return this;
        },
        _updateRowEach: function (colData, colName, row, data) {
            var row = data.row,
                value = data[colData.name],
                valDefined = (typeof value !== "undefined"),
                valDifferent = (value !== colData.value);  
            
            if (valDefined && valDifferent) {
                colData.value = value;
            }
            
            return;
        },
        createRow: function(values) {
            var columns = this._columns,
                data = {
                    row: {},
                    rowID: -1,
                    values: js.alg.mergeObj({}, values)
                };
            
            js.alg.each(columns, this._createRowEach, data);
            data.row.ID.value = data.rowID;
            this._dirtyRows.push(data.row);
            
            return this;
        },
        _createRowEach: function (colData, colName, column, data) {
            var row = data.row,
                value = data.values[colData.name],
                cell = Object.create(colData, {
                    rowID: { value: data.rowID },
                    dirty: { get: function() { return colValue !== null; } },
                    value: {
                        get: function () {
                            return (typeof this.macro === "function"
                                ? this.macro(row)
                                : colValue);
                        },
                        set: function (v) {
                            if (colData.internal) {
                                colValue = v;
                            }
                        }
                    }
                }),
                colValue = (typeof value !== "undefined" ? value : colData.default || null);
            
            row[colData.name] = cell;
        }
    };

    /**
     * @private
     * Called after a successful data push
     */
    function __successPush(listItems, successFn, sender, args) {
        // console.log("Successfully pushed " + listItems.length + " items!");
        js.alg.use(this, successFn, [sender, args, listItems]);
        while(this._dirtyRows.pop()) { /* nothing */ }
        this.pull();
        return;
    }
    
    /**
     * @private
     * Called after an unsuccessful data push
     */
    function __failurePush(listItems, failureFn, sender, args) {
        // console.log("Failed to push " + listItems.length + " items!");
        js.alg.use(this, failureFn, [sender, args, listItems]);
        return;
    }

    /** ***********************************************************************
     * @private
     * Called after a successful query; loads data into the list reference.
     * 
     * @param {Object} listItems
     *      SharePoint List Items collectionbeing processed
     * 
     * @param {Function} successFn
     *      Function to run after SP List has completed
     * 
     * @param {Object} sender
     *      Pushed in by SharePoint
     * 
     * @param {Object} args
     *      Pushed in by SharePoint  
     * ***********************************************************************/
    function __successParse(listItems, successFn, sender, args) {
        var itemEnumerator = listItems.getEnumerator(),
            jsEach = js.alg.each,
            columns = this._columns,
            currentItem = null,
            data = null,
            row = null;

        this.clearData();
        
        // move through each item
        while (itemEnumerator.moveNext()) {
            row = {};
            currentItem = itemEnumerator.get_current();
            // grab each of our stored items
            data = { item: currentItem, id: currentItem.get_id(), _row: row };
            jsEach(columns, __pushRow, data);
            this._rows.push(row);
        }

        successFn(sender, args);
    }
    
    /** ***********************************************************************
     * @private
     * Called in a loop to push data into the SP List Reference. This function 
     * is defined outside of the loop for efficiency.
     * 
     * @param {Object} colData
     *      Individual column template (based on sp.column.fn)
     * 
     * @param {String} colName
     *      Column's internal reference ID, defined in constructor
     * 
     * @param {Object} columns
     *      Collection of js column references
     * 
     * @param {Object} data
     *      Collection of relevant loop data, pushed in my js.alg.each.
     *      Includes data.item (sharepoint row reference), data.id (value of
     *      associated row ID in sharepoint), and data._row (reference to
     *      list reference's row getting pushed into the stack).  
     * ***********************************************************************/
    function __pushRow(colData, colName, columns, data) {
        var rowID = data.id,
            row = data._row,
            dirty = false,
            cell = Object.create(colData, {
                rowID: { value: rowID },
                dirty: { get: function() { return dirty; } },
                value: {
                    get: function () {
                        return (typeof this.macro === "function"
                            ? this.macro(row)
                            : colValue);
                    },
                    set: function (v) {
                        if (colData.internal) {
                            colValue = v;
                            dirty = true;
                            if(colData.list._dirtyRows.indexOf(row) < 0) {
                                colData.list._dirtyRows.push(row);
                            }
                        }
                    }
                }
            }),
            colValue = colData.default;

        if (colData.internal) {
            try {
                colValue = data.item.get_item(colData.internal);
            
                // eventually, this will need to change to support multi-value fields.
                colData.rowIDs[rowID] = colValue;

                if (!colData.values[colValue]) {
                    colData.values[colValue] = [];
                }
                colData.values[colValue].push(rowID);
            }
            catch(e) {
                js.log.warn("Could not load data from column name " + colData.internal);
            }
        }
        
        colValue = __parseValueType(colData, colValue);
        
        row[colData.name] = cell;

        return;
    }
    
    /**
     * Parses the colData variable for the value type, and then ensures that
     * value meets those requirements.  If it does not meet the requirements,
     * then it is either converted to the correct data type, or it is set to
     * the default value.
     * 
     * @param {Object} colData
     *      Column template (based on sp.column.fn)
     * 
     * @param {Mixed} value
     *      The value to test and/or convert.
     */
    function __parseValueType(colData, value) {
        switch(colData.type) {
            case "bitflag":
            case "number" :
                value = js.alg.number(value);
                break;
            case "string" :
            case "text" :
                value = js.alg.string(value);
                break;
            default:
                break;
        }
        return value;
    }

    /** ***********************************************************************
     * @private
     * Called after a failed query; loads data into the list reference.
     * 
     * @param {Object} listItems
     *      SharePoint List Items collectionbeing processed
     * 
     * @param {Function} failureFn
     *      Function to run after SP List has completed
     * 
     * @param {Object} sender
     *      Pushed in by SharePoint
     * 
     * @param {Object} args
     *      Pushed in by SharePoint  
     * ***********************************************************************/
    function __failureParse(listItems, failureFn, sender, args) {
        failureFn(sender, args);
    }


    /** ***********************************************************************
     * @class jspyder.sp.query
     * @extends jspyder.sp
     * 
     * This class should not generally be directly created in scripts. Instead,
     * it should be either created by a call to jspyder.sp.list.query() or a 
     * call to jspyder.sp.query.clone in order to ensure that it was properly 
     * configured at creation and before use.
     * ***********************************************************************/
    sp.query = function(list) {
        return Object.create(sp.query.fn, { _list: { value: list } });
    };
    
    sp.query.fn = {
        /** @private Overwritten at creation. */
        _list: null,
        /** @private Overwritten at creation and reset. */
        _rows: null,
        
        get length() {
            return this._rows.length;
        },
        
        row: function(n) {
            return this._rows[js.alg.number(n)];
        },
        
        /** *******************************************************************
         * Resets the query object to include all of the available rows in the
         * associated list's cache.
         * *******************************************************************/
        reset: function() {
            this._rows = this._list._rows.slice(0);
            return this;
        },
        
        /** *******************************************************************
         * Applies a single filter against the data stored in the cache.
         *
         * @param {Object} filterData
         *      A filter definition, with the following property set:
         *       - column: Required.  Name of the column being filtered.
         *       - geq:  "Field value >= this.geq"       (3 >= 3)
         *       - leq:  "Field value <= this.leq"       (3 <= 3)
         *       - gt:   "Field value > this.gt"         (3 > 2)
         *       - lt:   "Field value < this.lt"         (3 < 4)
         *       - eq:   "Field value == this.eq"        (3 == "3")
         *       - seq:  "Field value === this.seq"      (3 === 3)
         *       - neq:  "Field value != this.neq"       (3 != 4)
         *       - snq:  "Field value !== this.snq"      (3 !== "3")
         *       - test: "Field value matches this.test" (/^3/.test(3000))
         * *******************************************************************/
        filter: function(filterData) {
            if(filterData) {
                js.alg.arrEach(this._rows, __parseRows, [filterData]);
            }
            return this;
        },
        
        /** *******************************************************************
         * Applies a set of filters against the data stored in the cache. Due
         * to the nature of the filtering algorithm, this is the more efficient
         * of the two methods, as it requires fewer passes to apply multiple
         * filters.  (See: jspyder.sp.query.filter)
         *
         * @param {Array} filterArray
         *      Array of filter collections
         * *******************************************************************/
        filters: function(filterArray) {
            js.alg.arrEach(this._rows, __parseRows, filterArray);
            return this;
        },
        
        _cleanRows: function() {
            this._rows.sort();
            var index = this._rows.indexOf(null);
            if(index > -1) {
                this._rows.splice(index);
            }
            return this;
        },
        
        /** *******************************************************************
         * Retrieves all stored data, and runs the function defined by [fn]
         * with the context [this] and the parameter pointing to a copy of the
         * data set.  Note that any changes to the array will mark the row for
         * change in the owning list.  
         *
         * @param {Function} fn
         *      Function to execute, with the context of the jspyder.sp.query
         *      object, and the first argument being the stored row references
         *      as an array.
         * *******************************************************************/
        data: function(fn) {
            js.alg.use(this, fn, [this._rows]);
            return this;
        },
        
        /**
         * Sorts the rows in this query based on values, based on user-defined
         * criteria.
         * 
         * @param {String} field
         *      Field name to sort by
         * @param {Boolean} asc
         *      TRUE in order to sort ascending, FALSE in order to sort 
         *      descending.
         */
        sort: function (field, asc) {
            js.alg.sortArrayObj(this._rows, asc, field, "value");
            return this;
        },
        
        each: function(fn) {
            js.alg.arrEach(this._rows, fn, this);
            return this;
        },
        
        /** *******************************************************************
         * Retrieves the sum of all of the stored data, if it is numerical.
         * It not numerical, then makes no change to the default value 
         * provided.
         *
         * @param {Object} columns
         *      Object using column names (See: jspyder.sp.list) as the keys.
         *      Values are pushed into the object, and then [fn] is executed,
         *      with the context of the jspyder.sp.query object, and the 
         *      [columns] object as the first argument.
         * 
         * @param {Function} fn
         *      A callback function, using the jspyder.sp.query object as the
         *      context, and the columns object as the first argument.
         * *******************************************************************/
        sum: function(columns, fn) {
            this.data(function(rows) {
                // initialize default values...
                js.alg.each(columns, sp.query.fn._sum)
                    .alg.each(rows, sp.query.fn._sumRows, columns)
                    .alg.use(this, fn, [columns]);
            });
            
            return this;
        },
        
        _sum: function(column, key, columns) {
            columns[key] = column.value || column.default;
        },
                
        _sumRows: function (row, _, rows, columns) {
            js.alg.each(row, sp.query.fn._sumColumns, columns);
        },
        
        _sumColumns: function (value, colName, _, out) {
            switch(value.type) {
                case "number":
                    out[colName] = js.alg.number(out[colName]) + js.alg.number(value.value);
                    break;
                    
                case "string":
                case "bitflag":
                default: 
                    out[colName] = value.value;
                    break;
            }
        },
        
        /**
         * Copies all of the values from the rows in the query into the object 
         * provided.
         */
        getValues: function (columns, fn) {
            // initializes [columns] variable
            js.alg.each(columns, function(v, k, columns) {
                columns[k] = {};
            });
            // iterates the rows
            this.each(function(row) {
                js.alg.each(columns, __copyColumn, row);
            });
            function __copyColumn(arr, key, columns, row) {
                arr[row[key].value] = true;
            }
            // sort the results
            js.alg.each(columns, function(obj, k, columns) {
                columns[k] = Object.keys(obj).sort();
            });
            
            js.alg.use(this, fn, [columns]);
            
            return this;
        },
        
        /** *******************************************************************
         * Creates a copy of the jspyder.sp.query object; pointing to the same
         * jspyder.sp.list object, but with its own context of data copied from
         * the current cache.
         * 
         * @return {Object} jspyder.sp.query object clone.
         * *******************************************************************/
        clone: function() {
            var clone = sp.query(this._list);
            clone._rows = this._rows.slice(0);
            return clone;
        }
    };

    /** *******************************************************************
     * @private
     * Separated from jspyder.sp.query.filter for memory efficiency.
     * 
     * @param {Object} value
     *      Row from this._rows
     * 
     * @param {Number} id
     *      Row index from row
     * 
     * @param {Array} _rows
     *      this._rows
     * 
     * @param {Object} filterData
     *      Collection of filters.  See jspyder.sp.query.filter
     * *******************************************************************/
    function __parseRows(row, id, _rows, filterData) {
        if(!row || !filterData || !filterData.length) { // catch null values
            return;
        }
        
        var f, filter, drop, value, orDrop;
        
        drop = false;
        
        for(f = 0; (!drop) && (f < filterData.length); f++) {
            filter = filterData[f];
            // make sure we have a column identified.
            if(!filter) { continue; } 
            if(!filter.column) { continue; }
            if(typeof row[filter.column] === "undefined") { continue; }
            
            value = row[filter.column].value;
            orDrop = true;
            
            if(!drop && (typeof filter.gt  !== "undefined")) {
                if(filter.gt && typeof filter.gt === "object") {
                    js.alg.each(filter.gt, function(or) {
                        orDrop = orDrop && !(value > or);
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                }
                else { drop = !(value > filter.gt ); } 
            } 
            if(!drop && (typeof filter.geq !== "undefined")) {
                if(filter.geq && typeof filter.geq === "object") {
                    js.alg.each(filter.geq, function(or) {
                        orDrop = orDrop && !(value >= or);
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                } 
                else { drop = !(value >= filter.geq); } 
            } 
            if(!drop && (typeof filter.leq !== "undefined")) {
                if(filter.leq && typeof filter.leq === "object") {
                    js.alg.each(filter.leq, function(or) {
                        orDrop = orDrop && !(value <= or);
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                } 
                else { drop = !(value <= filter.leq); } 
            } 
            if(!drop && (typeof filter.lt  !== "undefined")) {
                if(filter.lt && typeof filter.lt === "object") {
                    js.alg.each(filter.lt, function(or) {
                        orDrop = orDrop && !(value < or);
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                } 
                else { drop = !(value < filter.lt ); } 
            }
            if(!drop && (typeof filter.eq  !== "undefined")) {
                if(filter.eq && typeof filter.eq === "object") {
                    js.alg.each(filter.eq, function(or) {
                        orDrop = orDrop && !(value == or);
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                } 
                else { drop = !(value == filter.eq ); } 
            }
            if(!drop && (typeof filter.seq !== "undefined")) {
                if(filter.seq && typeof filter.seq === "object") {
                    js.alg.each(filter.seq, function(or) {
                        orDrop = orDrop && !(value === or);
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                } 
                else { drop = !(value === filter.seq); } 
            }
            if(!drop && (typeof filter.neq !== "undefined")) {
                if(filter.neq && typeof filter.neq === "object") {
                    js.alg.each(filter.neq, function(or) {
                        orDrop = orDrop && !(value != or);
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                } 
                else { drop = !(value != filter.neq); } 
            }
            if(!drop && (typeof filter.snq !== "undefined")) {
                if(filter.snq && typeof filter.snq === "object") {
                    js.alg.each(filter.snq, function(or) {
                        orDrop = orDrop && !(value !== or);
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                } 
                else { drop = !(value !== filter.snq); } 
            }
            // binary
            if(!drop && (typeof filter.and !== "undefined")) {
                if(filter.and && typeof filter.and === "object") {
                    js.alg.each(filter.and, function(or) {
                        orDrop = orDrop && !((value & or) === or);
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                }
                else { drop = !((value & filter.and) === filter.and); }
            }
            if(!drop && (typeof filter.not !== "undefined")) {
                if(filter.not && typeof filter.not === "object") {
                    js.alg.each(filter.not, function(or) {
                        orDrop = orDrop && !((value & or) !== or);
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                }
                else { drop = !((value & filter.not) !== filter.not); }
            }
            
            if(!drop && (typeof filter.test !== "undefined")) { 
                // prevent invalid regexp values from breaking our query
                if(filter.test instanceof RegExp) { 
                    drop = !(filter.test.test(value));
                }
                else if(filter.test && typeof filter.test === "object") {
                    js.alg.each(filter.test, function(or) {
                        orDrop = orDrop && !(or.test(value));
                        orDrop || this.stop();
                    });
                    drop = orDrop;
                }
            }
        }
        
        if(drop) {
            // _rows[id] = null;
            this.drop();
        }
        
        return this;
    }
    
    // used in sp list
    /**
     * @class jspyder.sp.column
     * @member jspyder.sp
     * 
     * Class definition
     */
    sp.column = function() {};
    sp.column.fn = {
        /**
         * @property
         * @member jspyder.sp.column
         * 
         * String which identifies how SharePoint recognizes the column.
         */
        internal: "",
        /**
         * @property
         * @member jspyder.sp.column
         * 
         * String which identifies how JSpyder should display the column name.
         */
        text: "",
        /**
         * @property
         * @member jspyder.sp.column
         * 
         * String which identifies the type of column this corresponds to.
         */
        type: "string",
        /**
         * @property {Mixed} default
         * @member jspyder.sp.column
         * 
         * Value which should be used in the absence of any other value.
         */
        default: "",
        /**
         * @property {Mixed} [value]
         * @member jspyder.sp.column
         * 
         * Value which is stored in a particular cell.  This is only available
         * after queries have been performed.
         */
        /**
         * @method
         * @member jspyder.sp.column
         * 
         * Retrieves the value stored in the cell, when columns are retrieved
         * during a query.
         */
        valueOf: function() { return this.value; }
    };

    return sp;
});

//! js-sp.js