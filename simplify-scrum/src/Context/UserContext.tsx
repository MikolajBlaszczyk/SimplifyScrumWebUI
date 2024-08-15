import React, { createContext, useMemo, useState } from "react";

export type SimplifySettings = {
    isInStartupScreen: boolean,
    previousLocation?: string
}

export interface GlobalSettings{
    settings: SimplifySettings
    setSettings: (settings: SimplifySettings) => void
}

export const UserContext = createContext<GlobalSettings>({
    settings: {isInStartupScreen: false, previousLocation: "null"},
    setSettings: () => null
})

export const UserProvider = ( {children, } : React.PropsWithChildren<{}> )=> {
    const [settings, setSettings] = useState<SimplifySettings>(
        {
            isInStartupScreen: false,
            previousLocation: ""
        }
    )

    const cachedValue = useMemo<GlobalSettings>(() => ({settings, setSettings}), [settings])

    return (
    <UserContext.Provider value={cachedValue}>
        {children}
    </UserContext.Provider>
    )
}