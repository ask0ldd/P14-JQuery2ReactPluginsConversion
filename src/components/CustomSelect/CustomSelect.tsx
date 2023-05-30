/* eslint-disable react-hooks/exhaustive-deps */
import '../../style/select/CustomSelect.css'
import SelectComboBox from "./ComboBox"
import OptionsList from "./OptionsList"
import {createContext, useState, useRef} from 'react'
import { useKeyboardHandler } from './hooks/useKeyboardHandler'

/* selectId added at the head of each react key of the component / subcomponents to enforce their unicity */
function CustomSelect({options, selectId} : IProps){ // should be able to pass the id of the element labelling the select

    // updated state (always returning th old version) not accessible into event listeners so we need some kind of duplicated state placed into a ref
    // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
    const [activeOption, _setActiveOption] = useState<IOption>({...options[0]})
    const activeOptionRef = useRef<IOption>(activeOption)
    function setActiveOption(option : IOption){
        _setActiveOption({...option})
        activeOptionRef.current = {...option}
    }

    const [optionsListVisibility, _setOptionsListVisibility] = useState<boolean>(false)
    const optionsListVisibilityRef = useRef<boolean>(optionsListVisibility)
    function setOptionsListVisibility(bool : boolean){
        _setOptionsListVisibility(bool)
        optionsListVisibilityRef.current = bool
    }

    useKeyboardHandler(
        [...options], 
        activeOptionRef, 
        optionsListVisibilityRef, 
        setActiveOption, 
        setOptionsListVisibility
    )
   
    return(
        <div className="selectContainer">
            <SelectContext.Provider value={{selectId, options, activeOption, optionsListVisibility, setActiveOption, setOptionsListVisibility}}>
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
    optionsListVisibility : false, 
    setActiveOption : () => false, 
    setOptionsListVisibility : () => false
})

export interface IOption{
    label : string
    value : string
}

interface IProps{
    options : Array<IOption>
    selectId : string
}

interface ISelectContext{
    selectId : string
    options : Array<IOption>
    activeOption? : IOption
    optionsListVisibility : boolean
    setActiveOption : (option : IOption) => void
    setOptionsListVisibility : (bool : boolean) => void
}



/*

should add later a way to define the default Option

*/