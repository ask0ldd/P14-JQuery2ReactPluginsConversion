export class FormStateBuilder {
    
    #state = {}

    constructor(){
        this.#state = {}
        return this
    }

    addFormFieldBlock(blockArgs : {accessor : string, defaultValue? : string, validationFn? : (value: string) => boolean}){
        this.#state = {...this.#state, 
            [blockArgs.accessor] : {
                value : blockArgs.defaultValue || '', 
                error : false, 
                validationFn : blockArgs.validationFn || trueFn
            }}
        return this
    }

    buildState(){
        return this.#state
    }
}

function trueFn(value : string){
    return true
}