import '../../style/select/OptionsList.css'
import { useContext } from 'react'
import { SelectContext } from './CustomSelect'
import Option from './Option'

function OptionsList(){

    const { selectId, options, isListboxExpanded } = useContext(SelectContext)

    /* li key should have a specific string added => the name of the component, pass as props at select creation then add in each key of each subcompo */

    return(
        isListboxExpanded ? 
        <ul tabIndex={-1} id="customListbox" aria-labelledby="customSelectLabel" className="customSelectOptionsContainer" role="listbox">
            {options.map((option, index) => <Option key={selectId+'-option-'+index} index={index} option={option}/>)}
        </ul> 
        : <></>
    )
}

export default OptionsList