import { stat } from "fs"

export enum StandardStatus{
    New = 1,
    Implementation = 3,
    Documentation = 4,
    Testing = 5,
    Done = 6,
}

export enum ExtendedStatus {
    New = 1,
    ReadyForRefinement = 2,
    Refined = 3,
    ReadyForImplementation = 4,
    Implementation = 5,
    ReadyForDocumentation = 6,
    Documentation = 7,
    ReadyForTesting = 8,
    Testing = 9,
    Done = 10
}

export enum RefinementStatus {
    NotReady = 1,
    Ready = 2,
    Refined = 3,
    ShouldBeSplitted = 4,
    MoreInfoNeeded = 5,
} 

export enum SimpleStatus {
    ToBeDone = 1, 
    Doing = 2,
    Done = 3
}

export function simpleStatusToString(state: SimpleStatus): string{
    return SimpleStatus[state]
}


export function extendedStatusToString(state: ExtendedStatus): string{
    return ExtendedStatus[state]
}

export function standardStatusToString(state: StandardStatus): string {
    return StandardStatus[state]
}