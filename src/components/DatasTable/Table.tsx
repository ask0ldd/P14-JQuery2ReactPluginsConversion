interface IOrdering{
  column : string
  direction : string
}

export interface IProps {
  tableColumnsNames : Array<string>
  tableDatasKeys : Array<string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableDatas : Array<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOrdering : any
  ordering : IOrdering
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDisplayingRange : any
}

function isRowOdd(index : number){
 return index%2 === 1 ? 'odd' : ''
}

function isLastRow(index : number, lastRowIndex : number){
  return index === lastRowIndex ? ' bottomblackborder' : ''
}

function Table({tableColumnsNames, tableDatasKeys, tableDatas, setOrdering, ordering} : IProps) {

    // const handleClick = () => setOrdering({column : 'lastName', direction : 'asc'})
    // console.log(setOrdering)

    function handleOrderingClick(index : number){
      // if clicking on the already active column, invert sorting direction
      if(ordering.column === tableDatasKeys[index]) 
        return ordering.direction === 'asc' ? setOrdering({column : tableDatasKeys[index], direction : 'desc'}) :  setOrdering({column : tableDatasKeys[index], direction : 'asc'})
      // if clicking on a different column sorting asc this new column
      return setOrdering({column : tableDatasKeys[index], direction : 'asc'})
    }

    return (
        <table>
        <thead>
          <tr className='bottomblackborder'>
          {tableColumnsNames.map((name, index) => (<th style={{cursor:'pointer'}} onClick={() => {handleOrderingClick(index)}}>{name}</th>))}
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