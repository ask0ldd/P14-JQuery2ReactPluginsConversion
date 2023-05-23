import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from '../App'
import CurrentEmployees from '../pages/CurrentEmployees'

function CustomRouter() {
    /*<Router basename="/P13-UserInterface-API/ABFront/"> needs to add basename into vite config*/
    return(
        <Router>
            <Routes>
                <Route path="/employee-list" element={<CurrentEmployees />} />
                <Route path="/" element={<App />} />
            </Routes>
        </Router>
    )
}

export default CustomRouter