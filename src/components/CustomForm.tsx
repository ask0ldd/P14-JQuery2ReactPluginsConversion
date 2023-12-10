import { useEffect, useState } from "react"
import CustomSelect from "./CustomSelect/CustomSelect"
import DatePicker from "./DatePicker/DatePicker"
import FormInput from "./FormInput/FormInput"
import Validator from "../services/validators"
import '../Form.css'

function CustomForm(){
    const [formState, setFormState]= useState<IForm>({ // convert to array
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
    
    return(
        <form className="mainform">
            <h2>1. Personnal</h2>

            <FormInput input={{id : 'firstname', type : "text"}}
            label={{text : 'First Name'}}
            formState={{get : () => formState, set : setFormState}} // input id used as accessor if fieldValueAccessor not defined.
            validation={{errorMessage : "Invalid Value.", validationFn : Validator.isName}}/>

            <FormInput input={{id : "lastname", type : "text"}}
            label={{text : 'Last Name', CSSClasses : ['defaultSpacing']}}
            formState={{get : () => formState, set : setFormState}} 
            validation={{errorMessage : "Invalid Value.", validationFn : Validator.isName}}/>

            <DatePicker id={"birthdate"} 
            label={{text :"Birthdate", class : "defaultSpacing"}} 
            useFormState={[formState, setFormState]} 
            inputStateValue={formState.birthdate?.value} 
            valueAccessor="birthdate"/>

            <h2>2. Address</h2>

            <FormInput input={{id : "street", type : "text"}} 
            label={{text : 'Street'}}
            formState={{get : () => formState, set : setFormState}} 
            validation={{errorMessage : "Invalid Value.", validationFn : Validator.isName}}/>

            <FormInput input={{id : "city", type : "text"}} 
            label={{text : 'City', CSSClasses : ['defaultSpacing']}}
            formState={{get : () => formState, set : setFormState}}
            validation={{errorMessage : "Invalid Value.", validationFn : Validator.isName}}/>

            <CustomSelect select={{id:"state"}}
            label={{text : "State", CSSClasses : ["defaultSpacing"]}} 
            formState={{get : () => formState}} 
            onValueChange={(value : string) => setFormState((prevState) => {
              return {...prevState, state : {...prevState?.state, value : value}}
            })}
            options={statesList}
            />

            <FormInput input={{id : "zipcode", type : "number"}} 
            label={{text : 'ZIP Code', CSSClasses : ['defaultSpacing']}}
            formState={{get : () => formState, set : setFormState}} 
            validation={{errorMessage : "Invalid Value.", validationFn : Validator.isNumber}}/>

            <h2>3. Professional</h2>

            <DatePicker id={"start-date"} 
            label={{text : "Integration Date"}} 
            useFormState={[formState, setFormState]} 
            inputStateValue={formState.startdate?.value} valueAccessor="startdate"/>

            <CustomSelect select={{id:"department"}} 
            label={{text: "Departement", CSSClasses : ["defaultSpacing"]}} 
            formState={{get : () => formState}} 
            onValueChange={(value : string) => setFormState((prevState) => {
              return {...prevState, department : {...prevState?.department, value : value}}
            })}
            options={[
            {label:'Engineering', value:'Engineering'}, 
            {label:'Human Ressources', value:'Human Ressources'}, 
            {label:'Marketing', value:'Marketing'}, 
            {label:'Legal', value:'Legal'}, 
            {label:'Sales', value:'Sales'},
            {label:'Sales1', value:'Sales1'},
            {label:'Sales2', value:'Sales2'},
            {label:'Sales3', value:'Sales3'},
            ]}
            />

            <input type="submit" value="Add this Employee"/>
            
        </form>
    )
}

export default CustomForm

export interface IForm{
    [key: string]: IFormInput
  }
  
  interface IFormInput{
    value : string
    error : boolean
  }
  
  /*function formatInputValue(value : string){
    return value.trim().toLowerCase()
  }*/
  
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

  /*
    <label htmlFor="zipcode" className='defaultSpacing'>ZIP Code</label>
    <input id="zipcode" type="number" value={formState.zipcode?.value} 
    onChange={(e) => setFormState((prevState) => {
    return {...prevState, zipcode : {...prevState.zipcode, value : formatInputValue(e.target.value)}}
    })}/>
  */