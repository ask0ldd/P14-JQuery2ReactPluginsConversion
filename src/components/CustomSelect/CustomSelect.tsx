import '../../style/select/CustomSelect.css'
import SelectLabel from "./SelectLabel"
import OptionsList from "./OptionsList"
import {createContext, useState} from 'react'

function CustomSelect({options, selectId} : IProps){ /* select id to integrated to various keys identifiers */

    const [activeOption, setActiveOption] = useState(options[0])
    
    return(
        <div className="selectContainer">
            <SelectContext.Provider value={{selectId, options, activeOption, setActiveOption}}>
                <SelectLabel/>
                <OptionsList/>
            </SelectContext.Provider>
        </div>
    )
}

export default CustomSelect

export const SelectContext = createContext<ISelectContext>({selectId : '', options : []})

interface IOption{
    label : string
    value : string
}

interface IProps{
    options : Array<IOption>
    selectId : string
}

interface ISelectContext{
    selectId : string
    options : Array<IOption>
    activeOption? : IOption
    setActiveOption?(option : IOption) : void
}

/*

optionsList
defaultOption

*/