import { createContext, ReactElement, useMemo, useState } from "react";

const defaultAlerting: Alerting = {
    showAlert: false, 
    alertComponent: <></>
}

interface Alerting {
    showAlert: boolean,
    alertComponent: ReactElement
}

export interface AlertingState { 
    alerting: Alerting,
    setAlerting: (settings: Alerting) => void
}

export const AlertContext = createContext<AlertingState>({alerting: defaultAlerting, setAlerting: () => {}})

export const AlertProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [alerting, setAlerting] = useState<Alerting>(defaultAlerting)

    const cachedValues = useMemo<AlertingState>(() => ({alerting, setAlerting}), [alerting])

    return  (
        <AlertContext.Provider value={cachedValues}>
            {children}
        </AlertContext.Provider>
    )
}