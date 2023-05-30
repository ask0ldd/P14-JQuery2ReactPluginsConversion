/* eslint-disable react-hooks/exhaustive-deps */
import '../../style/select/CustomSelect.css'
import SelectLabel from "./SelectLabel"
import OptionsList from "./OptionsList"
import {createContext, useState, useEffect, useRef} from 'react'

/* selectId added at the head of each react key of the component / subcomponents to enforce their unicity */
function CustomSelect({options, selectId} : IProps){

    // can't access updated state in event listener so we need to always have an updated state duplicate into a ref
    const [activeOption, _setActiveOption] = useState({...options[0]})
    const activeOptionRef = useRef(activeOption)
    function setActiveOption(option : IOption){
        _setActiveOption({...option})
        activeOptionRef.current = {...option}
    }

    const [optionsListVisibility, _setOptionsListVisibility] = useState(false)
    const optionsListVisibilityRef = useRef(optionsListVisibility)
    function setOptionsListVisibility(bool : boolean){
        _setOptionsListVisibility(bool)
        optionsListVisibilityRef.current = bool
    }

    useEffect(() => {
  
        function keyboardListener(e : KeyboardEvent){
            //if(document.activeElement?.id === 'customSelectLabel'){
                if(e.code == "Enter" || e.code == "NumpadEnter") {openSelectOptions(e)}
                if(e.code == "ArrowUp") {prevOption(e)}
                if(e.code == "ArrowDown") {nextOption(e)}
                if(e.code == "Escape") {closeSelectOptions(e)}
            //}
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active cause useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
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
    

    function prevOption(e : KeyboardEvent){
        e.preventDefault()
        const prevOptionIndex = getActiveOptionIndex(activeOption)
        if(prevOptionIndex < 0) return false
        setActiveOption(options[prevOptionIndex-1])
        return
    }

    function nextOption(e : KeyboardEvent){
        e.preventDefault()
        const nextOptionIndex = getActiveOptionIndex(activeOption)
        if(nextOptionIndex > options.length-1) return false
        setActiveOption(options[nextOptionIndex+1])
        return
    }
  
    function getActiveOptionIndex(activeOption : IOption) : number{
        let activeIndex = 0
        for(let index = 0; index < options.length; index++){
            if(activeOptionRef.current.value === options[index].value) {
                activeIndex = index
                return activeIndex
            }
        }
        return activeIndex
    }

    function closeSelectOptions(e : KeyboardEvent){
        e.preventDefault()
        // this test is buggy, why? https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
        if(optionsListVisibilityRef.current === true ) setOptionsListVisibility(false)
        return console.log(optionsListVisibilityRef.current)
    }

    function openSelectOptions(e : KeyboardEvent){
        e.preventDefault()
        setOptionsListVisibility(true)
        return console.log(optionsListVisibilityRef.current)
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