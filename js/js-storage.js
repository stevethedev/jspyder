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

jspyder.extend.fn("storage", function() {
    var js = this,
        json_stringify = js.alg.bindFn(
            window["JSON"], 
            window["JSON"]["stringify"]),
        json_parse = js.alg.bindFn(
            window["JSON"], 
            window["JSON"]["parse"]),
        emulatedStorageTemplate = {
            data: {},
            "setItem": function(key, value) {
                this.data[key] = value;
                return;
            },
            "getItem": function(key) {
                var value = this.data[key];
                return ("undefined" === typeof value ? null : value);
            },
            "removeItem": function(key) {
                js.data[key] = null;
                return;
            }
        },
        toString = js.alg.bindFn(js.alg, js.alg["string"]),
        location = window["location"],
        url      = location.toString(),
        scheme   = location["protocol"],
        hostname = location["hostname"],
        port     = location["port"],
        prefix   = "jspyder::" + scheme + ":" + hostname + "::" + port + "::";
        
    /**
     * @property storage
     * @member jspyder
     * 
     * ### Can I Use
     * 3. Read a value when it is changed, and create a "mock" event 
     *    to propagate.
     */
    var js_storage = {
        /**
         * @property session
         * @member jspyder.storage
         * 
         * Wrapper for temporary storage interface.  Methods include:
         *   - getValue(key, fn)
         *   - exportValue(key)
         *   - setValue(key, value)
         *   - dropValue(key)
         *   - listen(fn)
         */
        "session": __getInterface("sessionStorage"),
        
        /**
         * @property persist
         * @member jspyder.storage
         * 
         * Wrapper for persistent storage interface.  Methods include:
         *   - getValue(key, fn)
         *   - exportValue(key)
         *   - setValue(key, value)
         *   - dropValue(key)
         *   - listen(fn)
         */
        "persist": __getInterface("localStorage")
    };
    
    /**
     * @private
     * @method __encode
     * @member jspyder.storage
     * 
     * Stringifies objects for storage.  This also automatically
     * escapes strings to avoid a bug in IE, where ASCII codes 0x00
     * through 0x20 could break the storage.
     * 
     * @param {Mixed} data      Data to encode
     * @return {String}         Encoded data
     */
    function __encode(data) {
        return json_stringify(data);
    }
    
    /**
     * @private
     * @method __decode
     * @member jspyder.storage
     * 
     * Parses stringified objects from storage.  This also decodes
     * the escaped strings from the __encode method to retrieve the
     * volatile characters.
     * 
     * @param {String} encodedString    __encode String
     * @param {Mixed}                   Decoded data
     */
    function __decode(encodedString) {
        try {
            return json_parse(encodedString);
        }
        catch(e) {
            return encodedString || null;
        }
    }
    
    /**
     * @private
     * @method __emulateStorage
     * @member jspyder.storage
     * 
     * Emulates a storage interface, using a native JavaScript object
     * as the underlying data-storage interface.
     * 
     * @return {Object} Emulated storage object.
     */
    function __emulateStorage() {
        return Object.create(emulatedStorageTemplate);
    }
    
    /**
     * @private
     * @method __storageAvailable
     * @member jspyder.storage
     * 
     * Tests if the storage interface is present and available.
     * 
     * @param {String} interfaceName    localStorage/sessionStorage
     * @return {Boolean}
     */
    function __storageAvailable(interfaceName) {
        var test = "__jspyder_storage_test__" + (new Date()).toString(),
            storage = null;
        
        
        try {
            storage = window[interfaceName];
            
            if(!storage) {
                return false;
            }
            
            storage.setItem(test, test);
            
            if(storage.getItem(test) !== test) {
                return false;
            }
            
            storage.removeItem(test);
            
            return true;
        }
        catch(e) { 
            return false;
        }
    }
    
    /**
     * @private
     * @method __getInterface
     * @member jspyder.storage
     * 
     * Retreives or creates a storage interface which handles all of
     * the get/set logic wrappers.
     * 
     * @param {String} name     The name of the interface to retrieve.
     */
    function __getInterface(name) {
        var storage = (__storageAvailable(name)
                ? window[name]
                : __emulateStorage());
            
        return {
            "exportValue": function(key) {
                return __get(storage, key);
            },
            "getValue": function(key, fn) {
                js.alg.use(this, fn, [this.exportValue(key)]);
                return this;
            },
            "setValue": function(key, value) {
                __set(storage, key, value);
                return this;
            },
            "dropValue": function(key) {
                __del(storage, key);
                return this;
            },
            "listen": function(fn) {
                var storageEvent = function(event) {
                    event
                        && event["storageArea"] 
                        && event["storageArea"] === storage
                        && js.alg.use(this, fn, arguments);
                }
                window.addEventListener("storage", storageEvent, false);
            }
        };
    }

    /**
     * @private
     * @method __get
     * @member jspyder.storage
     * 
     * Retrieves the value stored in [key] from [storage]
     * 
     * @param {Object} storage      The storage interface to read from
     * @param {String} key          The key the data is stored under
     * 
     * @return {Mixed}              The stored value, decoded
     */
    function __get(storage, key) {
        key = prefix + toString(key);
        var value = storage.getItem(key);
        return __decode(value);
    }

    /**
     * @private
     * @method __set
     * @member jspyder.storage
     * 
     * Stashes the [value] in [storage] under the designated [key]
     * 
     * @param {Object} storage      The storage interface to write to
     * @param {String} key          The key the data is stored under
     * @param {Mixed} value         The value to store
     */
    function __set(storage, key, value) {
        var newVal = __encode(value),
            oldVal = __get(storage, key);
            key = prefix + toString(key);
            value = __decode(newVal);

        storage.setItem(key, newVal);
        __onStorage(storage, key, oldVal, value);
        return;
    }


    /**
     * @private
     * @method __del
     * @member jspyder.storage
     * 
     * Removes the value stored under [key] in interface [storage]
     * 
     * @param {Object} storage      The storage interface to remove from
     * @param {String} key          The key the data is stored under
     */
    function __del(storage, key) {
        var oldVal = __get(storage, key),
            value = null;
            key = prefix + toString(key);

        storage.removeItem(key);
        __onStorage(storage, key, oldVal, value);
        return;
    }


    /**
     * @private
     * @method __onStorage
     * @member jspyder.storage
     * 
     * Triggers the storage event in the proper context
     * 
     * @param {Object} storage      The storage interface being modified
     * @param {String} key          The key being modified
     * @param {Mixed} oldVal        The value being overwritten
     * @param {Mixed} newVal        The value being written
     */
    function __onStorage(storage, key, oldVal, newVal) {
        var evt = window["document"].createEvent("StorageEvent"),
            eventType = "storage",
            canBubble = false,
            cancelable = false,
            keyArg = key,
            oldValueArg = oldVal,
            newValueArg = newVal,
            urlArg = url,
            storageAreaArg = storage;
            
        evt.initStorageEvent(
            eventType,
            canBubble,
            cancelable,
            keyArg,
            oldValueArg,
            newValueArg,
            urlArg,
            storageAreaArg
        );

        window.dispatchEvent(evt);
    }
    
    return js_storage;
});