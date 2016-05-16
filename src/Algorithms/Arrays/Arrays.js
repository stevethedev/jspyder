import {Browser} from "Environment/Browser";
import {BROWSER_IE, BROWSER_EDGE, BROWSER_FIREFOX} from "Environment/BrowserData";
import {Numbers} from "Algorithms/Numbers/Numbers";

const MAX_CHUNK_SIZE = 8192;
const ARRAY_PROTOTYPE = window["Array"]["prototype"];
const ARRAY_SLICE = ARRAY_PROTOTYPE["slice"];
const ARRAY_PUSH = ARRAY_PROTOTYPE["push"];
const ARRAY = window["Array"];

/**
 * Collection of Array-related functions
 */
export class Arrays {
    /**
     * Profile: O(n)
     */
    static Slice(array = [], ...sliceArgs) {
        try {
            array = ARRAY_SLICE.apply(array, sliceArgs);
        }
        catch(error) {
            array = [];
        }

        return array;
    }

    /**
     * Profile: (browser-dependent)
     */
    static SortArrayNumbers(array, ascending) {
        array = Arrays.ToArray(array);
        array.sort(function(left, right) {
            left = Numbers.ToNumber(left);
            right = Numbers.ToNumber(right);

            if(ascending) {
                return left - right;
            }
            else {
                return right - left;
            }
        });

        return array;
    }

    /**
     * Profile: (browser-dependent)
     */
    static SortArrayObjects(array, ascending, ...fields) {
        array = Arrays.ToArray(array);

        array.sort(Arrays.GetBestSortArrayObjectFunction(
                ascending, fields));

        return array;
    }

    /**
     * @return {function(Object,Object):(number|boolean)}
     */
    static GetBestSortArrayObjectFunction(ascending, fields) {
        switch(Browser.name) {
            case BROWSER_FIREFOX: // Firefox can use a shortcut function
                return function(left, right) {
                    for(let i = 0; left && right && i < fields.length; ++i) {
                        left = left[fields[i]];
                        right = right[fields[i]];
                    }

                    return (ascending ? left >= right : left <= right);
                };

            // Internet Explorer needs numerical values
            case BROWSER_IE:
            case BROWSER_EDGE:
            default:
                return function(left, right) {
                    for(let i = 0; left && right && i < fields.length; ++i) {
                        left = left[fields[i]];
                        right = right[fields[i]];
                    }

                    var a = (ascending ? left : right);
                    var b = (ascending ? right : left);

                    if(a > b) {
                        return 1;
                    }
                    else if(a < b) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                };
        }
    }

    /**
     * Profile: O(m*n)
     */
    static WidePush(intoArray, fromArray) {
        for(let i = 0, end = fromArray.length; i < end; i += MAX_CHUNK_SIZE) {
            let chunkEnd = window.Math.min(i + MAX_CHUNK_SIZE, end);
            let chunk = Arrays.Slice(fromArray, i, chunkEnd);
            ARRAY_PUSH.apply(intoArray, chunk);
        }
    }

    /**
     * Profile: O(1)
     */
    static ToArray(value, defaultValue) {
        if(ARRAY.isArray(value)) {
            return value;
        }
        else {
            return defaultValue;
        }
    }
}