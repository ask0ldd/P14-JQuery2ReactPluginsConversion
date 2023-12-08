/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react"
import { TableModel } from "../models/TableModel"

function useTableManager(tableModel : TableModel, tableDatas : Array<any>){
    
    function tableStateReducer(state : ITableState, action : { type : string, payload : any}){

        // table sorting
        if (action.type === 'sorting' && action.payload.column && action.payload.direction) {
            return {...state, 
                sorting : action.payload, 
                processedDatas : toSortedDatas(toFilteredDatas(state.datas, state.search), action.payload, tableModel.getDatatypeForAccessor(action.payload.column))
            }
        }

        // table pagination
        if (action.type === 'pagination' && action.payload.currentPage && action.payload.nEntriesPerPage) {
            return {...state, pagination : action.payload}
        }

        // table filtering
        if (action.type === 'search' && action.payload) {
            return {...state, 
                search : action.payload, 
                // when typing into the searchbar => the current page is set back to 1
                pagination : {...state.pagination , currentPage : 1},
                processedDatas : toSortedDatas(toFilteredDatas(state.datas, action.payload), {column : state.sorting.column, direction : state.sorting.direction}, tableModel.getDatatypeForAccessor(state.sorting.column))
            }
        }

        /*if(action.type === 'addrow' && action.payload){
            const newRow = action.payload
            return {
                ...state,
                datas : [...state.datas, newRow],
                processedDatas : toSortedDatas(toFilteredDatas([...state.datas, newRow], state.search), {column : state.sorting.column, direction : state.sorting.direction}, tableModel.getDatatypeForAccessor(state.sorting.column))
            }
        }*/

        return state
    }

    const initialState : ITableState = {
        sorting : {column : '', direction : 'asc'}, 
        pagination : {currentPage : 1, nEntriesPerPage : 10},
        search : "",
        datas : tableDatas,
        processedDatas : tableDatas,
        tableModel : tableModel,
        getProcessingArgs() {
            return {search : this.search, datatype : this.tableModel.getDatatypeForAccessor(this.sorting.column), sorting : this.sorting}
        }
    }

    // !!! should deal with a table having no search module, give the option passing a prop to datastable

    const [tableState, dispatch] = useReducer(tableStateReducer, {...initialState, datas : tableDatas})

    return {tableState, dispatch}
}

export default useTableManager

export interface ITableState {
    sorting : {column : string, direction : "asc" | "desc"}
    pagination : {currentPage : number, nEntriesPerPage : number}
    search : string
    datas : Array<any>
    processedDatas : Array<any>
    tableModel : TableModel
    getProcessingArgs : () => { search : string, datatype : string, sorting : {column : string, direction : "asc" | "desc"} }
}

export type reducerDispatchType = React.Dispatch<{type: string, payload: any}>

function dateToTime(date : string){
    const [day, month, year] = date.split('/')
    return new Date(parseInt(year), parseInt(month), parseInt(day)).getTime()
}

// move to a DAO
function toFilteredDatas(datas : Array<any>, searchString : string){
    if(searchString === "") return [...datas]

    return [...datas].filter(row => {
        // check if one of the properties of a row contain the searchString
        for (const property in row) if(row[property].toString().toLowerCase().includes(searchString.toLowerCase())) return true
        return false
    })        
}

// move to a DAO
function toSortedDatas(datas : Array<any>, sortingRules : {column : string, direction : 'asc' | 'desc'}, dataType : string){
    const frCollator = new Intl.Collator('en')
    if(dataType === 'date'){
        switch(sortingRules.direction){
           case 'asc' : return datas.sort((a,b) => dateToTime(b[sortingRules.column]) - dateToTime(a[sortingRules.column]))
           case 'desc' : return datas.sort((a,b) => dateToTime(a[sortingRules.column]) - dateToTime(b[sortingRules.column]))
        }
    }
    switch(sortingRules.direction){
        case 'asc' : return datas.sort((a,b) => frCollator.compare(a[sortingRules.column], b[sortingRules.column]))
        case 'desc' : return datas.sort((a,b) => frCollator.compare(b[sortingRules.column], a[sortingRules.column]))
    }
}