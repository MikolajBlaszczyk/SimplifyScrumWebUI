import { ReactElement } from "react"
import { useModalForm } from "./useContexts"
import { Modal } from "../features/modal/Modal"

export function useModal() {
    const {setModal} = useModalForm()

    const showModal = (innerComponent: ReactElement, title: string) => {
        const component = (
           <Modal title={title} innerComponent={innerComponent} />
        )

        setModal({
            showModal: true,
            modalComponent: component
        })
    }


   return showModal
}

export function useHideModal() {
    const {setModal} = useModalForm()

    const hideModal = () => {
        setModal({
            showModal: false,
            modalComponent: <></>
        })
    }

    return hideModal
}