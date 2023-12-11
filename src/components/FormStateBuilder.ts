export class FormStateBuilder {
    
    #state = {}

    constructor(){
        this.#state = {}
        return this
    }

    addFormFieldBlock(blockArgs : {accessor : string, defaultValue? : string}){
        this.#state = {...this.#state, [blockArgs.accessor] : {value : blockArgs.defaultValue || '', error : false}}
        return this
    }

    buildState(){
        return this.#state
    }
}