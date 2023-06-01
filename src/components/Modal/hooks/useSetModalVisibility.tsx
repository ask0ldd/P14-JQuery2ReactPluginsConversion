import { useState } from "react"

function useModalsVisibilityManager(bool : boolean){
    const [modalVisibility, setModalVisibility] = useState<boolean>(bool)
    // instead : modalList, addModal, removeModal => usereducer

    /*function addModal(modal : IModal){
        return modal
    }*/

    return {modalVisibility, setModalVisibility} // add a function to add more modal at runtime
    // { id : modalId1 , tools : {visibilityStatus, setModalVisibility}, id : modalId2 , tools : {visibilityStatus, setModalVisibility}, ...}
}

export default useModalsVisibilityManager

interface IModal{
    id : string
    visibilityManaging : IVisibilityManaging
}

interface IVisibilityManaging{
    modalVisibility : boolean
    setModalVisibility : (bool : boolean) => void
}