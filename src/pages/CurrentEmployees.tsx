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

  const column = ColumnBuilder.startBuilder().setTh("First Name").setDatatype("string").setDatakey("firstName").setSortability(true).build()

  // check if usersDatas properties match columnsDefinition datakeys // should check for each object ?
  let isDefinitionMatchingDatas = true
  const tableDatasPropertiesList = Object.getOwnPropertyNames(usersDatas[0])
  columnsDefinition.forEach(definition => {
    if(tableDatasPropertiesList.includes(definition.datakey) === false) isDefinitionMatchingDatas = false 
  })

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      {isDefinitionMatchingDatas 
      ? <DatasTable columnsDefinition={columnsDefinition} tableDatas={[...usersDatas]}/> 
      : <div>Users datas are missing some mandatory dataKeys.</div>}
      <Link to={`/`}>Home</Link>
    </main>
  )
}

export default CurrentEmployees

const columnsDefinition : Array<IColumnDefElement> = [
  { th: 'First Name', datakey: 'firstName', sortable: true, datatype: 'string' },
  { th: 'Last Name', datakey: 'lastName', sortable: true, datatype: 'string' },
  { th: 'Start Date', datakey: 'startingDate', sortable: true, datatype: 'date' },
  { th: 'Department', datakey: 'department', sortable: true, datatype: 'string' },
  { th: 'Birthdate', datakey: 'birthDate', sortable: true, datatype: 'date' },
  { th: 'Street', datakey: 'street', sortable: true, datatype: 'string' },
  { th: 'City', datakey: 'city', sortable: true, datatype: 'string' },
  { th: 'State', datakey: 'state', sortable: true, datatype: 'string' },
  { th: 'Zip Code', datakey: 'zipCode', sortable: true, datatype: 'number' },
]

class ColumnBuilder {

  private static th : string | null = null
  private static datakey : string | null = null
  private static sortable = false
  private static datatype : string | null = null

  static startBuilder(){
    return this
  }

  static setTh(th : string){
    this.th = th
    return this
  }

  static setDatakey(datakey : string){
    this.datakey = datakey
    return this
  }

  static setSortability(sortable : boolean){
    this.sortable = sortable
    return this
  }

  static setDatatype(datatype : string){
    this.datatype = datatype
    return this
  }

  static build(){
    try{
      if(this.th == null || this.datakey == null || this.datatype == null ) throw new Error("Can't be built : Column Definition incomplete.")
      return new Column(this.th, this.datakey, this.sortable, this.datatype)
    }catch (e){
      console.error(e)
    }
  }

}

class Column {
  private th : string | null
  private datakey : string | null
  private sortable : boolean
  private datatype : string | null

  constructor(th : string, datakey: string, sortable : boolean, datatype : string){
    this.th = th
    this.datakey = datakey
    this.sortable = sortable
    this.datatype = datatype
  }

  setTh(th : string){
    this.th = th
  }

  setDatakey(datakey : string){
    this.datakey = datakey
  }

  setSortability(sortable : boolean){
    this.sortable = sortable
  }

  setDatatype(datatype : string){
    this.datatype = datatype
  }

}