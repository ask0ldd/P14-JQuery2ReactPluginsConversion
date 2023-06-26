// import ModalHeader from "./ModalHeader"
import { useRef, useEffect, /*useState, MutableRefObject*/} from "react"
import './style/Modal.css'

/**
 * Component : Grouping all the constitutive elements of a datatable.
 * @Component
 * @param {Object[]} props - Props.
 * @param {boolean} props.modalVisibility - Visibility of the modal.
 * @param {function} props.setModalVisibility - Sets the visibility of the modal.
 * @param {JSX.element} props.headerComponent - Component used as a modals header.
 * @return ( <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalContent={modalContent} headerComponent={headerComponent}/> )
 */
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

    // !! add customizable css
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
}