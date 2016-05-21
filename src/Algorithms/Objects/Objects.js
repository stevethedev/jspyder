export class Objects {
    /**
     * Coerces any value to an Object value.
     * 
     * @param {*} value
     * @param {*} defaultValue
     * @return {?}
     */
    static ToObject(value, defaultValue = {}) {
        if(value !== null && Objects.IsObject(value)) {
            return value;
        }
        return defaultValue;
    }
    
    /**
     * @param {?} value
     * @return {!boolean}
     */
    static IsObject(value) {
        return Object.prototype.isPrototypeOf(value);
    }
    
    /**
     * @param {!Object} base
     * @param {...Object} subs
     * 
     * @return {!Object} base
     */
    static MergeObjects(base, ...subs) {
        for(let i = 0, li = subs.length; i < li; ++i) {
            let sub = subs[i];
            if(!sub) {
                continue;
            }

            let properties = Object.getOwnPropertyNames(sub);

            for(let j = 0, lj = properties.length; j < lj; ++j) {
                let property = properties[j];
                let subProperty = sub[property];
                let baseProperty = base[property]
                let baseObject = Objects.IsObject(baseProperty);
                let subObject = Objects.IsObject(subProperty);

                if(!subObject) {
                    base[property] = subProperty;
                }
                else if(subObject) { // base is defined, and we're merging an object
                    if(!baseObject) { // not merging into an object, so create a copy
                        baseProperty = {};
                    }
                    base[property] = Objects.MergeObjects(baseProperty, subProperty);
                }
            }
        }
        return base;
    }

    /**
     * @param {Object} object
     */
    static CloneObject(object) {
        if(!object) {
            return object;
        }

        var cloned = {};
        var properties = Object.getOwnPropertyNames(object);
        
        for(let i = 0, li = properties.length; i < li; ++i) {
            let property = properties[i];
            cloned[property] = object[property];
        }
        
        return cloned;
    }
    
    /**
     * @param {Object} object
     */
    static DeepCloneObject(object) {
        if(!object) {
            return object;
        }
        
        return Objects.MergeObjects({}, object);
    }
    
    /**
     * Returns the first matching property of the object, provided.
     * This is especially useful for dealing with objects that have
     * different implementations in different browsers.
     * 
     * @param {Object} object
     * @param {...string} keyChain
     */
    static GetProperty(object, ...keyChain) {
        for(let i = 0, li = keyChain.length; i < li; ++i) {
            let key = keyChain[i];
            if(!object) {
                break;
            }
            object = object[key];
        }
        return object;
    }
}