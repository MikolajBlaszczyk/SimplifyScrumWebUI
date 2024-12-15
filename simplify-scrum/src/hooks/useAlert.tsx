import { useContext } from "react";
import { Alert, AlertStyle, AlertType } from "../features/alerting/components/Alert";
import { AlertContext, AlertingState } from "../context/AlertContext";

export function useAlert() {
    const {alerting, setAlerting} = useContext(AlertContext) as AlertingState

    const showAlert = (style: AlertStyle, content: string, title?: string, type?: AlertType) => {
        if(alerting.showAlert == true){
            return
        }
    
        const alertComponent = (
            <Alert
                style={style}
                title={title == undefined ? "Alert" : title}
                content={content}     
                type={type == undefined ? AlertType.Confirm : type}
                />
        )

        setAlerting({
            showAlert: true,
            alertComponent: alertComponent
        })
    }


   return showAlert
}