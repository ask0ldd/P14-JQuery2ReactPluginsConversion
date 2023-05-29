import SelectLabel from "./SelectLabel"
import OptionsList from "./OptionsList"
import {createContext, useState} from 'react'

function CustomSelect({options} : IProps){

    const [activeOption, setActiveOption] = useState(options[0].id)
    
    return(
        <div className="selectContainer">
            <SelectContext.Provider value={{options : options, activeOption}}>
                <SelectLabel/>
                <OptionsList/>
            </SelectContext.Provider>
        </div>
    )
}

export default CustomSelect

export const SelectContext = createContext({options : []})

interface IOption{
    id : string
    label : string
    value : string
}

interface IProps{
    options : Array<IOption>
}

/*

optionsList
defaultOption

*/