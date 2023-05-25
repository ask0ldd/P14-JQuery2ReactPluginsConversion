import { IProps } from "./DatasTable"

function Table({tableColumnsNames, tableDatasKeys, tableDatas} : IProps) {

    return (
        <table>
        <thead>
          <tr className='bottomblackborder'>
          {tableColumnsNames.map(name => (<th>{name}</th>))}
          </tr>
        </thead>
        <tbody>
          <tr className='odd'>
            {tableDatasKeys.map(key => (<td>{tableDatas[0][key]}</td>))}
          </tr>
          <tr>
            {tableDatasKeys.map(key => (<td>{tableDatas[1][key]}</td>))}
          </tr>
          <tr className='odd'>
            {tableDatasKeys.map(key => (<td>{tableDatas[2][key]}</td>))}
          </tr>
          <tr className='bottomblackborder'>
            {tableDatasKeys.map(key => (<td>{tableDatas[3][key]}</td>))}
          </tr>
        </tbody>
      </table>        
    )
}

export default Table

/*<table>
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
</table> */