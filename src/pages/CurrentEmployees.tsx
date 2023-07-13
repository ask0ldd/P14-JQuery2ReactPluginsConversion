/* eslint-disable react-hooks/exhaustive-deps */
import '../Form.css'
import '../style/CurrentEmployees.css'
import usersDatas from '../datas/usersDatas'
import DatasTable, { IColumnDefElement } from '../components/DatasTable/DatasTable'

/**
 * Component : Displaying the current employees datatable page.
 * @Component
 * @return ( <CurrentEmployees/> )
 */
function CurrentEmployees() {

  // check if usersDatas properties match columnsDefinition datakeys // should check for each object ?
  let isDefinitionMatchingDatas = true
  const tableDatasPropertiesList = Object.getOwnPropertyNames(usersDatas[0])
  columnsDefinition.forEach(definition => {if(tableDatasPropertiesList.includes(definition.datakey) === false) isDefinitionMatchingDatas = false })

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      {isDefinitionMatchingDatas ? <DatasTable columnsDefinition={columnsDefinition} tableDatas={[...usersDatas]}/> : <div>Users datas are missing some mandatory dataKeys.</div>}
    </main>
  )
}

export default CurrentEmployees

// const tableColumnsNames : Array<string> = Object.getOwnPropertyNames(userDatas[0])

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