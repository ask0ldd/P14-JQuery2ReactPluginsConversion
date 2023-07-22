/* eslint-disable @typescript-eslint/no-unused-vars */
import './Form.css'
import { Link } from 'react-router-dom'
import Modal from './components/Modal/Modal'
import useModalManager from './components/Modal/hooks/useModalManager'
import { IPropsModalHeader } from './components/Modal/ModalHeader'
import CustomForm from './components/CustomForm'

/**
 * Component : Displaying the form page.
 * @Component
 * @return ( <App/> )
 */
function App() {

  // has to be outside the modal component so we can modify the modalVisibility prop passed to the modal component
  const {
      modalVisibility, modalContent, headerComponent, 
      setModalVisibility, setModalContent, setHeaderComponent
  } 
    = useModalManager({initialVisibility : true, content : ModalContentSuccess})
  
  /*const todaysDate = new Date()
  const todaysDateISOFormat = todaysDate.toISOString().split('T')[0]*/

  return (
    <main>
      <Link to={`/employee-list`}>View Current Employees</Link>

      <CustomForm/>

      { /* should be able to pass a custom header, replacing the default one 
      / absolute positioning should be an option so won't mess with the content layout, full modal access for the content 
      use children props instead of passing modalcontent and headercomponent as props?
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility}> // user can put anything between the Modal Tags
        <ModalHeader/> 
        <ModalContent/>
      </Modal>
      */}

      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalContent={modalContent} headerComponent={headerComponent}></Modal>


      
      <button style={{padding:'1rem', margin:'1rem',}} onClick={() => {
        setHeaderComponent(AlternateModalHeader({setModalVisibility}))
        setModalContent(ModalContentAlternate)
        setModalVisibility(true)
      }}>Show alternate modale</button>
     
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

/* props needed to access the close modal fn into the header */
function AlternateModalHeader({setModalVisibility} : IPropsModalHeader){
  return(
    <div>
      <span onClick={() => setModalVisibility(false)}>aaaaaa</span>
    </div>
  )
}

export default App