/* eslint-disable react-hooks/exhaustive-deps */
import './style/CustomSelect.css'
import SelectComboBox from "./ComboBox"
import OptionsList from "./OptionsList"
import {createContext, useState, useRef, Dispatch, SetStateAction} from 'react'
import { useKeyboardHandler } from './hooks/useKeyboardHandler'
import { IForm } from '../CustomForm'

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
 * @param {number} props.formState - Current values of the form elements.
 * @param {Object} props.options
 * @param {string} props.options[].label - Text displayed as an option.
 * @param {string} props.options[].value - Value sent on form submit when this option is selected.
 * @param {string} props.selectId - Id of the select, only used for options naming purposes.
 * @param {string} props.labelledBy - Id of the label related to the input.
 * @param {function} props.onValueChange - Function triggered when selecting a new option.
 * @return ( <CustomSelect formState={formState} options={options} selectId={selectId} labelledBy={labelledBy} onValueChange={onValueChange}/> )
 */
function CustomSelect({formState, options, select, onValueChange, label, } : IProps){ // should be able to pass the id of the element labelling the select
    
    const labelId = label?.id ? label.id : select.id + '-label'

    // updated state (always returning the non updated version) not accessible through event listeners => solution : tracking the state through a ref always updated simultaneously
    // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
    const [activeOption, _setActiveOption] = useState<IOption>({...options[0]}) // deal with error if options missing
    const activeOptionRef = useRef<IOption>(activeOption)
    function setActiveOption(option : IOption){
        _setActiveOption({...option})
        activeOptionRef.current = {...option}
        onValueChange(option.value)
    }

    const [isListboxExpanded, _setListboxAsExpanded] = useState<boolean>(false)
    const isListboxExpandedRef = useRef<boolean>(isListboxExpanded)
    function setListboxAsExpanded(bool : boolean){
        _setListboxAsExpanded(bool)
        isListboxExpandedRef.current = bool
    }

    useKeyboardHandler(
        select.id,
        formState,
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

export const SelectContext = createContext<ISelectContext>({
    selectId : '',
    // activeOption : {label:'', value:''},
    options : [],  
    // setActiveOption : () => false, 
    activeOption : {get : () => ({label:'', value:''}), set : () => false},
    listbox : {isExpanded : false, setAsExpanded : () => false},
    label : {text : ''}
})

export interface IOption{
    label : string
    value : string
}

interface IProps{
    formState : {
        get : () => IForm
        set? : Dispatch<SetStateAction<IFormState>>, 
        fieldAccessor? : string
    }
    options : Array<IOption>
    // onValueChange : (formState : IForm, value : string, datakey? : string) => void
    onValueChange : (value : string, accessor? : string) => void
    select : {id : string}
    label : ILabel
}

interface ILabel{
    id? : string
    text : string
    CSSClasses? : string[]
}

interface ISelectContext{
    selectId : string
    options : Array<IOption>
    // activeOption : IOption
    // setActiveOption : (option : IOption) => void
    activeOption : {
        get : () => IOption
        set : (option : IOption) => void
    }
    listbox : {
        isExpanded : boolean, 
        setAsExpanded : (bool : boolean) => void
    }
    label : ILabel
}