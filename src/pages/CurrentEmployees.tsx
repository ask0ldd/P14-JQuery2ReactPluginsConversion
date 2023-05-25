import '../App.css'
import '../style/CurrentEmployees.css'
import usersDatas from '../datas/usersDatasTen'
import DatasTable from '../components/DatasTable/DatasTable'
import { useState, useEffect } from 'react'
import { IUSersDatas } from '../datas/usersDatasTen'

function CurrentEmployees() {

  const frCollator = new Intl.Collator('fr')

  const columnsNames = ['First Name', 'Last Name', 'Start Date', 'Department', 'Birthdate', 'Street', 'City', 'State', 'Zip Code']
  const dataKeys = ['firstName', 'lastName', 'startingDate', 'department', 'birthDate', 'street', 'city', 'state', 'zipCode']

  const [tableDatas, setTableDatas] = useState(usersDatas.sort((a,b) => frCollator.compare(a['firstName'], b['firstName'])));

  const [ordering, setOrdering] = useState({column : '', direction : 'asc'})

  useEffect(() => {
    if(ordering.column !=='') setTableDatas(usersDatas.sort((a,b) => frCollator.compare(a[ordering.column as keyof IUSersDatas], b[ordering.column as keyof IUSersDatas])))
  }, [ordering])


  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      <DatasTable tableColumnsNames={columnsNames} tableDatasKeys={dataKeys} tableDatas={tableDatas} setOrdering={setOrdering}/>
    </main>
  )
}

export default CurrentEmployees

/*
[
    {"id":1,
    "firstName":"Bernarr",
    "lastName":"Camilleri",
    "street":"4 Starling Plaza",
    "city":"Rossosh’",
    "zipCode":"624282",
    "state":null,
    "birthDate":"04/06/2022",
    "startingDate":"09/08/2022"},
    "department":"human ressources"
*/


// const tableColumnsNames : Array<string> = Object.getOwnPropertyNames(userDatas[0])