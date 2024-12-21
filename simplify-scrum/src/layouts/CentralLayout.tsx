import { ReactNode, useContext } from "react"
import { AlertContext, AlertingState } from "../context/ContextsIndex"
import { useModalForm } from "../hooks/useContexts"

interface CentralLayoutProps {
    centralComponent: ReactNode
}

export function CentralLayout({centralComponent}: CentralLayoutProps){
    const {alerting} = useContext(AlertContext) as AlertingState
    const {modal} = useModalForm()

    return (
        <>
            {alerting.showAlert && (alerting.alertComponent)}
            {modal.showModal && (modal.modalComponent)}
            <main className="d-flex w-100  h-100 justify-content-center align-items-center">
                <div className="s-central-layout d-flex justify-content-center align-items-center"> 
                    {centralComponent}
                </div>
            </main>
        </>
       
    )
}