/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ReactNode } from "react"

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
    const [modalBodyComponent, setModalBodyComponent] = useState<ReactNode | null>(content?.body || null)
    const [modalHeaderComponent, setModalHeaderComponent] = useState<ReactNode | null>(content?.header || null) /* set default modal header with props passed */

    useEffect(() => {

        scrollLock(true);
  
        function keyboardListener(e : KeyboardEvent){
            if(e.code == "Escape" && modalVisibility) {e.preventDefault(); modalManager.setVisibility(false);}
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active => since useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }

    }, [])

    const modalManager = {
        setVisibility : (bool : boolean) => {
            setModalVisibility(bool); 
            scrollLock(bool);
        },

        getVisibility : () => modalVisibility,

        setBodyComponent : (component : ReactNode) => 
        {
            setModalBodyComponent(component)
        },

        getBodyComponent : () => modalBodyComponent,

        setHeaderComponent : (component : ReactNode) => {
            setModalHeaderComponent(component)
        },

        getHeaderComponent : () => modalHeaderComponent,
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
    setBodyComponent : (component : ReactNode) => void
    getBodyComponent : () => ReactNode
    setHeaderComponent : (component : ReactNode) => void
    getHeaderComponent : () => ReactNode
}