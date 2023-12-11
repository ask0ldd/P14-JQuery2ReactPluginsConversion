export class FormStateBuilder {
    
    #state = {}

    constructor(){
        this.#state = {}
        return this
    }

    addFormFieldBlock(accessor : string, defaultValue? : string){
        this.#state = {...this.#state, [accessor] : {value : defaultValue || '', error : false}}
        return this
    }

    buildState(){
        return this.#state
    }
}