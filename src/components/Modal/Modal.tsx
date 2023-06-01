import ModalHeader from "./ModalHeader"
import { useRef, useEffect, useState, MutableRefObject } from "react"
import './style/Modal.css'

function Modal({visible, modalContent} : IProps){

    // const modalRef = useRef<HTMLDialogElement>(null)
    const [modalOpen, setModalOpen] = useState<boolean>(visible)

    /*useEffect(() => {
        if(showmodal && !modalRef.current?.open) return openModal()
        if(!showmodal && modalRef.current?.open) return closeModal()
    })*/

    return (
        modalOpen ? 
        <dialog>
            <ModalHeader setModalOpen={setModalOpen}/>
            {modalContent()}
        </dialog> 
        : <></>
    )
}

export default Modal

interface IProps{
    visible : boolean
    modalContent : () => JSX.Element
}