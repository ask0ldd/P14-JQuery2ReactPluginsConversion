// import ModalHeader from "./ModalHeader"
import { useRef, useEffect, /*useState, MutableRefObject*/} from "react"
import './style/Modal.css'

function Modal({modalVisibility, setModalVisibility, modalContent, headerComponent} : IProps){

    const dialogRef = useRef<HTMLDialogElement>(null)
    const modalVisibilityRef = useRef(modalVisibility)

    useEffect(() => {
        if(modalVisibilityRef && !dialogRef.current?.open) return dialogRef.current?.showModal()
        if(!modalVisibilityRef && dialogRef.current?.open) return dialogRef.current?.close()
    })

    /*const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    console.log(tomorrow)*/

    return (
        modalVisibility ? 
        <dialog ref={dialogRef} onClick={(e) => {
            // closing the modal only if clicking on the backdrop / not on the content itself
            if (e.target === dialogRef.current) setModalVisibility(false)
            }}>
            {headerComponent}
            {modalContent}
        </dialog> 
        : <></>
    )
}

export default Modal

interface IProps{
    modalVisibility : boolean
    modalContent : /*() => */JSX.Element
    headerComponent : /*() => */JSX.Element
    setModalVisibility : (bool : boolean) => void
    onValueChange : (datakey : string, value : string) => void
}