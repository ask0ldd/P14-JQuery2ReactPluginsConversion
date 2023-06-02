import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from '../Form'
import CurrentEmployees from '../pages/CurrentEmployees'

function CustomRouter() {
    /*<Router basename="/P13-UserInterface-API/ABFront/"> needs to add basename into vite config*/
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/employee-list" element={<CurrentEmployees />} />
            </Routes>
        </Router>
    )
}

export default CustomRouter