import React, { createContext, useMemo, useState } from "react";
import { SimpleUserModel } from "../Utils/Models/UserModel";

export type SimplifySettings = {
    isInStartupScreen: boolean
}

export interface Global{
    settings: SimplifySettings
    setSettings: (settings: SimplifySettings) => void
}

export const UserContext = createContext<Global>({
    settings: {
        isInStartupScreen: false
    },
    setSettings: () => null
})

export const UserProvider = ( {children, } : React.PropsWithChildren<{}> )=> {
    const [settings, setSettings] = useState<SimplifySettings>(
        {
            isInStartupScreen: false
        }
    )

    const cachedValue = useMemo<Global>(() => ({settings, setSettings}), [settings])

    return (
    <UserContext.Provider value={cachedValue}>
        {children}
    </UserContext.Provider>
    )
}