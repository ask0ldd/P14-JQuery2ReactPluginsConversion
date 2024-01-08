/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useMemo, useRef, useState } from "react"
import CustomSelect from "./CustomSelect/CustomSelect"
import DatePicker from "./DatePicker/DatePicker"
import FormInput, { IFormGroup } from "./FormInput/FormInput"
import Validator from "../services/validators"
import { FormGroup } from "./FormGroup"
import { EmployeesContext } from "../contexts/EmployeesContext"
import { IModalManager } from "./Modal/hooks/useModalManager"
import '../style/CustomForm.css'
import { FieldBuilder } from "./FieldBuilder"

/**
 * Component : Form.
 * @Component
 * @param {Object[]} props - Props.
 * @param {IModalManager} props.modalManager - object giving access to all the tools needed to manipulate the modal.
 * @return ( <CustomForm modalManager={modalManager}/> )
 */
function CustomForm({modalManager} : {modalManager : IModalManager} ){

  const initialFormGroup = useMemo(() => 
    new FormGroup()
    .addField(new FieldBuilder().setAccessor("firstname").setDefaultValue("").setValidationFn(Validator.isName).setIsMandatory(true).build())
    .addField(new FieldBuilder().setAccessor("lastname").setDefaultValue("aaa").setValidationFn(Validator.isName).setIsMandatory(true).build())
    .addField(new FieldBuilder().setAccessor("birthdate").setDefaultValue("").setValidationFn(Validator.isDatePast).setIsMandatory(true).build())
    .addField(new FieldBuilder().setAccessor("street").setDefaultValue("").setValidationFn(Validator.isName).setIsMandatory(true).build())
    .addField(new FieldBuilder().setAccessor("city").setDefaultValue("").setValidationFn(Validator.isName).setIsMandatory(true).build())
    .addField(new FieldBuilder().setAccessor("state").setDefaultValue(statesList[0].value).setIsMandatory(true).build())
    .addField(new FieldBuilder().setAccessor("zipcode").setDefaultValue("").setValidationFn(Validator.isNumber).setIsMandatory(true).build())
    .addField(new FieldBuilder().setAccessor("startdate").setDefaultValue("").setValidationFn(Validator.isDate).setIsMandatory(true).build())
    .addField(new FieldBuilder().setAccessor("department").setDefaultValue(departmentsList[0].value).setIsMandatory(true).build())
    .build(), []
  )

  const [formGroupState, _setFormGroupState]= useState<IFormGroup>(initialFormGroup)
  // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const formGroupStateRef = useRef<IFormGroup>(initialFormGroup)
  function setFormGroupState(state : IFormGroup){
    formGroupStateRef.current = state
    _setFormGroupState(state)
  }

  const {employeesList, setEmployeesList} = useContext(EmployeesContext)

  /**
   * Handle form submission
   * @param {React.MouseEvent<HTMLInputElement, MouseEvent>} e - The event object
   * @returns {void}
   */
  function formSubmit (e : React.MouseEvent<HTMLInputElement, MouseEvent>){
    e.preventDefault()
    if(formValidation()){
      const newEmployee = {
        "firstName":formGroupState.firstname.value || '',
        "lastName":formGroupState.lastname.value || '',
        "street":formGroupState.street.value || '',
        "city":formGroupState.city.value || '',
        "zipCode":formGroupState.zipcode.value || '',
        "state":formGroupState.state.value || '',
        "birthDate":formGroupState.birthdate.value || '',
        "startingDate":formGroupState.startdate.value || '',
        "department":formGroupState.department.value || ''
      }
      for (const [key, value] of Object.entries(newEmployee)) {
        if(Validator.isDate(value)) newEmployee[key as keyof typeof newEmployee] = convertUSDatetoFr(newEmployee[key as keyof typeof newEmployee])
      }
      // verify if the employee isn't already in the list
      if(isEmployeeAlreadyInContext(newEmployee)) return
      setEmployeesList([...employeesList, newEmployee])
      modalManager.displayModalPreset("default")
      return 
    }
    modalManager.displayModalPreset("formError")
  }

  /**
   * Perform validation on the form state.
   * @function formValidation
   * @returns {boolean} - Returns true if the form is valid, otherwise false.
   */
  function formValidation (){
    let isError = 0
    for (const [key, field] of Object.entries(formGroupStateRef.current)) {
      isError += +field.error
      // mandatory & blank ? => error
      if(field.isMandatory === true && field.value.trim() == ""){
          const formFieldState = {...formGroupStateRef.current[key]}
          isError++
          formFieldState.error = true
          formGroupStateRef.current = {...formGroupStateRef.current, [key] : formFieldState}
      }
    }
    setFormGroupState({...formGroupStateRef.current})
    return Boolean(!isError)
  }

  /**
   * Check if the new employee is already in the context.
   * @param {object} newEmployee - The new employee object to be checked.
   * @returns {boolean} - True if the employee is already in the context, false otherwise.
   */
  function isEmployeeAlreadyInContext(newEmployee : object){
    return employeesList.find(employee => JSON.stringify(employee) === JSON.stringify(newEmployee)) != null
  }
    
  return(
      <form>
          <h2>1. Personnal</h2>

          <FormInput input={{id : 'firstname', type : "text"}}
          label={{text : 'First Name'}}
          // input id used as accessor if fieldValueAccessor not defined.
          formGroupState={{get : () => formGroupStateRef.current, set : setFormGroupState}} 
          errorMessage = "Invalid Value."/>

          <FormInput input={{id : "lastname", type : "text"}}
          label={{text : 'Last Name', CSSClasses : ['defaultSpacing']}}
          formGroupState={{get : () => formGroupStateRef.current, set : setFormGroupState}} 
          errorMessage = "Invalid Value."/>

          <DatePicker id={"birthdate"} 
          label={{text :"Birthdate", CSSClasses : ["defaultSpacing"]}} 
          formGroupState={{get : () => formGroupStateRef.current, set : setFormGroupState, fieldAccessor : "birthdate"}}/>

          <h2>2. Address</h2>

          <FormInput input={{id : "street", type : "text"}} 
          label={{text : 'Street'}}
          formGroupState={{get : () => formGroupStateRef.current, set : setFormGroupState}} 
          errorMessage = "Invalid Value."/>

          <FormInput input={{id : "city", type : "text"}} 
          label={{text : 'City', CSSClasses : ['defaultSpacing']}}
          formGroupState={{get : () => formGroupStateRef.current, set : setFormGroupState}}
          errorMessage = "Invalid Value."/>

          <CustomSelect select={{id:"state"}}
          label={{text : "State", CSSClasses : ["defaultSpacing"]}} 
          formGroupState={{get : () => formGroupStateRef.current, set : setFormGroupState, fieldAccessor : 'state'}} 
          // !!! add default : options={list : statesList, default : {label : 'defaultlabel' , value : 'defautvalue' }
          options={statesList} 
          />

          <FormInput input={{id : "zipcode", type : "number"}} 
          label={{text : 'ZIP Code', CSSClasses : ['defaultSpacing']}}
          formGroupState={{get : () => formGroupStateRef.current, set : setFormGroupState}} 
          errorMessage = "Invalid Value."/>

          <h2>3. Professional</h2>

          <DatePicker id={"start-date"} 
          label={{text : "Integration Date"}} 
          formGroupState={{get : () => formGroupStateRef.current, set : setFormGroupState, fieldAccessor : "startdate"}}/>

          <CustomSelect select={{id:"department"}} 
          label={{text: "Departement", CSSClasses : ["defaultSpacing"]}} 
          formGroupState={{get : () => formGroupStateRef.current, set : setFormGroupState, fieldAccessor : 'department'}} 
          options={departmentsList}
          />

          <input type="submit" value="Add this Employee" onClick={formSubmit}/>
          
      </form>
  )
}

