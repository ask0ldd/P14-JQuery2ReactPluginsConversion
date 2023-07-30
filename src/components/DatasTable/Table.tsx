/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react"
import { DatasTableContext } from "./DatasTable"
import './style/Table.css'
import { IUsersDatas } from "../../datas/usersDatasTen"


// !!! limit size of value in a cell & fix col sizes

/**
 * Component : A simple HTML Table displaying all the requested data.
 * @Component
 * @return ( <Table/> )
 */
function Table() {

    const {paginationRules, tableDatasState, ordering, tableColumnsNames, tableDatasKeys, setOrdering} = useContext(DatasTableContext)

    function handleOrderingClick(index : number){
      // if clicking on the already active column, invert sorting direction
      if(ordering?.column === tableDatasKeys[index]) 
        return ordering.direction === 'asc' ? setOrdering && setOrdering({column : tableDatasKeys[index], direction : 'desc'}) :  setOrdering && setOrdering({column : tableDatasKeys[index], direction : 'asc'})
      // if clicking on a different column sorting asc this new column
      return setOrdering && setOrdering({column : tableDatasKeys[index], direction : 'asc'})
    }

    const firstDisplayedEntry = paginationRules ? Math.abs((paginationRules.currentPage-1)*paginationRules.nEntriesPerPage) : 0
    const lastDisplayedEntry =  paginationRules ? Math.abs((paginationRules.currentPage-1)*paginationRules.nEntriesPerPage + paginationRules.nEntriesPerPage) : 10
    const rowsToDisplay = [...tableDatasState].slice(firstDisplayedEntry, lastDisplayedEntry)

    return (
        <table aria-label="Current Employees">
        <thead>
          <tr className='bottomblackborder'>
          {[...tableColumnsNames].map((name, index) => (<th key={'thtable-'+index} style={{cursor:'pointer'}} onClick={() => {handleOrderingClick(index)}}>{name}<div className="arrowsContainer"><span style={ordering?.direction === "asc" && ordering?.column == tableDatasKeys[index] ? {color:'rgb(0, 120, 215)'} : {}}>▲</span><span style={ordering?.direction === "desc" && ordering?.column == tableDatasKeys[index] ? {color:'rgb(0, 120, 215)'} : {}}>▼</span></div></th>)) /* !!! clickable seulement si sortable */}
          </tr>
        </thead>
        <tbody>
          {[...rowsToDisplay].map((datarow, index) => (<tr key={'trtable-'+index} className={isRowOdd(index) + isLastRow(index, rowsToDisplay.length-1) /* use css 2*n+1 */}>{[...tableDatasKeys].map((key : string) => (<td key={'tdtable-'+key+'-'+index}>{datarow[key as keyof IUsersDatas]}</td>))}</tr>))}
        </tbody>
      </table>        
    )
}

export default Table

// !!! jsdoc
function isRowOdd(index : number){
  return index%2 === 1 ? 'odd' : ''
 }
 
 // !!! jsdoc
 function isLastRow(index : number, lastRowIndex : number){
   return index === lastRowIndex ? ' bottomblackborder' : ''
 }