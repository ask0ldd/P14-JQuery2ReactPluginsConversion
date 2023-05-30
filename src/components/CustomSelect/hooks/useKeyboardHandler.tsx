/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, MutableRefObject } from 'react'
import { IOption } from '../CustomSelect'

export function useKeyboardHandler(
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
                if(e.code == "Space") {
                    !isOptionsListVisible() ? openSelectOptions(e) : closeSelectOptions(e)
                }
                if(e.code == "ArrowUp") {
                    if(!isOptionsListVisible()) setOptionsListVisibility(true)
                    setPrevOptionActive(e)
                }
                if(e.code == "ArrowDown") {
                    if(!isOptionsListVisible()) setOptionsListVisibility(true)
                    setNextOptionActive(e)
                }
                if(e.code == "Home") {
                    if(!isOptionsListVisible()) setOptionsListVisibility(true)
                    setFirstOptionActive(e)
                }
                if(e.code == "End") {
                    if(!isOptionsListVisible()) setOptionsListVisibility(true)
                    setLastOptionActive(e)
                }
                if(e.code == "PageUp" && isOptionsListVisible()) {
                    setMinusTenOptionActive(e)
                }
                if(e.code == "PageDown" && isOptionsListVisible()) {
                    setPlusTenOptionActive(e)
                }
            }
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active cause useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }

    }, [])

    function setFirstOptionActive(e : KeyboardEvent){
        e.preventDefault()
        setActiveOption(options[0])
    }

    function setLastOptionActive(e : KeyboardEvent){
        e.preventDefault()
        setActiveOption(options[options.length-1])
    }

    function setMinusTenOptionActive(e : KeyboardEvent){
        e.preventDefault()
        const activeOptionIndex = getActiveOptionIndex(activeOptionRef)
        options[activeOptionIndex - 10] != null ? setActiveOption(options[activeOptionIndex - 10]) : setFirstOptionActive(e)
    }

    function setPlusTenOptionActive(e : KeyboardEvent){
        e.preventDefault()
        const activeOptionIndex = getActiveOptionIndex(activeOptionRef)
        options[activeOptionIndex + 10] != null ? setActiveOption(options[activeOptionIndex + 10]) : setLastOptionActive(e)
    }

    function setPrevOptionActive(e : KeyboardEvent){
        e.preventDefault()
        const prevOptionIndex = getActiveOptionIndex(activeOptionRef)-1
        if(prevOptionIndex < 0) return false
        setActiveOption(options[prevOptionIndex])
    }

    function setNextOptionActive(e : KeyboardEvent){
        e.preventDefault()
        const nextOptionIndex = getActiveOptionIndex(activeOptionRef)+1
        if(nextOptionIndex > options.length-1) return false
        setActiveOption(options[nextOptionIndex])
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