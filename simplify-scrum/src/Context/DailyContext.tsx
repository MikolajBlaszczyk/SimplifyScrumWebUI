import { createContext, useMemo, useState } from "react"

export enum DailyAction { 
    ShowTaskBoard,
    EditTask,
    EditFeature // TODO: check scope.  
}



const defaultDailyState: Daily = {
    guid: undefined,
    action: DailyAction.ShowTaskBoard
}

export interface Daily {
    action: DailyAction
    guid?: string,
}

export interface DailyState { 
    state: Daily,
    setState: (settings: Daily) => void
}

export const DailyContext = createContext<DailyState>({state: defaultDailyState, setState: () => {}})


export const DailyContextProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [state, setState] = useState<Daily>(defaultDailyState)

    const cachedValue = useMemo(() => ({state: state, setState: setState}), [state])

    return (
        <DailyContext.Provider value={cachedValue}>
            {children}
        </DailyContext.Provider>
    )
}