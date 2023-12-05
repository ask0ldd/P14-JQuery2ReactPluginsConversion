/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './Form.css'
import { Link } from 'react-router-dom'
import Modal from './components/Modal/Modal'
import {useModalManager} from './components/Modal/hooks/useModalManager'
import { IPropsModalHeader } from './components/Modal/ModalBaseHeader'
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
  const { modalManager } 
    = useModalManager({initialVisibility : false}/*{initialVisibility : true, content : {body : ModalBodySuccess(), header : ModalBaseHeader({setVisibility : () => null})}}*/)
  
    useEffect(() => {
      modalManager.setBodyComponent(ModalBodySuccess())
      modalManager.setHeaderComponent(ModalBaseHeader({setVisibility : modalManager.setVisibility}))
      modalManager.setVisibility(true)
    }, [])

  return (
    <main>
      <Link to={`/employee-list`}>View Current Employees</Link>

      <CustomForm/>

      <Modal modalManager={modalManager}>
        {modalManager.getHeaderComponent()}
        {modalManager.getBodyComponent()}
      </Modal>
      
      <button style={{padding:'1rem', marginTop:'1rem', width:'100%'}} onClick={showAlternateModal}>Show alternate modale</button>
     
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

  function ModalBodyAlternate() : JSX.Element {
    return(
      <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center',}}>
        Alternate Content!
      </div>
    )
  }

  /* props needed to access the close modal fn into the header */
  function ModalHeaderAlternate({setVisibility} : IPropsModalHeader){
    return(
      <div>
        <span onClick={() => setVisibility(false)}>aaaaaa</span>
      </div>
    )
  }

  function showAlternateModal(){
    modalManager.setHeaderComponent(ModalHeaderAlternate({setVisibility : modalManager.setVisibility}))
    modalManager.setBodyComponent(ModalBodyAlternate())
    modalManager.setVisibility(true)
  }

}

export default App