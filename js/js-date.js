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

jspyder.extend.fn("date", function () {
    /**
     * @class jspyder.date
     * @member jspyder
     * 
     * Abstracts the Date object for simpler access.
     * 
     * @param {Date|String} [value=new Date()]
     *      A Date Object or string to parse as the wrapped date.
     * 
     * @param {String} [format]
     *      A string to use with a String value parameter in order to 
     *      understand the date value; and to use when formatting strings 
     *      from the date value.
     * 
     * @param {Boolean} [utc=false]
     *      Whether to default to using UTC when getting formatted values.
     * 
     * @return {Object}
     *      jspyder.date.fn Object 
     */
    function js_date(value, format, utc) {
        var ret = Object.create(js_date.fn);
        ret._format = format;
        ret._useUTC = utc;
        
        return ret.setDate(value, format);
    }
    
    js_date.fn = js_date.prototype = {
        // private values
        /** 
         * @private
         * Date value
         */
        _value: null,
        /**
         * @private
         * Formatting string
         */
        _format: "",
        /**
         * @private
         * Whether to default to using UTC on formatting, etc.
         */
        _useUTC: false,
        
        /**
         * @method
         * 
         * Sets whether to use the UTC time zone when generating the date
         * string.
         * 
         * @param {Boolean} [utc=true]
         */
        useUTC: function(utc) { 
            this._useUTC = !js.alg.bool(utc); 
            return this; 
        },
        /**
         * @method
         * 
         * Sets whether to use the Local time zone when generating the date
         * string.
         * 
         * @param {Boolean} [local=true]
         */
        useLocal: function(local) { 
            this._useUTC = js.alg.bool(local); 
            return this; 
        },
        
        /**
         * @method
         * 
         * Overrides the current date value, as if the constructor (jspyder.date)
         * had been run.
         */
        setDate: function(v, f) {
            if(typeof value === "undefined") {
                date = new Date();
            }
            else if (__isJsDate(value)) {
                date = value._value;
            }
            else if (__isDate(value)) {
                date = new Date(value);
            }
            else if (typeof value === "string") {
                // config from string and format
                date = __parseString(value, format);
            }
            else if (typeof value === "number") {
                date = new Date(value);
            }
            else {
                date = new Date(NaN);
            }
            
            this._value = date;
            
            return this;
        },
        
        /**
         * @method
         * 
         * Gets the currently stored date value as a Date object.
         */
        asDate: function() { return this._value; },
        /**
         * @method
         * 
         * Gets the currently stored date value as a string.
         * 
         * @param {String} [format=this._format]
         *      The format to use when generating the string.
         * 
         * @param {Boolean} [useUtc=this._useUtc]
         */
        asString: function(format, useUtc) {
            format = js.alg.string(format, this._format || __defaultFormat);
            useUtc = js.alg.bool(useUtc, this._useUtc || __defaultUtc);
            return __formatDate(this._value, format, useUtc);
        },
        
        /**
         * @method
         * 
         * Adds the specified number of days to the wrapped date value.
         */
        addDays: function(days) {
            this._value.setDate( this._value.getDate() + js.alg.number(days) );
            return this;
        },
        
        /**
         * @method
         * 
         * Adds the specified number of months to the wrapped date value.
         */
        addMonths: function(months) {
            this._value.setMonth( this._value.getMonth() + js.alg.number(months) );
            return this;
        },
        
        /**
         * @method
         * 
         * Adds the specified number of years to the wrapped date value.
         */
        addYears: function(years) {
            this._value.setFullYear( this._value.getFullYear() + js.alg.number(years) );
            return this;
        },
        
        /**
         * @method
         * 
         * Adds the specified number of seconds to the wrapped date value.
         */
        addSeconds: function(seconds) {
            this._value.setSeconds( this._value.getSeconds() + js.alg.number(seconds) );
            return this;
        },
        /**
         * @method
         * 
         * Adds the specified number of minutes to the wrapped date value.
         */
        addMinutes: function(minutes) {
            this._value.setMinutes( this._value.getMinutes() + js.alg.number(minutes) );
            return this;
        },
        /**
         * @method
         * 
         * Adds the specified number of hours to the wrapped date value.
         */
        addHours: function(hours) {
            this._value.setHours( this._value.getHours() + js.alg.number(hours) );
            return this;
        }
    }
    
        /**
         * @private
         */
    var __reSearchStrings = [
            "YYYY", "YY", 
            "yyyy", "yy",
            "MMMM", "MMM", "MM", "M", 
            "mmmm", "mmm", "mm", "m",
            "dddd", "ddd", "dd", "d",
            "DDDD", "DDD", "DD", "D",
            "AM", "am", 
            "HH", "H", "hh", "h", 
            "NN", "N", "nn", "n", 
            "SS", "S", "ss", "s"
        ],
        /**
         * @private
         */
        __reSearch = new RegExp("(" + __reSearchStrings.join("|") + ")", "g"),
        /**
         * @private
         */
        __defaultFormat = "ddd mmm d yyyy hh:mm:ss",
        /**
         * @private
         */
        __defaultUtc = false,
        /**
         * @private
         */
        __years = [
            { YY: "\\d{2}", YYYY: "\\d{4}", yy: "\\d{2}", yyyy: "\\d{4}" }
        ],
        /**
         * @private
         */
        __months = [
            { m:  "1", mm: "01", mmm: "Jan", mmmm: "January",   M:  "1", MM: "01", MMM: "JAN", MMMM: "JANUARY"   },
            { m:  "2", mm: "02", mmm: "Feb", mmmm: "February",  M:  "2", MM: "02", MMM: "FEB", MMMM: "FEBRUARY"  },
            { m:  "3", mm: "03", mmm: "Mar", mmmm: "March",     M:  "3", MM: "03", MMM: "MAR", MMMM: "MARCH"     },
            { m:  "4", mm: "04", mmm: "Apr", mmmm: "April",     M:  "4", MM: "04", MMM: "APR", MMMM: "APRIL"     },
            { m:  "5", mm: "05", mmm: "May", mmmm: "May",       M:  "5", MM: "05", MMM: "MAY", MMMM: "MAY"       },
            { m:  "6", mm: "06", mmm: "Jun", mmmm: "June",      M:  "6", MM: "06", MMM: "JUN", MMMM: "JUNE"      },
            { m:  "7", mm: "07", mmm: "Jul", mmmm: "July",      M:  "7", MM: "07", MMM: "JUL", MMMM: "JULY"      },
            { m:  "8", mm: "08", mmm: "Aug", mmmm: "August",    M:  "8", MM: "08", MMM: "AUG", MMMM: "AUGUST"    },
            { m:  "9", mm: "09", mmm: "Sep", mmmm: "September", M:  "9", MM: "09", MMM: "SEP", MMMM: "SEPTEMBER" },
            { m: "10", mm: "10", mmm: "Oct", mmmm: "October",   M: "10", MM: "10", MMM: "OCT", MMMM: "OCTOBER"   },
            { m: "11", mm: "11", mmm: "Nov", mmmm: "November",  M: "11", MM: "11", MMM: "NOV", MMMM: "NOVEMBER"  },
            { m: "12", mm: "12", mmm: "Dec", mmmm: "December",  M: "12", MM: "12", MMM: "DEC", MMMM: "DECEMBER"  },
        ],
        /**
         * @private
         */
        __days = [
            { d:  "1", dd: "01" }, { d:  "2", dd: "02" }, { d:  "3", dd: "03" }, { d:  "4", dd: "04" },
            { d:  "5", dd: "05" }, { d:  "6", dd: "06" }, { d:  "7", dd: "07" }, { d:  "8", dd: "08" },
            { d:  "9", dd: "09" }, { d: "10", dd: "10" }, { d: "11", dd: "11" }, { d: "12", dd: "12" },
            { d: "13", dd: "13" }, { d: "14", dd: "14" }, { d: "15", dd: "15" }, { d: "16", dd: "16" },
            { d: "17", dd: "17" }, { d: "18", dd: "18" }, { d: "19", dd: "19" }, { d: "20", dd: "20" },
            { d: "21", dd: "21" }, { d: "22", dd: "22" }, { d: "23", dd: "23" }, { d: "24", dd: "24" },
            { d: "25", dd: "25" }, { d: "26", dd: "26" }, { d: "27", dd: "27" }, { d: "28", dd: "28" },
            { d: "29", dd: "29" }, { d: "30", dd: "30" }, { d: "31", dd: "31" },
        ],
        /**
         * @private
         */
        __weekdays = [
            { D: "S", DD: "Su", DDD: "SUN", DDDD: "SUNDAY",    ddd: "Sun", dddd: "Sunday"    },
            { D: "M", DD: "Mo", DDD: "MON", DDDD: "MONDAY",    ddd: "Mon", dddd: "Monday"    },
            { D: "T", DD: "Tu", DDD: "TUE", DDDD: "TUESDAY",   ddd: "Tue", dddd: "Tuesday"   },
            { D: "W", DD: "We", DDD: "WED", DDDD: "WEDNESDAY", ddd: "Wed", dddd: "Wednesday" },
            { D: "T", DD: "Th", DDD: "THU", DDDD: "THURSDAY",  ddd: "Thu", dddd: "Thursday"  },
            { D: "F", DD: "Fr", DDD: "FRI", DDDD: "FRIDAY",    ddd: "Fri", dddd: "Friday"    },
            { D: "S", DD: "Sa", DDD: "SAT", DDDD: "SATURDAY",  ddd: "Sat", dddd: "Saturday"  },
        ],
        /**
         * @private
         */
        __hours = [
            { h: "12", hh: "12", H:  "0", HH: "00", AM: "AM", am: "am" },
            { h:  "1", hh: "01", H:  "1", HH: "01", AM: "AM", am: "am" },
            { h:  "2", hh: "02", H:  "2", HH: "02", AM: "AM", am: "am" },
            { h:  "3", hh: "03", H:  "3", HH: "03", AM: "AM", am: "am" },
            { h:  "4", hh: "04", H:  "4", HH: "04", AM: "AM", am: "am" },
            { h:  "5", hh: "05", H:  "5", HH: "05", AM: "AM", am: "am" },
            { h:  "6", hh: "06", H:  "6", HH: "06", AM: "AM", am: "am" },
            { h:  "7", hh: "07", H:  "7", HH: "07", AM: "AM", am: "am" },
            { h:  "8", hh: "08", H:  "8", HH: "08", AM: "AM", am: "am" },
            { h:  "9", hh: "09", H:  "9", HH: "09", AM: "AM", am: "am" },
            { h: "10", hh: "10", H: "10", HH: "10", AM: "AM", am: "am" },
            { h: "11", hh: "11", H: "11", HH: "11", AM: "AM", am: "am" },
            { h: "12", hh: "12", H: "12", HH: "12", AM: "PM", am: "pm" },
            { h:  "1", hh: "01", H: "13", HH: "13", AM: "PM", am: "pm" },
            { h:  "2", hh: "02", H: "14", HH: "14", AM: "PM", am: "pm" },
            { h:  "3", hh: "03", H: "15", HH: "15", AM: "PM", am: "pm" },
            { h:  "4", hh: "04", H: "16", HH: "16", AM: "PM", am: "pm" },
            { h:  "5", hh: "05", H: "17", HH: "17", AM: "PM", am: "pm" },
            { h:  "6", hh: "06", H: "18", HH: "18", AM: "PM", am: "pm" },
            { h:  "7", hh: "07", H: "19", HH: "19", AM: "PM", am: "pm" },
            { h:  "8", hh: "08", H: "20", HH: "20", AM: "PM", am: "pm" },
            { h:  "9", hh: "09", H: "21", HH: "21", AM: "PM", am: "pm" },
            { h: "10", hh: "10", H: "22", HH: "22", AM: "PM", am: "pm" },
            { h: "11", hh: "11", H: "23", HH: "23", AM: "PM", am: "pm" },
        ],
        /**
         * @private
         */
        __minutes = [
            { n:  "0", nn: "00" }, { n:  "1", nn: "01" }, { n:  "2", nn: "02" }, { n:  "3", nn: "03" },
            { n:  "4", nn: "04" }, { n:  "5", nn: "05" }, { n:  "6", nn: "06" }, { n:  "7", nn: "07" }, 
            { n:  "8", nn: "08" }, { n:  "9", nn: "09" }, { n: "10", nn: "10" }, { n: "11", nn: "11" }, 
            { n: "12", nn: "12" }, { n: "13", nn: "13" }, { n: "14", nn: "14" }, { n: "15", nn: "15" }, 
            { n: "16", nn: "16" }, { n: "17", nn: "17" }, { n: "18", nn: "18" }, { n: "19", nn: "19" }, 
            { n: "20", nn: "20" }, { n: "21", nn: "21" }, { n: "22", nn: "22" }, { n: "23", nn: "23" }, 
            { n: "24", nn: "24" }, { n: "25", nn: "25" }, { n: "26", nn: "26" }, { n: "27", nn: "27" }, 
            { n: "28", nn: "28" }, { n: "29", nn: "29" }, { n: "30", nn: "30" }, { n: "31", nn: "31" }, 
            { n: "32", nn: "32" }, { n: "33", nn: "33" }, { n: "34", nn: "34" }, { n: "35", nn: "35" }, 
            { n: "36", nn: "36" }, { n: "37", nn: "37" }, { n: "38", nn: "38" }, { n: "39", nn: "39" }, 
            { n: "40", nn: "40" }, { n: "41", nn: "41" }, { n: "42", nn: "42" }, { n: "43", nn: "43" }, 
            { n: "44", nn: "44" }, { n: "45", nn: "45" }, { n: "46", nn: "46" }, { n: "47", nn: "47" }, 
            { n: "48", nn: "48" }, { n: "49", nn: "49" }, { n: "50", nn: "50" }, { n: "51", nn: "51" }, 
            { n: "52", nn: "52" }, { n: "53", nn: "53" }, { n: "54", nn: "54" }, { n: "55", nn: "55" }, 
            { n: "56", nn: "56" }, { n: "57", nn: "57" }, { n: "58", nn: "58" }, { n: "59", nn: "59" }
        ],
        /**
         * @private
         */
        __seconds = [
            { s:  "0", ss: "00" }, { s:  "1", ss: "01" }, { s:  "2", ss: "02" }, { s:  "3", ss: "03" },
            { s:  "4", ss: "04" }, { s:  "5", ss: "05" }, { s:  "6", ss: "06" }, { s:  "7", ss: "07" }, 
            { s:  "8", ss: "08" }, { s:  "9", ss: "09" }, { s: "10", ss: "10" }, { s: "11", ss: "11" }, 
            { s: "12", ss: "12" }, { s: "13", ss: "13" }, { s: "14", ss: "14" }, { s: "15", ss: "15" }, 
            { s: "16", ss: "16" }, { s: "17", ss: "17" }, { s: "18", ss: "18" }, { s: "19", ss: "19" }, 
            { s: "20", ss: "20" }, { s: "21", ss: "21" }, { s: "22", ss: "22" }, { s: "23", ss: "23" }, 
            { s: "24", ss: "24" }, { s: "25", ss: "25" }, { s: "26", ss: "26" }, { s: "27", ss: "27" }, 
            { s: "28", ss: "28" }, { s: "29", ss: "29" }, { s: "30", ss: "30" }, { s: "31", ss: "31" }, 
            { s: "32", ss: "32" }, { s: "33", ss: "33" }, { s: "34", ss: "34" }, { s: "35", ss: "35" }, 
            { s: "36", ss: "36" }, { s: "37", ss: "37" }, { s: "38", ss: "38" }, { s: "39", ss: "39" }, 
            { s: "40", ss: "40" }, { s: "41", ss: "41" }, { s: "42", ss: "42" }, { s: "43", ss: "43" }, 
            { s: "44", ss: "44" }, { s: "45", ss: "45" }, { s: "46", ss: "46" }, { s: "47", ss: "47" }, 
            { s: "48", ss: "48" }, { s: "49", ss: "49" }, { s: "50", ss: "50" }, { s: "51", ss: "51" }, 
            { s: "52", ss: "52" }, { s: "53", ss: "53" }, { s: "54", ss: "54" }, { s: "55", ss: "55" }, 
            { s: "56", ss: "56" }, { s: "57", ss: "57" }, { s: "58", ss: "58" }, { s: "59", ss: "59" }
        ],
        /**
         * @private
         */
        __timeZones = { },
        // collected definitions
        /**
         * @private
         */
        __formatCollection = {
            // years
            "yy":   __buildFormatRegexStringFrom(__years,    "yy"  ),
            "yyyy": __buildFormatRegexStringFrom(__years,    "yyyy"),
            "YY":   __buildFormatRegexStringFrom(__years,    "YY"  ),
            "YYYY": __buildFormatRegexStringFrom(__years,    "YYYY"),
            
            // months
            "m":    __buildFormatRegexStringFrom(__months,   "m"   ),
            "mm":   __buildFormatRegexStringFrom(__months,   "mm"  ),
            "mmm":  __buildFormatRegexStringFrom(__months,   "mmm" ),
            "mmmm": __buildFormatRegexStringFrom(__months,   "mmmm"),
            "M":    __buildFormatRegexStringFrom(__months,   "M"   ),
            "MM":   __buildFormatRegexStringFrom(__months,   "MM"  ),
            "MMM":  __buildFormatRegexStringFrom(__months,   "MMM" ),
            "MMMM": __buildFormatRegexStringFrom(__months,   "MMMM"),
            
            // days
            "d":    __buildFormatRegexStringFrom(__days,     "d"   ),
            "dd":   __buildFormatRegexStringFrom(__days,     "dd"  ),
            
            // weekdays
            "D":    __buildFormatRegexStringFrom(__weekdays, "D"   ),
            "DD":   __buildFormatRegexStringFrom(__weekdays, "DD"  ),
            "DDD":  __buildFormatRegexStringFrom(__weekdays, "DDD" ),
            "DDDD": __buildFormatRegexStringFrom(__weekdays, "DDDD"),
            "ddd":  __buildFormatRegexStringFrom(__weekdays, "ddd" ),
            "dddd": __buildFormatRegexStringFrom(__weekdays, "dddd"),
            
            // am/pm
            "am":   __buildFormatRegexStringFrom(__hours,    "am"  ),
            "AM":   __buildFormatRegexStringFrom(__hours,    "AM"  ),
            
            // hours
            "h":    __buildFormatRegexStringFrom(__hours,    "h"   ),
            "hh":   __buildFormatRegexStringFrom(__hours,    "hh"  ),
            "H":    __buildFormatRegexStringFrom(__hours,    "H"   ),
            "HH":   __buildFormatRegexStringFrom(__hours,    "HH"  ),
            
            // minutes
            "n":    __buildFormatRegexStringFrom(__minutes, "n"    ),
            "nn":   __buildFormatRegexStringFrom(__minutes, "nn"   ),
            "N":    __buildFormatRegexStringFrom(__minutes, "N"    ),
            "NN":   __buildFormatRegexStringFrom(__minutes, "NN"   ),
            
            // seconds
            "s":    __buildFormatRegexStringFrom(__seconds, "s"    ),
            "ss":   __buildFormatRegexStringFrom(__seconds, "ss"   ),
            "S":    __buildFormatRegexStringFrom(__seconds, "S"    ),
            "SS":   __buildFormatRegexStringFrom(__seconds, "SS"   )
        };
    
    /**
     * @private
     * 
     * Generates a regular expression for the __formatCollection
     */
    function __buildFormatRegexStringFrom(from, style) {
        var reArray = [],
            str = null,
            rex = null,
            val = {},
            rev = {};
            
        js.alg.each(from, function(collection, i) {
            var cs = collection[style];
            if (cs) {
                reArray.push(cs);
                val[cs] = i;
                rev[i] = cs; 
            }
        });
        
        reArray.sort(function(a,b) { return b.length - a.length; });
        
        str = ("(" + reArray.join("|") + ")");
        rex = new RegExp(str, "g");
        
        return {
            string: str,
            regexp: rex,
            values: val,
            lookup: rev
        };
    }
    function __isDate(v) {
        return (v instanceof Date || Object.prototype.toString.call(v) === '[object Date]');
    }
    function __isJsDate(v) {
        return js_date.fn.isPrototypeOf(v);
    }
    
    function __timezoneOffset() {
        var offset = (new Date()).getTimezoneOffset(),
            hours = offset/60; // offset / minutes-per-hour
            
        return hours;
    }
    
    // create a date from a string and an array of format strings
    function __parseString(v, f) {
        v = js.alg.string(v, "");
        var format = js.alg.string(f),
            d = { y: 0, m: 0, d: 1, h: 0, n: 0, s: 0, a: 0 };
        
        js.alg.each(format.match(__reSearch), function(match) {
            // get the collection
            var collection = __formatCollection[match];
            if(!collection) { return match; }
            
            // get the regexp
            var regexp = collection.regexp,
                values = collection.values;
                
            // get the value
            var value = (v.match(regexp) || [0])[0],
                len = value.length,
                start = v.indexOf(value);
            
            v = v.substring(start + len);
            
            switch (match) {
                // year
                case "yy":
                case "YY":
                    value = "20" + value;
                case "yyyy":
                case "YYYY":
                    d["y"] = js.alg.number(value);
                    break;
                
                // month
                case "MMMM":
                case "MMM":
                case "mmmm":
                case "mmm":
                    value = values[value];
                case "MM":
                case "mm":
                case "M":
                case "m":
                    d["m"] = js.alg.number(value);
                    break;
                
                // date
                case "dd":
                case "d":
                    d["d"] = js.alg.number(value) || 1;
                    break;
                    
                case "hh":
                case "h":
                case "HH":
                case "H":
                    d["h"] = js.alg.number(value);
                    break;
                    
                case "am":
                case "AM":
                    d["a"] = ((value === "pm" || value === "PM")
                        ? 12
                        : 0);
                    break;
            }
        });
        return new Date(d.y, d.m, d.d, d.h + d.a, d.n, d.s);
    }
    
    function __formatDate(date, format, useUTC) {
        var d = {
            y: useUTC ? date.getUTCFullYear() : date.getFullYear(),
            m: useUTC ? date.getUTCMonth()    : date.getMonth(),
            d: useUTC ? date.getUTCDate()     : date.getDate(),
            h: useUTC ? date.getUTCHours()    : date.getHours(),
            n: useUTC ? date.getUTCMinutes()  : date.getMinutes(),
            s: useUTC ? date.getUTCSeconds()  : date.getSeconds(),
            w: useUTC ? date.getUTCDay()      : date.getDay()
        };
        
        var left = "", right = format;
        js.alg.each(format.match(__reSearch), function(match) {
            // get the collection
            var collection = __formatCollection[match];
            if(!collection) { return match; }
            
            // get the regexp
            var regexp = collection.regexp,
                values = collection.values,
                len = match.length,
                start = right.indexOf(match),
                value = "";
                
            left += right.substring(0, start);
            right = right.substring(start + len);

            switch(match) {
                case "YY":
                case "yy":
                    value = js.alg.string(d.y % 100);
                    break;
                    
                case "YYYY":
                case "yyyy":
                    value = js.alg.string(d.y);
                    break;
                   
                case "MMMM":
                case "mmmm":
                case "MMM":
                case "mmm":
                case "MM":
                case "mm":
                case "M":
                case "m":
                    value = collection.lookup[d.m];
                    break;
                    
                case "dd":
                case "d":
                    value = collection.lookup[d.d - 1];
                    break;
                    
                case "DDDD":
                case "dddd":
                case "DDD":
                case "ddd":
                case "DD":
                case "D":
                    value = collection.lookup[d.w];
                    break;
                    
                case "am":
                case "AM":
                    value = collection.lookup[d.h];
                    break;
                    
                case "HH":
                case "H":
                case "hh":
                case "h":
                    value = collection.lookup[d.h];
                    break;
                    
                case "NN":
                case "N":
                case "nn":
                case "n":
                    value = collection.lookup[d.n];
                    break;
                    
                case "SS":
                case "S":
                case "ss":
                case "s":
                    value = collection.lookup[d.s];
                    break;
                    
                default:
                    console.log(collection);
            }
            
            left += value;
        });
        
        return left + right;
    }
    
    return js_date;
});
