import { IProps } from "./DatasTable"

function isRowOdd(index : number){
 return index%2 === 1 ? 'odd' : ''
}

function isLastRow(index : number, lastRowIndex : number){
  return index === lastRowIndex ? ' bottomblackborder' : ''
}

function Table({tableColumnsNames, tableDatasKeys, tableDatas, setOrdering} : IProps) {

    // const handleClick = () => setOrdering({column : 'lastName', direction : 'asc'})
    // console.log(setOrdering)

    return (
        <table>
        <thead>
          <tr className='bottomblackborder'>
          {tableColumnsNames.map((name, index) => (<th style={{cursor:'pointer'}} onClick={() => {console.log('ordering called'); setOrdering({column : tableDatasKeys[index], direction : 'asc'})}}>{name}</th>))}
          </tr>
        </thead>
        <tbody>
          {tableDatas.map((datarow, index) => (<tr className={isRowOdd(index) + isLastRow(index, tableDatas.length-1)}>{tableDatasKeys.map(key => (<td>{datarow[key]}</td>))}</tr>))}
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

/*
{tableColumnsNames.map((name, index) => (<th onClick={() => {setOrdering({column : tableDatasKeys[index], direction : 'asc'})}}>{name}</th>))}
*/