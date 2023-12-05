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
    const [modalBodyComponent, setModalBodyComponent] = useState<ReactFunctionalComponent>(content?.body || null)
    const [modalHeaderComponent, setModalHeaderComponent] = useState<ReactFunctionalComponent>(content?.header || null) /* set default modal header with props passed */

    useEffect(() => {
  
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
        setVisibility : (bool : boolean) => {
            setModalVisibility(bool); 
            scrollLock(bool);
        },

        getVisibility : () => modalVisibility,

        setBodyComponent : (component) => 
        {
            setModalBodyComponent(component({setVisibility : modalManager.setVisibility}));
            // return modalHeaderComponent;
        },

        getBodyComponent : () => modalBodyComponent,

        setHeaderComponent : (component) => {
            setModalHeaderComponent(component({setVisibility : modalManager.setVisibility}));
            // return modalBodyComponent;
        },

        getHeaderComponent : () => modalHeaderComponent,

        // visibility : modalVisibility
    }

    return { modalManager }

    /*function openModal(bool : boolean){
        setModalVisibility(bool); 
        scrollLock(bool);
    }*/

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

// export default useModalManager

interface IModalObject{
    initialVisibility? : boolean
    content? : IModalContent
}

interface IModalContent{
    body? : ReactNode
    header? : ReactNode | null
}

export interface IModalManager{
    setVisibility : (bool : boolean) => void
    getVisibility : () => boolean
    setBodyComponent : (component : ({setVisibility} : IPropsVisibility) => JSX.Element) => void
    getBodyComponent : () => ReactNode
    setHeaderComponent : (component : ({setVisibility} : IPropsVisibility) => JSX.Element) => void
    getHeaderComponent : () => ReactNode
    visibility? : boolean
}

type ReactFunctionalComponent = string | number | true | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null