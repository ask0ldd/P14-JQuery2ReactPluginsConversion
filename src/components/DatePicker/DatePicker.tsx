/* eslint-disable @typescript-eslint/no-unused-vars */
import './style/DatePicker.css'
import { Dispatch, SetStateAction, ChangeEvent } from "react"

/**
 * Component : A custom date picker.
 * @Component
 * @return ( <DatePicker/> )
 */
function DatePicker({formState, id, label} : IProps){

    // const [, setFormState] = useFormState
    const stateAccessor = formState.fieldAccessor || id
    const errorMessage = "You need to select a Date."

    return(
        <>
            <label className={label?.CSSClasses?.join(' ')} htmlFor={id}>{label.text}</label>
            <input type="date" id={id} value={formState.get()[stateAccessor].value} onChange={(e : ChangeEvent<HTMLInputElement>) => {
                formState.set((prevState : IForm) => {
                    return {...prevState, [stateAccessor] : {
                        value: e.target.value.toLowerCase().trim(), 
                        error : !prevState[stateAccessor].validationFn(e.target.value),
                        validationFn : prevState[stateAccessor].validationFn,
                        mandatory : prevState[stateAccessor].mandatory
                    }}
                })
            }}/>
            {(formState.get()[stateAccessor]?.error && errorMessage) && <p className="errorMessage" id={id+"-error"}>{errorMessage}</p>}
        </>
    )
}

export default DatePicker

interface IProps{
    formState : { 
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
    mandatory : boolean
}