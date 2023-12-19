/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useRef, useState } from "react"
import CustomSelect from "./CustomSelect/CustomSelect"
import DatePicker from "./DatePicker/DatePicker"
import FormInput, { IFormState } from "./FormInput/FormInput"
import Validator from "../services/validators"
import '../Form.css'
import { FormStateBuilder } from "./FormStateBuilder"
import { EmployeesContext } from "../contexts/EmployeesContext"
import { IModalManager } from "./Modal/hooks/useModalManager"

function CustomForm({modalManager} : {modalManager : IModalManager} ){

    const initialFormState = new FormStateBuilder()
    .addFormFieldBlock({accessor : "firstname", defaultValue : '', validationFn : Validator.isName, mandatory : true}) // !!!!! mandatory : true / false
    .addFormFieldBlock({accessor : "lastname", defaultValue : '', validationFn : Validator.isName, mandatory : true})
    .addFormFieldBlock({accessor : "birthdate", defaultValue : '', validationFn : Validator.isDatePast, mandatory : true})
    .addFormFieldBlock({accessor : "street", defaultValue : '', validationFn : Validator.isName, mandatory : true})
    .addFormFieldBlock({accessor : "city", defaultValue : '', validationFn : Validator.isName, mandatory : true})
    .addFormFieldBlock({accessor : "state", defaultValue : statesList[0].value, mandatory : true})
    .addFormFieldBlock({accessor : "zipcode", defaultValue : '', validationFn : Validator.isNumber, mandatory : true})
    .addFormFieldBlock({accessor : "startdate", defaultValue : '', validationFn : Validator.isDate, mandatory : true})
    .addFormFieldBlock({accessor : "department", defaultValue : departmentsList[0].value, mandatory : true})
    .buildState()

    const [formState, setFormState]= useState<IFormState>(initialFormState)
    // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
    const formStateRef = useRef<IFormState>(initialFormState)
    const {employees} = useContext(EmployeesContext)

    function formValidation (){
      let isError = 0
      formStateRef.current = formState
      console.log(formStateRef.current)
      for (const [key, formInput] of Object.entries(formStateRef.current)) {
        isError += +formInput.error
        // mandatory & not blank ?
        if(formInput.mandatory === true && formInput.value.trim() == ""){
            const formInputState = {...formStateRef.current[key]}
            isError++
            formInputState.error = true
            formStateRef.current = {...formStateRef.current, [key] : formInputState}
        }
      }
      setFormState({...formStateRef.current})
      return Boolean(!isError)
    }

    function convertUSDatetoFr(date : string){
      // console.log("trig")
      const splitDate = date.split('-')
      return splitDate.reverse().join('/')
    }

    function isEmployeeAlreadyInContext(newEmployee : object){
      return employees.find(employee => JSON.stringify(employee) === JSON.stringify(newEmployee)) != null
    }

    function formSubmit (e : React.MouseEvent<HTMLInputElement, MouseEvent>){
      e.preventDefault()
      if(formValidation()){
        // before add to employees, verify not existing
        // console.log(formState)
        const newEmployee = {
          "firstName":formState.firstname.value || '',
          "lastName":formState.lastname.value || '',
          "street":formState.street.value || '',
          "city":formState.city.value || '',
          "zipCode":formState.zipcode.value || '',
          "state":formState.state.value || '',
          "birthDate":formState.birthdate.value || '',
          "startingDate":formState.startdate.value || '',
          "department":formState.department.value || ''
        }
        for (const [key, value] of Object.entries(newEmployee)) {
          if(Validator.isDate(value)) newEmployee[key as keyof typeof newEmployee] = convertUSDatetoFr(newEmployee[key as keyof typeof newEmployee])
        }
        if(isEmployeeAlreadyInContext(newEmployee)) return
        employees.push(newEmployee)
        modalManager.displayModalPreset("default")
        return 
      }
      modalManager.displayModalPreset("formError")
    }
    
    return(
        <form className="mainform">
            <h2>1. Personnal</h2>

            <FormInput input={{id : 'firstname', type : "text"}}
            label={{text : 'First Name'}}
            formState={{get : () => formState, set : setFormState}} // input id used as accessor if fieldValueAccessor not defined.
            errorMessage = "Invalid Value."/>

            <FormInput input={{id : "lastname", type : "text"}}
            label={{text : 'Last Name', CSSClasses : ['defaultSpacing']}}
            formState={{get : () => formState, set : setFormState}} 
            errorMessage = "Invalid Value."/>

            <DatePicker id={"birthdate"} 
            label={{text :"Birthdate", CSSClasses : ["defaultSpacing"]}} 
            formState={{get : () => formState, set : setFormState, fieldAccessor : "birthdate"}}/>

            <h2>2. Address</h2>

            <FormInput input={{id : "street", type : "text"}} 
            label={{text : 'Street'}}
            formState={{get : () => formState, set : setFormState}} 
            errorMessage = "Invalid Value."/>

            <FormInput input={{id : "city", type : "text"}} 
            label={{text : 'City', CSSClasses : ['defaultSpacing']}}
            formState={{get : () => formState, set : setFormState}}
            errorMessage = "Invalid Value."/>

            <CustomSelect select={{id:"state"}}
            label={{text : "State", CSSClasses : ["defaultSpacing"]}} 
            formState={{get : () => formState, set : setFormState, fieldAccessor : 'state'}} 
            options={statesList} // !!! add default : options={list : statesList, default : {label : 'defaultlabel' , value : 'defautvalue' }
            />

            <FormInput input={{id : "zipcode", type : "number"}} 
            label={{text : 'ZIP Code', CSSClasses : ['defaultSpacing']}}
            formState={{get : () => formState, set : setFormState}} 
            errorMessage = "Invalid Value."/>

            <h2>3. Professional</h2>

            <DatePicker id={"start-date"} 
            label={{text : "Integration Date"}} 
            formState={{get : () => formState, set : setFormState, fieldAccessor : "startdate"}}/>

            <CustomSelect select={{id:"department"}} 
            label={{text: "Departement", CSSClasses : ["defaultSpacing"]}} 
            formState={{get : () => formState, set : setFormState, fieldAccessor : 'department'}} 
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