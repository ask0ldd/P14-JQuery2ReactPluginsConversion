import { useRef } from "react"
import './style/DatePicker.css'

function DatePicker(){

    const dateInput = useRef(null)

    return(
    <div className="datePickerContainer">
        <input type="date" ref={dateInput}/>


    </div>
    )
}

export default DatePicker