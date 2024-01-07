/* eslint-disable @typescript-eslint/no-unused-vars */
import './style/DatePicker.css'
import { Dispatch, SetStateAction, ChangeEvent } from "react"

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
                formGroupState.set((prevState : IFormGroup) => {
                    return {...prevState, [fieldAccessor] : {
                        value: e.target.value.toLowerCase().trim(), 
                        error : !prevState[fieldAccessor].validationFn(e.target.value),
                        validationFn : prevState[fieldAccessor].validationFn,
                        isMandatory : prevState[fieldAccessor].isMandatory
                    }}
                })
            }}/>
            {(formGroupState.get()[fieldAccessor]?.error && errorMessage) && <p className="errorMessage" id={id+"-error"}>{errorMessage}</p>}
        </>
    )
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