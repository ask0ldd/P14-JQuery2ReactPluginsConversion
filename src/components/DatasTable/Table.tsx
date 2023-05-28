/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react"
import { DatasTableContext } from "./DatasTable"
import '../../style/table/Table.css'

interface IOrdering{
  column : string
  direction : string
}

export interface IProps {
  tableColumnsNames : Array<string>
  tableDatasKeys : Array<string>
  tableDatas : Array<any>
  setOrdering : any
  ordering : IOrdering
  setDisplayingRange : any
}

function isRowOdd(index : number){
 return index%2 === 1 ? 'odd' : ''
}

function isLastRow(index : number, lastRowIndex : number){
  return index === lastRowIndex ? ' bottomblackborder' : ''
}

function Table(/*{tableColumnsNames, tableDatasKeys, tableDatas, setOrdering, ordering} : IProps*/) {

    const {displayRules, tableDatasState, ordering, searchString, tableColumnsNames, tableDatasKeys, setDisplayRules, setOrdering, setSearchString} = useContext(DatasTableContext)

    function handleOrderingClick(index : number){
      // if clicking on the already active column, invert sorting direction
      if(ordering.column === tableDatasKeys[index]) 
        return ordering.direction === 'asc' ? setOrdering({column : tableDatasKeys[index], direction : 'desc'}) :  setOrdering({column : tableDatasKeys[index], direction : 'asc'})
      // if clicking on a different column sorting asc this new column
      return setOrdering({column : tableDatasKeys[index], direction : 'asc'})
    }

    const firstDisplayedEntry = Math.abs((displayRules.currentPage-1)*displayRules.nEntriesPerPage)
    const lastDisplayedEntry = Math.abs((displayRules.currentPage-1)*displayRules.nEntriesPerPage + displayRules.nEntriesPerPage)

    const rowsToDisplay = [...tableDatasState].slice(firstDisplayedEntry, lastDisplayedEntry)

    return (
        <table>
        <thead>
          <tr className='bottomblackborder'>
          {[...tableColumnsNames].map((name, index) => (<th key={'thtable-'+index} style={{cursor:'pointer'}} onClick={() => {handleOrderingClick(index)}}>{name}</th>))}
          </tr>
        </thead>
        <tbody>
          {[...rowsToDisplay].map((datarow, index) => (<tr key={'trtable-'+index} className={isRowOdd(index) + isLastRow(index, tableDatasState.length-1)}>{[...tableDatasKeys].map(key => (<td key={'tdtable-'+key+'-'+index}>{datarow[key]}</td>))}</tr>))}
        </tbody>
      </table>        
    )
}

export default Table