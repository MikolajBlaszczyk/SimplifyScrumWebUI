import { ReactNode, useContext, useEffect } from "react"
import { AlertContext, AlertingState } from "../context/ContextsIndex"
import { BgColor, bgColorClasses } from "../utils/UtilsIndex"
import { useModalForm, useSettings } from "../hooks/useContexts"






interface Props {
    color?: BgColor
    child: ReactNode
    showNavbar?: boolean
}


export function FullScreenLayout({color, child, showNavbar}: Props){
    const {alerting} = useContext(AlertContext) as AlertingState
    const {settings, setSettings} = useSettings()
    const {modal} = useModalForm()

    useEffect(() => {

        if(showNavbar != undefined)
            setSettings({...settings, showNavbar:showNavbar})

        return() => {
            if(settings.showNavbar == false){
                setSettings({...settings, showNavbar:true})
            }
        }

    }, [])

    return (
        <>
            {alerting.showAlert && (alerting.alertComponent)}
            {modal.showModal && (modal.modalComponent)}
            <main className={`d-flex h-100 w-100 justify-content-center  }`}>
                {child}
            </main>
        </>
        
    )
}