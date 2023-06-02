/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import ModalHeader from "../ModalHeader"

function useModalManager({initialVisibility, content} : IModalObject){
    // initial visibility / initial content

    const [modalVisibility, setModalVisibility] = useState<boolean>(initialVisibility)
    const [modalContent, setModalContent] = useState<JSX.Element>(content)
    const [headerComponent, setHeaderComponent] = useState<JSX.Element>(ModalHeader({setModalVisibility})) /* set default modal header with props passed */

    useEffect(() => {
  
        function keyboardListener(e : KeyboardEvent){
            if(e.code == "Escape" && modalVisibility) {e.preventDefault(); setModalVisibility(false)}
        }

        window.addEventListener('keydown', keyboardListener)

        // soutenance : clean up to avoid having two listeners active => since useEffect is triggered twice in strict mode
        return () => {
            window.removeEventListener('keydown', keyboardListener)
        }

    }, [])

    return {modalVisibility, modalContent, headerComponent, setModalVisibility, setModalContent, setHeaderComponent}
}

export default useModalManager

interface IModalObject{
    initialVisibility : boolean
    content : () => JSX.Element
}