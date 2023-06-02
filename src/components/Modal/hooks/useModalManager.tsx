import { useState, useEffect } from "react"

function useModalManager({initialVisibility, content} : IModalObject){
    // initial visibility / initial content

    const [modalVisibility, setModalVisibility] = useState<boolean>(initialVisibility)
    const [modalContent, setModalContent] = useState<JSX.Element>(content)

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

    return {modalVisibility, modalContent, setModalVisibility, setModalContent}
}

export default useModalManager

/*interface IModal{
    id : string
    visibilityManaging : IVisibilityManaging
}

interface IVisibilityManaging{
    modalVisibility : boolean
    setModalVisibility : (bool : boolean) => void
}*/

interface IModalObject{
    initialVisibility : boolean
    content : () => JSX.Element
}