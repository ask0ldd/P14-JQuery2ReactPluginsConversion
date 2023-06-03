import './style/OptionsList.css'
import { useContext } from 'react'
import { SelectContext } from './CustomSelect'
import Option from './Option'

function OptionsList(){

    const { selectId, options, isListboxExpanded } = useContext(SelectContext)

    return(
        isListboxExpanded ? 
        <ul onClick={(e) => {e.preventDefault(); console.log('listbox');}} tabIndex={-1} id="customListbox" aria-labelledby="customSelectLabel" className="customSelectOptionsContainer" role="listbox">
            {options.map((option, index) => <Option key={selectId+'-option-'+index} index={index} option={option}/>)}
        </ul> 
        : <></>
    )
}

export default OptionsList