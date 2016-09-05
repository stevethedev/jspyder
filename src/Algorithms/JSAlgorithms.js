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
 * @extends {JSObject}
 * 
 * @implements {ArraysInterface}
 * @implements {BooleansInterface}
 * @implements {DatesInterface} -- date
 * @implements {FunctionsInterface}
 * @implements {KeyCodesInterface}
 * @implements {LooperInterface}
 * @implements {NumbersInterface}
 * @implements {ObjectsInterface}
 * @implements {StringsInterface}
 *
 * @inheritDoc
 */
export class JSAlgorithms extends JSObject {
    // ArraysInterface
    array(value, defaultValue = []) {
        return Arrays.ToArray(value, defaultValue);
    }
    joinArray(arrayRef, ...arraysFrom) {
        for(let i = 0; i < arraysFrom.length; ++i) {
            Arrays.WidePush(arrayRef, arraysFrom[i]);
        }
        return arrayRef;
    }
    sliceArray(array = [], index = 0, end = undefined) {
        return Arrays.Slice(array, index, end);
    }
    sortArrayNum(array, ascending = true) {
        return Arrays.SortArrayNumbers(array, ascending);
    }
    sortArrayObj(array, ascending = true, ...fields) {
        return Arrays.SortArrayObjects(array, ascending, ...fields);
    }

    // [BooleansInterface] =====================================
    bool(value, defaultValue = false) {
        return Booleans.ToBoolean(value, defaultValue);
    }

    // [DatesInterface] ========================================
    date(value, defaultValue = new Date()) {
        return Dates.ToDate(value, defaultValue);
    }

    // [FunctionsInterface] ====================================
    bindFn(context, functionReference, args = []) {
        return Functions.Bind(context, functionReference, args);
    }
    run(functionReference, argsArray = []) {
        return Functions.Run(functionReference, argsArray);
    }
    use(context, functionReference, argsArray = []) {
        return Functions.Use(context, functionReference, argsArray);
    }

    // [KeyCodesInterface] =====================================
    get keycodes() {
        return KeyCodes;
    }

    // [LooperInterface] =======================================
    arrEach(array, loopFunction, ...data) {
        Looper.ArrayEach(array, loopFunction, ...data);
        return this;
    }
    each(object, loopFunction, ...data) {
        Looper.ObjectEach(object, loopFunction, ...data);
        return this;
    }
    iterate(start, end, iterator, ...data) {
        Looper.Iterate(start, end, iterator, ...data);
        return this;
    }

    // [NumbersInterface] ======================================
    
    byte(value) {
        return Numbers.ToInt8(value);
    }
    deg2rad(value, defaultValue = 0) {
        return Numbers.DegreesToRadians(value, defaultValue);
    }
    double(value) {
        return Numbers.ToDouble(value);
    }
    float(value) {
        return Numbers.ToFloat(value);
    }
    int(value) {
        return Numbers.ToInt32(value);
    }
    magnitude(num, base = 10) {
        return Numbers.Magnitude(num, base);
    }
    makeEnum(keys, attachTo = Objects.CreateBlankObject()) {
        return Numbers.MakeEnumeratedObject(keys, attachTo);
    }
    max(...numbers) {
        return Numbers.Maximum(...numbers);
    }
    min(...numbers) {
        return Numbers.Minimum(...numbers);
    }
    number(value, defaultValue = 0) {
        return Numbers.ToNumber(value, defaultValue);
    }
    rad2deg(value, defaultValue = 0) {
        return Numbers.RadiansToDegrees(value, defaultValue);
    }
    short(value) {
        return Numbers.ToInt16(value);
    }
    ubyte(value) {
        return Numbers.ToUInt8(value);
    }
    uint(value) {
        return Numbers.ToUInt32(value);
    }
    ushort(value) {
        return Numbers.ToUInt16(value);
    }

    // [Objects] =============================================
    cloneObj(object) {
        return Objects.CloneObject(object);
    }
    deepCloneObj(object) {
        return Objects.DeepCloneObject(object);
    }
    mergeObj(base, ...subs) {
        return Objects.MergeObjects(base, ...subs);
    }
    object(value, defaultValue = Objects.CreateBlankObject()) {
        return Objects.ToObject(value, defaultValue);
    }
    property(object, ...levels) {
        return Objects.GetProperty(object, ...levels);
    }

    // [StringsInterface] ======================================
    escapeString(stringToEscape) {
        return Strings.EscapeString(stringToEscape);
    }
    string(value, defaultValue = "") {
        return Strings.ToString(value, defaultValue);
    }
}
