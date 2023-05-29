/* eslint-disable @typescript-eslint/no-unused-vars */
import {useContext} from 'react'
import { SelectContext } from './CustomSelect'
import '../../style/select/SelectLabel.css'

function SelectLabel(){

    const {options, activeOption} = useContext(SelectContext)

    // update active descendant
    return(
        <span tabIndex={0} aria-controls="customListbox" id="customSelectLabel" role="combobox" 
        aria-haspopup="listbox" aria-activedescendant="${selectedOptionId[0].value}" 
        aria-expanded="false" className="customSelectLabel">
            {activeOption?.label}
            <img className="customSelectArrow" src="../../assets/icons/select-arrow.svg"/>
        </span>
    )
}

export default SelectLabel