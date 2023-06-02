import { useState } from "react"

function useModalManager({initialVisibility, content} : IModalObject){
    // initial visibility / initial content

    const [modalVisibility, setModalVisibility] = useState<boolean>(initialVisibility)
    const [modalContent, setModalContent] = useState<JSX.Element>(content)
    
    // switch content function

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