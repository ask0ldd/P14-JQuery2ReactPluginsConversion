/* eslint-disable @typescript-eslint/no-unused-vars */
import './style/DatePicker.css'
import { ChangeEvent } from "react"

/**
 * Component : A custom date picker.
 * @Component
 * @return ( <DatePicker/> )
 */
function DatePicker({formGroupState, id, label} : IProps){

    const fieldAccessor = formGroupState.fieldAccessor || id
    const errorMessage = "You need to select a Date."

    return(
        <>
            <label className={label?.CSSClasses?.join(' ')} htmlFor={id}>{label.text}</label>
            <input type="date" id={id} value={formGroupState.get()[fieldAccessor].value} onChange={(e : ChangeEvent<HTMLInputElement>) => {
                updateFormGroupField(formGroupState.get(), e.target.value, fieldAccessor)
            }}/>
            {(formGroupState.get()[fieldAccessor]?.error && errorMessage) && <p className="errorMessage" id={id+"-error"}>{errorMessage}</p>}
        </>
    )

    /**
     * Update the value and error state of a field in a form group.
     * @param {IFormGroup} currentState - The current state of the form group.
     * @param {string} inputValue - The new input value for the field.
     * @param {string} fieldAccessor - The accessor for the field to be updated.
     */
    function updateFormGroupField(currentState : IFormGroup, inputValue : string, fieldAccessor : string){
        formGroupState.set({...currentState, [fieldAccessor] : {
                ...currentState[fieldAccessor],
                value: inputValue.toLowerCase().trim(), 
                error : !currentState[fieldAccessor].validationFn(inputValue),
                validationFn : currentState[fieldAccessor].validationFn,
                isMandatory : currentState[fieldAccessor].isMandatory
            }
        })
    }
}

export default DatePicker

interface IProps{
    formGroupState : { 
        get : () => IFormGroup, 
        set : (state : IFormGroup) => void,
        fieldAccessor? : string
    }
    id : string
    label : ILabel
}

interface ILabel{
    id? : string
    text : string
    CSSClasses? : string[]
}

interface IFormGroup{
    [key: string]: IField
}
  
interface IField{
    accessor : string
    defaultValue : string
    validationFn : (value: string) => boolean
    isMandatory : boolean
    error : boolean
    value : string
}