import { IForm as IFormState } from "../CustomForm"

function FormInput({id, type, inputPlaceHolder, inputValue, CSSClasses, labelText, formState, setFormState, onChangeValidator, errorMessage} : IProps){
// should pass state &
    return (
        <>
            {labelText && <label htmlFor={id} className={CSSClasses?.label && CSSClasses.label}>{labelText}</label>}
            <input type={type} id={id} placeholder={inputPlaceHolder && inputPlaceHolder} className={CSSClasses?.input && CSSClasses.input} value={inputValue && inputValue}
            onChange={(e) => setFormState((prevState) => {
                return {...prevState, [id] : { value : formatInputValue(e.target.value), error : !onChangeValidator(e.target.value) }}
            })}/>
            {(formState[id]?.error && errorMessage) && <p className="errorMessage" id={id+"Error"}>{errorMessage}</p>}
        </>
    )
}

export default FormInput

interface IProps{
    id : string
    type : "text" | "email" | "password" | "number" | "search" | "tel" | "url"
    inputPlaceHolder? : string
    inputValue? : string
    labelText? : string
    CSSClasses? : {input? : string | undefined, label? : string | undefined}
    formState : IFormState
    setFormState : React.Dispatch<React.SetStateAction<IFormState>>
    onChangeValidator : (inputvalue : string) => boolean
    errorMessage : string
}

function formatInputValue(value : string){
    return value.trim().toLowerCase()
}