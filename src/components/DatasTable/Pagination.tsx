/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../style/table/Pagination.css'

interface IProps{
  currentPage: number
  setDisplayRules: any
  nEntriesPerPage: number
  totalEntries: number
}

/* deal with max next onclick*/

function Pagination({currentPage, setDisplayRules, nEntriesPerPage, totalEntries} : IProps) {

    return (
        <div id="paginationContainer">
          <span style={{cursor:'pointer'}} onClick={() => setDisplayRules({currentPage: currentPage > 1 ? currentPage-1 : currentPage, nEntriesPerPage: nEntriesPerPage})}>Previous</span>
          <div className="paginationActivePage">{currentPage}</div>
          <span style={{cursor:'pointer'}} onClick={() => setDisplayRules({currentPage: currentPage+1*nEntriesPerPage < totalEntries ? currentPage+1 : currentPage, nEntriesPerPage: nEntriesPerPage})}>Next</span>
        </div>
    )
}

export default Pagination