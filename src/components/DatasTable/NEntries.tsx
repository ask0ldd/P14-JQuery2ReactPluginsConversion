import { DatasTableContext } from "./DatasTable"
import { useContext } from "react"

/**
 * Component : A container displaying the number of entries in the current table.
 * @Component
 * @return ( <NEntries/> )
 */
function NEntries(){

    const {tableState} = useContext(DatasTableContext)

    const firstDisplayedEntry = tableState.pagination ? Math.abs((tableState.pagination.currentPage-1)*tableState.pagination.nEntriesPerPage) + 1 : 1
    const lastDisplayedEntry =  tableState.pagination ? Math.abs((tableState.pagination.currentPage-1)*tableState.pagination.nEntriesPerPage + tableState.pagination.nEntriesPerPage) : 10
    // const displayedRows = tableDatasState.slice(firstDisplayedEntry, lastDisplayedEntry).length
    const totalEntries = tableState.datas.length

    return(
        <div id="infosContainer">Showing {firstDisplayedEntry} to {lastDisplayedEntry < totalEntries ? lastDisplayedEntry : totalEntries} of {totalEntries} entries</div>
    )
}

export default NEntries