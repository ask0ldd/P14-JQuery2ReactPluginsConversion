/* eslint-disable @typescript-eslint/no-unused-vars */
import {useContext} from 'react'
import { SelectContext } from './CustomSelect'
import '../../style/select/SelectLabel.css'

function SelectLabel(){

    const {activeOption, optionsListVisibility, setOptionsListVisibility} = useContext(SelectContext)

    // update active descendant
    return(
        <span onClick={() => {if(setOptionsListVisibility) setOptionsListVisibility(!optionsListVisibility)}} tabIndex={0} aria-controls="customListbox" id="customSelectLabel" role="combobox" 
        aria-haspopup="listbox" aria-activedescendant={activeOption?.value} 
        aria-expanded={optionsListVisibility} className={optionsListVisibility ? "customSelectLabel customSelectLabel-active" : "customSelectLabel"}>
            {activeOption?.label}
            <img className={optionsListVisibility ? "customSelectOpen" : "customSelectArrow"} src="./icons/select-arrow.svg"/>
        </span>
    )
}

export default SelectLabel

/*
style={{outline: optionsListVisibility ? '1px solid #213547' : 'none'}}
*/