import ModalHeader from "./ModalHeader"
import { useRef, useEffect, useState, MutableRefObject } from "react"
import './style/Modal.css'

function Modal({modalVisibility, setModalVisibility, modalContent} : IProps){

    // const modalRef = useRef<HTMLDialogElement>(null)
    // const [modalOpen, setModalOpen] = useState<boolean>(visible)

    /*useEffect(() => {
        if(showmodal && !modalRef.current?.open) return openModal()
        if(!showmodal && modalRef.current?.open) return closeModal()
    })*/

    return (
        modalVisibility ? 
        <dialog>
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