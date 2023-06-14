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
    <div className="datePickerContainer">
        <input type="date" ref={dateInput}/>


    </div>
    )
}

export default DatePicker