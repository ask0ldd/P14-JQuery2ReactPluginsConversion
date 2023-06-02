import './style/ModalHeader.css'

function ModalHeader({setModalVisibility} : IPropsModalHeader){

    return (
        <div className='header-container'>
            <button className='close-btn' onClick={() => setModalVisibility(false)} id="close" aria-label="close">X</button>        
        </div>
    )
}

export default ModalHeader

export interface IPropsModalHeader{
    setModalVisibility : (bool : boolean) => void
}