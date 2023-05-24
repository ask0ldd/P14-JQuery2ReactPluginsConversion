import Table from './Table'
import NDisplayedSelect from './NDisplayedSelect'
import SearchModule from './SearchModule'
import Pagination from './Pagination'
import NEntries from './NEntries'

function DatasTable(){
    return(
        <>
            <div id="entriesNSearchContainer">
                <NDisplayedSelect/>
                <SearchModule/>
            </div>
            <Table/>
            <div id="infosNPaginationContainer">
                <NEntries/>
                <Pagination/>
            </div>
        </>
    )
}

export default DatasTable