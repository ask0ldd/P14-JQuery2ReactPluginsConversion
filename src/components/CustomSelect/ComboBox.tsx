import {useContext} from 'react'
import { SelectContext } from './CustomSelect'
import './style/ComboBox.css'

/**
 * Component : The field containing the active option of the custom select.
 * @Component
 * @return ( <SelectComboBox/> )
 */
function SelectComboBox(){

    const { selectId, activeOption, label, listbox } = useContext(SelectContext)
    const labelId = label?.id ? label.id : selectId + '-label'

    return(
        <span onBlur={() => {listbox.setAsExpanded(false)}} 
        onMouseDown={() => {listbox.setAsExpanded(!listbox.isExpanded)}} 
        tabIndex={0} aria-controls="customListbox" id={selectId + "SelectLabel"} role="combobox" 
        aria-haspopup="listbox" aria-activedescendant={activeOption.value} aria-labelledby={labelId}
        aria-expanded={listbox.isExpanded} className={listbox.isExpanded ? "customSelectLabel customSelectLabel-active" : "customSelectLabel"}
        >
            {activeOption?.label}
            <img alt="dropdown arrow" className={listbox.isExpanded ? "customSelectOpen" : "customSelectArrow"} src="./icons/select-arrow.svg"/>
        </span>
    )
}

export default SelectComboBox