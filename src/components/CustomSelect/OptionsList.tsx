import '../../style/select/OptionsList.css'
import {useContext} from 'react'
import { SelectContext } from './CustomSelect'

function OptionsList(){

    const {selectId, options, activeOption} = useContext(SelectContext)

    /* li key should have a specific string added => the name of the component, pass as props at select creation then add in each key of each subcompo */

    return(
        <ul tabIndex={-1} id="customListbox" aria-labelledby="customSelectLabel" className="customSelectOptionsContainer" role="listbox">
            {options.map((option, index) => <li key={selectId+'-option-'+index} value={option.value}>{option.label}</li>)}
        </ul>
    )
}

export default OptionsList