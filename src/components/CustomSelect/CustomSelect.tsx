import SelectLabel from "./SelectLabel"
import OptionsList from "./OptionsList"
import {createContext} from 'react'

function CustomSelect({options} : IProps){

    return(
        <div className="selectContainer">
            <SelectContext.Provider value={options}>
                <SelectLabel/>
                <OptionsList/>
            </SelectContext.Provider>
        </div>
    )
}

export default CustomSelect

export const SelectContext = createContext({})

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