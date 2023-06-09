/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import ModalHeader from "../ModalHeader"

/**
 * Function : Modal management tool.
 * @param {IModalObject} PassedObject
 * @param {boolean} PassedObject.initialVisibility - Should the modal be visible at creation ?
 * @param {JSX.element} PassedObject.content - React component to inject into the modal.
 * @return {Object.< modalVisibility: boolean, modalContent: JSX.element, headerComponent: JSX.element, setModalVisibility: function, setModalContent: function, setHeaderComponent: function >}
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
    const [modalContent, setModalContent] = useState<JSX.Element>(content)
    const [headerComponent, setHeaderComponent] = useState<JSX.Element>(ModalHeader({setModalVisibility})) /* set default modal header with props passed */

    // !!!! ADD SCREENLOCK
    useEffect(() => {
  
        function keyboardListener(e : KeyboardEvent){
            if(e.code == "Escape" && modalVisibility) {e.preventDefault(); setModalVisibility(false)}
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active => since useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }

    }, [])

    return {modalVisibility, modalContent, headerComponent, setModalVisibility, setModalContent, setHeaderComponent}
}

export default useModalManager

interface IModalObject{
    initialVisibility : boolean
    content : () => JSX.Element
}