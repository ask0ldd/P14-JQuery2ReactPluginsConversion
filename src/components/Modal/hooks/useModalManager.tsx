/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ReactNode, ReactElement, JSXElementConstructor, ReactFragment, useReducer } from "react"
import { IPropsVisibility } from "../../../Form"

/**
 * Function : Modal management tool.
 * @param {IModalObject} PassedObject
 * @param {boolean} PassedObject.initialVisibility - Should the modal be visible at creation ?
 * @param {JSX.element} PassedObject.content - React component to inject into the modal.
 * @return {Object.< modalVisibility: boolean, modalContent: ReactNode, headerComponent: ReactNode, setModalVisibility: function, setModalContent: function, setHeaderComponent: function >}
 * modalVisibility - Visibility of the modal.
 * modalContent - Component used as the body of the modal.
 * headerComponent - Component used as a modals header.
 * setModalVisibility - Sets the visibility of the modal.
 * setModalContent - Sets a new react component as the body of the modal.
 * setHeaderComponent - Set a new react component as the header of the modal.
 */
export function useModalManager({initialVisibility, activeComponents} : IModalObject){ 

    const [modalVisibility, setModalVisibility] = useState<boolean>(initialVisibility || false)
    const [modalBodyComponent, setModalBodyComponent] = useState<ReactFunctionalComponent>(null)
    const [modalHeaderComponent, setModalHeaderComponent] = useState<ReactFunctionalComponent>(null) /* set default modal header with props passed */
    
    function modalManagerReducer(state : IModalManager, action : { type : string, payload : any}) {
        if (action.type === 'savePreset') {
            const preset = state.presets.find(preset => preset.presetName === action.payload?.preset.name)
            return {...state, 
              presets : preset ? [...state.presets] : [...state.presets].push(action.payload?.preset)
            }
        }
        if (action.type === 'setHeaderComponent') {
            setModalHeaderComponent(action.payload?.component({setVisibility : state.setVisibility}))
            return {...state}
        }
        if (action.type === 'setBodyComponent') {
            setModalBodyComponent(action.payload?.component({setVisibility : state.setVisibility}))
            return {...state}
        }
        if (action.type === 'setVisibility') {
            state.setVisibility(action.payload)
            scrollLock(action.payload)
            return {...state}
        }
        throw Error('Unknown action.');
    }

    const modalManagerInit : IModalManager = {
        presets : [],
        initialized : true,
        setVisibility : (bool : boolean) => {
            setModalVisibility(bool); 
            scrollLock(bool);
        },
        getVisibility : () => modalVisibility,
        setBodyComponent : function (component)
        {
            setModalBodyComponent(component({setVisibility : this.setVisibility}))
        },
        getBodyComponent : () => modalBodyComponent,
        setHeaderComponent : function (component) {
            setModalHeaderComponent(component({setVisibility : this.setVisibility}))
        },
        getHeaderComponent : () => modalHeaderComponent,
        saveModalPreset : function (presetName : string, header : ({ setVisibility }: IPropsVisibility) => JSX.Element, body : ({ setVisibility }: IPropsVisibility) => JSX.Element) {
            const preset = this.presets.find(preset => preset.presetName === presetName)
            if(preset) return
            this.presets.push({presetName : presetName, header, body})
            console.log(this.presets)
        },
        displayModalPreset : function (presetName : string) {
            console.log(this)
            const preset = this.presets.find(preset => preset.presetName === presetName)
            console.log(preset)
            if(!preset) return
            this.setHeaderComponent(preset.header)
            this.setBodyComponent(preset.body)
            this.setVisibility(true)
        },
        loadModalPreset : function (presetName : string) {
            const preset = this.presets.find(preset => preset.presetName === presetName)
            if(!preset) return
            this.setHeaderComponent(preset.header)
            this.setBodyComponent(preset.body)
        },
    }
    
    const [modalManager, modalManagerDispatch] = useReducer(modalManagerReducer, {...modalManagerInit})

    useEffect(() => {

        if(activeComponents?.header) modalManager.setHeaderComponent(activeComponents.header)
        if(activeComponents?.body) modalManager.setBodyComponent(activeComponents.body)
  
        function keyboardListener(e : KeyboardEvent){
            if(e.code == "Escape") {e.preventDefault(); modalManager.setVisibility(false);}
        }

        window.addEventListener('keydown', keyboardListener)

        

        // soutenance : clean up to avoid having two listeners active => since useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }

    }, [])

    return modalManager

    function scrollLock(state : boolean) : void {
        if(!state){
            window.onscroll = () => null
            return
        }
    
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        window.onscroll = () => {
            window.scrollTo(scrollLeft, scrollTop)
        }
    }   
}

interface IModalObject{
    initialVisibility? : boolean
    activeComponents? : IModalComponents
}

interface IModalComponents{
    body? : ({ setVisibility }: IPropsVisibility) => JSX.Element
    header? : ({ setVisibility }: IPropsVisibility) => JSX.Element
}

export interface IModalManager{
    presets : IModalPreset[]
    initialized : boolean
    setVisibility : (bool : boolean) => void
    getVisibility : () => boolean
    setBodyComponent : (component : ({setVisibility} : IPropsVisibility) => JSX.Element) => void
    getBodyComponent : () => ReactNode
    setHeaderComponent : (component : ({setVisibility} : IPropsVisibility) => JSX.Element) => void
    getHeaderComponent : () => ReactNode
    saveModalPreset : (modalName : string, header : ({ setVisibility }: IPropsVisibility) => JSX.Element, body : ({ setVisibility }: IPropsVisibility) => JSX.Element) => void
    displayModalPreset : (presetName : string) => void
    loadModalPreset : (presetName : string) => void
}

type ReactFunctionalComponent = string | number | true | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null

interface IModalPreset{
    presetName : string
    header : ({ setVisibility }: IPropsVisibility) => JSX.Element
    body : ({ setVisibility }: IPropsVisibility) => JSX.Element
}