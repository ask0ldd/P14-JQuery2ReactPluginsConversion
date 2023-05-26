import Table from './Table'
import NDisplayedSelect from './NDisplayedSelect'
import SearchModule from './SearchModule'
import Pagination from './Pagination'
import NEntries from './NEntries'

interface IOrdering{
    column : string
    direction : string
}

export interface IProps {
    tableColumnsNames : Array<string>
    tableDatasKeys : Array<string>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tableDatas : Array<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setOrdering : any
    ordering : IOrdering
}

function DatasTable({tableColumnsNames, tableDatasKeys, tableDatas, setOrdering, ordering} : IProps){

    // console.log(setOrdering)
    return(
        <>
            <div id="entriesNSearchContainer">
                <NDisplayedSelect/>
                <SearchModule/>
            </div>
            <Table tableColumnsNames={tableColumnsNames} tableDatasKeys={tableDatasKeys} tableDatas={tableDatas} setOrdering={setOrdering} ordering={ordering}/>
            <div id="infosNPaginationContainer">
                <NEntries nEntries={tableDatas.length}/>
                <Pagination/>
            </div>
        </>
    )
}

export default DatasTable