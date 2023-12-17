import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from '../Form'
import CurrentEmployees from '../pages/CurrentEmployees'
import usersDatasTen from '../datas/usersDatasTen'
import { EmployeesContext } from '../contexts/EmployeesContext'

/**
 * Component : Handling the routing logic of the app.
 * @Component
 * @return ( <CustomRouter/> )
 */
function CustomRouter() {
    return(
        <EmployeesContext.Provider value={{employees : usersDatasTen}}>
            <Router basename="/P14-JQuery2ReactPluginsConversion/">
                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/employee-list" element={<CurrentEmployees />} />
                </Routes>
            </Router>
        </EmployeesContext.Provider>
    )
}

export default CustomRouter