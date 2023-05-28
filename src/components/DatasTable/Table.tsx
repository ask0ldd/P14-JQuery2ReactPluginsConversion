/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react"
import { DatasTableContext } from "./DatasTable"
import '../../style/table/Table.css'
import { IUsersDatas } from "../../datas/usersDatasTen"

function Table() {

    const {displayRules, tableDatasState, ordering, tableColumnsNames, tableDatasKeys, setOrdering} = useContext(DatasTableContext)

    function handleOrderingClick(index : number){
      // if clicking on the already active column, invert sorting direction
      if(ordering?.column === tableDatasKeys[index]) 
        return ordering.direction === 'asc' ? setOrdering && setOrdering({column : tableDatasKeys[index], direction : 'desc'}) :  setOrdering && setOrdering({column : tableDatasKeys[index], direction : 'asc'})
      // if clicking on a different column sorting asc this new column
      return setOrdering && setOrdering({column : tableDatasKeys[index], direction : 'asc'})
    }

    const firstDisplayedEntry = displayRules ? Math.abs((displayRules.currentPage-1)*displayRules.nEntriesPerPage) : 0
    const lastDisplayedEntry =  displayRules ? Math.abs((displayRules.currentPage-1)*displayRules.nEntriesPerPage + displayRules.nEntriesPerPage) : 10
    const rowsToDisplay = [...tableDatasState].slice(firstDisplayedEntry, lastDisplayedEntry)

    return (
        <table>
        <thead>
          <tr className='bottomblackborder'>
          {[...tableColumnsNames].map((name, index) => (<th key={'thtable-'+index} style={{cursor:'pointer'}} onClick={() => {handleOrderingClick(index)}}>{name}</th>))}
          </tr>
        </thead>
        <tbody>
          {[...rowsToDisplay].map((datarow, index) => (<tr key={'trtable-'+index} className={isRowOdd(index) + isLastRow(index, tableDatasState.length-1)}>{[...tableDatasKeys].map((key : string) => (<td key={'tdtable-'+key+'-'+index}>{datarow[key as keyof IUsersDatas]}</td>))}</tr>))}
        </tbody>
      </table>        
    )
}

export default Table

function isRowOdd(index : number){
  return index%2 === 1 ? 'odd' : ''
 }
 
 function isLastRow(index : number, lastRowIndex : number){
   return index === lastRowIndex ? ' bottomblackborder' : ''
 }

/*interface IOrdering{
  column : string
  direction : string
}

export interface IProps {
  tableColumnsNames : Array<string>
  tableDatasKeys : Array<string>
  tableDatas : Array<any>
  setOrdering({column, direction} : IOrdering) : void
  ordering : IOrdering
  setDisplayingRange : any
}*/