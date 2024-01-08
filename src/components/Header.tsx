import { Link } from 'react-router-dom'
import '../style/Header.css'

function Header(){
    return (
        <header>
            <div className='headerContainer'>
                <div className="hrnet" style={{transform:'translateY(-2px)', fontWeight:'700', }}>HRNET</div>
                <nav>
                    <Link to={`/`} style={{width:'fit-content', justifySelf:'center', alignSelf:'center', display:'flex'}}>New Employee</Link>
                    <Link to={`/employee-list`}>Current Employees</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header