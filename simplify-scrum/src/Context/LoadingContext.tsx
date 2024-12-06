import React, { createContext, useMemo, useState } from "react";

interface Loading{
    shouldReload: number
    setShouldReload: (value: number)=> void
}

export const LoadingContext = createContext<Loading>({
    shouldReload: 0,
    setShouldReload: () => null
})

export const LoadingProvider = ( {children}: React.PropsWithChildren<{}>) => {
    const [reload, setReload] = useState<number>(0)

    const setReloadValue = (value: number) => {
        setReload(value)
    }

    const cachedValue = useMemo<Loading>(() => ({shouldReload: reload, setShouldReload: setReloadValue}), [reload])

    return <LoadingContext.Provider value={cachedValue}>
        {children}
    </LoadingContext.Provider>
}