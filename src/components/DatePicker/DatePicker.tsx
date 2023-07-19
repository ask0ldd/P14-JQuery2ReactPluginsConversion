import { useRef } from "react"
import './style/DatePicker.css'

/**
 * Component : A custom date picker.
 * @Component
 * @return ( <DatePicker/> )
 */
function DatePicker(){

    const dateInput = useRef(null)

    return(
        <input type="date" ref={dateInput}/>
    )
}

export default DatePicker