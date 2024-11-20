import React, { createContext, useMemo, useState } from "react";

export const defaultSettings: SimplifySettings = {
    isInStartupScreen: false,
    isAdmin: false,
    showNavbar: true
}

export type SimplifySettings = {
    isInStartupScreen: boolean
    isAdmin: boolean
    showNavbar: boolean
}

export interface Global{
    settings: SimplifySettings
    setSettings: (settings: SimplifySettings) => void
}

export const UserContext = createContext<Global>({
    settings: defaultSettings,
    setSettings: () => null
})

export const UserProvider = ( {children } : React.PropsWithChildren<{}> )=> {
    const [settings, setSettings] = useState<SimplifySettings>(defaultSettings)

    const cachedValue = useMemo<Global>(() => ({settings, setSettings}), [settings])

    return (
    <UserContext.Provider value={cachedValue}>
        {children}
    </UserContext.Provider>
    )
}