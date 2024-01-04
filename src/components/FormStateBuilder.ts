export class FormStateBuilder {
    
    #state = {}

    constructor(){
        this.#state = {}
        return this
    }

    addFormFieldBlock(blockArgs : {accessor : string, defaultValue? : string, validationFn? : (value: string) => boolean, isMandatory : boolean}){
        this.#state = {...this.#state, 
            [blockArgs.accessor] : {
                value : blockArgs.defaultValue || '', 
                error : false, 
                validationFn : blockArgs.validationFn || trueFn,
                isMandatory : blockArgs.isMandatory
            }}
        return this
    }

    buildState(){
        return this.#state
    }
}

function trueFn() : boolean{
    return true
}