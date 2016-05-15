/**
 * Collection of Array-related functions
 */

export class Arrays {
    /**
     * Profile: O(n)
     */
    static Slice(array, ...sliceArgs) {
        try {
            array = window["Array"]["prototype"]["slice"].apply(array || [], sliceArgs);
        }
        catch(error) {
            array = [];
        }

        return array;
    }
}