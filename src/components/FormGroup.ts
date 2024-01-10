/**
 * Represents a form group.
 */
export class FormGroup {

    #state = {}

    /**
     * Constructs a new FormGroup.
     */
    constructor(){
        this.#state = {}
        return this
    }

    getState(){
        return {...this.#state}
    }

    /**
     * Add a new field to the FormGroup.
     * @param {Object} fieldArgs - The arguments to create a new field.
     * @param {string} fieldArgs.accessor - The id to access a target FormGroup field.
     * @param {string} fieldArgs.defaultValue - The default value for the field (optional).
     * @param {(value: string) => boolean} fieldArgs.validationFn - The validation function for the new field (optional).
     * @param {boolean} fieldArgs.isMandatory - Indicates if the field is mandatory.
     * @returns {Object} - The updated FormGroup.
     */
    addField(fieldArgs : {accessor : string, defaultValue : string, isMandatory : boolean, validationFn : (value: string) => boolean} | undefined){
        // return this to keep chaining possible if this one field can't be added
        if (fieldArgs == null) return this
        this.#state = {...this.#state, 
            [fieldArgs.accessor] : {
                defaultValue : fieldArgs.defaultValue,
                accessor : fieldArgs.accessor,
                value : fieldArgs.defaultValue || '', 
                error : false, 
                validationFn : fieldArgs.validationFn || (() => true),
                isMandatory : fieldArgs.isMandatory,
            }}
        return this
    }

    /**
     * Build the FormGroup.
     * @returns {Object} FormGroup.
     */
    build() {
        if (Object.keys(this.#state).length === 0) throw new Error("No valid Field defined.")
        return this.#state
    }
}