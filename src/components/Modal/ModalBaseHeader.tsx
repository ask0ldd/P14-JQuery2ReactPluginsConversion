import './style/ModalHeader.css'

/**
 * Component : Modals Header.
 * @Component
 * @param {Object[]} props - Props.
 * @param {bool} props.openModal - Function to set the display state of the modal.
 * @return ( <ModalHeader openModal={openModal}/> )
 */
function ModalBaseHeader({setVisibility} : {setVisibility : (bool : boolean) => void}){

    // !!!! tabindex button
    return (
        <div className='header-container'>
            <button className='close-btn' onClick={() => setVisibility(false)} id="close" aria-label="close" tabIndex={1}>X</button>        
        </div>
    )
}

export default ModalBaseHeader