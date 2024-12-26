import { createContext, useMemo, useState } from "react"

export enum BacklogAction {
    ShowProjects,
    AddProject,
    EditProject,
    EditFeature,
    AddFeature,
    ShowFeatures,
}

export enum DetailType {
    Project,
    Feature, 
    Task
}

interface BacklogItem {
    itemGuid?: string
    itemType: DetailType
}

const defaultBacklogState: Backlog = {
    action: BacklogAction.ShowProjects,
    parentGuid: undefined,
    item: {
        itemGuid: undefined,
        itemType: DetailType.Project
    }
}

export interface Backlog {
    action: BacklogAction
    parentGuid?: string,
    item?: BacklogItem
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