import './style/OptionsList.css'
import { useContext } from 'react'
import { IOption } from './CustomSelect'
import { SelectContext } from './contexts/SelectContext'

/**
 * Component : Option populating the option list of a custom select.
 * @Component
 * @param {Object} props - Props.
 * @param {number} props.index - Index of the option.
 * @param {Object} props.option
 * @param {string} props.option.label - text displayed as an option.
 * @param {string} props.option.value - value sent on form submit when this option is selected.
 * @return ( <Option index={index} option={option}/> )
 */
function Option({index, option} : IProps){

    const { options, activeOption, listbox } = useContext(SelectContext)

    function isOptionActive(option : IOption)
    {
        return activeOption.get().value === option?.value
    }

    return (
        <li role="option" id={option.value} data-value={option.value} aria-selected={isOptionActive(options[index])} 
        style={isOptionActive(options[index]) ? {background:'#dfdfdf'} : {}} 
        onMouseDown={() => {activeOption.set(options[index]); listbox.setAsExpanded(false);}} value={option.value}>{option.label}</li>
    )
}

export default Option

interface IProps{
    index : number
    option : IOption
}

/*
<li onClick={() => {setActiveOption(options[index]); setOptionsListVisibility(false);}} key={selectId+'-option-'+index} value={option.value}>{option.label}</li>
*/