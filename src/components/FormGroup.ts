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

    get(){
        return {...this.#state}
    }

    /**
     * Add a new field to the FormGroup.
     * @param {Object} fieldArgs - The arguments to create a new field.
     * @param {string} fieldArgs.accessor - The id to access the field in the FormGroup.
     * @param {string} [fieldArgs.defaultValue] - The default value for the field (optional).
     * @param {(value: string) => boolean} [fieldArgs.validationFn] - The validation function for the new field (optional).
     * @param {boolean} fieldArgs.isMandatory - Indicates if the field is mandatory.
     * @returns {Object} - The updated FormGroup.
     */
    addField(fieldArgs : {accessor : string, defaultValue? : string, validationFn? : (value: string) => boolean, isMandatory : boolean} | undefined){
        if (fieldArgs == null) return this
        this.#state = {...this.#state, 
            [fieldArgs.accessor] : {
                value : fieldArgs.defaultValue || '', 
                error : false, 
                validationFn : fieldArgs.validationFn || trueFn,
                isMandatory : fieldArgs.isMandatory
            }}
        return this
    }

    /**
     * Build the FormGroup.
     * @returns {object} FormGroup.
     */
    build() {
        return this.#state
    }
}

function trueFn() : boolean{
    return true
}