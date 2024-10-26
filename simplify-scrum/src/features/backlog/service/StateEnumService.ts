import { ExtendedStatus, SimpleStatus, StandardStatus } from "../data/State"

const simpleStateString = {
    [SimpleStatus.Doing]: 'Doing',
    [SimpleStatus.Done]: 'Done',
    [SimpleStatus.ToBeDone]: 'To do'
}

const standardStateString = {
    [StandardStatus.New]: 'New',
    [StandardStatus.Implementation]: 'Implementation',
    [StandardStatus.Documentation]: 'Documentation', 
    [StandardStatus.Testing]: 'Testing',
    [StandardStatus.Done]: 'Done'
}

const extendadStateString = {
    [ExtendedStatus.New]: 'New',
    [ExtendedStatus.ReadyForRefinement]: 'Ready for Refinement',
    [ExtendedStatus.Refined]: 'Refined',
    [ExtendedStatus.ReadyForImplementation]: 'Ready for Implementation', 
    [ExtendedStatus.Implementation]: 'Implementation', 
    [ExtendedStatus.ReadyForDocumentation]: 'Ready for Documentation',
    [ExtendedStatus.Documentation]: 'Documentation',
    [ExtendedStatus.ReadyForTesting]: 'Ready for Testing',
    [ExtendedStatus.Testing]: 'Testing',
    [ExtendedStatus.Done]: 'Done'
}

export class StateEnumService {
    static convertSimpleStatusToString = (state: SimpleStatus) => {
        return simpleStateString[state]
    }

    static convertStringToSimpleStatus = (stringValue: string) => {
        const keys = Object.keys(simpleStateString) as Array<keyof typeof SimpleStatus>

        return keys.find(key => simpleStateString[(key as unknown as SimpleStatus)] == stringValue)![0] as unknown as SimpleStatus
    }

    static convertStandardStatusToString = (state: StandardStatus) => {
        return standardStateString[state]
    }

    static convertStringToStandardStatus = (stringValue: string) => {
        const keys = Object.keys(simpleStateString) as Array<keyof typeof StandardStatus>

        return keys.find(key => standardStateString[(key as unknown as StandardStatus)] == stringValue)![0] as unknown as StandardStatus
    }

    static convertExtendedStatusToString = (state: ExtendedStatus) => {
        return simpleStateString[state]
    }

    static convertStringToExtendedStatus = (stringValue: string) => {
        const keys = Object.keys(simpleStateString) as Array<keyof typeof ExtendedStatus>

        return keys.find(key => simpleStateString[(key as unknown as ExtendedStatus)] == stringValue)![0] as unknown as ExtendedStatus
    }
}