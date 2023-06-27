import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from '../Form'
import CurrentEmployees from '../pages/CurrentEmployees'

/**
 * Component : Handling the routing logic of the app.
 * @Component
 * @return ( <CustomRouter/> )
 */
function CustomRouter() {
    return(
        <Router basename="/P14-JQuery2ReactPluginsConversion/">
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/employee-list" element={<CurrentEmployees />} />
            </Routes>
        </Router>
    )
}

export default CustomRouter