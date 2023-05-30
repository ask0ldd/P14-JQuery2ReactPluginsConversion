import '../../style/select/OptionsList.css'
import { useContext } from 'react'
import { SelectContext } from './CustomSelect'
import { IOption } from './CustomSelect'

function Option({index, option} : IProps){

    const { options, activeOption, setActiveOption, setOptionsListVisibility } = useContext(SelectContext)

    function isOptionActive(option : IOption)
    {
        return activeOption?.value === option?.value
    }

    return (
        <li role="option" id={option.value} data-value={option.value} aria-selected={isOptionActive(options[index])} style={isOptionActive(options[index]) ? {background:'#dddddd'} : {}} onClick={() => {setActiveOption(options[index]); setOptionsListVisibility(false);}} value={option.value}>{option.label}</li>
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