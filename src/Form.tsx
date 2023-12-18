/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './Form.css'
import { Link } from 'react-router-dom'
import Modal from './components/Modal/Modal'
import {useModalManager} from './components/Modal/hooks/useModalManager'
import CustomForm from './components/CustomForm'
import ModalBaseHeader from './components/Modal/ModalBaseHeader'
import { useEffect } from 'react'

// !!!!!!! create a button to fill the forms with mockdatas

/**
 * Component : Displaying the form page.
 * @Component
 * @return ( <App/> )
 */
function App() {

  // has to be outside the modal component so we can modify the modalVisibility prop passed to the modal component
  const modalManager = useModalManager({initialVisibility : false, content :{body : ModalBodySuccess, header : ModalBaseHeader}})

  useEffect(() => {
    if(!modalManager.initialized) return
    modalManager.saveModalPreset("default", ModalBaseHeader, ModalBodySuccess)
    modalManager.saveModalPreset("formError", ModalBaseHeader, ModalBodyInvalidForm)
    // modalManager.loadModalPreset("formError")
  }, [modalManager.initialized])

  return (
    <main>
      <Link to={`/employee-list`}>View Current Employees</Link>

      <CustomForm modalManager={modalManager}/>

      <Modal modalManager={modalManager}>
        {modalManager.getHeaderComponent()}
        {modalManager.getBodyComponent()}
      </Modal>
      
      {/*<button style={{padding:'1rem', marginTop:'1rem', width:'100%'}} onClick={showAlternateModal}>Show alternate modale</button>*/}
     
    </main>
  )

  // Component that will be injected into the modal
  function ModalBodySuccess() : JSX.Element {
    return(
      <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center',}}>
        Employee Created!
      </div>
    )
  }

  function ModalBodyInvalidForm() : JSX.Element {
    return(
      <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center',}}>
        Form Error!
      </div>
    )
  }

}

export default App

export interface IPropsVisibility {
  setVisibility : (bool : boolean) => void
}