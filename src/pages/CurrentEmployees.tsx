import '../App.css'
import DatasTable from '../components/DatasTable/DatasTable'
import '../style/CurrentEmployees.css'
import userDatas from '../datas/usersDatas'

function CurrentEmployees() {

  const tableColumns : Array<string> = Object.getOwnPropertyNames(userDatas[0])

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      <DatasTable tableColumns={tableColumns} tableDatas={userDatas}/>
    </main>
  )
}

export default CurrentEmployees
