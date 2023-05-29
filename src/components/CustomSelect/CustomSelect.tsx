import SelectLabel from "./SelectLabel"
import OptionsList from "./OptionsList"
import {createContext, useState} from 'react'

function CustomSelect({options} : IProps){

    const [activeOption, setActiveOption] = useState(options[0])
    
    return(
        <div className="selectContainer">
            <SelectContext.Provider value={{options, activeOption, setActiveOption}}>
                <SelectLabel/>
                <OptionsList/>
            </SelectContext.Provider>
        </div>
    )
}

export default CustomSelect

export const SelectContext = createContext<ISelectContext>({options : []})

interface IOption{
    label : string
    value : string
}

interface IProps{
    options : Array<IOption>
}

interface ISelectContext{
    options: Array<IOption>
    activeOption? : IOption
    setActiveOption?(option : IOption) : void
}

/*

optionsList
defaultOption

*/