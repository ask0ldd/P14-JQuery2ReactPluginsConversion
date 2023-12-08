/* eslint-disable react-hooks/exhaustive-deps */
import '../Form.css'
import '../style/CurrentEmployees.css'
import usersDatas from '../datas/usersDatas'
import DatasTable from '../components/DatasTable/DatasTable'
import { Link } from 'react-router-dom'
import { ColumnBuilder } from '../components/DatasTable/builders/ColumnBuilder'
import { TableModel } from '../components/DatasTable/models/TableModel'

/**
 * Component : Displaying the current employees datatable page.
 * @Component
 * @return ( <CurrentEmployees/> )
 */
function CurrentEmployees() {

  // tableModel.columns => tableModel  & tableModel.datas => tableDAO / tableDAO.dataSource
  const tableModel = new TableModel()
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("First Name").setDatatypeAsString().setDatakey("firstName").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Last Name").setDatatypeAsString().setDatakey("lastName").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Start Date").setDatatypeAsDate().setDatakey("startingDate").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Department").setDatatypeAsString().setDatakey("department").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Birthdate").setDatatypeAsDate().setDatakey("birthDate").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Street").setDatatypeAsString().setDatakey("street").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("City").setDatatypeAsString().setDatakey("city").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("State").setDatatypeAsString().setDatakey("state").setSortability(true).build())
  tableModel.addColumn(ColumnBuilder.startBuilder().setColumnName("Zip Code").setDatatypeAsNumber().setDatakey("zipCode").setSortability(true).build())

  tableModel.setDatas([...usersDatas])

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      <DatasTable tableModel={tableModel} tableDatas={tableModel.getDatas()}/> {/* should pass tableModel and implements quoted methods */}
      <Link to={`/`}>Home</Link>
    </main>)
}

export default CurrentEmployees