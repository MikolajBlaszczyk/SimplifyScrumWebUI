import { useContext } from "react";
import { Alert, AlertType } from "../features/alerting/components/Alert";
import { AlertContext, AlertingState } from "../context/AlertContext";

export function useAlert() {
    const {alerting, setAlerting} = useContext(AlertContext) as AlertingState

    const showAlert = (type: AlertType, content: string, title?: string) => {
        if(alerting.showAlert == true){
            return
        }
    
        const alertComponent = (
            <Alert
                type={type}
                title={title == undefined ? "Alert" : title}
                content={content}
                symbol={undefined}             
                />
        )

        setAlerting({
            showAlert: true,
            alertComponent: alertComponent
        })
    }


   return showAlert
}