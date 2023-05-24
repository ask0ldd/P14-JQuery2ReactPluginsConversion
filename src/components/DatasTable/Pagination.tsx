import '../../style/table/Pagination.css'

function Pagination() {

    return (
        <div id="paginationContainer">
          <span>Previous</span>
          <div className="paginationActivePage">1</div>
          <span>Next</span>
        </div>
    )
}

export default Pagination