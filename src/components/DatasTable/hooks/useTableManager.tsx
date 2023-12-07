/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useReducer } from "react"

function useTableManager(tableDatas : Array<any>){
    
    function tableStateReducer(state : ITableState, action : { type : string, payload : any}){
        if (action.type === 'sorting') {
            return {...state, sorting : action.payload}
        }
        if (action.type === 'pagination') {
            return {...state, pagination : action.payload}
        }
        if (action.type === 'search') {
            return {...state, 
                search : action.payload, 
                // pagination update : when typing into the searchbar => the current page is set back to 1
                pagination : {...state.pagination , currentPage : 1},
                processedDatas : filteringDatas(state.datas, action.payload)
            }
        }
        /*if (action.type === 'processedDatas') {
            return {...state, processedDatas : action.payload}
        }*/
        return state
    }

    function filteringDatas(datas : Array<any>, searchString : string){
        if(searchString === "") return [...datas]

        return [...datas].filter(row => {
            // check if one of the properties of a row contain the searchString
            for (const property in row) if(row[property].toString().toLowerCase().includes(searchString.toLowerCase())) return true
            return false
        })        
    }

    const initialState : ITableState = {
        sorting : {column : '', direction : 'asc'}, 
        pagination : {currentPage : 1, nEntriesPerPage : 10},
        search : "",
        datas : tableDatas,
        processedDatas : tableDatas,
    }

    const [tableState, dispatch] = useReducer(tableStateReducer, {...initialState, datas : tableDatas})

        
    // when typing into the searchbar => current page is set back to 1
    /*useEffect(()=>{
        dispatch({type : "pagination", payload : {...tableState.pagination, currentPage : 1}})
    }, [tableState.search])*/

    return {tableState, dispatch}
}

export default useTableManager

export interface ITableState {
    sorting : {column : string, direction : string}
    pagination : {currentPage : number, nEntriesPerPage : number}
    search : string
    datas : Array<any>
    processedDatas : Array<any>
}

export type reducerDispatchType = React.Dispatch<{type: string, payload: any}>