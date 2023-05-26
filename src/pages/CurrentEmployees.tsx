/* eslint-disable react-hooks/exhaustive-deps */
import '../App.css'
import '../style/CurrentEmployees.css'
import usersDatas from '../datas/usersDatas'
import DatasTable from '../components/DatasTable/DatasTable'
import { useState, useEffect } from 'react'
import { IUSersDatas } from '../datas/usersDatasTen'

function CurrentEmployees() {

  const columnsNames = ['First Name', 'Last Name', 'Start Date', 'Department', 'Birthdate', 'Street', 'City', 'State', 'Zip Code']
  const dataKeys = ['firstName', 'lastName', 'startingDate', 'department', 'birthDate', 'street', 'city', 'state', 'zipCode']

  return (
    <main className='mainCE'>
      <h1>Current Employees</h1>
      <DatasTable tableColumnsNames={columnsNames} tableDatasKeys={dataKeys} tableDatas={[...usersDatas]}/>
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

/* .slice(displayingRange[0], displayingRange[1]) */