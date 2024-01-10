/* eslint-disable react-hooks/exhaustive-deps */
import '../style/NewEmployeeForm.css'
import '../style/CurrentEmployees.css'
import DatasTable from '../components/DatasTable/DatasTable'
import { ColumnBuilder } from '../components/DatasTable/builders/ColumnBuilder'
import { TableModel } from '../components/DatasTable/models/TableModel'
import { useContext } from 'react'
import { EmployeesContext } from '../contexts/EmployeesContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

/**
 * Component : Displaying the current employees datatable page.
 * @Component
 * @return ( <CurrentEmployees/> )
 */
function CurrentEmployees() {
  const {employeesList} = useContext(EmployeesContext);

  const tableModel = new TableModel({id : "current_employees"})
  tableModel.addColumn(new ColumnBuilder().setColumnName("First Name").setDatatypeAsString().setAccessor("firstName").setSortability(true).build())
  tableModel.addColumn(new ColumnBuilder().setColumnName("Last Name").setDatatypeAsString().setAccessor("lastName").setSortability(true).build())
  tableModel.addColumn(new ColumnBuilder().setColumnName("Start Date").setDatatypeAsDate().setAccessor("startingDate").setSortability(true).build())
  tableModel.addColumn(new ColumnBuilder().setColumnName("Department").setDatatypeAsString().setAccessor("department").setSortability(true).build())
  tableModel.addColumn(new ColumnBuilder().setColumnName("Birthdate").setDatatypeAsDate().setAccessor("birthDate").setSortability(true).build())
  tableModel.addColumn(new ColumnBuilder().setColumnName("Street").setDatatypeAsString().setAccessor("street").setSortability(true).build())
  tableModel.addColumn(new ColumnBuilder().setColumnName("City").setDatatypeAsString().setAccessor("city").setSortability(true).build())
  tableModel.addColumn(new ColumnBuilder().setColumnName("State").setDatatypeAsString().setAccessor("state").setSortability(true).build())
  tableModel.addColumn(new ColumnBuilder().setColumnName("Zip Code").setDatatypeAsNumber().setAccessor("zipCode").setSortability(true).build())

  return (
    <>
      <Header/>
      <main className='mainCE'>
        <DatasTable tableModel={tableModel} tableDatas={employeesList}/>
      </main>
      <Footer/>
    </>
    )
}

export default CurrentEmployees