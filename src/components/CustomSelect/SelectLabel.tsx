/* eslint-disable @typescript-eslint/no-unused-vars */
import {useContext} from 'react'
import { SelectContext } from './CustomSelect'
import '../../style/select/SelectLabel.css'

function SelectLabel(){

    const {activeOption} = useContext(SelectContext)

    // update active descendant
    return(
        <span tabIndex={0} aria-controls="customListbox" id="customSelectLabel" role="combobox" 
        aria-haspopup="listbox" aria-activedescendant={activeOption?.value} 
        aria-expanded="false" className="customSelectLabel">
            {activeOption?.label}
            <img className="customSelectArrow" src="./icons/select-arrow.svg"/>
        </span>
    )
}

export default SelectLabel