/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Table from './Table'
import NDisplayedSelect from './NDisplayedSelect'
import SearchModule from './SearchModule'
import Pagination from './Pagination'
import NEntries from './NEntries'
import { useState, useEffect } from 'react'
import { IUSersDatas } from '../../datas/usersDatasTen'
import { IColumnDefElement } from '../../pages/CurrentEmployees'
import {createContext} from 'react'

function DatasTable({columnsDefinition, tableDatas} : IProps){

    const frCollator = new Intl.Collator('en')

    const tableColumnsNames : Array<string> = columnsDefinition.reduce((accu : Array<string>, column) => {accu.push(column.th); return accu}, [])
    const tableDatasKeys : Array<string> = columnsDefinition.reduce((accu : Array<string>, column) => {accu.push(column.datakey); return accu}, [])
  
    // currentPage / nEntriesPerPage / searchString / sortingDirection / sortingTargetColumn
    const [tableDatasState, setTableDatas] = useState<Array<object>>([...tableDatas]);
    const [ordering, setOrdering] = useState({column : '', direction : 'asc'})
    const [displayRules, setDisplayRules] = useState({currentPage : 1, nEntriesPerPage : 10})
    const [searchString, setSearchString] = useState<string>('')
  
    // react to any ordering state update
    useEffect(() => {
        // [...usersDatas] to avoid any mutation
        let filteredTable
        if(searchString !== '') 
        {
            filteredTable = [...tableDatas].filter(row => {
                // check if one of the properties of a row contain the searchString
                for (const property in row) if(row[property].toString().toLowerCase().includes(searchString.toLowerCase())) return true
                return false
            })}else{
            filteredTable = [...tableDatas]
        }
        if(ordering.column === '') return setTableDatas(filteredTable)
        if(ordering.column !== '' && ordering.direction === 'asc') return setTableDatas(filteredTable.sort((a,b) => frCollator.compare(a[ordering.column as keyof IUSersDatas], b[ordering.column as keyof IUSersDatas])))
        if(ordering.column !== '' && ordering.direction === 'desc') setTableDatas(filteredTable.sort((a,b) => frCollator.compare(b[ordering.column as keyof IUSersDatas], a[ordering.column as keyof IUSersDatas])))
    }, [ordering.column, ordering.direction, displayRules.currentPage, searchString])

    // searchString update should set currentpage to 1
    useEffect(()=>{
        setDisplayRules({...displayRules, currentPage : 1})
    }, [searchString])

    const firstDisplayedEntry = Math.abs((displayRules.currentPage-1)*displayRules.nEntriesPerPage)
    const lastDisplayedEntry = Math.abs((displayRules.currentPage-1)*displayRules.nEntriesPerPage + displayRules.nEntriesPerPage)
    // console.log('first: ', firstDisplayedEntry)
    // console.log('last: ', lastDisplayedEntry)

    // console.log('search: ', searchString)

    return(
        <>  
            <DatasTableContext.Provider value={{displayRules, tableDatasState, ordering, searchString, setDisplayRules, setOrdering, setSearchString}}>
                <div id="entriesNSearchContainer">
                    <NDisplayedSelect/>
                    <SearchModule/>
                </div>
                <Table tableColumnsNames={tableColumnsNames} tableDatasKeys={tableDatasKeys} tableDatas={[...tableDatasState].slice(firstDisplayedEntry, lastDisplayedEntry)} setOrdering={setOrdering} ordering={ordering} setDisplayingRange={setDisplayRules}/>
                <div id="infosNPaginationContainer">
                    <NEntries nEntries={tableDatasState.slice(firstDisplayedEntry, lastDisplayedEntry).length} totalEntries={tableDatasState.length}/>
                    <Pagination totalEntries={tableDatasState.length} currentPage={displayRules.currentPage} nEntriesPerPage={displayRules.nEntriesPerPage} setDisplayRules={setDisplayRules}/>
                </div>
            </DatasTableContext.Provider>
        </>
    )
}

export default DatasTable

interface IDatasTableContext{ // define states interfaces to replace any
    displayRules? : any
    tableDatasState? : any
    ordering? : any
    searchString? : string
    tableColumnsNames? : Array<string>
    tableDatasKeys? : Array<string>
    setDisplayRules? : any
    setOrdering? : any
    setSearchString? : any
}

export const DatasTableContext = createContext<IDatasTableContext>({})

interface IProps {
    columnsDefinition : Array<IColumnDefElement>
    tableDatas : Array<any>
}



/*
<Pagination totalEntries={tableDatasState.length} currentPage={displayRules.currentPage} nEntriesPerPage={displayRules.nEntriesPerPage} setDisplayRules={setDisplayRules}/>
*/