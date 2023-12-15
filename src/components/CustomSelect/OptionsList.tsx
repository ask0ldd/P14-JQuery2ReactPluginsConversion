import './style/OptionsList.css'
import { useContext } from 'react'
import Option from './Option'
import { SelectContext } from './contexts/SelectContext'

/**
 * Component : The list of options displayed into the custom select.
 * @Component
 * @return ( <OptionsList/> )
 */
function OptionsList(){

    const { selectId, options, listbox } = useContext(SelectContext)

    return(
        listbox.isExpanded ? 
        <ul onClick={(e) => {e.preventDefault(); console.log('listbox');}} tabIndex={-1} id="customListbox" aria-labelledby="customSelectLabel" className="customSelectOptionsContainer" role="listbox">
            {options.map((option, index) => <Option key={selectId+'-option-'+index} index={index} option={option}/>)}
        </ul> 
        : <></>
    )
}

export default OptionsList