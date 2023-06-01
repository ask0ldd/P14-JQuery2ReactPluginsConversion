import ModalHeader from "./ModalHeader"
import { useRef, useEffect, useState, MutableRefObject } from "react"
import './style/Modal.css'

function Modal({modalVisibility, setModalVisibility, modalContent} : IProps){

    const dialogRef = useRef<HTMLDialogElement>(null)
    const modalVisibilityRef = useRef(modalVisibility)
    // const [modalOpen, setModalOpen] = useState<boolean>(visible)

    useEffect(() => {
        if(modalVisibilityRef && !dialogRef.current?.open) return dialogRef.current?.showModal()
        if(!modalVisibilityRef && dialogRef.current?.open) return dialogRef.current?.close()
    })

    /*if(modalVisibilityRef && !dialogRef.current?.open) return dialogRef.current?.showModal()
    if(!modalVisibilityRef && dialogRef.current?.open) return dialogRef.current?.close()*/

    return (
        modalVisibility ? 
        <dialog ref={dialogRef}>
            <ModalHeader setModalVisibility={setModalVisibility}/>
            {modalContent()}
        </dialog> 
        : <></>
    )
}

export default Modal

interface IProps{
    modalVisibility : boolean
    modalContent : () => JSX.Element
    setModalVisibility : (bool : boolean) => void
}