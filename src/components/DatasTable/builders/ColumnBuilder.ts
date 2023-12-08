import { Column } from "../models/ColumnModel"

export class ColumnBuilder {

    static #th : string | null = null
    static #datakey : string | null = null
    static #sortable = false
    static #datatype : string | null = null
  
    static startBuilder(){
      this.#th = null
      this.#datakey = null
      this.#sortable = false
      this.#datatype = null
      return this
    }
  
    static setColumnName(th : string){
      this.#th = th
      return this
    }
  
    static setDatakey(datakey : string){
      this.#datakey = datakey
      return this
    }
  
    static setSortability(sortable : boolean){
      this.#sortable = sortable
      return this
    }
  
    static setDatatype(datatype : string){
      this.#datatype = datatype
      return this
    }
  
    static setDatatypeAsString(){
      this.#datatype = "string"
      return this
    }
  
    static setDatatypeAsNumber(){
      this.#datatype = "number"
      return this
    }
  
    static setDatatypeAsDate(){
      this.#datatype = "date"
      return this
    }
  
    static build(){
      try{
        if(this.#th == null || this.#datakey == null || this.#datatype == null ) throw new Error("Can't be built : Column Definition incomplete.")
        return new Column(this.#th, this.#datakey, this.#sortable, this.#datatype)
      }catch (e){
        console.error(e)
        return undefined
      }
    }
  
  }