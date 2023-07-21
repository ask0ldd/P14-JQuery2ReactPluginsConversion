import { IForm, formatInputValue } from "../../Form"

function FormInput({inputID, inputType, inputPlaceHolder, inputValue, inputCSSClasses, hasLabel, labelValue, labelCSSClasses, setFormState, onChangeValidator} : IProps){
// should pass state &
    return (
        <>
            {hasLabel && <label htmlFor={inputID} className={labelCSSClasses && labelCSSClasses}>{labelValue}</label>}
            <input type={inputType} id={inputID} placeholder={inputPlaceHolder && inputPlaceHolder} className={inputCSSClasses && inputCSSClasses} value={inputValue && inputValue}
            onChange={(e) => setFormState((prevState) => {
                return {...prevState, [inputID] : {value : formatInputValue(e.target.value), error : !onChangeValidator(e.target.value)}}
            })}/>
        </>
    )
}

/*
        onChange={(e) => setFormState((prevState) => {
          return {...prevState, lastname : {value : formatInputValue(e.target.value), error : !Validator.testName(e.target.value)}}
        })}/>
*/

export default FormInput

interface IProps{
    inputID : string
    inputType : "text" | "email" | "password" | "number" | "search" | "tel" | "url"
    inputPlaceHolder : string
    inputValue? : string
    inputCSSClasses? : string
    hasLabel : boolean
    labelValue : string
    labelCSSClasses? : string
    setFormState : React.Dispatch<React.SetStateAction<IForm>>
    onChangeValidator : (inputvalue : string) => boolean
}