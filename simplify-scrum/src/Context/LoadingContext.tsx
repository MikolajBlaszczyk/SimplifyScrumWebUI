import React, { createContext, useMemo, useState } from "react";

interface Loading{
    isLoading: number
    setIsLoading: (value: number)=> void
}

export const LoadingContext = createContext<Loading>({
    isLoading: 0,
    setIsLoading: () => null
})

export const LoadingProvider = ( {children}: React.PropsWithChildren<{}>) => {
    const [reload, setReload] = useState<number>(0)

    const setReloadValue = (value: number) => {
        setReload(value)
    }

    const cachedValue = useMemo<Loading>(() => ({isLoading: reload, setIsLoading: setReloadValue}), [reload])

    return <LoadingContext.Provider value={cachedValue}>
        {children}
    </LoadingContext.Provider>
}