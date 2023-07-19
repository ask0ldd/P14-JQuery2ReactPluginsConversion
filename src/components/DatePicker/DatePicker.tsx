/* eslint-disable @typescript-eslint/no-explicit-any */
import './style/DatePicker.css'
import { /*useRef, */Dispatch, SetStateAction } from "react"

/**
 * Component : A custom date picker.
 * @Component
 * @return ( <DatePicker/> )
 */
function DatePicker({useFormState, inputStateValue, valueAccessor} : IProps){

    const [formState, setFormState] = useFormState

    // const dateInput = useRef(null)

    return(
        <input type="date" value={inputStateValue} onChange={(e) => {
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