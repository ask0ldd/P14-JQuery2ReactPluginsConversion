import {NavLink } from 'react-router-dom'
import '../style/Header.css'

function Header({pageTitle} : {pageTitle : string}){
    return (
        <header>
            <div className='headerContainer'>
                <div className="hrnet" style={{transform:'translateY(-2px)', fontWeight:'700', }}>HRNET</div>
                <div className='pageTitle'>{pageTitle}</div>
                <nav>
                    <NavLink to={`/`} className={({isActive}) => isActive ? 'activeLink' : ''} style={{width:'fit-content', justifySelf:'center', alignSelf:'center', display:'flex'}}>New Employee</NavLink>
                    <NavLink to={`/employee-list`} className={({isActive}) => isActive ? 'activeLink' : ''}>Current Employees</NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header