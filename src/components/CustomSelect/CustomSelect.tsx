/* eslint-disable react-hooks/exhaustive-deps */
import './style/CustomSelect.css'
import SelectComboBox from "./ComboBox"
import OptionsList from "./OptionsList"
import {useState, useRef} from 'react'
import { useKeyboardHandler } from './hooks/useKeyboardHandler'
import { SelectContext } from './contexts/SelectContext'

/* !!!
add a way to define the default Option or a non option default value
improve keyboard handler highlighted / selected
deal with error if options values are not unique
style override
override arrow color
scrollbar if too many options / max height listbox
styling option list
*/

/* selectId added at the head of each react key of the component / subcomponents to ensure their unicity */

/**
 * Component : A dropdown menu mimicking the HTML select component, with visual customization options.
 * @Component
 * @param {Object} props - Props.
 * @param {number} props.formGroupState - Current values of the form elements.
 * @param {Object} props.options
 * @param {string} props.options[].label - Text displayed as an option.
 * @param {string} props.options[].value - Value sent on form submit when this option is selected.
 * @param {string} props.selectId - Id of the select, only used for options naming purposes.
 * @param {string} props.labelledBy - Id of the label related to the input.
 * @param {function} props.onValueChange - Function triggered when selecting a new option.
 * @return ( <CustomSelect formGroupState={formGroupState} options={options} selectId={selectId} labelledBy={labelledBy} onValueChange={onValueChange}/> )
 */
function CustomSelect({formGroupState, options, select, label } : IProps){ // should be able to pass the id of the element labelling the select
    
    const labelId = label?.id ? label.id : select.id + '-label'

    // updated state (always returning the non updated version) not accessible through event listeners => solution : tracking the state through a ref always updated simultaneously
    // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
    const [activeOption, _setActiveOption] = useState<IOption>({...options[0]}) // deal with error if options missing
    const activeOptionRef = useRef<IOption>(activeOption)
    function setActiveOption(option : IOption){
        _setActiveOption({...option})
        activeOptionRef.current = {...option}
        const currentState = formGroupState.get()
        const fieldAccessor = formGroupState.fieldAccessor
        formGroupState.set({...currentState, [fieldAccessor] : {
            ...currentState[fieldAccessor],
            value : option.value, 
            error : false,
            validationFn : currentState[fieldAccessor].validationFn,
            isMandatory : currentState[fieldAccessor].isMandatory
        }})
    }

    const [isListboxExpanded, _setListboxAsExpanded] = useState<boolean>(false)
    const isListboxExpandedRef = useRef<boolean>(isListboxExpanded)
    function setListboxAsExpanded(bool : boolean){
        _setListboxAsExpanded(bool)
        isListboxExpandedRef.current = bool
    }

    useKeyboardHandler(
        select.id,
        formGroupState,
        [...options], 
        activeOptionRef, 
        isListboxExpandedRef, 
        setActiveOption, 
        setListboxAsExpanded
    )
   
    return(
        <div className="selectContainer">
            <label id={labelId} className={label?.CSSClasses?.join(' ')} htmlFor={select.id}>{label.text}</label>
            <SelectContext.Provider value={{
                selectId : select.id, options, activeOption : {get :  () => activeOption, set : setActiveOption}, 
                listbox : { isExpanded : isListboxExpanded, setAsExpanded : setListboxAsExpanded},
                label : label
            }}>
                <SelectComboBox/>
                <OptionsList/>
            </SelectContext.Provider>
        </div>
    )

}

export default CustomSelect

export interface IOption{
    label : string
    value : string
}

interface IProps{
    formGroupState : {
        get : () => IFormGroup
        set : (state : IFormGroup) => void
        fieldAccessor : string
    }
    options : Array<IOption>
    select : {id : string}
    label : ILabel
}

export interface ILabel{
    id? : string
    text : string
    CSSClasses? : string[]
}

export interface IFormGroup{
    [key: string]: IField
}
  
interface IField{
    accessor : string
    defaultValue : string
    validationFn : (value: string) => boolean
    isMandatory : boolean
    error : boolean
    value : string
}