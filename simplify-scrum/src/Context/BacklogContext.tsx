import { createContext, useMemo, useState } from "react"

export enum BacklogAction {
    ShowProjects,
    AddProject,
    EditProject,
    EditFeature,
    ShowFeatures,
}

const defaultBacklogState: Backlog = {
    action: BacklogAction.ShowProjects,
    guid: "",
    parentGuid: ""
}

export interface Backlog {
    action: BacklogAction
    guid: string
    parentGuid: string
}

export interface BacklogState { 
    state: Backlog,
    setState: (settings: Backlog) => void
}

export const BacklogContext = createContext<BacklogState>({state: defaultBacklogState, setState: () => {}})


export const BacklogStateProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [state, setState] = useState<Backlog>(defaultBacklogState)

    const cachedValue = useMemo(() => ({state: state, setState: setState}), [state])

    return (
        <BacklogContext.Provider value={cachedValue}>
            {children}
        </BacklogContext.Provider>
    )
}