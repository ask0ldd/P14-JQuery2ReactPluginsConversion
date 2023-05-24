import '../App.css'
import '../style/CurrentEmployees.css'



function CurrentEmployees() {

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      <div id="entriesNSearchContainer">
        <div id="entriesContainer">Show
        <select>
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
        entries</div>
        <div id="searchContainer">
          <label htmlFor='search'>Search:</label>
          <input id='search' type="text"/>
        </div>
      </div>
      <table>
        <thead>
          <tr className='bottomblackborder'>
            <th>First Name</th><th>Last Name</th><th>Start Date</th><th>Birthdate</th><th>Street</th><th>City</th><th>State</th><th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          <tr className='odd'>
            <td>Firstname</td><td>Lastname</td><td>Start Date</td><td>Birthdate</td><td>Street</td><td>City</td><td>State</td><td>Zip Code</td>
          </tr>
          <tr>
            <td>Firstname</td><td>Lastname</td><td>Start Date</td><td>Birthdate</td><td>Street</td><td>City</td><td>State</td><td>Zip Code</td>
          </tr>
          <tr className='odd'>
            <td>Firstname</td><td>Lastname</td><td>Start Date</td><td>Birthdate</td><td>Street</td><td>City</td><td>State</td><td>Zip Code</td>
          </tr>
          <tr className='bottomblackborder'>
            <td>Firstname</td><td>Lastname</td><td>Start Date</td><td>Birthdate</td><td>Street</td><td>City</td><td>State</td><td>Zip Code</td>
          </tr>
        </tbody>
      </table>
      <div id="infosNPaginationContainer">
        <div id="infosContainer">Showing 1 to 2 of 2 entries</div>
        <div id="paginationContainer">
          <span>Previous</span>
          <button>1</button>
          <span>Next</span>
        </div>
      </div>
    </main>
  )
}

export default CurrentEmployees
