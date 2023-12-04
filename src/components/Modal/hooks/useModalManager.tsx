/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ReactNode } from "react"
import ModalHeader from "../ModalHeader"

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
function useModalManager({initialVisibility, content} : IModalObject){
    // initial visibility / initial content

    const [modalVisibility, setModalVisibility] = useState<boolean>(initialVisibility)
    const [modalContent, setModalContent] = useState<ReactNode>(content)
    const [headerComponent, setHeaderComponent] = useState<ReactNode>(ModalHeader({openModal})) /* set default modal header with props passed */

    // !!!! ADD SCREENLOCK
    useEffect(() => {

        scrollLock(true);
  
        function keyboardListener(e : KeyboardEvent){
            if(e.code == "Escape" && modalVisibility) {e.preventDefault(); openModal(false);}
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active => since useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }

    }, [])

    function openModal(bool : boolean){
        setModalVisibility(bool); 
        scrollLock(bool);
    }

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

    return {modalVisibility, modalContent, headerComponent, /*setModalVisibility, */ setModalContent, setHeaderComponent, openModal}
}

export default useModalManager

interface IModalObject{
    initialVisibility : boolean
    content : () => JSX.Element
}