/* eslint-disable @typescript-eslint/no-unused-vars */
import './style/DatePicker.css'
import { Dispatch, SetStateAction, ChangeEvent } from "react"

/**
 * Component : A custom date picker.
 * @Component
 * @return ( <DatePicker/> )
 */
function DatePicker({formGroupState, id, label} : IProps){

    const stateAccessor = formGroupState.fieldAccessor || id
    const errorMessage = "You need to select a Date."

    return(
        <>
            <label className={label?.CSSClasses?.join(' ')} htmlFor={id}>{label.text}</label>
            <input type="date" id={id} value={formGroupState.get()[stateAccessor].value} onChange={(e : ChangeEvent<HTMLInputElement>) => {
                formGroupState.set((prevState : IForm) => {
                    return {...prevState, [stateAccessor] : {
                        value: e.target.value.toLowerCase().trim(), 
                        error : !prevState[stateAccessor].validationFn(e.target.value),
                        validationFn : prevState[stateAccessor].validationFn,
                        isMandatory : prevState[stateAccessor].isMandatory
                    }}
                })
            }}/>
            {(formGroupState.get()[stateAccessor]?.error && errorMessage) && <p className="errorMessage" id={id+"-error"}>{errorMessage}</p>}
        </>
    )
}

export default DatePicker

interface IProps{
    formGroupState : { 
        get : () => IForm, 
        set : Dispatch<SetStateAction<IForm>>, 
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

export interface IForm{
    [key: string]: IFormInput
  }
  
interface IFormInput{
    value : string
    error : boolean
    validationFn : (value: string) => boolean
    isMandatory : boolean
}

/*function convertIntDatetoFr(date : string){
    const splitDate = date.split('-')
    return splitDate.reverse().join('/')
}*/