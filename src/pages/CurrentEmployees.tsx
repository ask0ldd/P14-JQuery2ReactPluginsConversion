/* eslint-disable react-hooks/exhaustive-deps */
import '../App.css'
import '../style/CurrentEmployees.css'
import usersDatas from '../datas/usersDatas'
import DatasTable from '../components/DatasTable/DatasTable'

function CurrentEmployees() {

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      <DatasTable columnsDefinition={columnsDefinition} tableDatas={[...usersDatas]}/>
    </main>
  )
}

export default CurrentEmployees

// const tableColumnsNames : Array<string> = Object.getOwnPropertyNames(userDatas[0])

export interface IColumnDefElement 
{
  th : string
  datakey : string
  sortable : boolean
  datatype : string
}

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