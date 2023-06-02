// import ModalHeader from "./ModalHeader"
import { useRef, useEffect, /*useState, MutableRefObject*/} from "react"
import './style/Modal.css'

function Modal({modalVisibility, setModalVisibility, modalContent, headerComponent} : IProps){

    const dialogRef = useRef<HTMLDialogElement>(null)
    const modalVisibilityRef = useRef(modalVisibility)
    // const [modalOpen, setModalOpen] = useState<boolean>(visible)

    useEffect(() => {
        if(modalVisibilityRef && !dialogRef.current?.open) return dialogRef.current?.showModal()
        if(!modalVisibilityRef && dialogRef.current?.open) return dialogRef.current?.close()
    })

    return (
        modalVisibility ? 
        <dialog ref={dialogRef} onClick={(e) => {
            // closing the modal only if clicking on the backdrop / not on the content itself
            if (e.target === dialogRef.current) setModalVisibility(false)
            }}>
            {/*<ModalHeader setModalVisibility={setModalVisibility}/>*/}
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