import {JSObject} from "JSObject";

import {Arrays} from "Algorithms/Arrays/Arrays";
import {ArraysInterface} from "Algorithms/Arrays/ArraysInterface";

import {Booleans} from "Algorithms/Booleans/Booleans";
import {BooleansInterface} from "Algorithms/Booleans/BooleansInterface";

import {Dates} from "Algorithms/Dates/Dates";
import {DatesInterface} from "Algorithms/Dates/DatesInterface";

import {Functions} from "Algorithms/Functions/Functions";
import {FunctionsInterface} from "Algorithms/Functions/FunctionsInterface";

import {KeyCodes} from "Algorithms/KeyCodes/KeyCodes";
import {KeyCodesInterface} from "Algorithms/KeyCodes/KeyCodesInterface";

import {Looper} from "Algorithms/Looper/Looper";
import {LooperInterface} from "Algorithms/Looper/LooperInterface";

import {Numbers} from "Algorithms/Numbers/Numbers";
import {NumbersInterface} from "Algorithms/Numbers/NumbersInterface";

import {Objects} from "Algorithms/Objects/Objects";
import {ObjectsInterface} from "Algorithms/Objects/ObjectsInterface";

import {Strings} from "Algorithms/Strings/Strings";
import {StringsInterface} from "Algorithms/Strings/StringsInterface";

/**
 * JSpyder Algorithm Class
 *
 * @class
 * 
 * @implements {FunctionsInterface}
 * @implements {NumbersInterface}
 *
 * @inheritDoc
 */
export class JSAlgorithms extends JSObject {
    // ArraysInterface

    // FunctionsInterface
    use(context, functionReference, argsArray = []) {
        return Functions.Use(context, functionReference, argsArray);
    }
    run(functionReference, argsArray = []) {
        return Functions.Run(functionReference, argsArray);
    }
    bindFn(context, functionReference, args = []) {
        return Functions.Bind(context, functionReference, args);
    }

    // NumbersInterface
    
    /**
     * @return {number}
     */
    magnitude(num, base = 10) {
        return Numbers.Magnitude(num, base);
    }
    
    /**
     * Coerces any value to a numerical value, or else returns the value
     * of [defaultValue]
     * 
     * @param {?} value
     * @param {?} [defaultValue]
     * 
     * @return {number|?}
     */
    number(value, defaultValue = 0) {
        return Numbers.ToNumber(value, defaultValue);
    }
    
    /**
     * @return {number}
     */
    min(...numbers) {
        return Numbers.Minimum(...numbers);
    }
    
    /**
     * @return {number}
     */
    max(...numbers) {
        return Numbers.Maximum(...numbers);
    }

    // StringsInterface
}

JSAlgorithms.Mix(
    ArraysInterface,
    DatesInterface,
    BooleansInterface,
    LooperInterface);