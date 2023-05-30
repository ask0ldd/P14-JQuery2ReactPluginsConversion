import '../../style/select/CustomSelect.css'
import SelectLabel from "./SelectLabel"
import OptionsList from "./OptionsList"
import {createContext, useState, useEffect} from 'react'

// window.addEventListener('keydown', e => keyboardListener(e))

// soutenance : will be linked to optionsListVisibility to access this state out of the component
// let getListVisibility : () => boolean

/* selectId added at the head of each react key of the component / subcomponents to enforce their unicity */
function CustomSelect({options, selectId} : IProps){

    const [activeOption, setActiveOption] = useState(options[0])
    const [optionsListVisibility, setOptionsListVisibility] = useState(false)
    const [activeKeyboardListener, setActiveKeyboardListener] = useState(false)

    //getListVisibility = () => optionsListVisibility

    // why two listeners added to window
    if(activeKeyboardListener !== true) {
        setActiveKeyboardListener(true)
        window.addEventListener('keydown', e => keyboardListener(e))
    }

    /*useEffect(() => {
        if(activeKeyboardListener !== true) {
            setActiveKeyboardListener(true)
            window.addEventListener('keydown', e => keyboardListener(e))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])*/
   
    return(
        <div className="selectContainer">
            <SelectContext.Provider value={{selectId, options, activeOption, optionsListVisibility, setActiveOption, setOptionsListVisibility}}>
                <SelectLabel/>
                <OptionsList/>
            </SelectContext.Provider>
        </div>
    )

    function keyboardListener(e : KeyboardEvent){
        console.log('keyboard')

        if(e.code == "Enter" || e.code == "NumpadEnter") {e.preventDefault(); setOptionsListVisibility(true);}
    
        //if(optionsListVisibility === true){
            if(e.code == "ArrowUp") {e.preventDefault();}
            if(e.code == "ArrowDown") {e.preventDefault(); setOptionsListVisibility(false);}
            if(e.code == "Escape") {e.preventDefault(); setOptionsListVisibility(false);}
        // }
    }
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



/*

should add later a way to define the default Option

*/