import './style/ModalHeader.css'

function ModalHeader({setModalVisibility} : IProps){

    return (
        <div className='header-container'>
            <button className='close-btn' onClick={() => setModalVisibility(false)} id="close" aria-label="close">X</button>        
        </div>
    )
}

export default ModalHeader

interface IProps{
    setModalVisibility : (bool : boolean) => void
}