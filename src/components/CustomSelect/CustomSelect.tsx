/* eslint-disable react-hooks/exhaustive-deps */
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

    //getListVisibility = () => optionsListVisibility

    useEffect(() => {

        function keyboardListener(e : KeyboardEvent){
            console.log(document.activeElement?.id)
    
            if(document.activeElement?.id === 'customSelectLabel'){
                if(e.code == "Enter" || e.code == "NumpadEnter") {openSelectOptions(e);}
                if(e.code == "ArrowUp") {prevOption(e)}
                if(e.code == "ArrowDown") {nextOption(e)}
                if(e.code == "Escape") {closeSelectOptions(e);}
            }
        }

        window.addEventListener('keyup', keyboardListener)

        // soutenance : clean up to avoid having two listeners active cause useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keyup', keyboardListener)
        }

    }, [])
   
    return(
        <div className="selectContainer">
            <SelectContext.Provider value={{selectId, options, activeOption, optionsListVisibility, setActiveOption, setOptionsListVisibility}}>
                <SelectLabel/>
                <OptionsList/>
            </SelectContext.Provider>
        </div>
    )

    function openSelectOptions(e : KeyboardEvent){
        e.preventDefault(); setOptionsListVisibility(true);
    }

    function closeSelectOptions(e : KeyboardEvent){
        e.preventDefault(); if(optionsListVisibility) setOptionsListVisibility(false);
    }

    function prevOption(e : KeyboardEvent){
        e.preventDefault()
        const prevOptionIndex = getActiveOptionIndex(activeOption)-1
        if(prevOptionIndex < 0) return
        setActiveOption(options[prevOptionIndex])
    }

    function nextOption(e : KeyboardEvent){
        e.preventDefault()
        const nextOptionIndex = getActiveOptionIndex(activeOption)+1
        if(nextOptionIndex > options.length-1) return
        setActiveOption(options[nextOptionIndex])
    }

    function getActiveOptionIndex(activeOption : IOption) : number{
        let activeIndex = 0
        for(let index = 0; index < options.length; index++){
            if(activeOption.value == options[index].value) {
                console.log(activeOption.value)
                console.log(options[index].value)
                console.log(index)
                activeIndex = index
            }
        }
        return activeIndex
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