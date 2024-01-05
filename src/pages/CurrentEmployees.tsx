/* eslint-disable react-hooks/exhaustive-deps */
import '../NewEmployeeForm.css'
import '../style/CurrentEmployees.css'
// import usersDatas from '../datas/usersDatas'
import DatasTable from '../components/DatasTable/DatasTable'
import { Link } from 'react-router-dom'
import { ColumnBuilder } from '../components/DatasTable/builders/ColumnBuilder'
import { TableModel } from '../components/DatasTable/models/TableModel'
import { useContext } from 'react'
import { EmployeesContext } from '../contexts/EmployeesContext'

/**
 * Component : Displaying the current employees datatable page.
 * @Component
 * @return ( <CurrentEmployees/> )
 */
function CurrentEmployees() {
  const {employeesList} = useContext(EmployeesContext);

  const tableModel = new TableModel({id : "current_employees"}) // usememo?
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("First Name").setDatatypeAsString().setAccessor("firstName").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Last Name").setDatatypeAsString().setAccessor("lastName").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Start Date").setDatatypeAsDate().setAccessor("startingDate").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Department").setDatatypeAsString().setAccessor("department").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Birthdate").setDatatypeAsDate().setAccessor("birthDate").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Street").setDatatypeAsString().setAccessor("street").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("City").setDatatypeAsString().setAccessor("city").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("State").setDatatypeAsString().setAccessor("state").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Zip Code").setDatatypeAsNumber().setAccessor("zipCode").setSortability(true).build())

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      <DatasTable tableModel={tableModel} tableDatas={employeesList}/>
      <Link to={`/`} style={{width:'fit-content', justifySelf:'center', alignSelf:'center', display:'flex'}}>Home</Link>
    </main>)
}

export default CurrentEmployees