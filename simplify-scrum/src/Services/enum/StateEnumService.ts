import { Role } from "../../data/DataIndex"
import { ExtendedStatus, SimpleStatus, StandardStatus } from "../../features/backlog/data/State"

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

const roleString = { 
    [Role.DevelopmentTeam]: "Member of development team",
    [Role.ScrumMaster]: "Scrum Master",
    [Role.ProjectOwner]: "Project owner"    
}

export class EnumService {

    //#region State enums
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
        return extendadStateString[state]
    }

    static convertStringToExtendedStatus = (stringValue: string) => {
        const keys = Object.keys(simpleStateString) as Array<keyof typeof ExtendedStatus>

        return keys.find(key => extendadStateString[(key as unknown as ExtendedStatus)] == stringValue)![0] as unknown as ExtendedStatus
    }
    //#endregion

    //#region Role enum 

    static convertRoleToString = (role: Role) => { 
        return roleString[role]
    }

    static convertStringToRole = (roleAsString: string) => { 
        const keys = Object.keys(roleString) as Array<keyof typeof Role>

        return keys.find(key => roleString[(key as unknown as Role)] == roleAsString)![0] as unknown as Role
    }

    //#endregion

}