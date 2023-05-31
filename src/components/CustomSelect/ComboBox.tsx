/* eslint-disable @typescript-eslint/no-unused-vars */
import {useContext} from 'react'
import { SelectContext } from './CustomSelect'
import '../../style/select/ComboBox.css'

function SelectComboBox(){ // shouldbe combobox and not select label

    const { activeOption, isListboxExpanded, labelledBy, setListboxAsExpanded } = useContext(SelectContext)

    return(
        <span onBlur={() => {if(setListboxAsExpanded) setListboxAsExpanded(false)}} 
        onClick={() => {if(setListboxAsExpanded) setListboxAsExpanded(!isListboxExpanded)}} 
        tabIndex={0} aria-controls="customListbox" id="customSelectLabel" role="combobox" 
        aria-haspopup="listbox" aria-activedescendant={activeOption?.value} aria-labelledby={labelledBy}
        aria-expanded={isListboxExpanded} className={isListboxExpanded ? "customSelectLabel customSelectLabel-active" : "customSelectLabel"}
        >
            {activeOption?.label}
            <img className={isListboxExpanded ? "customSelectOpen" : "customSelectArrow"} src="./icons/select-arrow.svg"/>
        </span>
    )
}

export default SelectComboBox