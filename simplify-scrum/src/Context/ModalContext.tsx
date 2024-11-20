import { createContext, ReactElement, useMemo, useState } from "react";

const defaultModal: ModalForm = {
    showModal: false, 
    modalComponent: <></>
}

interface ModalForm {
    showModal: boolean,
    modalComponent: ReactElement
}

export interface ModalState { 
    modal: ModalForm,
    setModal: (settings: ModalForm) => void
}

export const ModalContext = createContext<ModalState>({modal: defaultModal, setModal: () => {}})

export const ModalProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [modal, setModal] = useState<ModalForm>(defaultModal)

    const cachedValues = useMemo<ModalState>(() => ({modal, setModal}), [modal])

    return  (
        <ModalContext.Provider value={cachedValues}>
            {children}
        </ModalContext.Provider>
    )
}