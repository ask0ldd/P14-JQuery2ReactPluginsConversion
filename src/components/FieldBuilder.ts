/* eslint-disable @typescript-eslint/no-explicit-any */
class FieldBuilder{

    static #accessor : string | null = null
    static #validationFn : undefined | (() => any) = undefined
    static #defaultValue = ""
    static #isMandatory = false

    static startBuilder(){
        this.#accessor = null
        this.#validationFn = undefined
        this.#defaultValue = ""
        this.#isMandatory = false
        return this
    }

    static setAccessor(accessor : string){
        this.#accessor = accessor
        return this
    }

    
    static setValidationFn(fn : () => any){
        this.#validationFn = fn
        return this
    }

    static setIsMandatory(bool : boolean){
        this.#isMandatory = bool
        return this
    }

    static setDefaultValue(value : string){
        this.#defaultValue = value
        return this
    }

    static build(){
        try{
          if(this.#accessor == null) throw new Error("Invalid Accessor")
          return {accessor : this.#accessor, defaultValue : this.#defaultValue, validationFn : this.#validationFn, isMandatory : this.#isMandatory}
        }catch (e){
          console.error(e)
          return undefined
        }
      }



}

//{accessor : "firstname", defaultValue : '', validationFn : Validator.isName, isMandatory : true}