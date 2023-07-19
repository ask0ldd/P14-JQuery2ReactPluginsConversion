/* eslint-disable @typescript-eslint/no-explicit-any */
import './style/DatePicker.css'
import { Dispatch, SetStateAction, ChangeEvent } from "react"

/**
 * Component : A custom date picker.
 * @Component
 * @return ( <DatePicker/> )
 */
function DatePicker({useFormState, inputStateValue, valueAccessor} : IProps){

    const [formState, setFormState] = useFormState

    return(
        <input type="date" value={inputStateValue} onChange={(e : ChangeEvent<HTMLInputElement>) => {
            const formStateCopy = {...formState}
            formStateCopy[valueAccessor] = e.target.value.toLowerCase().trim()
            setFormState(formStateCopy)
        }}/>
    )
}

export default DatePicker

interface IProps{
useFormState : [ any, Dispatch<SetStateAction<any>> ]
inputStateValue : string | number | readonly string[] | undefined
valueAccessor : string
}