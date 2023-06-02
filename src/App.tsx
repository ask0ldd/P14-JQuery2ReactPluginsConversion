/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css'
import { Link } from 'react-router-dom'
import CustomSelect from './components/CustomSelect/CustomSelect'
import Modal from './components/Modal/Modal'
import useModalManager from './components/Modal/hooks/useModalManager'
import { useState } from 'react'

function App() {

  // has to be outside the modal component so we can modify the modalVisibility prop passed to the modal component
  const {modalVisibility, modalContent, setModalVisibility, setModalContent} = useModalManager({initialVisibility : true, content : ModalContentSuccess}) // find a way to deal with multiple modal, with ids? with possibility to had new modal at runtime

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

        <label id="department-label" htmlFor="department" className='defaultSpacing'>Departement</label>
        {/*<input name="department" id="department" type="text"/>*/}
        <CustomSelect labelledBy="department-label" options={[
          {label:'Engineering', value:'Engineering'}, 
          {label:'Human Ressources', value:'Human Ressources'}, 
          {label:'Marketing', value:'Marketing'}, 
          {label:'Legal', value:'Legal'}, 
          {label:'Sales', value:'Sales'},
          {label:'Sales1', value:'Sales1'},
          {label:'Sales2', value:'Sales2'},
          {label:'Sales3', value:'Sales3'},
        ]} selectId='department'/>

        <input type="submit" value="Add this Employee"/>

      </form>

      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalContent={modalContent}></Modal>
      
      <button style={{padding:'1rem', margin:'1rem',}} onClick={() => {
        setModalContent(ModalContentAlternate)
        setModalVisibility(true)
      }}>show modale</button>
     
    </main>
  )
}

// Component that will be injected into the modal
function ModalContentSuccess(){
  return(
    <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center',}}>
      Employee Created!
    </div>
  )
}

function ModalContentAlternate(){
  return(
    <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center',}}>
      Alternate Content!
    </div>
  )
}

export default App
