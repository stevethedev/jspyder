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
    var js = this;
    
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
     *      from the date value.  The supported formatting characters are:
     * 
     * ## Year ##
     * - YYYY: 4-digit year
     * - yyyy: 4-digit year
     * - YY: 2-digit year
     * - yy: 2-digit year
     * 
     * ## Month ##
     * - MMMM: Month name, ALL CAPS (JANUARY)
     * - mmmm: Month name, Title Case (January)
     * - MMM: Month 3-letter abbreviation, ALL CAPS (JAN)
     * - mmm: Month 3-letter abbreviation, Title Case (Jan)
     * - MM: Month number, 0-padded (01)
     * - mm: Month number, 0-padded (01)
     * - M: Month number, standard (1)
     * - m: Month number, standard (1)
     * 
     * ## Day ##
     * - ddth: Date Number, 0-padded Nth (01st) 
     * - dth: Date Number, Nth (1st) 
     * - dd: Date Number, 0-padded (01)
     * - d: Date Number, standard (1)
     *
     * ## Weekday ##
     * - DDDD: Weekday Name, ALL CAPS (SUNDAY)
     * - dddd: Weekday Name, Title Case (Sunday)
     * - DDD: Weekday Name 3-letter abbreviation, ALL CAPS (SUN)
     * - ddd: Weekday Name 3-letter abbreviation, Title Case (Sun)
     * - DD: Weekday Name, 2-letter abbreviation, Title Case (Su)
     * - D: Weekday Name, 1-letter abbreviation, Capital (S)
     * 
     * ## Meridiem ##
     * - AM: Meridiem, ALL CAPS (AM/PM)
     * - am: Meridiem, lower case (am/pm)
     * 
     * ## Hours ##
     * - HH: Hours, 24-hour clock, 0-padded (01)
     * - hh: Hours, 12-hour clock, 0-padded (01)
     * - H: Hours, 24-hour clock, standard (13)
     * - h: Hours, 12-hour clock, standard (1)
     * 
     * ## Minutes ##
     * - nn: minutes, 0-padded (01)
     * - n: Minutes, standard (1)
     *      
     * ## Seconds ##
     * - ss: Seconds, 0-padded (00)
     * - s: Seconds, standard (0)
     * 
     * @param {Boolean} [utc=false]
     *      Whether to default to using UTC when getting formatted values.
     * 
     * @return {Object}
     *      jspyder.date.fn Object 
     */
    function js_date(value, format, utc) {
        var ret = Object.create(js_date.fn);
        return ret.setDate(value, format, utc);
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
         * Clones the current object
         */
        clone: function () {
            return js_date(new Date(this._value), this._format, this._useUTC);
        },

        utcOffset: function () {
            return this._value.getTimezoneOffset();
        },

        isDst: function () {
            var offset = this.utcOffset(),
                clone = this.clone();
                
            return (
                offset > clone.setMonth(1).utcOffset() ||
                offset > clone.setMonth(6).utcOffset());
        },
        
        /**
         * @method
         * 
         * Sets whether to use the UTC time zone when generating the date
         * string.
         * 
         * @param {Boolean} [utc=true]
         */
        useUTC: function (utc) {
            this._useUTC = js.alg.bool(utc, true);
            return this;
        },
        
        isUTC: function() { return this._useUTC; },
        /**
         * @method
         * 
         * Sets whether to use the Local time zone when generating the date
         * string.
         * 
         * @param {Boolean} [local=true]
         */
        useLocal: function (local) {
            this._useUTC = !js.alg.bool(local, true);
            return this;
        },
        
        /**
         * @method
         * 
         * Overrides the current date value, as if the constructor (jspyder.date)
         * had been run.
         */
        setDate: function (value, format, utc) {
            var date;
            if (typeof value === "undefined") {
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
            this._format = js.alg.string(format, "");
            this._useUTC = js.alg.bool(utc, false);

            return this;
        },
        
        /**
         * @method
         * 
         * Gets the currently stored date value as a Date object.
         */
        asDate: function () { return this._value; },
        
        /**
         * @method
         * 
         * Gets the currently stored date value as a string.
         * 
         * @param {String} [format=this._format]
         *      The format to use when generating the string.
         * 
         * @param {Boolean} [useUtc=this._useUTC]
         * 
         * @param {Boolean} [defaultText=""]
         * 
         * @return {String}
         */
        asString: function (format, useUtc, defaultText) {
            if( this.isValid() ) {
                format = js.alg.string(format, this._format || __defaultFormat);
                useUtc = js.alg.bool(useUtc, this._useUTC);
                return __formatDate(this._value, format, useUtc);
            }
            return js.alg.string(defaultText, "");
        },
        
        /**
         * @method
         * 
         * Ensures that the object automatically converts to a string
         * in the appropriate context.
         */
        toString: function () {
            return Date.prototype.toString.apply(this._value, arguments);
        },
        
        /**
         * @method
         * 
         * Converts the stored date to a numerical value.
         */
        getTime: function (year, month, date, hour, minute, second, ms) {
            var v = this._value;
            year = js.alg.bool(year, true) * v.getFullYear();
            month = js.alg.bool(month, true) * v.getMonth();
            date = js.alg.bool(date, true) * v.getDate();
            hour = js.alg.bool(hour, true) * v.getHours();
            minute = js.alg.bool(minute, true) * v.getMinutes();
            second = js.alg.bool(second, true) * v.getSeconds();
            ms = js.alg.bool(ms, true) * v.getMilliseconds();
            
            var d = new Date(year, month, date, hour, minute, second, ms);
            
            return Date.prototype.getTime.call(d);
        },
        
        isValid: function() {
            return this._value && !isNaN(this._value.getYear());
        },
        
        /**
         * @method
         * 
         * Adds the specified number of days to the wrapped date value.
         */
        addDays: function (days) {
            this._value.setDate(this._value.getDate() + js.alg.number(days));
            return this;
        },
        
        /**
         * Sets the date to the specified number of days.
         * 
         * @param {Number} days
         *      The numbered day of the month to use.
         */
        setDay: function (days) {
            days = js.alg.number(days);
            this._value.setDate(days);
            return this;
        },
        
        /**
         * Retrieves the numbered day of the month for the wrapped date.
         * 
         * @param {Function} fn
         *      The function to receive the day number.
         */
        getDay: function(fn) {
            js.alg.use(this, fn, [this.exportDay()]);
            return this;
        },
        
        /**
         * Returns the numbered day of the month for the wrapped date.
         */
        exportDay: function () {
            return this._value.getDate();
        },
        
        /**
         * Calculates and returns the days in the current month.
         * 
         * @param {String} format
         *      The format to use when exporting the number of days in the month.
         */
        exportDayList: function (format) {
            format = js.alg.string(format, "d");
            
            var count = this.exportDayCount(),
                clone = this.clone(),
                d = 1,
                days = [];
                
            while(d <= count) {
                clone.setDay(d);
                days.push(clone.asString(format));
                d++;
            }
            
            return days;
        },
        
        /**
         * Calculates the days in the current month and pushes the result 
         * into the function identified in the first parameter.
         * 
         * @param {String} format
         * @param {Function} fn
         */
        getDayList: function(format, fn) {
            js.alg.use(this, fn, [this.exportDayList(format)]);
            return this;
        },
        
        /**
         * Calculates and returns the number of days in the currently identified
         * month.
         */
        exportDayCount: function () {
            return js.alg.number(
                this.clone()
                    .addMonths(1)
                    .setDay(0)
                    .asString("d"));
        },
        
        /**
         * Calculates the value of the current month and pushes its value into the
         * function identified in the first parameter.
         * 
         * @param {Function} fn
         */
        getDayCount: function(fn) {
            js.alg.use(this, fn, [this.exportDayCount()]);
            return this;
        },
        
        /**
         * Calculates and returns the day-names of a week.
         * 
         * @param {String} format
         *      The format to use when generating the weekday list.
         */
        exportWeekdayList: function(format) {
            format = js.alg.string(format, "dddd");
            
            var count = this.exportWeekdayCount(),
                w = 0,
                weekday = null,
                weekdays = [];
                
            while (w < count) {
                weekday = __weekdays[w];
                weekdays.push(typeof weekday[format] === "undefined" 
                    ? format 
                    : weekday[format]);
                w++;
            }
            
            return weekdays;
        },
        
        /**
         * Calculates the day-names of a week, and pushes the value into
         * the function identified in the second parameter.
         * 
         * @param {String} format
         * @param {Function} fn
         */
        getWeekdayList: function(format, fn) {
            js.alg.use(this, fn, [this.exportWeekdayList(format)]);
            return this;
        },
        
        /**
         * Calculates the number of days in a week, and returns the value.
         */
        exportWeekdayCount: function() {
            return js.alg.number(__weekdays.length, 0);
        },
        
        /**
         * Calculates the number of days in a week, and pushes the value
         * into the argument identified in the first parameter.
         * 
         * @param {Function} fn
         */
        getWeekdayCount: function(fn) {
            js.alg.use(this, fn, [this.exportWeekdayCount()]);
            return this;
        },
        
        /**
         * Calculates and returns the number of days into the week that
         * the currently wrapped date's month starts.
         */
        exportWeekdayOffset: function() {
            var data = { 
                    str: this.clone().setDay(1).asString("dddd"), 
                    found: 0
                };
                
            js.alg.arrEach(this.exportWeekdayList("dddd"), this._getWeekdayOffset, data);
            
            return js.alg.number(data.found, 0);
        },
        
        /** @private */
        _getWeekdayOffset: function(day, daynum, days, data) {
            if(day === data.str) {
                data.found = daynum;
                this.stop();
            }
            return;
        },
        
        /**
         * Calculates the number of days into the week that the currently wrapped
         * date's month starts, and pushes the return value into the identified 
         * function.
         * 
         * @param {Function} fn
         */
        getWeekdayOffset: function(fn) {
            js.alg.use(this, fn, [this.exportWeekdayOffset()]);
            return this;
        },
        
        /**
         * Adds the specified number of months to the wrapped date value.
         * 
         * @param {Number} months
         */
        addMonths: function (months) {
            this._value.setMonth(this._value.getMonth() + js.alg.number(months));
            return this;
        },
        
        /**
         * Sets the specified month number for the wrapped date-value.  Note that
         * JS-Date Months start at 1, instead of 0.
         * 
         * @param {Number} month
         */
        setMonth: function (month) {
            this._value.setMonth(js.alg.number(month) - 1);
            return this;
        },
        
        /**
         * Exports the month number from the wrapped element.  Note that JS-Date months
         * start at 1 instead of 0.
         */
        exportMonth: function () {
            return this._value.getMonth() + 1;
        },
        
        /**
         * Retrieves the month number from the wrapped element, and pushes the
         * value into the identified function.  Note that JS-Date months start
         * at 1 instead of 0.
         * 
         * @param {Function} fn
         *      Callback function
         */
        getMonth: function(fn) {
            js.alg.use(this, fn, [this.exportMonth()]);
            return this;
        },
        
        /**
         * Retrieves and returns the list of months (e.g. January, February, ...)
         * in the specified format.
         * 
         * @param {String} format
         */
        exportMonthList: function (format) {
            var data = { 
                "a": [], 
                "f": js.alg.string(format, "mmmm"),
                "c": this.clone() };
            
            js.alg.arrEach(__months, this._getMonthList_each, data);
            
            return data.a;
        },
        
        /** @private */
        _getMonthList_each: function (monthDef, i, months, ctx) {
            ctx.c.setMonth(i + 1);
            ctx.a.push(ctx.c.asString(ctx.f));
            return;
        },
        
        /**
         * Retrieves the list of months (e.g. January, February, ...)
         * in the specified format and pushes them into the specified
         * function.
         * 
         * @param {String} format
         * @param {Function} fn
         */
        getMonthList: function(format, fn) {
            js.alg.use(this, fn, [this.exportMonthList(format)]);
            return this;
        },
        
        /**
         * Retrieves and returns the number of months the JS-Date
         * library is configured to display.
         */
        exportMonthCount: function () {
            return __months.length;
        },
        
        /**
         * Retrieves the number of months the JS-Date library is configured
         * to display, and pushes them into the function identified in the
         * first parameter.
         * 
         * @param {Function} fn
         */
        getMonthCount: function(fn) {
            js.alg.use(this, fn, [this.exportMonthCount()]);
            return this;
        },
        
        /**
         * Adds the specified number of years to the wrapped date value.
         * 
         * @param {Number} years
         */
        addYears: function (years) {
            this._value.setFullYear(this._value.getFullYear() + js.alg.number(years));
            return this;
        },
        
        /**
         * Sets the year number to the value specified in the first parameter.
         * 
         * @param {Number} years
         */
        setYear: function (years) {
            this._value.setFullYear(js.alg.number(years));
            return this;
        },
        
        /**
         * Calculates and retrieves the value of the currently wrapped year.
         */
        exportYear: function() { 
            return this._value.getFullYear();
        },
        
        /**
         * Calculates the value of the currently wrapped year, and pushes the value
         * into the identified function.
         * 
         * @param {Function} fn
         */
        getYear: function(fn) {
            js.alg.use(this, fn, [this.exportYear()]);
            return this;
        },
        
        /**
         * Adds the specified number of seconds to the wrapped date value.
         * 
         * @param {Number} seconds
         */
        addSeconds: function (seconds) {
            this._value.setSeconds(this._value.getSeconds() + js.alg.number(seconds));
            return this;
        },
        
        /**
         * Sets the specified number of seconds in the wrapped date value.
         * 
         * @param {Number} seconds
         */
        setSeconds: function (seconds) {
            this._value.setSeconds(js.alg.number(seconds));
            return this;
        },
        
        /**
         * Calculates and returns the number of seconds past the minute in the currently
         * wrapped date value.
         */
        exportSecond: function () {
            return this._value.getSecond();
        },
        
        /**
         * Calculates the number of seconds past the minute in the currently wrapped
         * date value, and pushes the value into the identified function.
         * 
         * @param {Function} fn
         */
        getSecond: function(fn) {
            js.alg.use(this, fn, [this.exportSecond()]);
            return this;
        },
        
        /**
         * Adds the specified number of minutes to the wrapped date value.
         * 
         * @param {Number} minutes
         */
        addMinutes: function (minutes) {
            this._value.setMinutes(this._value.getMinutes() + js.alg.number(minutes));
            return this;
        },
        
        /**
         * Sets the number of minutes past the hour in the currently wrapped date value.
         * 
         * @param {Number} minutes
         */
        setMinute: function (minutes) {
            this._value.setMinutes(js.alg.number(minutes));
            return this;
        },
        
        /**
         * Calculates and returns the number of minutes past the hour in the currently
         * wrapped date value.
         */
        exportMinute: function () {
            return this._value.getMinutes();
        },
        
        /**
         * Calculates the number of minutes past the hour in the currently wrapped date
         * value, and passes teh value into the identified function.
         * 
         * @param {Function} fn
         */
        getMinute: function(fn) {
            js.alg.use(this, fn, [this.exportMinute()]);
        },
        
        /**
         * Adds the specified number of hours to the wrapped date value.
         * 
         * @param {Number} hours
         */
        addHours: function (hours) {
            this._value.setHours(this._value.getHours() + js.alg.number(hours));
            return this;
        },
        
        /**
         * Sets the specified number of hours into the day for the wrapped date
         * value.
         * 
         * @param {Number} hours
         */
        setHour: function (hours) {
            this._value.setHours(js.alg.number(hours));
            return this;
        },
        
        /**
         * Calculates and returns the number of hours into the day the currently
         * wrapped date value has.
         */
        exportHour: function () {
            return this._value.getHours();
        },
        
        /**
         * Calculates the number of hours into the day the currently wrapped date
         * value has, and pushes the value into the identified function.
         */
        getHour: function(fn) {
            js.alg.use(this, fn, [this.exportHour()]);
            return this;
        }
    };
    
    /**
     * @ignore
     */
    var __reSearchStrings = [
            "YYYY", "YY", 
            "yyyy", "yy",
            "MMMM", "MMM", "MM", "M", 
            "mmmm", "mmm", "mm", "m",
            "dddd", "ddd", "ddth","dth", "dd", "d",
            "DDDD", "DDD", "DD", "D",
            "AM", "am", 
            "HH", "H", "hh", "h", 
            "nn", "n", 
            "ss", "s",
            "xxx", "xx", "x"
        ],
        /**
         * @ignore
         */
        __reSearch = new RegExp("(\\[[^\\]]*\\]|" + __reSearchStrings.join("|") + ")", "g"),
        /**
         * @ignore
         */
        __defaultFormat = "ddd mmm d yyyy hh:mm:ss",
        /**
         * @ignore
         */
        __defaultUtc = false,
        /**
         * @ignore
         */
        __years = [
            { YY: "\\d{2}", YYYY: "\\d{4}", yy: "\\d{2}", yyyy: "\\d{4}" }
        ],
        /**
         * @ignore
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
         * @ignore
         */
        __days = [
            { d:  "1", dd: "01", dth:  "1st", ddth: "01st" }, 
            { d:  "2", dd: "02", dth:  "2nd", ddth: "02nd" }, 
            { d:  "3", dd: "03", dth:  "3rd", ddth: "03th" }, 
            { d:  "4", dd: "04", dth:  "4th", ddth: "04th" },
            { d:  "5", dd: "05", dth:  "5th", ddth: "05th" }, 
            { d:  "6", dd: "06", dth:  "6th", ddth: "06th" }, 
            { d:  "7", dd: "07", dth:  "7th", ddth: "07th" }, 
            { d:  "8", dd: "08", dth:  "8th", ddth: "08th" },
            { d:  "9", dd: "09", dth:  "9th", ddth: "09rd" }, 
            { d: "10", dd: "10", dth: "10th", ddth: "10th" }, 
            { d: "11", dd: "11", dth: "11th", ddth: "11st" }, 
            { d: "12", dd: "12", dth: "12th", ddth: "12th" },
            { d: "13", dd: "13", dth: "13th", ddth: "13th" }, 
            { d: "14", dd: "14", dth: "14th", ddth: "14th" }, 
            { d: "15", dd: "15", dth: "15th", ddth: "15th" }, 
            { d: "16", dd: "16", dth: "16th", ddth: "16th" },
            { d: "17", dd: "17", dth: "17th", ddth: "17th" }, 
            { d: "18", dd: "18", dth: "18th", ddth: "18th" }, 
            { d: "19", dd: "19", dth: "19th", ddth: "19th" }, 
            { d: "20", dd: "20", dth: "20th", ddth: "20th" },
            { d: "21", dd: "21", dth: "21st", ddth: "21th" }, 
            { d: "22", dd: "22", dth: "22nd", ddth: "22nd" }, 
            { d: "23", dd: "23", dth: "23rd", ddth: "23th" }, 
            { d: "24", dd: "24", dth: "24th", ddth: "24th" },
            { d: "25", dd: "25", dth: "25th", ddth: "25th" }, 
            { d: "26", dd: "26", dth: "26th", ddth: "26th" }, 
            { d: "27", dd: "27", dth: "27th", ddth: "27th" }, 
            { d: "28", dd: "28", dth: "28th", ddth: "28th" },
            { d: "29", dd: "29", dth: "29th", ddth: "29rd" }, 
            { d: "30", dd: "30", dth: "30th", ddth: "30th" }, 
            { d: "31", dd: "31", dth: "31st", ddth: "31st" },
        ],
        /**
         * @ignore
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
         * @ignore
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
         * @ignore
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
         * @ignore
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
         * @ignore
         */
        __timeZones = { },
        // collected definitions
        /**
         * @ignore
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
            "dth":  __buildFormatRegexStringFrom(__days,     "dth" ),
            "ddth": __buildFormatRegexStringFrom(__days,     "ddth"),
            
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
            
            // seconds
            "s":    __buildFormatRegexStringFrom(__seconds, "s"    ),
            "ss":   __buildFormatRegexStringFrom(__seconds, "ss"   ),
            
            // milliseconds
            "xxx":  true,
            "xx":   true,
            "x":    true
        };
    
    /**
     * @ignore
     * 
     * Generates a regular expression for the __formatCollection
     */
    function __buildFormatRegexStringFrom(from, style) {
        var reArray = [],
            str = null,
            rex = null,
            val = {},
            rev = {};
            
        js.alg.arrEach(from, function(collection, i) {
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
    /** @ignore */
    function __isDate(v) {
        return (v instanceof Date || Object.prototype.toString.call(v) === '[object Date]');
    }
    /** @ignore */
    function __isJsDate(v) {
        return js_date.fn.isPrototypeOf(v);
    }
    
    /** @ignore */
    function __timezoneOffset() {
        var offset = (new Date()).getTimezoneOffset(),
            hours = offset/60; // offset / minutes-per-hour
            
        return hours;
    }
    
    // create a date from a string and an array of format strings
    /** @ignore */
    function __parseString(v, f) {
        v = js.alg.string(v, "");
        var format = js.alg.string(f),
            d = { y: 0, m: 0, d: 1, h: 0, n: 0, s: 0, x: 0, a: 0 };
        
        js.alg.arrEach(format.match(__reSearch), function(match) {
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
                    value = values[value] + 1;
                case "MM":
                case "mm":
                case "M":
                case "m":
                    d["m"] = js.alg.number(value) - 1;
                    break;
                
                // date
                case "ddth":
                case "dth":
                    value = value.substr(0, value.length - 2);
                
                case "dd":
                case "d":
                    d["d"] = js.alg.number(value) || 1;
                    break;
                    
                case "hh":
                case "h":
                case "HH":
                case "H":
                    d["h"] = js.alg.number(value, 0);
                    break;
                    
                case "am":
                case "AM":
                    d["a"] = ((value === "pm" || value === "PM")
                        ? 12
                        : 0);
                    break;
                    
                case "nn":
                case "n":
                    d["n"] = js.alg.number(value, 0);
                    break;
                
                case "ss":
                case "s":
                    d["s"] = js.alg.number(value, 0);
                    break;
                    
                case "xxx":
                    d["x"] = js.alg.number(value, 0);
                    break;
                case "xx":
                    d["x"] = js.alg.number(value, 0) * 10;
                    break;
                case "x":
                    d["x"] = js.alg.number(value, 0) * 100;
            }
        });
        return new Date(d.y, d.m, d.d, d.h + d.a, d.n, d.s, d.x);
    }
    
    /** @ignore */
    function __formatDate(date, format, useUTC) {
        var d = {
            y: useUTC ? date.getUTCFullYear()     : date.getFullYear(),
            m: useUTC ? date.getUTCMonth()        : date.getMonth(),
            d: useUTC ? date.getUTCDate()         : date.getDate(),
            h: useUTC ? date.getUTCHours()        : date.getHours(),
            n: useUTC ? date.getUTCMinutes()      : date.getMinutes(),
            s: useUTC ? date.getUTCSeconds()      : date.getSeconds(),
            w: useUTC ? date.getUTCDay()          : date.getDay(),
            x: useUTC ? date.getUTCMilliseconds() : date.getMilliseconds()
        };
        
        var left = "", right = format;
        js.alg.arrEach(format.match(__reSearch), function(match) {
            // get the collection
            var collection = __formatCollection[match] || /\[[^\\]*\]/g.test(match);
            if(!collection) { return match; }
            
            // get the regexp
            var len = match.length,
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
                    value = js.alg.string(d.y, "");
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
                    
                case "dth":
                case "ddth":
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
                    
                case "nn":
                case "n":
                    value = collection.lookup[d.n];
                    break;
                    
                case "ss":
                case "s":
                    value = collection.lookup[d.s];
                    break;
                
                case "xxx":
                    value = (js.alg.string(d.x) + "00").substr(0, 3);
                    break;
                    
                case "xx":
                    value = (js.alg.string(d.x) + "0").substr(0, 2);
                    break;
                    
                case "x":
                    value = (js.alg.string(d.x)).substr(0, 1);
                    break;
                    
                default:
                    value = match.substring(1, match.length - 1);
            }
            
            left += js.alg.string(value, "");
        });
        
        return (left + right);
    }
    
    /** @ignore */
    function __getTimezoneOffset() {
        
    }
    
    
    /**
     * @private
     * 
     * Timezone List, from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones 
     */
    var __timezones = {
        "Africa/Abidjan": { CC: "CI", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Accra": { CC: "GH", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Addis_Ababa": { CC: "ET", utcOffset: 180, utcOffsetDst: 180 },
        "Africa/Algiers": { CC: "DZ", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Asmara": { CC: "ER", utcOffset: 180, utcOffsetDst: 180 },
        "Africa/Asmera": { CC: "", utcOffset: 180, utcOffsetDst: 180 },
        "Africa/Bamako": { CC: "ML", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Bangui": { CC: "CF", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Banjul": { CC: "GM", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Bissau": { CC: "GW", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Blantyre": { CC: "MW", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Brazzaville": { CC: "CG", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Bujumbura": { CC: "BI", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Cairo": { CC: "EG", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Casablanca": { CC: "MA", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Ceuta": { CC: "ES", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Conakry": { CC: "GN", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Dakar": { CC: "SN", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Dar_es_Salaam": { CC: "TZ", utcOffset: 180, utcOffsetDst: 180 },
        "Africa/Djibouti": { CC: "DJ", utcOffset: 180, utcOffsetDst: 180 },
        "Africa/Douala": { CC: "CM", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/El_Aaiun": { CC: "EH", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Freetown": { CC: "SL", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Gaborone": { CC: "BW", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Harare": { CC: "ZW", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Johannesburg": { CC: "ZA", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Juba": { CC: "SS", utcOffset: 180, utcOffsetDst: 180 },
        "Africa/Kampala": { CC: "UG", utcOffset: 180, utcOffsetDst: 180 },
        "Africa/Khartoum": { CC: "SD", utcOffset: 180, utcOffsetDst: 180 },
        "Africa/Kigali": { CC: "RW", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Kinshasa": { CC: "CD", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Lagos": { CC: "NG", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Libreville": { CC: "GA", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Lome": { CC: "TG", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Luanda": { CC: "AO", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Lubumbashi": { CC: "CD", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Lusaka": { CC: "ZM", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Malabo": { CC: "GQ", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Maputo": { CC: "MZ", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Maseru": { CC: "LS", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Mbabane": { CC: "SZ", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Mogadishu": { CC: "SO", utcOffset: 180, utcOffsetDst: 180 },
        "Africa/Monrovia": { CC: "LR", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Nairobi": { CC: "KE", utcOffset: 180, utcOffsetDst: 180 },
        "Africa/Ndjamena": { CC: "TD", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Niamey": { CC: "NE", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Nouakchott": { CC: "MR", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Ouagadougou": { CC: "BF", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Porto-Novo": { CC: "BJ", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Sao_Tome": { CC: "ST", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Timbuktu": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Africa/Tripoli": { CC: "LY", utcOffset: 120, utcOffsetDst: 120 },
        "Africa/Tunis": { CC: "TN", utcOffset: 60, utcOffsetDst: 60 },
        "Africa/Windhoek": { CC: "NA", utcOffset: 60, utcOffsetDst: 60 },
        "America/Adak": { CC: "US", utcOffset: -600, utcOffsetDst: -600 },
        "America/Anchorage": { CC: "US", utcOffset: -540, utcOffsetDst: -540 },
        "America/Anguilla": { CC: "AI", utcOffset: -240, utcOffsetDst: -240 },
        "America/Antigua": { CC: "AG", utcOffset: -240, utcOffsetDst: -240 },
        "America/Araguaina": { CC: "BR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/Buenos_Aires": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/Catamarca": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/ComodRivadavia": { CC: "", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/Cordoba": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/Jujuy": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/La_Rioja": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/Mendoza": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/Rio_Gallegos": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/Salta": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/San_Juan": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/San_Luis": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/Tucuman": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Argentina/Ushuaia": { CC: "AR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Aruba": { CC: "AW", utcOffset: -240, utcOffsetDst: -240 },
        "America/Asuncion": { CC: "PY", utcOffset: -240, utcOffsetDst: -240 },
        "America/Atikokan": { CC: "CA", utcOffset: -300, utcOffsetDst: -300 },
        "America/Atka": { CC: "", utcOffset: -600, utcOffsetDst: -600 },
        "America/Bahia": { CC: "BR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Bahia_Banderas": { CC: "MX", utcOffset: -360, utcOffsetDst: -360 },
        "America/Barbados": { CC: "BB", utcOffset: -240, utcOffsetDst: -240 },
        "America/Belem": { CC: "BR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Belize": { CC: "BZ", utcOffset: -360, utcOffsetDst: -360 },
        "America/Blanc-Sablon": { CC: "CA", utcOffset: -240, utcOffsetDst: -240 },
        "America/Boa_Vista": { CC: "BR", utcOffset: -240, utcOffsetDst: -240 },
        "America/Bogota": { CC: "CO", utcOffset: -300, utcOffsetDst: -300 },
        "America/Boise": { CC: "US", utcOffset: -420, utcOffsetDst: -420 },
        "America/Buenos_Aires": { CC: "", utcOffset: -180, utcOffsetDst: -180 },
        "America/Cambridge_Bay": { CC: "CA", utcOffset: -420, utcOffsetDst: -420 },
        "America/Campo_Grande": { CC: "BR", utcOffset: -240, utcOffsetDst: -240 },
        "America/Cancun": { CC: "MX", utcOffset: -300, utcOffsetDst: -300 },
        "America/Caracas": { CC: "VE", utcOffset: -270, utcOffsetDst: -270 },
        "America/Catamarca": { CC: "", utcOffset: -180, utcOffsetDst: -180 },
        "America/Cayenne": { CC: "GF", utcOffset: -180, utcOffsetDst: -180 },
        "America/Cayman": { CC: "KY", utcOffset: -300, utcOffsetDst: -300 },
        "America/Chicago": { CC: "US", utcOffset: -360, utcOffsetDst: -360 },
        "America/Chihuahua": { CC: "MX", utcOffset: -420, utcOffsetDst: -420 },
        "America/Coral_Harbour": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "America/Cordoba": { CC: "", utcOffset: -180, utcOffsetDst: -180 },
        "America/Costa_Rica": { CC: "CR", utcOffset: -360, utcOffsetDst: -360 },
        "America/Creston": { CC: "CA", utcOffset: -420, utcOffsetDst: -420 },
        "America/Cuiaba": { CC: "BR", utcOffset: -240, utcOffsetDst: -240 },
        "America/Curacao": { CC: "CW", utcOffset: -240, utcOffsetDst: -240 },
        "America/Danmarkshavn": { CC: "GL", utcOffset: 0, utcOffsetDst: 0 },
        "America/Dawson": { CC: "CA", utcOffset: -480, utcOffsetDst: -480 },
        "America/Dawson_Creek": { CC: "CA", utcOffset: -420, utcOffsetDst: -420 },
        "America/Denver": { CC: "US", utcOffset: -420, utcOffsetDst: -420 },
        "America/Detroit": { CC: "US", utcOffset: -300, utcOffsetDst: -300 },
        "America/Dominica": { CC: "DM", utcOffset: -240, utcOffsetDst: -240 },
        "America/Edmonton": { CC: "CA", utcOffset: -420, utcOffsetDst: -420 },
        "America/Eirunepe": { CC: "BR", utcOffset: -300, utcOffsetDst: -300 },
        "America/El_Salvador": { CC: "SV", utcOffset: -360, utcOffsetDst: -360 },
        "America/Ensenada": { CC: "", utcOffset: -480, utcOffsetDst: -480 },
        "America/Fort_Nelson": { CC: "CA", utcOffset: -420, utcOffsetDst: -420 },
        "America/Fort_Wayne": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "America/Fortaleza": { CC: "BR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Glace_Bay": { CC: "CA", utcOffset: -240, utcOffsetDst: -240 },
        "America/Godthab": { CC: "GL", utcOffset: -180, utcOffsetDst: -180 },
        "America/Goose_Bay": { CC: "CA", utcOffset: -240, utcOffsetDst: -240 },
        "America/Grand_Turk": { CC: "TC", utcOffset: -240, utcOffsetDst: -240 },
        "America/Grenada": { CC: "GD", utcOffset: -240, utcOffsetDst: -240 },
        "America/Guadeloupe": { CC: "GP", utcOffset: -240, utcOffsetDst: -240 },
        "America/Guatemala": { CC: "GT", utcOffset: -360, utcOffsetDst: -360 },
        "America/Guayaquil": { CC: "EC", utcOffset: -300, utcOffsetDst: -300 },
        "America/Guyana": { CC: "GY", utcOffset: -240, utcOffsetDst: -240 },
        "America/Halifax": { CC: "CA", utcOffset: -240, utcOffsetDst: -240 },
        "America/Havana": { CC: "CU", utcOffset: -300, utcOffsetDst: -300 },
        "America/Hermosillo": { CC: "MX", utcOffset: -420, utcOffsetDst: -420 },
        "America/Indiana/Indianapolis": { CC: "US", utcOffset: -300, utcOffsetDst: -300 },
        "America/Indiana/Knox": { CC: "US", utcOffset: -360, utcOffsetDst: -360 },
        "America/Indiana/Marengo": { CC: "US", utcOffset: -300, utcOffsetDst: -300 },
        "America/Indiana/Petersburg": { CC: "US", utcOffset: -300, utcOffsetDst: -300 },
        "America/Indiana/Tell_City": { CC: "US", utcOffset: -360, utcOffsetDst: -360 },
        "America/Indiana/Vevay": { CC: "US", utcOffset: -300, utcOffsetDst: -300 },
        "America/Indiana/Vincennes": { CC: "US", utcOffset: -300, utcOffsetDst: -300 },
        "America/Indiana/Winamac": { CC: "US", utcOffset: -300, utcOffsetDst: -300 },
        "America/Indianapolis": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "America/Inuvik": { CC: "CA", utcOffset: -420, utcOffsetDst: -420 },
        "America/Iqaluit": { CC: "CA", utcOffset: -300, utcOffsetDst: -300 },
        "America/Jamaica": { CC: "JM", utcOffset: -300, utcOffsetDst: -300 },
        "America/Jujuy": { CC: "", utcOffset: -180, utcOffsetDst: -180 },
        "America/Juneau": { CC: "US", utcOffset: -540, utcOffsetDst: -540 },
        "America/Kentucky/Louisville": { CC: "US", utcOffset: -300, utcOffsetDst: -300 },
        "America/Kentucky/Monticello": { CC: "US", utcOffset: -300, utcOffsetDst: -300 },
        "America/Knox_IN": { CC: "", utcOffset: -360, utcOffsetDst: -360 },
        "America/Kralendijk": { CC: "BQ", utcOffset: -240, utcOffsetDst: -240 },
        "America/La_Paz": { CC: "BO", utcOffset: -240, utcOffsetDst: -240 },
        "America/Lima": { CC: "PE", utcOffset: -300, utcOffsetDst: -300 },
        "America/Los_Angeles": { CC: "US", utcOffset: -480, utcOffsetDst: -480 },
        "America/Louisville": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "America/Lower_Princes": { CC: "SX", utcOffset: -240, utcOffsetDst: -240 },
        "America/Maceio": { CC: "BR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Managua": { CC: "NI", utcOffset: -360, utcOffsetDst: -360 },
        "America/Manaus": { CC: "BR", utcOffset: -240, utcOffsetDst: -240 },
        "America/Marigot": { CC: "MF", utcOffset: -240, utcOffsetDst: -240 },
        "America/Martinique": { CC: "MQ", utcOffset: -240, utcOffsetDst: -240 },
        "America/Matamoros": { CC: "MX", utcOffset: -360, utcOffsetDst: -360 },
        "America/Mazatlan": { CC: "MX", utcOffset: -420, utcOffsetDst: -420 },
        "America/Mendoza": { CC: "", utcOffset: -180, utcOffsetDst: -180 },
        "America/Menominee": { CC: "US", utcOffset: -360, utcOffsetDst: -360 },
        "America/Merida": { CC: "MX", utcOffset: -360, utcOffsetDst: -360 },
        "America/Metlakatla": { CC: "US", utcOffset: -480, utcOffsetDst: -480 },
        "America/Mexico_City": { CC: "MX", utcOffset: -360, utcOffsetDst: -360 },
        "America/Miquelon": { CC: "PM", utcOffset: -180, utcOffsetDst: -180 },
        "America/Moncton": { CC: "CA", utcOffset: -240, utcOffsetDst: -240 },
        "America/Monterrey": { CC: "MX", utcOffset: -360, utcOffsetDst: -360 },
        "America/Montevideo": { CC: "UY", utcOffset: -180, utcOffsetDst: -180 },
        "America/Montreal": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "America/Montserrat": { CC: "MS", utcOffset: -240, utcOffsetDst: -240 },
        "America/Nassau": { CC: "BS", utcOffset: -300, utcOffsetDst: -300 },
        "America/New_York": { CC: "US", utcOffset: -300, utcOffsetDst: -300 },
        "America/Nipigon": { CC: "CA", utcOffset: -300, utcOffsetDst: -300 },
        "America/Nome": { CC: "US", utcOffset: -540, utcOffsetDst: -540 },
        "America/Noronha": { CC: "BR", utcOffset: -120, utcOffsetDst: -120 },
        "America/North_Dakota/Beulah": { CC: "US", utcOffset: -360, utcOffsetDst: -360 },
        "America/North_Dakota/Center": { CC: "US", utcOffset: -360, utcOffsetDst: -360 },
        "America/North_Dakota/New_Salem": { CC: "US", utcOffset: -360, utcOffsetDst: -360 },
        "America/Ojinaga": { CC: "MX", utcOffset: -420, utcOffsetDst: -420 },
        "America/Panama": { CC: "PA", utcOffset: -300, utcOffsetDst: -300 },
        "America/Pangnirtung": { CC: "CA", utcOffset: -300, utcOffsetDst: -300 },
        "America/Paramaribo": { CC: "SR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Phoenix": { CC: "US", utcOffset: -420, utcOffsetDst: -420 },
        "America/Port_of_Spain": { CC: "TT", utcOffset: -240, utcOffsetDst: -240 },
        "America/Port-au-Prince": { CC: "HT", utcOffset: -300, utcOffsetDst: -300 },
        "America/Porto_Acre": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "America/Porto_Velho": { CC: "BR", utcOffset: -240, utcOffsetDst: -240 },
        "America/Puerto_Rico": { CC: "PR", utcOffset: -240, utcOffsetDst: -240 },
        "America/Rainy_River": { CC: "CA", utcOffset: -360, utcOffsetDst: -360 },
        "America/Rankin_Inlet": { CC: "CA", utcOffset: -360, utcOffsetDst: -360 },
        "America/Recife": { CC: "BR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Regina": { CC: "CA", utcOffset: -360, utcOffsetDst: -360 },
        "America/Resolute": { CC: "CA", utcOffset: -360, utcOffsetDst: -360 },
        "America/Rio_Branco": { CC: "BR", utcOffset: -300, utcOffsetDst: -300 },
        "America/Rosario": { CC: "", utcOffset: -180, utcOffsetDst: -180 },
        "America/Santa_Isabel": { CC: "MX", utcOffset: -480, utcOffsetDst: -480 },
        "America/Santarem": { CC: "BR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Santiago": { CC: "CL", utcOffset: -180, utcOffsetDst: -180 },
        "America/Santo_Domingo": { CC: "DO", utcOffset: -240, utcOffsetDst: -240 },
        "America/Sao_Paulo": { CC: "BR", utcOffset: -180, utcOffsetDst: -180 },
        "America/Scoresbysund": { CC: "GL", utcOffset: -60, utcOffsetDst: 60 },
        "America/Shiprock": { CC: "", utcOffset: -420, utcOffsetDst: -420 },
        "America/Sitka": { CC: "US", utcOffset: -540, utcOffsetDst: -540 },
        "America/St_Barthelemy": { CC: "BL", utcOffset: -240, utcOffsetDst: -240 },
        "America/St_Johns": { CC: "CA", utcOffset: -210, utcOffsetDst: -210 },
        "America/St_Kitts": { CC: "KN", utcOffset: -240, utcOffsetDst: -240 },
        "America/St_Lucia": { CC: "LC", utcOffset: -240, utcOffsetDst: -240 },
        "America/St_Thomas": { CC: "VI", utcOffset: -240, utcOffsetDst: -240 },
        "America/St_Vincent": { CC: "VC", utcOffset: -240, utcOffsetDst: -240 },
        "America/Swift_Current": { CC: "CA", utcOffset: -360, utcOffsetDst: -360 },
        "America/Tegucigalpa": { CC: "HN", utcOffset: -360, utcOffsetDst: -360 },
        "America/Thule": { CC: "GL", utcOffset: -240, utcOffsetDst: -240 },
        "America/Thunder_Bay": { CC: "CA", utcOffset: -300, utcOffsetDst: -300 },
        "America/Tijuana": { CC: "MX", utcOffset: -480, utcOffsetDst: -480 },
        "America/Toronto": { CC: "CA", utcOffset: -300, utcOffsetDst: -300 },
        "America/Tortola": { CC: "VG", utcOffset: -240, utcOffsetDst: -240 },
        "America/Vancouver": { CC: "CA", utcOffset: -480, utcOffsetDst: -480 },
        "America/Virgin": { CC: "", utcOffset: -240, utcOffsetDst: -240 },
        "America/Whitehorse": { CC: "CA", utcOffset: -480, utcOffsetDst: -480 },
        "America/Winnipeg": { CC: "CA", utcOffset: -360, utcOffsetDst: -360 },
        "America/Yakutat": { CC: "US", utcOffset: -540, utcOffsetDst: -540 },
        "America/Yellowknife": { CC: "CA", utcOffset: -420, utcOffsetDst: -420 },
        "Antarctica/Casey": { CC: "AQ", utcOffset: 480, utcOffsetDst: 480 },
        "Antarctica/Davis": { CC: "AQ", utcOffset: 420, utcOffsetDst: 420 },
        "Antarctica/DumontDUrville": { CC: "AQ", utcOffset: 600, utcOffsetDst: 600 },
        "Antarctica/Macquarie": { CC: "AU", utcOffset: 660, utcOffsetDst: 660 },
        "Antarctica/Mawson": { CC: "AQ", utcOffset: 300, utcOffsetDst: 300 },
        "Antarctica/McMurdo": { CC: "AQ", utcOffset: 720, utcOffsetDst: 720 },
        "Antarctica/Palmer": { CC: "AQ", utcOffset: -180, utcOffsetDst: -180 },
        "Antarctica/Rothera": { CC: "AQ", utcOffset: -180, utcOffsetDst: -180 },
        "Antarctica/South_Pole": { CC: "", utcOffset: 720, utcOffsetDst: 720 },
        "Antarctica/Syowa": { CC: "AQ", utcOffset: 180, utcOffsetDst: 180 },
        "Antarctica/Troll": { CC: "AQ", utcOffset: 0, utcOffsetDst: 0 },
        "Antarctica/Vostok": { CC: "AQ", utcOffset: 360, utcOffsetDst: 360 },
        "Arctic/Longyearbyen": { CC: "SJ", utcOffset: 60, utcOffsetDst: 60 },
        "Asia/Aden": { CC: "YE", utcOffset: 180, utcOffsetDst: 180 },
        "Asia/Almaty": { CC: "KZ", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Amman": { CC: "JO", utcOffset: 120, utcOffsetDst: 120 },
        "Asia/Anadyr": { CC: "RU", utcOffset: 720, utcOffsetDst: 720 },
        "Asia/Aqtau": { CC: "KZ", utcOffset: 300, utcOffsetDst: 300 },
        "Asia/Aqtobe": { CC: "KZ", utcOffset: 300, utcOffsetDst: 300 },
        "Asia/Ashgabat": { CC: "TM", utcOffset: 300, utcOffsetDst: 300 },
        "Asia/Ashkhabad": { CC: "", utcOffset: 300, utcOffsetDst: 300 },
        "Asia/Baghdad": { CC: "IQ", utcOffset: 180, utcOffsetDst: 180 },
        "Asia/Bahrain": { CC: "BH", utcOffset: 180, utcOffsetDst: 180 },
        "Asia/Baku": { CC: "AZ", utcOffset: 240, utcOffsetDst: 240 },
        "Asia/Bangkok": { CC: "TH", utcOffset: 420, utcOffsetDst: 420 },
        "Asia/Beirut": { CC: "LB", utcOffset: 120, utcOffsetDst: 120 },
        "Asia/Bishkek": { CC: "KG", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Brunei": { CC: "BN", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Calcutta": { CC: "", utcOffset: 330, utcOffsetDst: 330 },
        "Asia/Chita": { CC: "RU", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Choibalsan": { CC: "MN", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Chongqing": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Chungking": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Colombo": { CC: "LK", utcOffset: 330, utcOffsetDst: 330 },
        "Asia/Dacca": { CC: "", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Damascus": { CC: "SY", utcOffset: 120, utcOffsetDst: 120 },
        "Asia/Dhaka": { CC: "BD", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Dili": { CC: "TL", utcOffset: 540, utcOffsetDst: 540 },
        "Asia/Dubai": { CC: "AE", utcOffset: 240, utcOffsetDst: 240 },
        "Asia/Dushanbe": { CC: "TJ", utcOffset: 300, utcOffsetDst: 300 },
        "Asia/Gaza": { CC: "PS", utcOffset: 120, utcOffsetDst: 120 },
        "Asia/Harbin": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Hebron": { CC: "PS", utcOffset: 120, utcOffsetDst: 120 },
        "Asia/Ho_Chi_Minh": { CC: "VN", utcOffset: 420, utcOffsetDst: 420 },
        "Asia/Hong_Kong": { CC: "HK", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Hovd": { CC: "MN", utcOffset: 420, utcOffsetDst: 420 },
        "Asia/Irkutsk": { CC: "RU", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Istanbul": { CC: "", utcOffset: 120, utcOffsetDst: 120 },
        "Asia/Jakarta": { CC: "ID", utcOffset: 420, utcOffsetDst: 420 },
        "Asia/Jayapura": { CC: "ID", utcOffset: 540, utcOffsetDst: 540 },
        "Asia/Jerusalem": { CC: "IL", utcOffset: 120, utcOffsetDst: 120 },
        "Asia/Kabul": { CC: "AF", utcOffset: 270, utcOffsetDst: 270 },
        "Asia/Kamchatka": { CC: "RU", utcOffset: 720, utcOffsetDst: 720 },
        "Asia/Karachi": { CC: "PK", utcOffset: 300, utcOffsetDst: 300 },
        "Asia/Kashgar": { CC: "", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Kathmandu": { CC: "NP", utcOffset: 345, utcOffsetDst: 345 },
        "Asia/Katmandu": { CC: "", utcOffset: 345, utcOffsetDst: 345 },
        "Asia/Khandyga": { CC: "RU", utcOffset: 540, utcOffsetDst: 540 },
        "Asia/Kolkata": { CC: "IN", utcOffset: 330, utcOffsetDst: 330 },
        "Asia/Krasnoyarsk": { CC: "RU", utcOffset: 420, utcOffsetDst: 420 },
        "Asia/Kuala_Lumpur": { CC: "MY", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Kuching": { CC: "MY", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Kuwait": { CC: "KW", utcOffset: 180, utcOffsetDst: 180 },
        "Asia/Macao": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Macau": { CC: "MO", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Magadan": { CC: "RU", utcOffset: 600, utcOffsetDst: 600 },
        "Asia/Makassar": { CC: "ID", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Manila": { CC: "PH", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Muscat": { CC: "OM", utcOffset: 240, utcOffsetDst: 240 },
        "Asia/Nicosia": { CC: "CY", utcOffset: 120, utcOffsetDst: 120 },
        "Asia/Novokuznetsk": { CC: "RU", utcOffset: 420, utcOffsetDst: 420 },
        "Asia/Novosibirsk": { CC: "RU", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Omsk": { CC: "RU", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Oral": { CC: "KZ", utcOffset: 300, utcOffsetDst: 300 },
        "Asia/Phnom_Penh": { CC: "KH", utcOffset: 420, utcOffsetDst: 420 },
        "Asia/Pontianak": { CC: "ID", utcOffset: 420, utcOffsetDst: 420 },
        "Asia/Pyongyang": { CC: "KP", utcOffset: 510, utcOffsetDst: 510 },
        "Asia/Qatar": { CC: "QA", utcOffset: 180, utcOffsetDst: 180 },
        "Asia/Qyzylorda": { CC: "KZ", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Rangoon": { CC: "MM", utcOffset: 390, utcOffsetDst: 390 },
        "Asia/Riyadh": { CC: "SA", utcOffset: 180, utcOffsetDst: 180 },
        "Asia/Saigon": { CC: "", utcOffset: 420, utcOffsetDst: 420 },
        "Asia/Sakhalin": { CC: "RU", utcOffset: 600, utcOffsetDst: 600 },
        "Asia/Samarkand": { CC: "UZ", utcOffset: 300, utcOffsetDst: 300 },
        "Asia/Seoul": { CC: "KR", utcOffset: 540, utcOffsetDst: 540 },
        "Asia/Shanghai": { CC: "CN", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Singapore": { CC: "SG", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Srednekolymsk": { CC: "RU", utcOffset: 660, utcOffsetDst: 660 },
        "Asia/Taipei": { CC: "TW", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Tashkent": { CC: "UZ", utcOffset: 300, utcOffsetDst: 300 },
        "Asia/Tbilisi": { CC: "GE", utcOffset: 240, utcOffsetDst: 240 },
        "Asia/Tehran": { CC: "IR", utcOffset: 210, utcOffsetDst: 210 },
        "Asia/Tel_Aviv": { CC: "", utcOffset: 120, utcOffsetDst: 120 },
        "Asia/Thimbu": { CC: "", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Thimphu": { CC: "BT", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Tokyo": { CC: "JP", utcOffset: 540, utcOffsetDst: 540 },
        "Asia/Ujung_Pandang": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Ulaanbaatar": { CC: "MN", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Ulan_Bator": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "Asia/Urumqi": { CC: "CN", utcOffset: 360, utcOffsetDst: 360 },
        "Asia/Ust-Nera": { CC: "RU", utcOffset: 600, utcOffsetDst: 600 },
        "Asia/Vientiane": { CC: "LA", utcOffset: 420, utcOffsetDst: 420 },
        "Asia/Vladivostok": { CC: "RU", utcOffset: 600, utcOffsetDst: 600 },
        "Asia/Yakutsk": { CC: "RU", utcOffset: 540, utcOffsetDst: 540 },
        "Asia/Yekaterinburg": { CC: "RU", utcOffset: 300, utcOffsetDst: 300 },
        "Asia/Yerevan": { CC: "AM", utcOffset: 240, utcOffsetDst: 240 },
        "Atlantic/Azores": { CC: "PT", utcOffset: -60, utcOffsetDst: 60 },
        "Atlantic/Bermuda": { CC: "BM", utcOffset: -240, utcOffsetDst: -240 },
        "Atlantic/Canary": { CC: "ES", utcOffset: 0, utcOffsetDst: 0 },
        "Atlantic/Cape_Verde": { CC: "CV", utcOffset: -60, utcOffsetDst: -60 },
        "Atlantic/Faeroe": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Atlantic/Faroe": { CC: "FO", utcOffset: 0, utcOffsetDst: 0 },
        "Atlantic/Jan_Mayen": { CC: "", utcOffset: 60, utcOffsetDst: 60 },
        "Atlantic/Madeira": { CC: "PT", utcOffset: 0, utcOffsetDst: 0 },
        "Atlantic/Reykjavik": { CC: "IS", utcOffset: 0, utcOffsetDst: 0 },
        "Atlantic/South_Georgia": { CC: "GS", utcOffset: -120, utcOffsetDst: -120 },
        "Atlantic/St_Helena": { CC: "SH", utcOffset: 0, utcOffsetDst: 0 },
        "Atlantic/Stanley": { CC: "FK", utcOffset: -180, utcOffsetDst: -180 },
        "Australia/ACT": { CC: "", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/Adelaide": { CC: "AU", utcOffset: 570, utcOffsetDst: 570 },
        "Australia/Brisbane": { CC: "AU", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/Broken_Hill": { CC: "AU", utcOffset: 570, utcOffsetDst: 570 },
        "Australia/Canberra": { CC: "", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/Currie": { CC: "AU", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/Darwin": { CC: "AU", utcOffset: 570, utcOffsetDst: 570 },
        "Australia/Eucla": { CC: "AU", utcOffset: 525, utcOffsetDst: 525 },
        "Australia/Hobart": { CC: "AU", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/LHI": { CC: "", utcOffset: 630, utcOffsetDst: 600 },
        "Australia/Lindeman": { CC: "AU", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/Lord_Howe": { CC: "AU", utcOffset: 630, utcOffsetDst: 600 },
        "Australia/Melbourne": { CC: "AU", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/North": { CC: "", utcOffset: 570, utcOffsetDst: 570 },
        "Australia/NSW": { CC: "", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/Perth": { CC: "AU", utcOffset: 480, utcOffsetDst: 480 },
        "Australia/Queensland": { CC: "", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/South": { CC: "", utcOffset: 570, utcOffsetDst: 570 },
        "Australia/Sydney": { CC: "AU", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/Tasmania": { CC: "", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/Victoria": { CC: "", utcOffset: 600, utcOffsetDst: 600 },
        "Australia/West": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "Australia/Yancowinna": { CC: "", utcOffset: 570, utcOffsetDst: 570 },
        "Brazil/Acre": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "Brazil/DeNoronha": { CC: "", utcOffset: -120, utcOffsetDst: -120 },
        "Brazil/East": { CC: "", utcOffset: -180, utcOffsetDst: -180 },
        "Brazil/West": { CC: "", utcOffset: -240, utcOffsetDst: -240 },
        "Canada/Atlantic": { CC: "", utcOffset: -240, utcOffsetDst: -240 },
        "Canada/Central": { CC: "", utcOffset: -360, utcOffsetDst: -360 },
        "Canada/Eastern": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "Canada/East-Saskatchewan": { CC: "", utcOffset: -360, utcOffsetDst: -360 },
        "Canada/Mountain": { CC: "", utcOffset: -420, utcOffsetDst: -420 },
        "Canada/Newfoundland": { CC: "", utcOffset: -210, utcOffsetDst: -210 },
        "Canada/Pacific": { CC: "", utcOffset: -480, utcOffsetDst: -480 },
        "Canada/Saskatchewan": { CC: "", utcOffset: -360, utcOffsetDst: -360 },
        "Canada/Yukon": { CC: "", utcOffset: -480, utcOffsetDst: -480 },
        "CET": { CC: "", utcOffset: 60, utcOffsetDst: 60 },
        "Chile/Continental": { CC: "", utcOffset: -180, utcOffsetDst: -180 },
        "Chile/EasterIsland": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "CST6CDT": { CC: "", utcOffset: -360, utcOffsetDst: -360 },
        "Cuba": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "EET": { CC: "", utcOffset: 120, utcOffsetDst: 120 },
        "Egypt": { CC: "", utcOffset: 120, utcOffsetDst: 120 },
        "Eire": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "EST": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "EST5EDT": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "Etc/GMT": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Etc/GMT+0": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Etc/GMT+1": { CC: "", utcOffset: -60, utcOffsetDst: -60 },
        "Etc/GMT+10": { CC: "", utcOffset: -600, utcOffsetDst: -600 },
        "Etc/GMT+11": { CC: "", utcOffset: -660, utcOffsetDst: -660 },
        "Etc/GMT+12": { CC: "", utcOffset: -720, utcOffsetDst: -720 },
        "Etc/GMT+2": { CC: "", utcOffset: -120, utcOffsetDst: -120 },
        "Etc/GMT+3": { CC: "", utcOffset: -180, utcOffsetDst: -180 },
        "Etc/GMT+4": { CC: "", utcOffset: -240, utcOffsetDst: -240 },
        "Etc/GMT+5": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "Etc/GMT+6": { CC: "", utcOffset: -360, utcOffsetDst: -360 },
        "Etc/GMT+7": { CC: "", utcOffset: -420, utcOffsetDst: -420 },
        "Etc/GMT+8": { CC: "", utcOffset: -480, utcOffsetDst: -480 },
        "Etc/GMT+9": { CC: "", utcOffset: -540, utcOffsetDst: -540 },
        "Etc/GMT0": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Etc/GMT-0": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Etc/GMT-1": { CC: "", utcOffset: 60, utcOffsetDst: 60 },
        "Etc/GMT-10": { CC: "", utcOffset: 600, utcOffsetDst: 600 },
        "Etc/GMT-11": { CC: "", utcOffset: 660, utcOffsetDst: 660 },
        "Etc/GMT-12": { CC: "", utcOffset: 720, utcOffsetDst: 720 },
        "Etc/GMT-13": { CC: "", utcOffset: 780, utcOffsetDst: 780 },
        "Etc/GMT-14": { CC: "", utcOffset: 840, utcOffsetDst: 840 },
        "Etc/GMT-2": { CC: "", utcOffset: 120, utcOffsetDst: 120 },
        "Etc/GMT-3": { CC: "", utcOffset: 180, utcOffsetDst: 180 },
        "Etc/GMT-4": { CC: "", utcOffset: 240, utcOffsetDst: 240 },
        "Etc/GMT-5": { CC: "", utcOffset: 300, utcOffsetDst: 300 },
        "Etc/GMT-6": { CC: "", utcOffset: 360, utcOffsetDst: 360 },
        "Etc/GMT-7": { CC: "", utcOffset: 420, utcOffsetDst: 420 },
        "Etc/GMT-8": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "Etc/GMT-9": { CC: "", utcOffset: 540, utcOffsetDst: 540 },
        "Etc/Greenwich": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Etc/UCT": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Etc/Universal": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Etc/UTC": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Etc/Zulu": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Europe/Amsterdam": { CC: "NL", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Andorra": { CC: "AD", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Athens": { CC: "GR", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Belfast": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Europe/Belgrade": { CC: "RS", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Berlin": { CC: "DE", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Bratislava": { CC: "SK", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Brussels": { CC: "BE", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Bucharest": { CC: "RO", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Budapest": { CC: "HU", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Busingen": { CC: "DE", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Chisinau": { CC: "MD", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Copenhagen": { CC: "DK", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Dublin": { CC: "IE", utcOffset: 0, utcOffsetDst: 0 },
        "Europe/Gibraltar": { CC: "GI", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Guernsey": { CC: "GG", utcOffset: 0, utcOffsetDst: 0 },
        "Europe/Helsinki": { CC: "FI", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Isle_of_Man": { CC: "IM", utcOffset: 0, utcOffsetDst: 0 },
        "Europe/Istanbul": { CC: "TR", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Jersey": { CC: "JE", utcOffset: 0, utcOffsetDst: 0 },
        "Europe/Kaliningrad": { CC: "RU", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Kiev": { CC: "UA", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Lisbon": { CC: "PT", utcOffset: 0, utcOffsetDst: 0 },
        "Europe/Ljubljana": { CC: "SI", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/London": { CC: "GB", utcOffset: 0, utcOffsetDst: 0 },
        "Europe/Luxembourg": { CC: "LU", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Madrid": { CC: "ES", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Malta": { CC: "MT", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Mariehamn": { CC: "AX", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Minsk": { CC: "BY", utcOffset: 180, utcOffsetDst: 180 },
        "Europe/Monaco": { CC: "MC", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Moscow": { CC: "RU", utcOffset: 180, utcOffsetDst: 180 },
        "Europe/Nicosia": { CC: "", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Oslo": { CC: "NO", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Paris": { CC: "FR", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Podgorica": { CC: "ME", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Prague": { CC: "CZ", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Riga": { CC: "LV", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Rome": { CC: "IT", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Samara": { CC: "RU", utcOffset: 240, utcOffsetDst: 240 },
        "Europe/San_Marino": { CC: "SM", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Sarajevo": { CC: "BA", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Simferopol": { CC: "UA", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Skopje": { CC: "MK", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Sofia": { CC: "BG", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Stockholm": { CC: "SE", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Tallinn": { CC: "EE", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Tirane": { CC: "AL", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Tiraspol": { CC: "", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Uzhgorod": { CC: "UA", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Vaduz": { CC: "LI", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Vatican": { CC: "VA", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Vienna": { CC: "AT", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Vilnius": { CC: "LT", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Volgograd": { CC: "RU", utcOffset: 180, utcOffsetDst: 180 },
        "Europe/Warsaw": { CC: "PL", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Zagreb": { CC: "HR", utcOffset: 60, utcOffsetDst: 60 },
        "Europe/Zaporozhye": { CC: "UA", utcOffset: 120, utcOffsetDst: 120 },
        "Europe/Zurich": { CC: "CH", utcOffset: 60, utcOffsetDst: 60 },
        "GB": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "GB-Eire": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "GMT": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "GMT+0": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "GMT0": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "GMT-0": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Greenwich": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Hongkong": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "HST": { CC: "", utcOffset: -600, utcOffsetDst: -600 },
        "Iceland": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Indian/Antananarivo": { CC: "MG", utcOffset: 180, utcOffsetDst: 180 },
        "Indian/Chagos": { CC: "IO", utcOffset: 360, utcOffsetDst: 360 },
        "Indian/Christmas": { CC: "CX", utcOffset: 420, utcOffsetDst: 420 },
        "Indian/Cocos": { CC: "CC", utcOffset: 390, utcOffsetDst: 390 },
        "Indian/Comoro": { CC: "KM", utcOffset: 180, utcOffsetDst: 180 },
        "Indian/Kerguelen": { CC: "TF", utcOffset: 300, utcOffsetDst: 300 },
        "Indian/Mahe": { CC: "SC", utcOffset: 240, utcOffsetDst: 240 },
        "Indian/Maldives": { CC: "MV", utcOffset: 300, utcOffsetDst: 300 },
        "Indian/Mauritius": { CC: "MU", utcOffset: 240, utcOffsetDst: 240 },
        "Indian/Mayotte": { CC: "YT", utcOffset: 180, utcOffsetDst: 180 },
        "Indian/Reunion": { CC: "RE", utcOffset: 240, utcOffsetDst: 240 },
        "Iran": { CC: "", utcOffset: 210, utcOffsetDst: 210 },
        "Israel": { CC: "", utcOffset: 120, utcOffsetDst: 120 },
        "Jamaica": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "Japan": { CC: "", utcOffset: 540, utcOffsetDst: 540 },
        "Kwajalein": { CC: "", utcOffset: 720, utcOffsetDst: 720 },
        "Libya": { CC: "", utcOffset: 120, utcOffsetDst: 120 },
        "MET": { CC: "", utcOffset: 60, utcOffsetDst: 60 },
        "Mexico/BajaNorte": { CC: "", utcOffset: -480, utcOffsetDst: -480 },
        "Mexico/BajaSur": { CC: "", utcOffset: -420, utcOffsetDst: -420 },
        "Mexico/General": { CC: "", utcOffset: -360, utcOffsetDst: -360 },
        "MST": { CC: "", utcOffset: -420, utcOffsetDst: -420 },
        "MST7MDT": { CC: "", utcOffset: -420, utcOffsetDst: -420 },
        "Navajo": { CC: "", utcOffset: -420, utcOffsetDst: -420 },
        "NZ": { CC: "", utcOffset: 720, utcOffsetDst: 720 },
        "NZ-CHAT": { CC: "", utcOffset: 765, utcOffsetDst: 765 },
        "Pacific/Apia": { CC: "WS", utcOffset: 780, utcOffsetDst: 780 },
        "Pacific/Auckland": { CC: "NZ", utcOffset: 720, utcOffsetDst: 720 },
        "Pacific/Bougainville": { CC: "PG", utcOffset: 660, utcOffsetDst: 660 },
        "Pacific/Chatham": { CC: "NZ", utcOffset: 765, utcOffsetDst: 765 },
        "Pacific/Chuuk": { CC: "FM", utcOffset: 600, utcOffsetDst: 600 },
        "Pacific/Easter": { CC: "CL", utcOffset: -300, utcOffsetDst: -300 },
        "Pacific/Efate": { CC: "VU", utcOffset: 660, utcOffsetDst: 660 },
        "Pacific/Enderbury": { CC: "KI", utcOffset: 780, utcOffsetDst: 780 },
        "Pacific/Fakaofo": { CC: "TK", utcOffset: 780, utcOffsetDst: 780 },
        "Pacific/Fiji": { CC: "FJ", utcOffset: 720, utcOffsetDst: 720 },
        "Pacific/Funafuti": { CC: "TV", utcOffset: 720, utcOffsetDst: 720 },
        "Pacific/Galapagos": { CC: "EC", utcOffset: -360, utcOffsetDst: -360 },
        "Pacific/Gambier": { CC: "PF", utcOffset: -540, utcOffsetDst: -540 },
        "Pacific/Guadalcanal": { CC: "SB", utcOffset: 660, utcOffsetDst: 660 },
        "Pacific/Guam": { CC: "GU", utcOffset: 600, utcOffsetDst: 600 },
        "Pacific/Honolulu": { CC: "US", utcOffset: -600, utcOffsetDst: -600 },
        "Pacific/Johnston": { CC: "UM", utcOffset: -600, utcOffsetDst: -600 },
        "Pacific/Kiritimati": { CC: "KI", utcOffset: 840, utcOffsetDst: 840 },
        "Pacific/Kosrae": { CC: "FM", utcOffset: 660, utcOffsetDst: 660 },
        "Pacific/Kwajalein": { CC: "MH", utcOffset: 720, utcOffsetDst: 720 },
        "Pacific/Majuro": { CC: "MH", utcOffset: 720, utcOffsetDst: 720 },
        "Pacific/Marquesas": { CC: "PF", utcOffset: -570, utcOffsetDst: -570 },
        "Pacific/Midway": { CC: "UM", utcOffset: -660, utcOffsetDst: -660 },
        "Pacific/Nauru": { CC: "NR", utcOffset: 720, utcOffsetDst: 720 },
        "Pacific/Niue": { CC: "NU", utcOffset: -660, utcOffsetDst: -660 },
        "Pacific/Norfolk": { CC: "NF", utcOffset: 660, utcOffsetDst: 660 },
        "Pacific/Noumea": { CC: "NC", utcOffset: 660, utcOffsetDst: 660 },
        "Pacific/Pago_Pago": { CC: "AS", utcOffset: -660, utcOffsetDst: -660 },
        "Pacific/Palau": { CC: "PW", utcOffset: 540, utcOffsetDst: 540 },
        "Pacific/Pitcairn": { CC: "PN", utcOffset: -480, utcOffsetDst: -480 },
        "Pacific/Pohnpei": { CC: "FM", utcOffset: 660, utcOffsetDst: 660 },
        "Pacific/Ponape": { CC: "", utcOffset: 660, utcOffsetDst: 660 },
        "Pacific/Port_Moresby": { CC: "PG", utcOffset: 600, utcOffsetDst: 600 },
        "Pacific/Rarotonga": { CC: "CK", utcOffset: -600, utcOffsetDst: -600 },
        "Pacific/Saipan": { CC: "MP", utcOffset: 600, utcOffsetDst: 600 },
        "Pacific/Samoa": { CC: "", utcOffset: -660, utcOffsetDst: -660 },
        "Pacific/Tahiti": { CC: "PF", utcOffset: -600, utcOffsetDst: -600 },
        "Pacific/Tarawa": { CC: "KI", utcOffset: 720, utcOffsetDst: 720 },
        "Pacific/Tongatapu": { CC: "TO", utcOffset: 780, utcOffsetDst: 780 },
        "Pacific/Truk": { CC: "", utcOffset: 600, utcOffsetDst: 600 },
        "Pacific/Wake": { CC: "UM", utcOffset: 720, utcOffsetDst: 720 },
        "Pacific/Wallis": { CC: "WF", utcOffset: 720, utcOffsetDst: 720 },
        "Pacific/Yap": { CC: "", utcOffset: 600, utcOffsetDst: 600 },
        "Poland": { CC: "", utcOffset: 60, utcOffsetDst: 60 },
        "Portugal": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "PRC": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "PST8PDT": { CC: "", utcOffset: -480, utcOffsetDst: -480 },
        "ROC": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "ROK": { CC: "", utcOffset: 540, utcOffsetDst: 540 },
        "Singapore": { CC: "", utcOffset: 480, utcOffsetDst: 480 },
        "Turkey": { CC: "", utcOffset: 120, utcOffsetDst: 120 },
        "UCT": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "Universal": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "US/Alaska": { CC: "", utcOffset: -540, utcOffsetDst: -540 },
        "US/Aleutian": { CC: "", utcOffset: -600, utcOffsetDst: -600 },
        "US/Arizona": { CC: "", utcOffset: -420, utcOffsetDst: -420 },
        "US/Central": { CC: "", utcOffset: -360, utcOffsetDst: -360 },
        "US/Eastern": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "US/East-Indiana": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "US/Hawaii": { CC: "", utcOffset: -600, utcOffsetDst: -600 },
        "US/Indiana-Starke": { CC: "", utcOffset: -360, utcOffsetDst: -360 },
        "US/Michigan": { CC: "", utcOffset: -300, utcOffsetDst: -300 },
        "US/Mountain": { CC: "", utcOffset: -420, utcOffsetDst: -420 },
        "US/Pacific": { CC: "", utcOffset: -480, utcOffsetDst: -480 },
        "US/Pacific-New": { CC: "", utcOffset: -480, utcOffsetDst: -480 },
        "US/Samoa": { CC: "", utcOffset: -660, utcOffsetDst: -660 },
        "UTC": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "WET": { CC: "", utcOffset: 0, utcOffsetDst: 0 },
        "W-SU": { CC: "", utcOffset: 180, utcOffsetDst: 180 },
        "Zulu": { CC: "", utcOffset: 0, utcOffsetDst: 0 }
    };
    
    return js_date;
});
