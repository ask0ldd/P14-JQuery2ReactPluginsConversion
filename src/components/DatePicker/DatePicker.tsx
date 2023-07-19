import { useRef } from "react"
import './style/DatePicker.css'

/**
 * Component : A custom date picker.
 * @Component
 * @return ( <DatePicker/> )
 */
function DatePicker({useFormState, inputStateValue} : IProps){

    const [formState, setFormState] = useFormState

    const dateInput = useRef(null)

    return(
        <input type="date" ref={dateInput}/>
    )
}

export default DatePicker

interface IProps{
useFormState:[any, () => void]
inputStateValue : string | boolean | number
}