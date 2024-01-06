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
     * @param {Object} blockArgs - The arguments to create a new field.
     * @param {string} blockArgs.accessor - The id to access the field in the FormGroup.
     * @param {string} [blockArgs.defaultValue] - The default value for the field (optional).
     * @param {(value: string) => boolean} [blockArgs.validationFn] - The validation function for the new field (optional).
     * @param {boolean} blockArgs.isMandatory - Indicates if the field is mandatory.
     * @returns {Object} - The updated FormGroup.
     */
    addField(blockArgs : {accessor : string, defaultValue? : string, validationFn? : (value: string) => boolean, isMandatory : boolean} | undefined){
        if (blockArgs == null) return this
        this.#state = {...this.#state, 
            [blockArgs.accessor] : {
                value : blockArgs.defaultValue || '', 
                error : false, 
                validationFn : blockArgs.validationFn || trueFn,
                isMandatory : blockArgs.isMandatory
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