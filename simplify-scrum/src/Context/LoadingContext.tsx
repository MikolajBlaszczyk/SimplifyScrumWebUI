import React, { createContext, useMemo, useState } from "react";

interface Loading{
    isLoading: boolean
    setIsLoading: (value: boolean)=> void
}

export const LoadingContext = createContext<Loading>({
    isLoading: false,
    setIsLoading: () => null
})

export const LoadingProvider = ( {children}: React.PropsWithChildren<{}>) => {
    const [reload, setReload] = useState<boolean>(false)

    const setReloadValue = (value: boolean) => {
        setReload(value)
    }

    const cachedValue = useMemo<Loading>(() => ({isLoading: reload, setIsLoading: setReloadValue}), [reload])

    return <LoadingContext.Provider value={cachedValue}>
        {children}
    </LoadingContext.Provider>
}