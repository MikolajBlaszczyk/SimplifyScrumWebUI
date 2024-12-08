import { createContext, useMemo, useState } from "react"
import { Note } from "../features/retrospective-dashboard/data/Note"



export interface Rating {
    [key: string]: number;
    Workflow: number
    Tools: number
    Communication: number
    ProblemResolving: number
    Pacing: number
}

export interface Retro {
    Rating: Rating
    Comments: Note[]
}

const defaultRetroState: Retro = {
    Rating: {
        Workflow: 5,
        Tools: 5,
        Communication: 5,
        ProblemResolving: 5,
        Pacing: 5
    },
    Comments: []
}

export interface RetroState { 
    state: Retro,
    setState: (settings: Retro) => void
}

export const RetroContext = createContext<RetroState>({state: defaultRetroState, setState: () => {}})


export const RetroProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [state, setState] = useState<Retro>(defaultRetroState)

    const cachedValue = useMemo(() => ({state: state, setState: setState}), [state])

    return (
        <RetroContext.Provider value={cachedValue}>
            {children}
        </RetroContext.Provider>
    )
}