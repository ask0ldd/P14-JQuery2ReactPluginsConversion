/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ReactNode, ReactElement, JSXElementConstructor, ReactFragment } from "react"
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
export function useModalManager({initialVisibility, content} : IModalObject){ 

    const [modalVisibility, setModalVisibility] = useState<boolean>(initialVisibility || false)
    const [modalBodyComponent, setModalBodyComponent] = useState<ReactFunctionalComponent>(null)
    const [modalHeaderComponent, setModalHeaderComponent] = useState<ReactFunctionalComponent>(null) /* set default modal header with props passed */

    useEffect(() => {

        if(content?.header) modalManager.setHeaderComponent(content.header)
        if(content?.body) modalManager.setBodyComponent(content.body)
  
        function keyboardListener(e : KeyboardEvent){
            if(e.code == "Escape") {e.preventDefault(); modalManager.setVisibility(false);}
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active => since useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }

    }, [])

    const modalManager : IModalManager = {
        presets : [],
        initialized : true,
        setVisibility : (bool : boolean) => {
            setModalVisibility(bool); 
            scrollLock(bool);
        },
        getVisibility : () => modalVisibility,
        setBodyComponent : function (component)
        {
            setModalBodyComponent(component({setVisibility : modalManager.setVisibility}))
        },
        getBodyComponent : () => modalBodyComponent,
        setHeaderComponent : function (component) {
            setModalHeaderComponent(component({setVisibility : modalManager.setVisibility}))
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
    content? : IModalContent
}

interface IModalContent{
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