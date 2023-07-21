import { IForm as IFormState } from "../../Form"

function FormInput({id, type, inputPlaceHolder, inputValue, CSSClasses, labelValue, formState, setFormState, onChangeValidator, errorMessage} : IProps){
// should pass state &
    return (
        <>
            {labelValue && <label htmlFor={id} className={CSSClasses?.label && CSSClasses.label}>{labelValue}</label>}
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
    labelValue? : string
    CSSClasses? : {input : string | undefined, label : string | undefined}
    formState : IFormState
    setFormState : React.Dispatch<React.SetStateAction<IFormState>>
    onChangeValidator : (inputvalue : string) => boolean
    errorMessage : string
}

function formatInputValue(value : string){
    return value.trim().toLowerCase()
}