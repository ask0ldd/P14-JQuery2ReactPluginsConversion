/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react"

function useTableManager(tableDatas : Array<any>){
    
    function tableStateReducer(state : ITableState, action : { type : string, payload : any}){
        if (action.type === 'ordering') {
            return {...state, ordering : action.payload}
        }
        if (action.type === 'pagination') {
            return {...state, pagination : action.payload}
        }
        if (action.type === 'search') {
            return {...state, search : action.payload}
        }
        return state
    }

    const initialState : ITableState = {
        ordering : {column : '', direction : 'asc'}, 
        pagination : {currentPage : 1, nEntriesPerPage : 10},
        search : "",
        datas : tableDatas,
    }

    const [tableState, dispatch] = useReducer(tableStateReducer, {...initialState, datas : tableDatas})

    return {tableState, dispatch}
}

export default useTableManager

/*export const initialState : ITableState = {
    ordering : {column : '', direction : 'asc'}, 
    pagination : {currentPage : 1, nEntriesPerPage : 10},
    search : "",
    datas : [],
}*/

export interface ITableState {
    ordering : {column : string, direction : string}
    pagination : {currentPage : number, nEntriesPerPage : number}
    search : string
    datas : Array<any>
}

export type reducerDispatchType = React.Dispatch<{
    type: string
    payload: any
}>