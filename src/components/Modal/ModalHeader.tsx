import './style/ModalHeader.css'

/**
 * Component : Modals Header.
 * @Component
 * @param {Object[]} props - Props.
 * @param {bool} props.setModalVisibility - Function to set the display state of the modal.
 * @return ( <ModalHeader setModalVisibility={setModalVisibility}/> )
 */
function ModalHeader({openModal} : IPropsModalHeader){

    return (
        <div className='header-container'>
            <button className='close-btn' onClick={() => openModal(false)} id="close" aria-label="close">X</button>        
        </div>
    )
}

export default ModalHeader

export interface IPropsModalHeader{
    openModal : (bool : boolean) => void
}