/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../style/table/Pagination.css'

interface IProps{
  currentPage: number
  setDisplayRules: any
  nEntriesPerPage: number
  totalEntries: number
}

function Pagination({currentPage, setDisplayRules, nEntriesPerPage, totalEntries} : IProps) {

    function prevPage(){
      setDisplayRules({currentPage: currentPage > 1 ? currentPage-1 : currentPage, nEntriesPerPage: nEntriesPerPage})
    }

    function nextPage(){
      setDisplayRules({currentPage: currentPage * nEntriesPerPage < totalEntries ? currentPage+1 : currentPage, nEntriesPerPage: nEntriesPerPage})
    }

    function enoughEntriesLeftForNextPage(){
      return currentPage * nEntriesPerPage < totalEntries
    }

    return (
        <div id="paginationContainer">
          {currentPage > 1 && <span style={{marginRight:'0.5rem'}} onClick={() => prevPage()}>Previous</span>}
          {currentPage > 1 && <div className="paginationInactivePage" onClick={() => prevPage()}>{currentPage-1}</div>}
          <div className="paginationActivePage">{currentPage}</div>
          {enoughEntriesLeftForNextPage() && <div className="paginationInactivePage" onClick={() => nextPage()}>{currentPage+1}</div>}
          {enoughEntriesLeftForNextPage() && <span style={{marginLeft:'0.5rem'}} onClick={() => nextPage()}>Next</span>}
        </div>
    )
}

export default Pagination