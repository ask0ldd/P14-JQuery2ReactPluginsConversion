import { Dispatch, SetStateAction } from "react"

function FormInput({input, label, formState, errorMessage} : IProps){
// should pass state &
    const labelId = label?.id ? label.id : input.id + '-label'
    const stateAccessor = formState.fieldAccessor || input.id
    // const defaultValue = input.value != null ? input.value : formState[formState.fieldAccessor as keyof typeof formState || input.id as keyof typeof formState] as string
      
    // !!!!! when datatype number input should accept letter but e is working
    return (
        <>
            {label.text && <label id={labelId} htmlFor={input.id} className={label?.CSSClasses?.join(' ')}>{label.text}</label>}
            <input aria-labelledby={labelId} type={input.type} id={input.id} placeholder={input?.placeholder} className={input?.CSSClasses?.join(' ')} value={input?.value}
            onChange={(e) => formState.set((prevState) => updateTargetFieldState(stateAccessor, prevState, e.target.value))}/>
            {(formState.get()[stateAccessor]?.error && errorMessage) && <p className="errorMessage" id={input.id+"-error"}>{errorMessage}</p>}
        </>
    )

    function formatInputValue(value : string){
        return value.trim().toLowerCase()
    }

    function updateTargetFieldState(fieldAccessor : string, formState : IFormState, value : string){
        return {...formState, [fieldAccessor] : {
            value : formatInputValue(value), 
            error : !formState[fieldAccessor].validationFn(value),
            validationFn : formState[fieldAccessor].validationFn,
            mandatory : formState[fieldAccessor].mandatory
        }}
    }
}

export default FormInput

interface IProps{
    input : IInput
    label : ILabel
    formState : { 
        get() : IFormState
        set : Dispatch<SetStateAction<IFormState>>
        fieldAccessor? : string
    }
    errorMessage : string
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
  
export interface IFormInput{
    value : string
    error : boolean
    validationFn : (value: string) => boolean
    mandatory : boolean
}

/*
            onChange={(e) => formState.set((prevState) => ({...prevState, 
                    [formState.fieldAccessor || input.id] : { value : formatInputValue(e.target.value), error : !validation.validationFn(e.target.value) }})
            )}/>
*/