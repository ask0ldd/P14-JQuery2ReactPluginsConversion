import { Dispatch, SetStateAction } from "react"

function FormInput({input, label, formState, validation} : IProps){
// should pass state &
    const labelId = label?.id ? label.id : input.id + '-label'
    // const defaultValue = input.value != null ? input.value : formState[formState.fieldAccessor as keyof typeof formState || input.id as keyof typeof formState] as string
      
    // !!!!! when datatype number input should accept letter but e is working
    return (
        <>
            {label.text && <label id={labelId} htmlFor={input.id} className={label?.CSSClasses?.join(' ')}>{label.text}</label>}
            <input aria-labelledby={labelId} type={input.type} id={input.id} placeholder={input?.placeholder} className={input?.CSSClasses?.join(' ')} value={input?.value}
            onChange={(e) => formState.set((prevState) => updateTargetFieldState(formState.fieldAccessor || input.id, prevState, e.target.value))}/>
            {(formState.get()[input.id]?.error && validation.errorMessage) && <p className="errorMessage" id={input.id+"-error"}>{validation.errorMessage}</p>}
        </>
    )

    function updateTargetFieldState(fieldAccessor : string, formState : IFormState, value : string){
        return {...formState, [fieldAccessor] : { value : formatInputValue(value), error : !validation.validationFn(value) }}
    }
}

export default FormInput

interface IProps{
    input : IInput
    label : ILabel
    formState : { 
        get() : IFormState, 
        set : Dispatch<SetStateAction<IFormState>>, 
        fieldAccessor? : string
    }
    validation : {
        validationFn : (inputvalue : string) => boolean, 
        errorMessage : string // !!!! errorMessage : {message : string, CSSClasses : string[]}
    }
}

interface ILabel{
    id? : string
    text : string
    CSSClasses? : string[]
}

interface IInput{
    id : string
    type : "text" | "email" | "password" | "number" | "search" | "tel" | "url"
    placeholder? : string
    value? : string
    CSSClasses? : string[]
}

export interface IFormState{
    [key: string]: IFormInput
  }
  
interface IFormInput{
    value : string
    error : boolean
}

function formatInputValue(value : string){
    return value.trim().toLowerCase()
}

/*
            onChange={(e) => formState.set((prevState) => ({...prevState, 
                    [formState.fieldAccessor || input.id] : { value : formatInputValue(e.target.value), error : !validation.validationFn(e.target.value) }})
            )}/>
*/