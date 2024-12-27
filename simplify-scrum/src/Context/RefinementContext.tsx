import { createContext, useMemo, useState } from "react"

export enum RefinementAction {
    ShowItems,
    Refine,
}

export interface Refinement {
    action: RefinementAction
    itemGuid: string
}

const defaultRefinementState: Refinement = {
    action: RefinementAction.ShowItems,
    itemGuid: "",

}

export interface RefinementState { 
    state: Refinement,
    setState: (settings: Refinement) => void
}

export const RefinementContext = createContext<RefinementState>({state: defaultRefinementState, setState: () => {}})


export const RefinementStateProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [state, setState] = useState<Refinement>(defaultRefinementState)

    const cachedValue = useMemo(() => ({state: state, setState: setState}), [state])

    return (
        <RefinementContext.Provider value={cachedValue}>
            {children}
        </RefinementContext.Provider>
    )
}