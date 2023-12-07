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

    /*const tableColumnsNames : Array<string> = tableModel.getColumnsNamesList()
    const tableAccessors : Array<string> = tableModel.getAccessorsList()*/

    // check if accessors & table datas properties are matching / if not : no table displayed
    const [isColumnsDefinitionMatchingDatas, setUsColumnsDefinitionMatchingDatas] = useState(true)
    useEffect(() => {
        const tableDatasPropertiesList = Object.getOwnPropertyNames(tableDatas[0])
        tableModel.getAccessorsList().forEach(accessor => {
            if(tableDatasPropertiesList.includes(accessor) === false) setUsColumnsDefinitionMatchingDatas(false)
        })
    }, [tableDatas])
  
    // currentPage / nEntriesPerPage / searchString / sortingDirection / sortingTargetColumn
    const [tableDatasState, setTableDatas] = useState<Array<any>>([...tableDatas]);
    const [ordering, setOrdering] = useState<IOrdering>({column : '', direction : 'asc'})
    const [paginationRules, setPaginationRules] = useState<IPaginationRules>({currentPage : 1, nEntriesPerPage : 10})
    const [searchString, setSearchString] = useState<string>('')

    /*function reducer(state : TableDatasService, action : {type : string, payload : string}) {
    if (action.type === 'incremented_age') {
        return null
    }
    throw Error('Unknown action.');
    }*/

    const tableDatasServ = new TableDatasService(tableDatas)

    // const [tableDatasService, dispatch] = useReducer(reducer, tableDatasServ)
  
    useOrderTable(tableDatas, setTableDatas, searchString, ordering, tableModel.getColumns(), paginationRules)

    // when typing into the searchbar => current page is set back to 1
    useEffect(()=>{
        setPaginationRules({...paginationRules, currentPage : 1})
    }, [searchString])

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
                    <Pagination totalEntries={tableDatasState.length} currentPage={paginationRules.currentPage} nEntriesPerPage={paginationRules.nEntriesPerPage} setPaginationRules={setPaginationRules}/>
                </div>
            </DatasTableContext.Provider> 
            : <div>Users datas are missing some mandatory dataKeys.</div>}
        </>
    )

}

export default DatasTable

const initialContext = {
    tableDatasState : [],
    tableModel : new TableModel(),
    searchString: '', 
    paginationRules : {currentPage: 1, nEntriesPerPage:10}
}

export const DatasTableContext = createContext<IDatasTableContext>(initialContext)

interface IProps {
    tableModel : TableModel
    tableDatas : Array<any>
}