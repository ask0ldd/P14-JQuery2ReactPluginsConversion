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
function DatasTable({columnsDefinition, tableDatas} : IProps){

    const tableColumnsNames : Array<string> = columnsDefinition.reduce((accu : Array<string>, column) => {accu.push(column.th); return accu}, [])
    const tableDatasKeys : Array<string> = columnsDefinition.reduce((accu : Array<string>, column) => {accu.push(column.datakey); return accu}, [])
  
    // currentPage / nEntriesPerPage / searchString / sortingDirection / sortingTargetColumn
    const [tableDatasState, setTableDatas] = useState<Array<any>>([...tableDatas]);
    const [ordering, setOrdering] = useState<IOrdering>({column : '', direction : 'asc'})
    const [paginationRules, setPaginationRules] = useState<IPaginationRules>({currentPage : 1, nEntriesPerPage : 10})
    const [searchString, setSearchString] = useState<string>('')
  
    useOrderTable(tableDatas, setTableDatas, searchString, ordering, columnsDefinition, paginationRules)

    // when typing into the searchbar => current page set back to 1
    useEffect(()=>{
        setPaginationRules({...paginationRules, currentPage : 1})
    }, [searchString])

    return(
        <>
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

interface IDatasTableContext{
    paginationRules? : IPaginationRules
    tableDatasState : Array<any>
    ordering? : IOrdering
    searchString? : string
    tableColumnsNames : Array<string>
    tableDatasKeys : Array<string>
    setPaginationRules?({currentPage, nEntriesPerPage} : IPaginationRules) : void
    setOrdering?({column, direction} : IOrdering) : void
    setSearchString?(string : string) : void
}

interface IProps {
    columnsDefinition : Array<IColumnDefElement>
    tableDatas : Array<any>
}

export interface IPaginationRules{
    currentPage : number
    nEntriesPerPage : number
}

export interface IOrdering{
    column : string
    direction : 'asc' | 'desc'
}

export interface IColumnDefElement 
{
  th : string
  datakey : string
  sortable : boolean
  datatype : string
}