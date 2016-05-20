/** 
 * Abstract library interface object
 * 
 * @interface LibraryInterfaceDefs
 * @template THIS
 */
export class LibraryInterfaceDefs {
    /**
     * @this {THIS}
     * @return {THIS}
     */
    lib(...args) {}

    /**
     * @this {THIS}
     * @return {THIS}
     */
    register(...args) {}

    /**
     * @this {THIS}
     * @return {THIS}
     */
    registerSet(...args) {}

    /**
     * @this {THIS}
     * @return {THIS}
     */
    execute(...args) {}
}
