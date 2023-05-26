/* eslint-disable react-hooks/exhaustive-deps */
import '../App.css'
import '../style/CurrentEmployees.css'
import usersDatas from '../datas/usersDatas'
import DatasTable from '../components/DatasTable/DatasTable'
import { useState, useEffect } from 'react'
import { IUSersDatas } from '../datas/usersDatasTen'

function CurrentEmployees() {

  const frCollator = new Intl.Collator('en')

  const columnsNames = ['First Name', 'Last Name', 'Start Date', 'Department', 'Birthdate', 'Street', 'City', 'State', 'Zip Code']
  const dataKeys = ['firstName', 'lastName', 'startingDate', 'department', 'birthDate', 'street', 'city', 'state', 'zipCode']

  // move to datasdable compo
  const [tableDatas, setTableDatas] = useState([...usersDatas]);
  const [ordering, setOrdering] = useState({column : '', direction : 'asc'})
  const [displayingRange, setDisplayingRange] = useState([0, 20])

  // react to any ordering state update
  useEffect(() => {
    // [...usersDatas] avoid mutation
    if(ordering.column !== '' && ordering.direction === 'asc') setTableDatas([...usersDatas].sort((a,b) => frCollator.compare(a[ordering.column as keyof IUSersDatas], b[ordering.column as keyof IUSersDatas])))
    if(ordering.column !== '' && ordering.direction === 'desc') setTableDatas([...usersDatas].sort((a,b) => frCollator.compare(b[ordering.column as keyof IUSersDatas], a[ordering.column as keyof IUSersDatas])))
  }, [ordering.column, ordering.direction])
  // end move

  return (
    <main className='mainCE'>
      {displayingRange}
      <h1>Current Employees</h1>
      <DatasTable tableColumnsNames={columnsNames} tableDatasKeys={dataKeys} tableDatas={[...tableDatas].slice(displayingRange[0], displayingRange[1])} setOrdering={setOrdering} ordering={ordering} setDisplayingRange={setDisplayingRange}/>
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