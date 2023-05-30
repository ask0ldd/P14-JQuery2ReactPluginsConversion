/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, MutableRefObject } from 'react'
import { IOption } from '../CustomSelect'

export function useSelectKeyboardListener(
    options : Array<IOption>, 
    activeOptionRef : MutableRefObject<IOption>, 
    optionsListVisibilityRef : MutableRefObject<boolean>, 
    setActiveOption : (option : IOption) => void,
    setOptionsListVisibility : (bool : boolean) => void
){

    useEffect(() => {
  
        function keyboardListener(e : KeyboardEvent){
            // if optionslist visible, always close when esc
            if(e.code == "Escape" && isOptionsListVisible()) {closeSelectOptions(e)}
            // only when the select is in focus
            if(document.activeElement?.id === 'customSelectLabel'){
                if(e.code == "Enter" || e.code == "NumpadEnter") {
                    !isOptionsListVisible() ? openSelectOptions(e) : closeSelectOptions(e)
                }
                if(e.code == "ArrowUp") {prevOption(e)}
                if(e.code == "ArrowDown") {nextOption(e)}
            }
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active cause useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }

    }, [])

    function prevOption(e : KeyboardEvent){
        e.preventDefault()
        const prevOptionIndex = getActiveOptionIndex(activeOptionRef)
        if(prevOptionIndex < 1) return false
        setActiveOption(options[prevOptionIndex-1])
    }

    function nextOption(e : KeyboardEvent){
        e.preventDefault()
        const nextOptionIndex = getActiveOptionIndex(activeOptionRef)
        if(nextOptionIndex >= options.length-1) return false
        setActiveOption(options[nextOptionIndex+1])
    }
  
    function getActiveOptionIndex(activeOption : MutableRefObject<IOption>) : number{
        let activeIndex = 0
        for(let index = 0; index < options.length; index++){
            if(activeOption.current.value === options[index].value) {
                activeIndex = index
                return activeIndex
            }
        }
        return activeIndex
    }

    function closeSelectOptions(e : KeyboardEvent){
        e.preventDefault()
        if(optionsListVisibilityRef.current === true ) setOptionsListVisibility(false)
        return console.log(optionsListVisibilityRef.current)
    }

    function openSelectOptions(e : KeyboardEvent){
        e.preventDefault()
        setOptionsListVisibility(true)
        return console.log(optionsListVisibilityRef.current)
    }

    function isOptionsListVisible(){
        return optionsListVisibilityRef.current === true
    }

}