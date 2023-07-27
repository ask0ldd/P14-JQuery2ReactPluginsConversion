/* eslint-disable @typescript-eslint/no-unused-vars */
import { IForm } from '../CustomForm'
import './style/DatePicker.css'
import { Dispatch, SetStateAction, ChangeEvent } from "react"

/**
 * Component : A custom date picker.
 * @Component
 * @return ( <DatePicker/> )
 */
function DatePicker({useFormState, inputStateValue, valueAccessor} : IProps){

    const [, setFormState] = useFormState

    return(
        <input type="date" value={inputStateValue} onChange={(e : ChangeEvent<HTMLInputElement>) => {
            setFormState((prevState : IForm) => {
                return {...prevState, [valueAccessor] : {...prevState[valueAccessor], value: e.target.value.toLowerCase().trim()}}
            })
        }}/>
    )
}

export default DatePicker

interface IProps{
useFormState : [ IForm, Dispatch<SetStateAction<IForm>> ]
inputStateValue : string | number | readonly string[] | undefined
valueAccessor : string
}