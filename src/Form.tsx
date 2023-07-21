/* eslint-disable @typescript-eslint/no-unused-vars */
import './Form.css'
import { Link } from 'react-router-dom'
import CustomSelect from './components/CustomSelect/CustomSelect'
import Modal from './components/Modal/Modal'
import useModalManager from './components/Modal/hooks/useModalManager'
import { IPropsModalHeader } from './components/Modal/ModalHeader'
import { useEffect, useState/*, ChangeEvent*/ } from 'react'
import DatePicker from './components/DatePicker/DatePicker'
import Validator from './services/validators'
import FormInput from './components/FormInput/FormInput'

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

  const [formState, setFormState]= useState<IForm>({
    firstname: {value : "", error: false},
    lastname: {value : "", error: false},
    birthdate: {value : "", error: false},
    street: {value : "", error: false},
    city: {value : "", error: false},
    state: {value : "", error: false},
    zipcode: {value : "", error: false},
    startdate: {value : "", error: false},
    department: {value : "", error: false},
  })

  useEffect(() => console.log(formState), [formState])

  return (
    <main>
      <Link to={`/employee-list`}>View Current Employees</Link>
      <form className='mainform'>
        
        <h2>1. Personnal</h2>

        <FormInput id="title" type="text" labelValue='Title' 
        formState={formState} setFormState={setFormState} 
        errorMessage="Invalid Value." onChangeValidator={Validator.testName}/>

        <label htmlFor="firstname">First Name</label>
        <input id="firstname" type="text" value={formState.firstname?.value} 
        onChange={(e) => setFormState((prevState) => {
          return {...prevState, firstname : {value : formatInputValue(e.target.value), error : !Validator.testName(e.target.value)}}
        })}/>
        {formState.firstname?.error && <p className="errorMessage" id="firstnameError">Invalid Value.</p>}

        <label htmlFor="lastname" className='defaultSpacing'>Last Name</label>
        <input id="lastname" type="text" value={formState.lastname?.value} 
        onChange={(e) => setFormState((prevState) => {
          return {...prevState, lastname : {value : formatInputValue(e.target.value), error : !Validator.testName(e.target.value)}}
        })}/>
        {formState.lastname?.error && <p className="errorMessage" id="lastnameError">Invalid Value.</p>}

        <label htmlFor="birthdate" className='defaultSpacing'>Birthdate</label>
        <DatePicker useFormState={[formState, setFormState]} inputStateValue={formState.birthdate?.value} valueAccessor="birthdate"/>

        <h2>2. Address</h2>

        <label htmlFor="street">Street</label>
        <input id="street" type="text" value={formState.street?.value} 
        onChange={(e) => setFormState((prevState) => {
          return {...prevState, street : {value : formatInputValue(e.target.value), error : !Validator.testAddress(e.target.value)}}
        })}/>
        {formState.street?.error && <p className="errorMessage" id="streetError">Invalid Value.</p>}

        <label htmlFor="city" className='defaultSpacing'>City</label>
        <input id="city" type="text" value={formState.city?.value} 
        onChange={(e) => setFormState((prevState) => {
          return {...prevState, city : {value : formatInputValue(e.target.value), error : !Validator.testName(e.target.value)}}
        })}/>
        {formState.city?.error && <p className="errorMessage" id="cityError">Invalid Value.</p>}

        <label htmlFor="state" className='defaultSpacing'>State</label>
        <input id="state" type="text" value={formState.state?.value} 
        onChange={(e) => setFormState((prevState) => {
          return {...prevState, state : {value : formatInputValue(e.target.value), error : !Validator.testName(e.target.value)}}
        })}/>
        {formState.state?.error && <p className="errorMessage" id="stateError">Invalid Value.</p>}

        <label htmlFor="zipcode" className='defaultSpacing'>ZIP Code</label>
        <input id="zipcode" type="number" value={formState.zipcode?.value} 
        onChange={(e) => setFormState((prevState) => {
          return {...prevState, zipcode : {...prevState.zipcode, value : formatInputValue(e.target.value)}}
        })}/>

        <h2>3. Professional</h2>

        <label htmlFor="start-date">Integration Date</label>
        <DatePicker useFormState={[formState, setFormState]} inputStateValue={formState.startdate?.value} valueAccessor="startdate"/>

        <label id="department-label" htmlFor="department" className='defaultSpacing'>Departement</label>

        <CustomSelect formState={formState} 
        onValueChange={(value : string) => setFormState((prevState) => {
          return {...prevState, department : {...prevState?.department, value : value}}
        })}
        labelledBy="department-label" options={[
          {label:'Engineering', value:'Engineering'}, 
          {label:'Human Ressources', value:'Human Ressources'}, 
          {label:'Marketing', value:'Marketing'}, 
          {label:'Legal', value:'Legal'}, 
          {label:'Sales', value:'Sales'},
          {label:'Sales1', value:'Sales1'},
          {label:'Sales2', value:'Sales2'},
          {label:'Sales3', value:'Sales3'},
        ]} selectId='department'
        />

        <input type="submit" value="Add this Employee"/>

      </form>

      { /* should be able to pass a custom header, replacing the default one 
      / absolute positioning should be an option so won't mess with the content layout, full modal access for the content */}
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

/*export interface IForm{
  firstname: string
  lastname: string
  birthdate: string
  street: string
  city: string
  state: string
  zipcode: string
  startdate: string
  department: string
}*/

export interface IForm{
  [key: string]: IFormInput
}

interface IFormInput{
  value : string
  error : boolean
}

function formatInputValue(value : string){
  return value.trim().toLowerCase()
}