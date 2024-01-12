/* eslint-disable @typescript-eslint/no-explicit-any */
export class FieldBuilder{

    #accessor : string | null = null
    #validationFn : ((value: string) => boolean) = () => true
    #defaultValue = ""
    #isMandatory = false

    /**
     * Creates a new FieldBuilder.
     */
    constructor(){
        this.#accessor = null
        this.#validationFn = () => true
        this.#defaultValue = ""
        this.#isMandatory = false
        return this
    }

    /**
     * Set the accessor for the field.
     * @param {string} accessor - The accessor to be set.
     * @returns {FieldBuilder} The FieldBuilder instance.
     */
    setAccessor(accessor : string){
        this.#accessor = accessor
        return this
    }

    /**
     * Set the validation function for the field.
     * @param {(value: string) => boolean} fn - The validation function to be set.
     * @returns {FieldBuilder} The FieldBuilder instance.
     */
    setValidationFn(fn : (value: string) => boolean){
        this.#validationFn = fn
        return this
    }

    /**
     * Set whether the field is mandatory.
     * @param {boolean} bool - The value indicating whether the field is mandatory.
     * @returns {FieldBuilder} The FieldBuilder instance.
     */
    setIsMandatory(bool : boolean){
        this.#isMandatory = bool
        return this
    }

    /**
     * Set the default value for the field.
     * @param {string} value - The default value to be set.
     * @returns {FieldBuilder} The FieldBuilder instance.
     */
    setDefaultValue(value : string){
        this.#defaultValue = value
        return this
    }

    /**
     * Build the field.
     * @returns {Object|undefined} The built field, or undefined if an error occurs.
     */
    build(){
        try{
            if(this.#accessor == null) throw new Error("Invalid Accessor")
            return {
                accessor : this.#accessor, 
                defaultValue : this.#defaultValue, 
                validationFn : this.#validationFn, 
                isMandatory : this.#isMandatory,
                error : false,
            }
        }catch (e){
            console.error(e)
            return undefined
        }
    }
}