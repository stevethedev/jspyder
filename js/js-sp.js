/* global SP */
// SP Interface
js.extend.fn("sp", function () {
    function sp() {};
    
    sp.list =  function spList(config, fn) {
        if (!window.SP) {
            js.log.warn(
                "Ensure that MicrosoftAjax.js, sp.runtime.js, and sp.js " +
                "have been loaded before using JSpyder SharePoint Interface");
        }

        var list = Object.create(sp.fn.list);

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
        js.alg.use(list, fn);

        return list;
    }

    var __rowLimit = 10000;
    var __caml = "<View><Query><Where><Geq><FieldRef Name='ID' />"
        + "<Value Type='Number'>1</Value></Geq></Where></Query>"
        + "<RowLimit>" + __rowLimit + "</RowLimit></View>"

    sp.fn = {};
    sp.fn.list = {
        // private:
        _url: "",
        _name: "",
        _success: function () { },
        _failure: function () { },
        _caml: __caml,
        _columns: {},
        _rows: [],
        
        // public:
        // adds a single column
        /**********************************************************************
         * Adds a single column to the SP List proxy
         * 
         * \param name {String}
         *      The way this column will be referred to in javascript
         * 
         * \param data {Object}
         *      The template overrides for the sharepoint list column 
         *      reference. The following fields can be used for overrides:
         * 
         *       - internal (name of the sharepoint field, to sharepoint)
         *       - text (name of the sharepoint field, to the user)
         *       - type (sharepoint field type)
         *       - default (default value, if none can be found on a query)
         *       - any user-defined custom fields
         * 
         *      However, the template will not be able to override the fields
         *      "name" or "list", as they are read-only attributes pointing
         *      back to the defined name and list object, respectively.   
         *********************************************************************/
        addColumn: function(name, data) {
            var column = Object.create(sp.fn.column, {
                list: { value: this },
                name: { value: name }
            });
            
            js.alg.mergeObj(column, data);
            
            this._columns[name] = column;
            
            return this;
        },
        /**********************************************************************
         * Adds a group of columns to the SP List proxy, via this.addColumn,
         * where keys correspond to the [name] parameter, and values correspond
         * to the [data] parameter.   
         *********************************************************************/
        addColumns: function(dataObj) {
            js.alg.each(dataObj, function(data, name, dataObj, list) {
                list.addColumn(name, data);
            }, this);
            return this;
        },
        getColumn: function(id) {
            return (this._columns[name]
                ? this._columns[name] 
                : Object.create(sp.fn.column, {
                    list: { value: this },
                    name: { value: name }}));
        },
        ///---------
        getRow: function(n) {
            return this._rows[n]; 
        },
        /**********************************************************************
         * Executes an asynchronous read-query from the server to pull in 
         * fresh data. It is important to note, when using this function, that
         * any subsequent or chained functions will likely execute before this
         * query has returned.
         * 
         * \param success {Function=this._success}
         *      The function to execute after data has been loaded into the
         *      jsSPList object, iif the query was successful.  This function
         *      will be executed instead of the success function identified
         *      in the constructor.
         * 
         * \param failure {Function=this._failure}
         *      The function to execute if the data query failed, accepting
         *      [sender, args] as the parameters.  This function will be 
         *      executed instead of the failure function identified in the
         *      constructor.
         *********************************************************************/
        pull: function (success, failure) {
            var ctx = new window.SP.ClientContext(this._url),
                list = ctx.get_web().getByTitle(this._name),
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
                js.alg.bindFn(this, __successParse, [ctx, listItems, successFn]),
                js.alg.bindFn(this, __failureParse, [ctx, listItems, failureFn]));
            return this;
        },
        
        /**********************************************************************
         * Creates a new query object. This function is synchronous, and 
         * executes data currently residing in the cache.
         * 
         * \param criteria {Array}
         *      A list of criteria to run against the jsSPList object's cache.
         *      Expected as an array of jsSPQueryCommand objects, with expected
         *      values being:
         * 
         *       - column (name of the column being filtered)
         *       - geq(>=)
         *       - leq(<=)
         *       - gt(>)
         *       - lt(<)
         *       - eq(==)
         *       - seq(===)
         *       - neq(!=)
         *       - snq(!==)
         *       - test(regular expression test)
         * 
         * \return {Object}
         *      Returns a reference to a jsSPQuery object   
         *********************************************************************/
        query: function (criteria) {
            var query = __makeQuery(this).reset();
            return (criteria instanceof Array
                ? query.filters(criteria)
                : query.filter(criteria));
        },
        // clears all of the stored data (e.g. before fetching new data)
        clearData: function () {
            this._rows = [];
            js.alg.each(this._columns, function (colData) {
                colData.rowIDs = {}; //< stores RowID:[Value,Value,Value]
                colData.values = {}; //< stores Value:[RowID,RowID,RowID] 
            });
        },
        
        // pushes data to the server
        // TODO: Implement a push-system to save data to the server
        push: function() {}
    };

    /**************************************************************************
     * (PRIVATE) Called after a successful query; loads data into the list
     * reference.
     * 
     * \param listItems {Object}
     *      SharePoint List Items collectionbeing processed
     * 
     * \param successFn {Function}
     *      Function to run after SP List has completed
     * 
     * \param sender {Object}
     *      Pushed in by SharePoint
     * 
     * \param args {Object}
     *      Pushed in by SharePoint  
     *************************************************************************/
    function __successParse(listItems, successFn, sender, args) {
        var itemEnumerator = listItems.getEnumerator(),
            jsEach = js.alg.each,
            columns = this._columns,
            currentItem = null,
            data = null,
            row = null;

        this.clearColumnData();
        
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
    
    /**************************************************************************
     * (PRIVATE) Called in a loop to push data into the SP List Reference.
     * This function is defined outside of the loop for efficiency.
     * 
     * \param colData {Object}
     *      Individual column template (based on sp.fn.column)
     * 
     * \param colName {String}
     *      Column's internal reference ID, defined in constructor
     * 
     * \param columns {Object}
     *      Collection of js column references
     * 
     * \param data {Object}
     *      Collection of relevant loop data, pushed in my js.alg.each.
     *      Includes data.item (sharepoint row reference), data.id (value of
     *      associated row ID in sharepoint), and data._row (reference to
     *      list reference's row getting pushed into the stack).  
     *************************************************************************/
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
                            ? this.macro()
                            : colValue);
                    },
                    set: function (v) {
                        if (!colData.internal) {
                            colValue = v;
                            dirty = true;
                        }
                    }
                }
            }),
            colValue = colData.default;

        if (colData.internal) {
            colValue = data.item.get_value(colData.internal);
            
            // eventually, this will need to change to support multi-value fields.
            //colData.rowIDs[rowID] = colValue;

            //if (!colData.values[colValue]) {
            //    colData.values[colValue] = [];
            //}
            //colData.values[colValue].push(rowID);
        }
        
        row[colData.name] = cell;

        return;
    }

    // defined here to keep the code smaller, above
    function __failureParse(listItems, failureFn, sender, args) {
        failureFn(sender, args);
    }

    // query object
    sp.fn.query = {
        _list: null, //< overwritten in construction
        _rows: null, //< overwritten in reset
        
        // reset the query data, and refresh the cache of value keys
        reset: function() {
            this._rows = this._list._rows.slice(0);
            return this;
        },
        
        /**********************************************************************
         * Applies a single filter against the data stored in the cache.
         *
         * \param filterData {Object}
         *      Collection of filters
         *********************************************************************/
        filter: function(filterData) {
            js.alg.each(this._rows, _parseRows, [filterData]);
            return this
        },
        
        /**********************************************************************
         * Applies a set of filters against the data stored in the cache. Due
         * to the nature of the filtering algorithm, this is the more efficient
         * of the two methods, as it requires fewer passes to apply multiple
         * filters; but completes 
         * filters; but 
         *
         * \param filterArray {Array}
         *      Array of filter collections
         *********************************************************************/
        filters: function(filterArray) {
            js.alg.each(this._rows, _parseRows, filterArray);
            return this;
        },
        
        // Retrieves all of the stored data
        data: function(fn) {
            var data = this._rows.slice(0);
            js.alg.use(this, fn, [data]);
            return this;
        },
        
        // retrieve the sum of all the stored data
        sum: function(columns, fn) {
            this.data(function(rows) {
                js.alg.each(rows, _rows, columns);
                js.alg.use(this, fn, [columns]);
            });
            
            function _rows(row, _, rows, columns) {
                js.alg.each(row, _columns, columns);
            }
            function _columns(value, colName, columns) {
                if(typeof value === "number") {
                    columns[colName] += value;
                }
            }
            
            return this;
        },
        
        // creates a copy of this object
        clone: function() {
            var clone = __makeQuery(this._list);
            clone._rows = this._rows.slice(0);
        }
    };

    /**********************************************************************
     * (PRIVATE) Separated from filter function for speed purposes.
     * 
     * \param value {Object}
     *      Row from this._rows
     * 
     * \param id {Number}
     *      Row index from row
     * 
     * \param _rows {Array}
     *      this._rows
     * 
     * \param filterData {Object}
     *      Collection of filters
     *********************************************************************/
    function _parseRows(row, id, _rows, filterData) {
        if(!row) { // catch null values
            return;
        }
        
        var f, filter, drop, value;
        
        for(f = 0; f < filterData.length; f++) {
            filter = filterData[f];
            // make sure we have a column identified.
            if(!filter.name) { continue; }
            value = row[filter.name].value;
            drop = false;
            switch(filter) {
                case "gt" :  drop = !(value >   filter.gt ); break; 
                case "geq":  drop = !(value >=  filter.geq); break; 
                case "leq":  drop = !(value <=  filter.leq); break; 
                case "lt" :  drop = !(value <   filter.lt ); break;
                case "eq" :  drop = !(value ==  filter.eq ); break;
                case "seq":  drop = !(value === filter.seq); break;
                case "neq":  drop = !(value !=  filter.neq); break;
                case "snq":  drop = !(value !== filter.snq); break;
                case "test": drop = !(filter.test.test(value)); break; // receives a regexp
            }
            if(drop) {
                _rows[id] = null;
            }
        }
        
        _rows.sort().splice(_rows.indexOf(null));
        
        return this;
    }
    
    // builds a new query object
    function __makeQuery(list) {
        return Object.create(sp.fn.query, { _list: { value: list } });
    }
    // used in sp list
    sp.fn.column = {
        internal: "",
        text: "",
        type: "string",
        default: ""
    };

    return sp;
});

//! js-sp.js