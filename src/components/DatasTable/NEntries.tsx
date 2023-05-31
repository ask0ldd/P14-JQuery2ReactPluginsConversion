import { DatasTableContext } from "./DatasTable"
import { useContext } from "react"

function NEntries(){

    const {tableDatasState, displayRules} = useContext(DatasTableContext)

    const firstDisplayedEntry = displayRules ? Math.abs((displayRules.currentPage-1)*displayRules.nEntriesPerPage) + 1 : 1
    const lastDisplayedEntry =  displayRules ? Math.abs((displayRules.currentPage-1)*displayRules.nEntriesPerPage + displayRules.nEntriesPerPage) : 10
    // const displayedRows = tableDatasState.slice(firstDisplayedEntry, lastDisplayedEntry).length
    const totalEntries = tableDatasState.length

    return(
        <div id="infosContainer">Showing {firstDisplayedEntry} to {lastDisplayedEntry < totalEntries ? lastDisplayedEntry : totalEntries} of {totalEntries} entries</div>
    )
}

export default NEntries