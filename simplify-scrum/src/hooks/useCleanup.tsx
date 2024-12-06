import { useContext } from "react"
import { AlertContext } from "../context/AlertContext"
import { LoadingContext } from "../context/LoadingContext"
import { defaultSettings, UserContext } from "../context/UserContext"

export function useCleanup(){
    const {setAlerting} = useContext(AlertContext)
    const {shouldReload: isLoading, setShouldReload: setIsLoading} = useContext(LoadingContext)
    const { setSettings} = useContext(UserContext)

    const cleanup = () => {
    
    
        setSettings(defaultSettings)
        setAlerting({
            showAlert: false,
            alertComponent: (<></>)
        })
        setIsLoading(isLoading + 1)
    }
   
    return cleanup;
}