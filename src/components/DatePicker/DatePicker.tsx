/* eslint-disable @typescript-eslint/no-unused-vars */
import { IForm } from '../CustomForm'
import './style/DatePicker.css'
import { Dispatch, SetStateAction, ChangeEvent } from "react"

/**
 * Component : A custom date picker.
 * @Component
 * @return ( <DatePicker/> )
 */
function DatePicker({useFormState, inputStateValue, valueAccessor, id, label} : IProps){

    const [, setFormState] = useFormState

    return(
        <>
            <label className={label?.class} htmlFor={id}>{label.text}</label>
            <input type="date" id={id} value={inputStateValue} onChange={(e : ChangeEvent<HTMLInputElement>) => {
                setFormState((prevState : IForm) => {
                    return {...prevState, [valueAccessor] : {...prevState[valueAccessor], value: e.target.value.toLowerCase().trim()}}
                })
            }}/>
        </>
    )
}

export default DatePicker

interface IProps{
    useFormState : [ IForm, Dispatch<SetStateAction<IForm>> ]
    inputStateValue : string | number | readonly string[] | undefined
    valueAccessor : string
    id : string
    label : ILabel
}

interface ILabel{
    text : string
    class? : string
}