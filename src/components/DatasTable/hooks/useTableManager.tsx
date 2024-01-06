/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react"
import { TableModel } from "../models/TableModel"
import { TableDatasDao } from "../dao/TableDatasDao"
import { ITableState } from "../interfaces/ITableState"
// ****************************************
//
// Holds :
//
// The processed datas needed to fill the table (after filtering and sorting)
// The tabledatasdao keeping the untainted datas and holding the methods to process them
// The sorting rules
// The pagination rules
// the search string typed by the user
// !!!!!!!! should be able to define ordering functions
// ****************************************


/**
 * Hook handling all the datatable interactions
 * @Hook
 * @param {Object} tableModel - Object defining the structure of the Table.
 * @param {Object[]} tableModel.getColumnsNamesList - Return an array of all column names (<th> inner text).
 * @param {Object[]} tableModel.getAccessorsList - Return an array of all the accessors.
 * @param {Object[]} tableModel.getColumns - Return an array of all columns (w/ accessor, column names, sortable, datatype).
 * @param {string} tableModel.getDatatypeForAccessor - Type of the datas populating the column.
 * @param {Object[]} tableDatas - Datas used to populate the table.
 * @return (tableState, dispatch)
 */
function useTableManager(tableModel : TableModel, tableDatas : Array<any>){
    
    /**
     * Reduces the table state based on the action performed.
     * @param {ITableState} state - The current state of the table.
     * @param {{ type: string, payload: any}} action - The action performed on the table.
     */
    function tableStateReducer(state : ITableState, action : { type : string, payload : any}){

        // table datas sorting
        if (action.type === 'sorting' && action.payload.column && action.payload.direction) {
            // 1- gets the processing arguments from the state
            // 2- updates those with the payload
            const processingDirectives = {...state.getProcessingArgs(), 
                sorting : action.payload, datatype : state.tableModel.getDatatypeForAccessor(action.payload.column)}
            return {...state, 
                sorting : action.payload, 
                // 3- process the datas through the dao
                processedDatas : state.tableDatasDao.getProcessedDatas(processingDirectives)
            }
        }

        // table datas pagination
        if (action.type === 'pagination' && action.payload.currentPage && action.payload.nEntriesPerPage) {
            return {...state, pagination : action.payload}
        }

        // table datas filtering
        if (action.type === 'search') {
            // 1- gets the processing arguments from the state 
            // getProcessingArgs : () => { search : string, datatype : string, sorting : ISorting }
            // 2- updates those with the payload
            const processingDirectives = {...state.getProcessingArgs(), search : action.payload}
            return {...state, 
                search : action.payload, 
                // when typing into the searchbar => the current page is set back to 1
                pagination : {...state.pagination , currentPage : 1},
                // 3- process the datas through the dao
                processedDatas : state.tableDatasDao.getProcessedDatas(processingDirectives)
            }
        }

        // add a row
        if(action.type === 'addrow' && action.payload){
            const newRow = action.payload

            // check if newrow keys and table accessors are matching
            const accessors = state.tableModel.getAccessorsList()
            const newRowPropertiesList = Object.getOwnPropertyNames(newRow)
            if(accessors.length !== newRowPropertiesList.length) return state
            accessors.forEach(accessor => {
                if(newRowPropertiesList.includes(accessor) === false) return state // !!!!! should throw
            })

            state.tableDatasDao.addRow(newRow)
            return {
                ...state,
                processedDatas : state.tableDatasDao.getProcessedDatas(state.getProcessingArgs())
            }
        }

        return state
    }

    const initialState : ITableState = {
        sorting : {column : '', direction : 'asc'}, 
        pagination : {currentPage : 1, nEntriesPerPage : 10},
        search : "",
        tableDatasDao : new TableDatasDao(tableDatas),
        processedDatas : tableDatas,
        tableModel : tableModel,
        // grouping all the right arguments so the TableDatasDao can send back the processed datas
        getProcessingArgs() {
            return {search : this.search, datatype : this.tableModel.getDatatypeForAccessor(this.sorting.column), sorting : this.sorting}
        }
    }

    const [tableState, dispatch] = useReducer(tableStateReducer, {...initialState})

    return {tableState, dispatch}
}

export default useTableManager

export type reducerDispatchType = React.Dispatch<{type: string, payload: any}>

// !!! should deal with a table having no search module, give the option passing a prop to datastable