export default CustomForm

  const departmentsList = [
    {label:'Engineering', value:'Engineering'}, 
    {label:'Human Ressources', value:'Human Ressources'}, 
    {label:'Marketing', value:'Marketing'}, 
    {label:'Legal', value:'Legal'}, 
    {label:'Sales', value:'Sales'},
    {label:'Sales1', value:'Sales1'},
    {label:'Sales2', value:'Sales2'},
    {label:'Sales3', value:'Sales3'},
    ]
  
  const statesList = [
    {"label":"Alabama","value":"AL"},
    {"label":"Alaska","value":"AK"},
    {"label":"Arizona","value":"AZ"},
    {"label":"Arkansas","value":"AR"},
    {"label":"California","value":"CA"},
    {"label":"Colorado","value":"CO"},
    {"label":"Connecticut","value":"CT"},
    {"label":"Delaware","value":"DE"},
    {"label":"Florida","value":"FL"},
    {"label":"Georgia","value":"GA"},
    {"label":"Hawaii","value":"HI"},
    {"label":"Idaho","value":"ID"},
    {"label":"Illinois","value":"IL"},
    {"label":"Indiana","value":"IN"},
    {"label":"Iowa","value":"IA"},
    {"label":"Kansas","value":"KS"},
    {"label":"Kentucky","value":"KY"},
    {"label":"Louisiana","value":"LA"},
    {"label":"Maine","value":"ME"},
    {"label":"Maryland","value":"MD"},
    {"label":"Massachusetts","value":"MA"},
    {"label":"Michigan","value":"MI"},
    {"label":"Minnesota","value":"MN"},
    {"label":"Mississippi","value":"MS"},
    {"label":"Missouri","value":"MO"},
    {"label":"Montana","value":"MT"},
    {"label":"Nebraska","value":"NE"},
    {"label":"Nevada","value":"NV"},
    {"label":"New Hampshire","value":"NH"},
    {"label":"New Jersey","value":"NJ"},
    {"label":"New Mexico","value":"NM"},
    {"label":"New York","value":"NY"},
    {"label":"North Carolina","value":"NC"},
    {"label":"North Dakota","value":"ND"},
    {"label":"Ohio","value":"OH"},
    {"label":"Oklahoma","value":"OK"},
    {"label":"Oregon","value":"OR"},
    {"label":"Pennsylvania","value":"PA"},
    {"label":"Rhode Island","value":"RI"},
    {"label":"South Carolina","value":"SC"},
    {"label":"South Dakota","value":"SD"},
    {"label":"Tennessee","value":"TN"},
    {"label":"Texas","value":"TX"},
    {"label":"Utah","value":"UT"},
    {"label":"Vermont","value":"VT"},
    {"label":"Virginia","value":"VA"},
    {"label":"Washington","value":"WA"},
    {"label":"West Virginia","value":"WV"},
    {"label":"Wisconsin","value":"WI"},
    {"label":"Wyoming","value":"WY"}
  ]

/**
 * Convert a date from USD format to FR format.
 * @param {string} date - The date in USD format (YYYY-MM-DD).
 * @returns {string} The date in FR format (DD/MM/YYYY).
 */
function convertUSDatetoFr(date : string){
  const splitDate = date.split('-')
  return splitDate.reverse().join('/')
}