/* eslint-disable react-hooks/exhaustive-deps */
import './style/CustomSelect.css'
import SelectComboBox from "./ComboBox"
import OptionsList from "./OptionsList"
import {createContext, useState, useRef} from 'react'
import { useKeyboardHandler } from './hooks/useKeyboardHandler'
import { IForm } from '../../Form'

/* !!!
add a way to define the default Option or a non option default value
improve keyboard handler highlighted / selected
deal with error if options values are not unique
style override
override arrow color
scrollbar if too many options / max height listbox
si touche cliquee > option commencant par cette touche
*/

/* selectId added at the head of each react key of the component / subcomponents to ensure their unicity */

/**
 * Component : Option populating the option list of a custom select.
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
function CustomSelect({formState, options, selectId, labelledBy, onValueChange /*styleOverride*/} : IProps){ // should be able to pass the id of the element labelling the select

    // updated state (always returning the non updated version) not accessible through event listeners => solution : tracking the state through a ref always updated simultaneously
    // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
    const [activeOption, _setActiveOption] = useState<IOption>({...options[0]}) // deal with error if options missing
    const activeOptionRef = useRef<IOption>(activeOption)
    function setActiveOption(option : IOption){
        _setActiveOption({...option})
        activeOptionRef.current = {...option}
        onValueChange(formState, option.value)
    }

    const [isListboxExpanded, _setListboxAsExpanded] = useState<boolean>(false)
    const isListboxExpandedRef = useRef<boolean>(isListboxExpanded)
    function setListboxAsExpanded(bool : boolean){
        _setListboxAsExpanded(bool)
        isListboxExpandedRef.current = bool
    }

    useKeyboardHandler(
        formState,
        [...options], 
        activeOptionRef, 
        isListboxExpandedRef, 
        setActiveOption, 
        setListboxAsExpanded
    )
   
    return(
        <div className="selectContainer">
            <SelectContext.Provider value={{selectId, options, activeOption, isListboxExpanded, labelledBy, setActiveOption, setListboxAsExpanded: setListboxAsExpanded}}>
                <SelectComboBox/>
                <OptionsList/>
            </SelectContext.Provider>
        </div>
    )

}

export default CustomSelect

export const SelectContext = createContext<ISelectContext>({
    selectId : '',
    activeOption : {label:'', value:''},
    options : [], 
    isListboxExpanded : false, 
    setActiveOption : () => false, 
    setListboxAsExpanded : () => false
})

export interface IOption{
    label : string
    value : string
}

interface IProps{
    formState : IForm
    options : Array<IOption>
    selectId : string
    labelledBy : string
    onValueChange : (formState : IForm, value : string, datakey? : string) => void
    // onValueChange : (formState : IForm) => void
    // styleOverride? : object
}

interface ISelectContext{
    selectId : string
    options : Array<IOption>
    labelledBy? : string
    activeOption : IOption
    isListboxExpanded : boolean
    setActiveOption : (option : IOption) => void
    setListboxAsExpanded : (bool : boolean) => void
    // styleOverride? : object
}