import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from '../Form'
import CurrentEmployees from '../pages/CurrentEmployees'
import usersDatasTen from '../datas/usersDatasTen'
import { MainContext } from '../contexts/MainContext'

/**
 * Component : Handling the routing logic of the app.
 * @Component
 * @return ( <CustomRouter/> )
 */
function CustomRouter() {
    return(
        <MainContext.Provider value={{employees : usersDatasTen}}>
            <Router basename="/P14-JQuery2ReactPluginsConversion/">
                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/employee-list" element={<CurrentEmployees />} />
                </Routes>
            </Router>
        </MainContext.Provider>
    )
}

export default CustomRouter