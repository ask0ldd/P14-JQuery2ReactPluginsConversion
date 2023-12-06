import { IColumnDefElement } from "../DatasTable"
import { Column } from "./ColumnModel"

// !!!!!!!! should be able to define ordering functions
export class TableModel{
    #columns : Array<IColumnDefElement>
    #datas : object[]
  
    constructor(){
      this.#columns = []
      this.#datas = []
    }
  
    addColumn(column : Column | undefined){
      if(column == null || column.toObject() == null) return
      this.#columns.push(column.toObject() as IColumnDefElement)
      return this
    }
  
    setDatas(datas : object[]){
      this.#datas = datas
    }
  
    getColumns() : Array<IColumnDefElement> {
      return [...this.#columns]
    }
  
    getDatas() : object[] {
      return [...this.#datas]
    }
  
    getColumnsNamesList() : Array<string>{
        return [...this.#columns].reduce((accu : Array<string>, column) => {accu.push(column.th); return accu}, [])
      
  
    }
  
    getDatakeysList() : Array<string>{
      return [...this.#columns].reduce((accu : Array<string>, column) => {accu.push(column.datakey); return accu}, [])
    }
  }