import '../App.css'
import '../style/CurrentEmployees.css'
import Table from '../components/table/Table'
import Entries from '../components/table/Entries'
import SearchModule from '../components/table/SearchModule'
import Pagination from '../components/table/Pagination'

function CurrentEmployees() {

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      <div id="entriesNSearchContainer">
        <Entries/>
        <SearchModule/>
      </div>
      <Table/>
      <div id="infosNPaginationContainer">
        <div id="infosContainer">Showing 1 to 2 of 2 entries</div>
        <Pagination/>
      </div>
    </main>
  )
}

export default CurrentEmployees
