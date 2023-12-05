/* eslint-disable react-hooks/exhaustive-deps */
// import ModalHeader from "./ModalHeader"
import { useRef, useEffect } from "react"
import './style/Modal.css'
import { PropsWithChildren } from 'react'
import { IModalManager } from "./hooks/useModalManager"

/**
 * Component : Customizable Modal.
 * @Component
 * @param {Object[]} props - Props.
 * @param {boolean} props.modalVisibility - Visibility of the modal.
 * @param {function} props.setModalVisibility - Sets the visibility of the modal.
 * @param {JSX.element} props.headerComponent - Component used as a modals header.
 * @return ( <Modal modalManager={modalManager}}/> )
 */
function Modal({modalManager, /*visibility, */containerCSSClass, children} : PropsWithChildren<IProps>){

    const dialogRef = useRef<HTMLDialogElement>(null)
    // const modalVisibilityRef = useRef(modalManager.getVisibility)

    useEffect(() => {
        console.log(modalManager.getVisibility())
        if(modalManager.getVisibility() && !dialogRef.current?.open) return dialogRef.current?.showModal()
        if(!modalManager.getVisibility() && dialogRef.current?.open) return dialogRef.current?.close()
    })

    // !! add customizable css
    // padding, border, display, direction, align items, justify items, margins, background, backdrop
    return (
        modalManager.getVisibility() ? 
        <dialog className={containerCSSClass ? containerCSSClass : 'defaultModalStyle'} ref={dialogRef} onKeyDown={(e) => e.preventDefault()} onClick={(e) => {
            // closing the modal only if clicking on the backdrop (dialogRef.current) / not on the content itself
            if (e.target === dialogRef.current) modalManager.setVisibility(false)
            }}>
            {children}
        </dialog> 
        : <></>
    )
}

export default Modal

interface IProps{
    modalManager : IModalManager
    visibility? : boolean
    containerCSSClass? : string
}