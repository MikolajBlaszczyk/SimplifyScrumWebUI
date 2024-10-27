import { ReactElement, ReactNode, useContext } from "react"
import { AlertContext, AlertingState } from "../context/Index"

interface CentralLayoutProps {
    centralComponent: ReactNode
}

export function CentralLayout(props: CentralLayoutProps){
    const {alerting} = useContext(AlertContext) as AlertingState

    return (
        <>
            {alerting.showAlert && (alerting.alertComponent)}
            <main className="d-flex w-100 h-100 justify-content-center align-items-center">
            {
                props.centralComponent
            }
        </main>
        </>
       
    )
}