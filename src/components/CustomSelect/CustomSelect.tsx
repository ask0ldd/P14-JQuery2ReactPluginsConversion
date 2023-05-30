import '../../style/select/CustomSelect.css'
import SelectLabel from "./SelectLabel"
import OptionsList from "./OptionsList"
import {createContext, useState, useEffect} from 'react'

window.addEventListener('keydown', e => keyboardListener(e))

// will be linked to optionsListVisibility to access this state out of the component
let getListVisibility : () => boolean

/* selectId added at the head of each react key of the component / subcomponents to enforce their unicity */
function CustomSelect({options, selectId} : IProps){

    const [activeOption, setActiveOption] = useState(options[0])
    const [optionsListVisibility, setOptionsListVisibility] = useState(false)

    getListVisibility = () => optionsListVisibility
    
    return(
        <div className="selectContainer">
            <SelectContext.Provider value={{selectId, options, activeOption, optionsListVisibility, setActiveOption, setOptionsListVisibility}}>
                <SelectLabel/>
                <OptionsList/>
            </SelectContext.Provider>
        </div>
    )
}

export default CustomSelect

export const SelectContext = createContext<ISelectContext>({
    selectId : '', 
    options : [], 
    optionsListVisibility : false, 
    setActiveOption : () => false, 
    setOptionsListVisibility : () => false
})

export interface IOption{
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
    optionsListVisibility : boolean
    setActiveOption : (option : IOption) => void
    setOptionsListVisibility : (bool : boolean) => void
}

function keyboardListener(e : KeyboardEvent){
    /*if(document.activeElement !== document.querySelector('custom-select')) return false
    if(e.code == "Enter" || e.code == "NumpadEnter") return this.#optionsListOpenClose()
    if(this.#isOptionsListOpen === true){
        // e.preventdefault to avoid screen scrolling when using the arrow keys to select an option
        if(e.code == "ArrowUp") 
            { e.preventDefault(); return this.#previousOption() } 
        if(e.code == "ArrowDown") 
            { e.preventDefault(); return this.#nextOption() }
        // if the list is open, any key pressed besides arrowup and arrowdown should close it
        return this.#closeList()
    }*/

    // if(optionsListVisibility)
    if(getListVisibility()){
        if(e.code == "ArrowUp") {e.preventDefault(); console.log('test')}
        if(e.code == "ArrowDown") {e.preventDefault();}
    }
}

/*

should add later a way to define the default Option

*/