import '../../style/select/OptionsList.css'
import {useContext} from 'react'
import { SelectContext } from './CustomSelect'
import Option from './Option'

function OptionsList(){

    const {selectId, options, activeOption, optionsListVisibility, setActiveOption, setOptionsListVisibility} = useContext(SelectContext)

    /* li key should have a specific string added => the name of the component, pass as props at select creation then add in each key of each subcompo */

    console.log(optionsListVisibility)
    console.log(activeOption)

    return(
        optionsListVisibility ? <ul tabIndex={-1} id="customListbox" aria-labelledby="customSelectLabel" className="customSelectOptionsContainer" role="listbox">
            {options.map((option, index) => <Option index={index} option={option}/>)}
        </ul> : <></>
    )
}

export default OptionsList