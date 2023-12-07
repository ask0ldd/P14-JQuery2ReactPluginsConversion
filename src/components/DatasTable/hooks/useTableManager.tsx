/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react"

function useTableManager(tableDatas : Array<any>){
    
    function tableStateReducer(state : any, action : { type : string, payload : any}){
        if (action.type === 'ordering') {
            return {...state, ordering : action.payload}
        }
        if (action.type === 'pagination') {
            return {...state, pagination : action.payload}
        }
        if (action.type === 'search') {
            return {...state, search : action.payload}
        }
    }

    const [tableState, dispatch] = useReducer(tableStateReducer, 
        {
            ordering : {column : '', direction : 'asc'}, 
            pagination : {currentPage : 1, nEntriesPerPage : 10},
            search : "",
            datas : [...tableDatas],
        })

    return {tableState, dispatch}
}

export default useTableManager