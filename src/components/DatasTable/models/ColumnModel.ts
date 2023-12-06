import { IColumnDefElement } from "../DatasTable"

export class Column {
    #th : string | null
    #datakey : string | null
    #sortable : boolean
    #datatype : string | null
  
    constructor(th : string, datakey: string, sortable : boolean, datatype : string){
      this.#th = th
      this.#datakey = datakey
      this.#sortable = sortable
      this.#datatype = datatype
    }
    
    toObject() : IColumnDefElement | undefined {
      if(this.#th == null || this.#datakey == null || this.#datatype == null ) return undefined // { th: '', datakey: '', sortable: true, datatype: '' }
      return({th : this.#th, datakey : this.#datakey, sortable : this.#sortable, datatype : this.#datatype})
    }
  }