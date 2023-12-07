/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Table from './Table'
import NDisplayedSelect from './NDisplayedSelect'
import SearchModule from './SearchModule'
import Pagination from './Pagination'
import NEntries from './NEntries'
import { useState, useEffect, useReducer } from 'react'
import {createContext} from 'react'
import useOrderTable from './hooks/useOrderTable'
import { IDatasTableContext, IOrdering, IPaginationRules } from './interfaces/IDatasTableContext'
import { TableModel } from './models/TableModel'
import { TableDatasService } from './service/TableDatasService'
import useTableManager, { initialState } from './hooks/useTableManager'

/**
 * Component : Grouping of all the constitutive elements of a datatable.
 * @Component
 * @param {Object[]} props - Props.
 * @param {Object} props.tableModel
 * @param {Object[]} props.tableModel.getColumnsNamesList - Return an array defining the columns of the table.
 * @param {string} props.tableModel.getColumnsNamesList[].accessor - Data accessor.
 * @param {string} props.tableModel.getColumnsNamesList[].th - Table column header.
 * @param {boolean} props.tableModel.getColumnsNamesList[].sortable - Sortability of the column.
 * @param {string} props.tableModel.getColumnsNamesList[].datatype - Type of the datas populating the column.
 * @param {Object[]} props.tableDatas - Datas used to populate the table.
 * @return ( <DatasTable tableModel={tableModel} tableDatas={tableDatas}/> )
 */
function DatasTable({tableModel, tableDatas} : IProps){

    // check if accessors & table datas properties are matching / if not : no table displayed
    const [isColumnsDefinitionMatchingDatas, setUsColumnsDefinitionMatchingDatas] = useState(true)
    useEffect(() => {
        const tableDatasPropertiesList = Object.getOwnPropertyNames(tableDatas[0])
        tableModel.getAccessorsList().forEach(accessor => {
            if(tableDatasPropertiesList.includes(accessor) === false) setUsColumnsDefinitionMatchingDatas(false)
        })
    }, [tableDatas])
  
    // currentPage / nEntriesPerPage / searchString / sortingDirection / sortingTargetColumn
    /*const [tableDatasState, setTableDatas] = useState<Array<any>>([...tableDatas]);
    const [ordering, setOrdering] = useState<IOrdering>({column : '', direction : 'asc'})
    const [paginationRules, setPaginationRules] = useState<IPaginationRules>({currentPage : 1, nEntriesPerPage : 10})
    const [searchString, setSearchString] = useState<string>('')*/

    const {tableState, dispatch} = useTableManager(tableDatas)
 
    // useOrderTable(tableDatas, setTableDatas, searchString, ordering, tableModel.getColumns(), paginationRules)

    // when typing into the searchbar => current page is set back to 1
    useEffect(()=>{
        // setPaginationRules({...paginationRules, currentPage : 1})
        dispatch({type : "pagination", payload : {...tableState.pagination, currentpage : 1}})
    }, [tableState.search])

    return(
        <>
            {isColumnsDefinitionMatchingDatas ? 
            <DatasTableContext.Provider value={{paginationRules, tableDatasState, ordering, searchString, tableModel, setPaginationRules, setOrdering, setSearchString}}>
                <div id="entriesNSearchContainer">
                    <NDisplayedSelect/>
                    <SearchModule/>
                </div>
                <Table/>
                <div id="infosNPaginationContainer">
                    <NEntries/>
                    <Pagination tableState={tableState} dispatch={dispatch}/>
                </div>
            </DatasTableContext.Provider> 
            : <div>Users datas are missing some mandatory dataKeys.</div>}
        </>
    )

}

export default DatasTable

const initialContext = {
    /*tableDatasState : [],
    tableModel : new TableModel(),
    searchString: '', 
    paginationRules : {currentPage: 1, nEntriesPerPage:10}*/
    tableModel : new TableModel(),
    dispatch : null,
    tableState : initialState    
}

export const DatasTableContext = createContext<IDatasTableContext>(initialContext)

interface IProps {
    tableModel : TableModel
    tableDatas : Array<any>
}

/*

interface State {
  count: number;
}

// Define the type for your action
type Action = { type: 'increment' } | { type: 'decrement' };

// Define your reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

// Use useReducer with your state and reducer
const [state, dispatch] = useReducer(reducer, { count: 0 });

*/