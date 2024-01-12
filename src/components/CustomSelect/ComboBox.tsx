import {useContext} from 'react'
import './style/ComboBox.css'
import { SelectContext } from './contexts/SelectContext'

/**
 * Component : The field containing the active option of the custom select.
 * @Component
 * @return ( <SelectComboBox/> )
 */
function SelectComboBox(){

    const { selectId, activeOption, label, listbox } = useContext(SelectContext)
    const labelId = label?.id ? label.id : selectId + '-label'

    return(
        <span style={{height:'42px'}} onBlur={() => {listbox.setAsExpanded(false)}} 
        onMouseDown={() => {listbox.setAsExpanded(!listbox.isExpanded)}} 
        tabIndex={0} aria-controls="customListbox" id={selectId + "SelectLabel"} role="combobox" 
        aria-haspopup="listbox" aria-activedescendant={activeOption.get().value} aria-labelledby={labelId}
        aria-expanded={listbox.isExpanded} className={listbox.isExpanded ? "customSelectLabel customSelectLabel-active" : "customSelectLabel"}
        >
            {activeOption.get().label}
            <img width="16" height="11" alt="dropdown arrow" className={listbox.isExpanded ? "customSelectOpen" : "customSelectArrow"} src="./icons/select-arrow.svg"/>
        </span>
    )
}

export default SelectComboBox