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

    const [activeOption, setActiveOption] = useState({label : options[3].label , value : options[3].value})
    const [optionsListVisibility, setOptionsListVisibility] = useState(false)

    //getListVisibility = () => optionsListVisibility

    useEffect(() => console.log(optionsListVisibility), [optionsListVisibility])

    useEffect(() => {
  
        function closeSelectOptions(e : KeyboardEvent){
            e.preventDefault()
            // this test is buggy, why?
            /*if(optionsListVisibility === true )*/ setOptionsListVisibility(false)
            return console.log(optionsListVisibility)
        }

        function openSelectOptions(e : KeyboardEvent){
            e.preventDefault()
            setOptionsListVisibility(true)
            return console.log(optionsListVisibility)
        }

        function keyboardListener(e : KeyboardEvent){
            //if(document.activeElement?.id === 'customSelectLabel'){
                if(e.code == "Enter" || e.code == "NumpadEnter") {openSelectOptions(e)}
                /*if(e.code == "ArrowUp") {prevOption(e)}
                if(e.code == "ArrowDown") {nextOption(e)}*/
                if(e.code == "Escape") {closeSelectOptions(e)}
            //}
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active cause useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }

    }, [])

    /*function prevOption(e : KeyboardEvent){
        e.preventDefault()
        const prevOptionIndex = getActiveOptionIndex(activeOption)
        if(prevOptionIndex < 0) return false
        console.log('before', activeOption)
        setActiveOption(options[prevOptionIndex-1])
        console.log('after', activeOption)
        return
    }

    function nextOption(e : KeyboardEvent){
        e.preventDefault()
        const nextOptionIndex = getActiveOptionIndex(activeOption)
        if(nextOptionIndex > options.length-1) return false
        console.log('before', activeOption)
        setActiveOption(options[nextOptionIndex+1])
        console.log('after', activeOption)
        return
    }
        
    */
  
    /*function getActiveOptionIndex(activeOption : IOption) : number{
        let activeIndex = 0
        for(let index = 0; index < options.length; index++){
            if(activeOption.value === options[index].value) {
                activeIndex = index
                return activeIndex
            }
        }
        return activeIndex
    }*/
   
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



/*

should add later a way to define the default Option

*/