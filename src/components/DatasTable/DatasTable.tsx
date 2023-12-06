/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Table from './Table'
import NDisplayedSelect from './NDisplayedSelect'
import SearchModule from './SearchModule'
import Pagination from './Pagination'
import NEntries from './NEntries'
import { useState, useEffect } from 'react'
import {createContext} from 'react'
import useOrderTable from './hooks/useOrderTable'
import { IColumnDefElement } from './interfaces/IColumnDefElement'
import { IDatasTableContext, IOrdering, IPaginationRules } from './interfaces/IDatasTableContext'
import { TableModel } from './models/TableModel'

/**
 * Component : Grouping of all the constitutive elements of a datatable.
 * @Component
 * @param {Object[]} props - Props.
 * @param {Object[]} props.columnsDefinition
 * @param {string} props.columnsDefinition[].datakey - Column accessor.
 * @param {string} props.columnsDefinition[].th - String to be inserted into the th tag of the column - Header.
 * @param {boolean} props.columnsDefinition[].sortable - Sortability of the column.
 * @param {string} props.columnsDefinition[].datatype - Type of the datas populating the column.
 * @param {Object[]} props.tableDatas - Datas used to populate the table.
 * @return ( <DatasTable columnsDefinition={columnsDefinition} tableDatas={tableDatas}/> )
 */
function DatasTable({tableModel, tableDatas} : IProps){

    const tableColumnsNames : Array<string> = tableModel.getColumnsNamesList()
    const tableDatasKeys : Array<string> = tableModel.getAccessorsList()
  
    // currentPage / nEntriesPerPage / searchString / sortingDirection / sortingTargetColumn
    const [tableDatasState, setTableDatas] = useState<Array<any>>([...tableDatas]);
    const [ordering, setOrdering] = useState<IOrdering>({column : '', direction : 'asc'})
    const [paginationRules, setPaginationRules] = useState<IPaginationRules>({currentPage : 1, nEntriesPerPage : 10})
    const [searchString, setSearchString] = useState<string>('')
    const [isColumnsDefinitionMatchingDatas, setUsColumnsDefinitionMatchingDatas] = useState(true)
  
    useOrderTable(tableDatas, setTableDatas, searchString, ordering, tableModel.getColumns(), paginationRules)

    // when typing into the searchbar => current page set back to 1
    useEffect(()=>{
        setPaginationRules({...paginationRules, currentPage : 1})
    }, [searchString])

    useEffect(() => {
        const tableDatasPropertiesList = Object.getOwnPropertyNames(tableDatas[0])
        tableModel.getAccessorsList().forEach(accessor => {
            if(tableDatasPropertiesList.includes(accessor) === false) setUsColumnsDefinitionMatchingDatas(false)
        })
    }, [tableDatas])

    return(
        <>
            {isColumnsDefinitionMatchingDatas ? 
            <DatasTableContext.Provider value={{paginationRules, tableDatasState, ordering, searchString, tableColumnsNames, tableDatasKeys, setPaginationRules, setOrdering, setSearchString}}>
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
    tableColumnsNames : [], 
    tableDatasKeys: [], 
    searchString: '', 
    paginationRules : {currentPage: 1, nEntriesPerPage:10}
}

export const DatasTableContext = createContext<IDatasTableContext>(initialContext)

interface IProps {
    tableModel : TableModel
    tableDatas : Array<any>
}