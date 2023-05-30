/* eslint-disable @typescript-eslint/no-unused-vars */
import {useContext} from 'react'
import { SelectContext } from './CustomSelect'
import '../../style/select/ComboBox.css'

function SelectComboBox(){ // shouldbe combobox and not select label

    const { activeOption, optionsListVisibility, setOptionsListVisibility } = useContext(SelectContext)

    return(
        <span onBlur={() => {if(setOptionsListVisibility) setOptionsListVisibility(false)}} 
        onClick={() => {if(setOptionsListVisibility) setOptionsListVisibility(!optionsListVisibility)}} 
        tabIndex={0} aria-controls="customListbox" id="customSelectLabel" role="combobox" 
        aria-haspopup="listbox" aria-activedescendant={activeOption?.value} 
        aria-expanded={optionsListVisibility} className={optionsListVisibility ? "customSelectLabel customSelectLabel-active" : "customSelectLabel"}
        >
            {activeOption?.label}
            <img className={optionsListVisibility ? "customSelectOpen" : "customSelectArrow"} src="./icons/select-arrow.svg"/>
        </span>
    )
}

export default SelectComboBox