export class FormStateBuilder {
    
    #state = {}

    constructor(){
        this.#state = {}
        return this
    }

    addFormFieldBlock(blockArgs : {accessor : string, defaultValue? : string, validationFn? : (value: string) => boolean, mandatory : boolean}){
        this.#state = {...this.#state, 
            [blockArgs.accessor] : {
                value : blockArgs.defaultValue || '', 
                error : false, 
                validationFn : blockArgs.validationFn || trueFn,
                mandatory : blockArgs.mandatory
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