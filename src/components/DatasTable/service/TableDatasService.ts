/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableModel } from "../models/TableModel"

export class TableDatasService{
    #datas : Array<any>
    // #tableModel : TableModel
    #paginationRules : {currentPage : number, nEntriesPerPage : number}
    #orderingRules : {column : string, direction : string}
    #searchString : string

    constructor(datas : Array<any>/*, tableModel : TableModel*/){
        this.#datas = datas
        this.#paginationRules = {currentPage : 1, nEntriesPerPage : 10}
        // this.#tableModel = tableModel
        this.#orderingRules = {column : '', direction : 'asc'}
        this.#searchString = ""
    }

    setDatas(datas : Array<any>){
        this.#datas = datas
    }

    getDatas(){
        return [...this.#datas]
    }

    getFilteredDatas(){
        const datas = this.getDatas()
        if(this.#searchString !== '') 
        {
            return datas.filter(row => {
                // check if one of the properties of a row contain the searchString
                for (const property in row) if(row[property].toString().toLowerCase().includes(this.#searchString.toLowerCase())) return true
                return false
            })
        
        }else{
            return datas
        }
    }

    getSortedDatas(){
        const datas = this.getFilteredDatas()
        return datas
    }

    getFullyProcessedDatas(){
        const datas = this.getSortedDatas()
        return datas
    }

    getDatasFromTo(startIndex : number, endIndex : number){
        const datas = this.getFullyProcessedDatas()
        return datas
    }

    setPaginationCurrentPage(currentPage : number){
        this.#paginationRules = {...this.#paginationRules, currentPage : currentPage}
    }

    setPaginationNEntriesPerPage(nEntriesPerPage : number){
        this.#paginationRules = {...this.#paginationRules, nEntriesPerPage : nEntriesPerPage}
    }
}