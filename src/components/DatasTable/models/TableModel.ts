import { IColumnDefElement } from "../interfaces/IColumnDefElement"
import { Column } from "./ColumnModel"

// !!!!!!!! should be able to define ordering functions
export class TableModel{
    #columns : Array<IColumnDefElement>
    // #datas : Array<object>
  
    constructor(/*datas? : Array<object>*/){
      this.#columns = []
      // this.#datas = datas || []
    }

    addColumn(column : Column | undefined){
      if(column == null || column.toObject() == null) return
      this.#columns.push(column.toObject() as IColumnDefElement)
      return this
    }
  
    /*setDatas(datas : Array<object>){
      this.#datas = datas
    }*/
  
    getColumns() : Array<IColumnDefElement> {
      return [...this.#columns]
    }
  
    /*getDatas() : Array<object> {
      return [...this.#datas]
    }*/
  
    getColumnsNamesList() : Array<string>{
        return this.#columns.reduce((accu : Array<string>, column) => {accu.push(column.th); return accu}, [])
    }
  
    getAccessorsList() : Array<string>{
      return this.#columns.reduce((accu : Array<string>, column) => {accu.push(column.accessor); return accu}, [])
    }

    getDatatypeForAccessor(accessor : string) : string{
      return (this.#columns.find(column => column.accessor === accessor))?.datatype || 'string'
    }
  }