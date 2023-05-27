/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Table from './Table'
import NDisplayedSelect from './NDisplayedSelect'
import SearchModule from './SearchModule'
import Pagination from './Pagination'
import NEntries from './NEntries'
import { useState, useEffect } from 'react'
import { IUSersDatas } from '../../datas/usersDatasTen'

interface IProps {
    tableColumnsNames : Array<string>
    tableDatasKeys : Array<string>
    tableDatas : Array<any>
}

function DatasTable({tableColumnsNames, tableDatasKeys, tableDatas} : IProps){

    const frCollator = new Intl.Collator('en')
  
    const [tableDatasState, setTableDatas] = useState([...tableDatas]);
    const [ordering, setOrdering] = useState({column : '', direction : 'asc'})
    const [displayingRange, setDisplayingRange] = useState([0, 10])
  
    // react to any ordering state update
    useEffect(() => {
      // [...usersDatas] avoid mutation
      if(ordering.column !== '' && ordering.direction === 'asc') setTableDatas([...tableDatas].sort((a,b) => frCollator.compare(a[ordering.column as keyof IUSersDatas], b[ordering.column as keyof IUSersDatas])))
      if(ordering.column !== '' && ordering.direction === 'desc') setTableDatas([...tableDatas].sort((a,b) => frCollator.compare(b[ordering.column as keyof IUSersDatas], a[ordering.column as keyof IUSersDatas])))
    }, [ordering.column, ordering.direction])

    // console.log(setOrdering)
    return(
        <>
            <div id="entriesNSearchContainer">
                <NDisplayedSelect setDisplayingRange={setDisplayingRange}/>
                <SearchModule/>
            </div>
            <Table tableColumnsNames={tableColumnsNames} tableDatasKeys={tableDatasKeys} tableDatas={tableDatasState.slice(displayingRange[0], displayingRange[1])} setOrdering={setOrdering} ordering={ordering} setDisplayingRange={setDisplayingRange}/>
            <div id="infosNPaginationContainer">
                <NEntries nEntries={tableDatasState.slice(displayingRange[0], displayingRange[1]).length} totalEntries={tableDatasState.length}/>
                <Pagination/>
            </div>
        </>
    )
}

export default DatasTable