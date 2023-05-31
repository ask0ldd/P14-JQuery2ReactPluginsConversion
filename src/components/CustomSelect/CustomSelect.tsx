/* eslint-disable react-hooks/exhaustive-deps */
import '../../style/select/CustomSelect.css'
import SelectComboBox from "./ComboBox"
import OptionsList from "./OptionsList"
import {createContext, useState, useRef} from 'react'
import { useKeyboardHandler } from './hooks/useKeyboardHandler'

/*
should add later a way to define the default Option
improve keyboard handler highlighted / selected

*/

/* selectId added at the head of each react key of the component / subcomponents to enforce their unicity */
function CustomSelect({options, selectId, labelledBy} : IProps){ // should be able to pass the id of the element labelling the select

    // updated state (always returning th old version) not accessible into event listeners so we need some kind of duplicated state placed into a ref
    // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
    const [activeOption, _setActiveOption] = useState<IOption>({...options[0]})
    const activeOptionRef = useRef<IOption>(activeOption)
    function setActiveOption(option : IOption){
        _setActiveOption({...option})
        activeOptionRef.current = {...option}
    }

    const [isListboxExpanded, _setListboxAsExpanded] = useState<boolean>(false)
    const isListboxExpandedRef = useRef<boolean>(isListboxExpanded)
    function setListboxAsExpanded(bool : boolean){
        _setListboxAsExpanded(bool)
        isListboxExpandedRef.current = bool
    }

    useKeyboardHandler(
        [...options], 
        activeOptionRef, 
        isListboxExpandedRef, 
        setActiveOption, 
        setListboxAsExpanded
    )
   
    return(
        <div className="selectContainer">
            <SelectContext.Provider value={{selectId, options, activeOption, isListboxExpanded: isListboxExpanded, labelledBy, setActiveOption, setListboxAsExpanded: setListboxAsExpanded}}>
                <SelectComboBox/>
                <OptionsList/>
            </SelectContext.Provider>
        </div>
    )

}

export default CustomSelect

export const SelectContext = createContext<ISelectContext>({
    selectId : '', 
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
    options : Array<IOption>
    selectId : string
    labelledBy : string
}

interface ISelectContext{
    selectId : string
    options : Array<IOption>
    labelledBy? : string
    activeOption? : IOption
    isListboxExpanded : boolean
    setActiveOption : (option : IOption) => void
    setListboxAsExpanded : (bool : boolean) => void
}