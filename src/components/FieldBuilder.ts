/* eslint-disable @typescript-eslint/no-explicit-any */
export class FieldBuilder{

    #accessor : string | null = null
    #validationFn : ((value: string) => boolean) = () => true
    #defaultValue = ""
    #isMandatory = false

    constructor(){
        this.#accessor = null
        this.#validationFn = () => true
        this.#defaultValue = ""
        this.#isMandatory = false
        return this
    }

    /*startBuilder(){
        this.#accessor = null
        this.#validationFn = undefined
        this.#defaultValue = ""
        this.#isMandatory = false
        return this
    }*/

    setAccessor(accessor : string){
        this.#accessor = accessor
        return this
    }

    
    setValidationFn(fn : (value: string) => boolean){
        this.#validationFn = fn
        return this
    }

    setIsMandatory(bool : boolean){
        this.#isMandatory = bool
        return this
    }

    setDefaultValue(value : string){
        this.#defaultValue = value
        return this
    }

    build(){
        try{
          if(this.#accessor == null) throw new Error("Invalid Accessor")
          return {accessor : this.#accessor, defaultValue : this.#defaultValue, validationFn : this.#validationFn, isMandatory : this.#isMandatory}
        }catch (e){
          console.error(e)
          return undefined
        }
      }
}