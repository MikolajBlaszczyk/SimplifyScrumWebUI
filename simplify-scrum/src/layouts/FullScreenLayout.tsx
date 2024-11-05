import { ReactNode, useContext } from "react"
import { AlertContext, AlertingState } from "../context/ContextsIndex"
import { BgColor, bgColorClasses } from "../utils/UtilsIndex"






interface Props {
    color?: BgColor
    child: ReactNode
}


export function FullScreenLayout({color, child}: Props){
    const {alerting} = useContext(AlertContext) as AlertingState

    return (
        <>
            {alerting.showAlert && (alerting.alertComponent)}
            <main className={`d-fle p-5 min-vh-100 min-vw-100 justify-content-center ${bgColorClasses[color!] ?? bgColorClasses.default }`}>
                {child}
            </main>
        </>
        
    )
}