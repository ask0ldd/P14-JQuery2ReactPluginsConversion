/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Table from './Table'
import NDisplayedSelect from './NDisplayedSelect'
import SearchModule from './SearchModule'
import Pagination from './Pagination'
import NEntries from './NEntries'
import { useState, useEffect } from 'react'
import { IUSersDatas } from '../../datas/usersDatasTen'
import {createContext} from 'react'

interface IDatasTableContext{
    range? : any
}

export const DatasTableContext = createContext<IDatasTableContext>({})

interface IProps {
    tableColumnsNames : Array<string>
    tableDatasKeys : Array<string>
    tableDatas : Array<any>
}

function DatasTable({tableColumnsNames, tableDatasKeys, tableDatas} : IProps){

    const frCollator = new Intl.Collator('en')
  
    const [tableDatasState, setTableDatas] = useState([...tableDatas]);
    const [ordering, setOrdering] = useState({column : '', direction : 'asc'})
    const [displayRules, setDisplayRules] = useState({currentPage : 0, nEntriesPerPage : 10})
    // currentPage / nEntriesPerPage / searchString / orderDirection / orderTargetColumn
  
    // react to any ordering state update
    useEffect(() => {
      // [...usersDatas] to avoid any mutation
      if(ordering.column !== '' && ordering.direction === 'asc') setTableDatas([...tableDatas].sort((a,b) => frCollator.compare(a[ordering.column as keyof IUSersDatas], b[ordering.column as keyof IUSersDatas])))
      if(ordering.column !== '' && ordering.direction === 'desc') setTableDatas([...tableDatas].sort((a,b) => frCollator.compare(b[ordering.column as keyof IUSersDatas], a[ordering.column as keyof IUSersDatas])))
    }, [ordering.column, ordering.direction])

    return(
        <>  
            <DatasTableContext.Provider value={{range : displayRules}}>
                <div id="entriesNSearchContainer">
                    <NDisplayedSelect setDisplayRules={setDisplayRules}/>
                    <SearchModule/>
                </div>
                <Table tableColumnsNames={tableColumnsNames} tableDatasKeys={tableDatasKeys} tableDatas={tableDatasState.slice(displayRules.currentPage, displayRules.nEntriesPerPage)} setOrdering={setOrdering} ordering={ordering} setDisplayingRange={setDisplayRules}/>
                <div id="infosNPaginationContainer">
                    <NEntries nEntries={tableDatasState.slice(displayRules.currentPage, displayRules.nEntriesPerPage).length} totalEntries={tableDatasState.length}/>
                    <Pagination/>
                </div>
            </DatasTableContext.Provider>
        </>
    )
}

export default DatasTable