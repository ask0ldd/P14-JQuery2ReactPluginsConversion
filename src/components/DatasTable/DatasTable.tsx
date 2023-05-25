import Table from './Table'
import NDisplayedSelect from './NDisplayedSelect'
import SearchModule from './SearchModule'
import Pagination from './Pagination'
import NEntries from './NEntries'

export interface IProps {
    tableColumnsNames : Array<string>
    tableDatasKeys : Array<string>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tableDatas : Array<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tableDatasSetter : any
}

function DatasTable({tableColumnsNames, tableDatasKeys, tableDatas, tableDatasSetter} : IProps){

    return(
        <>
            <div id="entriesNSearchContainer">
                <NDisplayedSelect/>
                <SearchModule/>
            </div>
            <Table tableColumnsNames={tableColumnsNames} tableDatasKeys={tableDatasKeys} tableDatas={tableDatas} tableDatasSetter={tableDatasSetter}/>
            <div id="infosNPaginationContainer">
                <NEntries nEntries={tableDatas.length}/>
                <Pagination/>
            </div>
        </>
    )
}

export default DatasTable