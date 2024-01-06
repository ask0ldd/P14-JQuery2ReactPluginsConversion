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
     * Add a form field block to the state.
     * @param {Object} blockArgs - The arguments for the form field block.
     * @param {string} blockArgs.accessor - The accessor for the form field.
     * @param {string} [blockArgs.defaultValue] - The default value for the form field (optional).
     * @param {(value: string) => boolean} [blockArgs.validationFn] - The validation function for the form field (optional).
     * @param {boolean} blockArgs.isMandatory - Indicates if the form field is mandatory.
     * @returns {Object} - The updated state.
     */
    addField(blockArgs : {accessor : string, defaultValue? : string, validationFn? : (value: string) => boolean, isMandatory : boolean}){
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
     * Build the state.
     * @returns {object} The state.
     */
    build() {
        return this.#state
    }
}

function trueFn() : boolean{
    return true
}