/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react"
import { TableModel } from "../models/TableModel"
import { TableDatasDao } from "../dao/TableDatasDao"

function useTableManager(tableModel : TableModel, tableDatas : Array<any>){
    
    function tableStateReducer(state : ITableState, action : { type : string, payload : any}){

        // table sorting
        if (action.type === 'sorting' && action.payload.column && action.payload.direction) {
            return {...state, 
                sorting : action.payload, 
                // 1- gets the processing arguments from the state
                // 2- updates those with the payload
                // 3- process the datas through the dao
                processedDatas : state.tableDatasDao.getProcessedDatas(
                    {...state.getProcessingArgs(), sorting : action.payload, datatype : state.tableModel.getDatatypeForAccessor(action.payload.column)})
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
                // gets the processing arguments from the state
                // updates those with the payload
                // process the datas through the dao
                processedDatas : state.tableDatasDao.getProcessedDatas(
                    {...state.getProcessingArgs(), search : action.payload})
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
        tableDatasDao : new TableDatasDao(tableDatas),
        processedDatas : tableDatas,
        tableModel : tableModel,
        getProcessingArgs() {
            return {search : this.search, datatype : this.tableModel.getDatatypeForAccessor(this.sorting.column), sorting : this.sorting}
        }
    }

    // !!! should deal with a table having no search module, give the option passing a prop to datastable

    const [tableState, dispatch] = useReducer(tableStateReducer, {...initialState/*, datas : tableDatas*/})

    return {tableState, dispatch}
}

export default useTableManager

export interface ITableState {
    sorting : {column : string, direction : "asc" | "desc"}
    pagination : {currentPage : number, nEntriesPerPage : number}
    search : string
    tableDatasDao : TableDatasDao
    processedDatas : Array<any>
    tableModel : TableModel
    getProcessingArgs : () => { search : string, datatype : string, sorting : {column : string, direction : "asc" | "desc"} }
}

export type reducerDispatchType = React.Dispatch<{type: string, payload: any}>