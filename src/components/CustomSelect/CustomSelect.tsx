import SelectLabel from "./SelectLabel"
import OptionsList from "./OptionsList"
import {createContext, useState} from 'react'

function CustomSelect({options} : IProps){

    const [activeOption, setActiveOption] = useState(options[0].id)
    
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
    id : string
    label : string
    value : string
}

interface IProps{
    options : Array<IOption>
}

interface ISelectContext{
    options: Array<IOption>
    activeOption? : string
    setActiveOption?(option : string) : void
}

/*

optionsList
defaultOption

*/