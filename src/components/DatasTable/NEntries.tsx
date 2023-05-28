import { DatasTableContext } from "./DatasTable"
import { useContext } from "react"

function NEntries(){

    const {tableDatasState, displayRules} = useContext(DatasTableContext)

    const firstDisplayedEntry = Math.abs((displayRules.currentPage-1)*displayRules.nEntriesPerPage)
    const lastDisplayedEntry = Math.abs((displayRules.currentPage-1)*displayRules.nEntriesPerPage + displayRules.nEntriesPerPage)
    const displayedRows = tableDatasState.slice(firstDisplayedEntry, lastDisplayedEntry).length
    const totalEntries = tableDatasState.length

    return(
        <div id="infosContainer">Showing {displayedRows} of {totalEntries} entries</div>
    )
}

export default NEntries

/*interface IProps{
    nEntries: number
    totalEntries: number
}*/