/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, MutableRefObject } from 'react'
import { IOption } from '../CustomSelect'

export function useKeyboardHandler(
    options : Array<IOption>, 
    activeOptionRef : MutableRefObject<IOption>, 
    isListboxExpandedRef : MutableRefObject<boolean>, 
    setActiveOption : (option : IOption) => void,
    setListboxAsExpanded : (bool : boolean) => void
){

    useEffect(() => {
  
        function keyboardListener(e : KeyboardEvent){

            // out of focus
            if(e.code == "Escape" && isListboxExpanded()) {closeSelectOptions(e)}

            // when in focus
            if(document.activeElement?.id === 'customSelectLabel'){
                if(e.code == "Enter" || e.code == "NumpadEnter") {
                    !isListboxExpanded() ? openSelectOptions(e) : closeSelectOptions(e)
                }
                if(e.code == "Space") {
                    !isListboxExpanded() ? openSelectOptions(e) : closeSelectOptions(e)
                }
                if(e.code == "ArrowUp") {
                    if(!isListboxExpanded()) setListboxAsExpanded(true)
                    setPrevOptionActive(e)
                }
                if(e.code == "ArrowDown") {
                    if(!isListboxExpanded()) setListboxAsExpanded(true)
                    setNextOptionActive(e)
                }
                if(e.code == "Home") {
                    if(!isListboxExpanded()) setListboxAsExpanded(true)
                    setFirstOptionActive(e)
                }
                if(e.code == "End") {
                    if(!isListboxExpanded()) setListboxAsExpanded(true)
                    setLastOptionActive(e)
                }
                if(e.code == "PageUp" && isListboxExpanded()) {
                    setMinusTenOptionActive(e)
                }
                if(e.code == "PageDown" && isListboxExpanded()) {
                    setPlusTenOptionActive(e)
                }
            }
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active => since useEffect is triggered twice in strict mode
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
        if(isListboxExpandedRef.current === true ) setListboxAsExpanded(false)
        // return console.log(isListboxExpandedRef.current)
    }

    function openSelectOptions(e : KeyboardEvent){
        e.preventDefault()
        setListboxAsExpanded(true)
        // return console.log(isListboxExpandedRef.current)
    }

    function isListboxExpanded(){
        return isListboxExpandedRef.current === true
    }

}