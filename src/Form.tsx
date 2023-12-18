/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './Form.css'
import { Link } from 'react-router-dom'
import Modal from './components/Modal/Modal'
import {useModalManager} from './components/Modal/hooks/useModalManager'
import CustomForm from './components/CustomForm'
import ModalBaseHeader from './components/Modal/ModalBaseHeader'

// !!!!!!! create a button to fill the forms with mockdatas

/**
 * Component : Displaying the form page.
 * @Component
 * @return ( <App/> )
 */
function App() {

  // has to be outside the modal component so we can modify the modalVisibility prop passed to the modal component
  const modalManager = useModalManager({initialVisibility : false, content :{body : ModalBodySuccess, header : ModalBaseHeader}})
  
  /*useEffect(() => {
    // modalManager.setBodyComponent(ModalBodySuccess)
    // modalManager.setHeaderComponent(ModalBaseHeader)
    modalManager.setVisibility(true)
  }, [])*/

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
        Alternate Content!
      </div>
    )
  }

  // props needed to access the close modal fn into the header
  /*function ModalHeaderAlternate({setVisibility} : IPropsVisibility){
    return(
      <div>
        {setVisibility && <span onClick={() => setVisibility(false)}>Invalid Form.</span>}
      </div>
    )
  }*/

  function showInvalidFormModal() {
    // modalManager.setHeaderComponent(ModalHeaderAlternate)
    modalManager.setHeaderComponent(ModalBaseHeader)
    modalManager.setBodyComponent(ModalBodyInvalidForm)
    modalManager.setVisibility(true)
  }

}

export default App

export interface IPropsVisibility {
  setVisibility : (bool : boolean) => void
}