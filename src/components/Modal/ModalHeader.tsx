import './style/ModalHeader.css'

function ModalHeader({setModalOpen} : IProps){

    return (
        <div className='header-container'>
            <button onClick={() =>setModalOpen(false)} id="close" aria-label="close">X</button>        
        </div>
    )
}

export default ModalHeader

interface IProps{
    setModalOpen : (bool : boolean) => void
}