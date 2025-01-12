import React, { createContext, useMemo, useState } from "react";
import { Notification } from '../data/notifications/Notification';

export const defaultSettings: SimplifySettings = {
    isInStartupScreen: false,
    isAdmin: false,
    showNavbar: true,
    sprintActive: false,
    refinementActive: false,
    planningActive: false,
    notifications: []
}

export type SimplifySettings = {
    sprintActive: boolean
    refinementActive: boolean
    planningActive: boolean
    isInStartupScreen: boolean
    isAdmin: boolean
    showNavbar: boolean
    notifications: Notification[]
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