/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import CustomSelect from "./CustomSelect/CustomSelect"
import DatePicker from "./DatePicker/DatePicker"
import FormInput, { IFormState } from "./FormInput/FormInput"
import Validator from "../services/validators"
import '../Form.css'
import { FormStateBuilder } from "./FormStateBuilder"

function CustomForm(){

    const initialFormState = new FormStateBuilder()
    .addFormFieldBlock({accessor : "firstname", defaultValue : '', validationFn : Validator.isName})
    .addFormFieldBlock({accessor : "lastname", defaultValue : '', validationFn : Validator.isName})
    .addFormFieldBlock({accessor : "birthdate", defaultValue : '', validationFn : Validator.isDate})
    .addFormFieldBlock({accessor : "street", defaultValue : '', validationFn : Validator.isName})
    .addFormFieldBlock({accessor : "city", defaultValue : '', validationFn : Validator.isName})
    .addFormFieldBlock({accessor : "state", defaultValue : statesList[0].value})
    .addFormFieldBlock({accessor : "zipcode", defaultValue : '', validationFn : Validator.isNumber})
    .addFormFieldBlock({accessor : "startdate", defaultValue : '', validationFn : Validator.isDate})
    .addFormFieldBlock({accessor : "department", defaultValue : departmentsList[0].value})
    .buildState()

    const [formState, setFormState]= useState<IFormState>(initialFormState)
    
    useEffect(() => console.log(formState), [formState])

    function formValidation (e : React.MouseEvent<HTMLInputElement>){
      e.preventDefault()
      let isError = 0
      for (const [_, value] of Object.entries(formState)) {
        isError += +value.error
      }
      console.log(Boolean(isError))
      return Boolean(isError);
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

            <input type="submit" value="Add this Employee" onClick={formValidation}/>
            
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