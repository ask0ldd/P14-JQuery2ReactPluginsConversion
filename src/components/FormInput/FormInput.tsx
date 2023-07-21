function FormInput({inputID, inputType, inputPlaceHolder, inputCSSClasses, hasLabel, labelValue, labelCSSClasses} : IProps){

    return (
        <>
            {hasLabel && <label htmlFor={inputID} className={labelCSSClasses}>{labelValue}</label>}
            <input type={inputType} id={inputID} placeholder={inputPlaceHolder} className={inputCSSClasses}></input>
        </>
    )
}

interface IProps{
    inputID : string
    inputType : "text" | "email" | "password" | "number" | "search" | "tel" | "url"
    inputPlaceHolder : string
    inputCSSClasses : string
    hasLabel : boolean
    labelValue : string
    labelCSSClasses : string
}