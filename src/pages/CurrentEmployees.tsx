/* eslint-disable react-hooks/exhaustive-deps */
import '../Form.css'
import '../style/CurrentEmployees.css'
import usersDatas from '../datas/usersDatas'
import DatasTable, { IColumnDefElement } from '../components/DatasTable/DatasTable'
import { Link } from 'react-router-dom'

/**
 * Component : Displaying the current employees datatable page.
 * @Component
 * @return ( <CurrentEmployees/> )
 */
function CurrentEmployees() {

  // tableContainer.columns => tableModel  & tableContainer.datas => tableDAO / tableDAO.dataSource
  const tableContainer = new TableContainer()
  tableContainer.addColumn(ColumnBuilder.startBuilder().setColumnName("First Name").setDatatypeAsString().setDatakey("firstName").setSortability(true).build())
  tableContainer.addColumn(ColumnBuilder.startBuilder().setColumnName("Last Name").setDatatypeAsString().setDatakey("lastName").setSortability(true).build())
  tableContainer.addColumn(ColumnBuilder.startBuilder().setColumnName("Start Date").setDatatypeAsDate().setDatakey("startingDate").setSortability(true).build())
  tableContainer.addColumn(ColumnBuilder.startBuilder().setColumnName("Department").setDatatypeAsString().setDatakey("department").setSortability(true).build())
  tableContainer.addColumn(ColumnBuilder.startBuilder().setColumnName("Birthdate").setDatatypeAsDate().setDatakey("birthDate").setSortability(true).build())
  tableContainer.addColumn(ColumnBuilder.startBuilder().setColumnName("Street").setDatatypeAsString().setDatakey("street").setSortability(true).build())
  tableContainer.addColumn(ColumnBuilder.startBuilder().setColumnName("City").setDatatypeAsString().setDatakey("city").setSortability(true).build())
  tableContainer.addColumn(ColumnBuilder.startBuilder().setColumnName("State").setDatatypeAsDate().setDatakey("state").setSortability(true).build())
  tableContainer.addColumn(ColumnBuilder.startBuilder().setColumnName("Zip Code").setDatatypeAsNumber().setDatakey("zipCode").setSortability(true).build())

  tableContainer.setDatas([...usersDatas])

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      <DatasTable columnsDefinition={tableContainer.getColumns()} tableDatas={tableContainer.getDatas()}/> {/* should pass tableContainer and implements quoted methods */}
      <Link to={`/`}>Home</Link>
    </main>)
}

export default CurrentEmployees

/*const columnsDefinition : Array<IColumnDefElement> = [
  { th: 'First Name', datakey: 'firstName', sortable: true, datatype: 'string' },
  { th: 'Last Name', datakey: 'lastName', sortable: true, datatype: 'string' },
  { th: 'Start Date', datakey: 'startingDate', sortable: true, datatype: 'date' },
  { th: 'Department', datakey: 'department', sortable: true, datatype: 'string' },
  { th: 'Birthdate', datakey: 'birthDate', sortable: true, datatype: 'date' },
  { th: 'Street', datakey: 'street', sortable: true, datatype: 'string' },
  { th: 'City', datakey: 'city', sortable: true, datatype: 'string' },
  { th: 'State', datakey: 'state', sortable: true, datatype: 'string' },
  { th: 'Zip Code', datakey: 'zipCode', sortable: true, datatype: 'number' },
]*/

class ColumnBuilder {

  static #th : string | null = null
  static #datakey : string | null = null
  static #sortable = false
  static #datatype : string | null = null

  static startBuilder(){
    this.#th = null
    this.#datakey = null
    this.#sortable = false
    this.#datatype = null
    return this
  }

  static setColumnName(th : string){
    this.#th = th
    return this
  }

  static setDatakey(datakey : string){
    this.#datakey = datakey
    return this
  }

  static setSortability(sortable : boolean){
    this.#sortable = sortable
    return this
  }

  // order function instead
  static setDatatype(datatype : string){
    this.#datatype = datatype
    return this
  }

  static setDatatypeAsString(){
    this.#datatype = "string"
    return this
  }

  static setDatatypeAsNumber(){
    this.#datatype = "number"
    return this
  }

  static setDatatypeAsDate(){
    this.#datatype = "date"
    return this
  }

  static build(){
    try{
      if(this.#th == null || this.#datakey == null || this.#datatype == null ) throw new Error("Can't be built : Column Definition incomplete.")
      return new Column(this.#th, this.#datakey, this.#sortable, this.#datatype)
    }catch (e){
      console.error(e)
      return undefined
    }
  }

}

class Column {
  #th : string | null
  #datakey : string | null
  #sortable : boolean
  #datatype : string | null

  constructor(th : string, datakey: string, sortable : boolean, datatype : string){
    this.#th = th
    this.#datakey = datakey
    this.#sortable = sortable
    this.#datatype = datatype
  }
  
  toObject() : IColumnDefElement | undefined {
    if(this.#th == null || this.#datakey == null || this.#datatype == null ) return undefined // { th: '', datakey: '', sortable: true, datatype: '' }
    return({th : this.#th, datakey : this.#datakey, sortable : this.#sortable, datatype : this.#datatype})
  }
}