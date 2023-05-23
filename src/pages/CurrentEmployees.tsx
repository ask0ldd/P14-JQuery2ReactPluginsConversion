import '../App.css'
import '../style/CurrentEmployees.css'

function CurrentEmployees() {

  return (
    <main>
      <table>
        <thead>
          <tr className='bottomblackborder'>
            <th>Firstname</th><th>Lastname</th><th>Start Date</th><th>Birthdate</th><th>Street</th><th>City</th><th>State</th><th>Zip Code</th>
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
    </main>
  )
}

export default CurrentEmployees
