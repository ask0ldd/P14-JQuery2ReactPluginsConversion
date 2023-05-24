import '../App.css'
import '../style/CurrentEmployees.css'
import Table from '../components/DatasTable/Table'
import NDisplayedSelect from '../components/DatasTable/NDisplayedSelect'
import SearchModule from '../components/DatasTable/SearchModule'
import Pagination from '../components/DatasTable/Pagination'

function CurrentEmployees() {

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      <div id="entriesNSearchContainer">
        <NDisplayedSelect/>
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
