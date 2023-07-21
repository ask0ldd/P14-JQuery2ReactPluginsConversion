import { IForm, formatInputValue } from "../../Form"

function FormInput({id, type, inputPlaceHolder, inputValue, CSSClasses, labelValue, setFormState, onChangeValidator} : IProps){
// should pass state &
    return (
        <>
            {labelValue && <label htmlFor={id} className={CSSClasses?.label && CSSClasses.label}>{labelValue}</label>}
            <input type={type} id={id} placeholder={inputPlaceHolder && inputPlaceHolder} className={CSSClasses?.input && CSSClasses.input} value={inputValue && inputValue}
            onChange={(e) => setFormState((prevState) => {
                return {...prevState, [id] : { value : formatInputValue(e.target.value), error : !onChangeValidator(e.target.value) }}
            })}/>
        </>
    )
}

export default FormInput

interface IProps{
    id : string
    type : "text" | "email" | "password" | "number" | "search" | "tel" | "url"
    inputPlaceHolder? : string
    inputValue? : string
    // inputCSSClasses? : string
    labelValue? : string
    // labelCSSClasses? : string
    CSSClasses? : {input : string | undefined, label : string | undefined}
    setFormState : React.Dispatch<React.SetStateAction<IForm>>
    onChangeValidator : (inputvalue : string) => boolean
}