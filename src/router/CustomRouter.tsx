/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from '../pages/NewEmployeeForm'
import CurrentEmployees from '../pages/CurrentEmployees'
// import usersDatasTen from '../datas/usersDatasTen'
import usersDatas from '../datas/usersDatas'
import { EmployeesContext } from '../contexts/EmployeesContext'
import { useState } from 'react'

/**
 * Component : Handling the routing logic of the app.
 * @Component
 * @return ( <CustomRouter/> )
 */
function CustomRouter() {
    const [employeesList, setEmployeesList] = useState<Array<any>>(usersDatas)
    return(
        <EmployeesContext.Provider value={{employeesList, setEmployeesList}}>
            <Router basename="/P14-JQuery2ReactPluginsConversion/">
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/employee-list" element={<CurrentEmployees />} />
                </Routes>
            </Router>
        </EmployeesContext.Provider>
    )
}

export default CustomRouter