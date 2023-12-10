import { IForm as IFormState } from "../CustomForm"

function FormInput({input, label, formState, validation} : IProps){
// should pass state &
    const labelId = label?.id ? label.id : input.id + '-label'
    // const defaultValue = input.value != null ? input.value : formState[formState.fieldAccessor as keyof typeof formState || input.id as keyof typeof formState] as string
    return (
        <>
            {label.text && <label id={labelId} htmlFor={input.id} className={label?.CSSClasses?.join(' ')}>{label.text}</label>}
            <input aria-labelledby={labelId} type={input.type} id={input.id} placeholder={input?.placeholder} className={input?.CSSClasses?.join(' ')} value={input?.value}
            onChange={(e) => formState.set((prevState) => {
                return {...prevState, 
                    [formState.fieldAccessor || input.id] : { value : formatInputValue(e.target.value), error : !validation.validationFn(e.target.value) }}
            })}/>
            {(formState.get()[input.id]?.error && validation.errorMessage) && <p className="errorMessage" id={input.id+"-error"}>{validation.errorMessage}</p>}
        </>
    )
}

export default FormInput

interface IProps{
    input : IInput
    label : ILabel
    formState : { 
        get() : IFormState, 
        set : React.Dispatch<React.SetStateAction<IFormState>>, 
        fieldAccessor? : string
    }
    validation : {
        validationFn : (inputvalue : string) => boolean, 
        errorMessage : string
    }
}

// !!!!!!!!!!! add error message styling possibilities : cssClass

interface ILabel{
    id? : string
    text : string
    CSSClasses? : string[] // !!!!!!!! should be an array
}

interface IInput{
    id : string
    type : "text" | "email" | "password" | "number" | "search" | "tel" | "url"
    placeholder? : string
    value? : string
    CSSClasses? : string[] // !!!!!!!! should be an array
}

function formatInputValue(value : string){
    return value.trim().toLowerCase()
}