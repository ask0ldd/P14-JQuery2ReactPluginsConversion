import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from '../App'
import CurrentEmployees from '../pages/CurrentEmployees'

function CustomRouter() {
    /*<Router basename="/P13-UserInterface-API/ABFront/"> needs to add basename into vite config*/
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/employee-list" element={<CurrentEmployees />} />
            </Routes>
        </Router>
    )
}

export default CustomRouter