import { IForm as IFormState } from "../CustomForm"

function FormInput({input, label, formState, onChangeValidator, errorMessage} : IProps){
// should pass state &
    const labelId = label?.id ? label.id : input.id + '-label'
    return (
        <>
            {label.text && <label id={labelId} htmlFor={input.id} className={label?.CSSClass && label?.CSSClass}>{label.text}</label>}
            <input aria-labelledby={labelId} type={input.type} id={input.id} placeholder={input?.placeholder} className={input?.CSSClass} value={input?.value}
            onChange={(e) => formState.set((prevState) => {
                return {...prevState, [input.id] : { value : formatInputValue(e.target.value), error : !onChangeValidator(e.target.value) }}
            })}/>
            {(formState.get()[input.id]?.error && errorMessage) && <p className="errorMessage" id={input.id+"-error"}>{errorMessage}</p>}
        </>
    )
}

export default FormInput

interface IProps{
    input : IInput
    label : ILabel
    formState : { get() : IFormState, set : React.Dispatch<React.SetStateAction<IFormState>>}
    onChangeValidator : (inputvalue : string) => boolean
    errorMessage : string
}

// !!!!!!!!!!! add error message styling possibilities : cssClass

interface ILabel{
    id? : string
    text : string
    CSSClass? : string // !!!!!!!! should be an array
}

interface IInput{
    id : string
    type : "text" | "email" | "password" | "number" | "search" | "tel" | "url"
    placeholder? : string
    value? : string
    CSSClass? : string // !!!!!!!! should be an array
}

function formatInputValue(value : string){
    return value.trim().toLowerCase()
}