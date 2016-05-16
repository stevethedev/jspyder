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
 * @implements {ArraysInterface}
 * @implements {BooleansInterface}
 * @implements {DatesInterface}
 * @implements {FunctionsInterface}
 * @implements {KeyCodesInterface}
 * @extends {LooperInterface}
 * @implements {NumbersInterface}
 * @implements {ObjectsInterface}
 * @implements {StringsInterface}
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
    magnitude(num, base = 10) {
        return Numbers.Magnitude(num, base);
    }
    
    // StringsInterface    
}

JSAlgorithms.Mix(LooperInterface)