import { useContext } from "react";
import { Alert, AlertType, Symbol } from "../features/alerting/components/Alert";
import { AlertContext, AlertingState } from "../context/AlertContext";

export function useAlert() {
    const {setAlerting} = useContext(AlertContext) as AlertingState

    const showAlert = (type: AlertType, content: string, symbol?: Symbol) => {
        const alertComponent = (
            <Alert
                type={type}
                content={content}
                symbol={symbol ?? undefined}             
                />
        )

        setAlerting({
            showAlert: true,
            alertComponent: alertComponent
        })
    }


   return showAlert
}