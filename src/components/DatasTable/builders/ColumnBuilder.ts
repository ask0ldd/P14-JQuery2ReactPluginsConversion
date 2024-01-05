import { Column } from "../models/ColumnModel"

export class ColumnBuilder {

    static #th : string | null = null
    static #accessor : string | null = null
    static #sortable = false
    static #datatype : "string" | "number" | "date" | null = null
  
    static startBuilder(){
      this.#th = null
      this.#accessor = null
      this.#sortable = false
      this.#datatype = null
      return this
    }
  
    /**
     * Set the text that will be displayed in the th tag of the column.
     * @param {string} th - The text for the th tag.
     * @returns {ColumnBuilder} - The column builder instance.
     */
    static setColumnName(th : string){
      this.#th = th
      return this
    }
  
    /**
     * Set the key from the data object pointing to the value used to fill the column.
     * @param {string} accessor - The key for the data object.
     * @returns {ColumnBuilder} - The column builder instance.
     */
    static setAccessor(accessor : string){
      this.#accessor = accessor
      return this
    }
  
    /**
     * Set whether the column should be sortable.
     * @param {boolean} sortable - Whether the column should be sortable.
     * @returns {ColumnBuilder} - The column builder instance.
     */
    static setSortability(sortable : boolean){
      this.#sortable = sortable
      return this
    }
  
    /**
     * Set the type of data that will fill the column.
     * @param {"string" | "number" | "date"} datatype - The type of data for the column.
     * @returns {ColumnBuilder} - The column builder instance.
     */
    static setDatatype(datatype : "string" | "number" | "date"){
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
  
    /**
     * Build the final column.
     * @returns {Column|undefined} - The built column, or undefined if the column definition is incomplete.
     */
    static build(){
      try{
        if(this.#th == null || this.#accessor == null || this.#datatype == null ) throw new Error("Can't be built : Column definition incomplete.")
        return new Column(this.#th, this.#accessor, this.#sortable, this.#datatype)
      }catch (e){
        console.error(e)
        return undefined
      }
    }
  
  }