import './App.css'
import { Link } from 'react-router-dom'
import CustomSelect from './components/CustomSelect/CustomSelect'

function App() {

  return (
    <main>
      <Link to={`/employee-list`}>View Current Employees</Link>
      <form className='mainform'>
        
        <h2>1. Personnal</h2>

        <label htmlFor="firstname">First Name</label>
        <input id="firstname" type="text"/>

        <label htmlFor="lastname" className='defaultSpacing'>Last Name</label>
        <input id="lastname" type="text"/>

        <label htmlFor="birthdate" className='defaultSpacing'>Birthdate</label>
        <input id="birthdate" type="text"/>

        <h2>2. Address</h2>

        <label htmlFor="street">Street</label>
        <input id="street" type="text"/>

        <label htmlFor="city" className='defaultSpacing'>City</label>
        <input id="city" type="text"/>

        <label htmlFor="state" className='defaultSpacing'>State</label>
        <input id="state" type="text"/>

        <label htmlFor="zip-code" className='defaultSpacing'>ZIP Code</label>
        <input id="zip-code" type="number"/>

        <h2>3. Professional</h2>

        <label htmlFor="start-date">Integration Date</label>
        <input id="start-date" type="text"/>

        <label htmlFor="department" className='defaultSpacing'>Departement</label>
        {/*<input name="department" id="department" type="text"/>*/}
        <CustomSelect options={[
          {label:'Engineering', value:'Engineering'}, 
          {label:'Human Ressources', value:'Human Ressources'}, 
          {label:'Marketing', value:'Marketing'}, 
          {label:'Legal', value:'Legal'}, 
          {label:'Sales', value:'Sales'}
        ]}/>

        <input type="submit" value="Add this Employee"/>

      </form>
      
    </main>
  )
}

export default App
