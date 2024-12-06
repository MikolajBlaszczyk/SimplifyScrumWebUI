import { MeetingType, Role } from "../../data/CommonDataIndex"
import { ExtendedStatus, SimpleStatus, StandardStatus } from "../../features/backlog/data/State"
import { GenericEnumService } from "./GenericEnumService"
import { Refinement } from '../../pages/Refinement';

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

const meetingEnumDescriptions = { 
    [MeetingType.custom]: "Custom",
    [MeetingType.daily]: "Daily",
    [MeetingType.refinement]: "Refinement",
    [MeetingType.retrospective]: "Retrospective",
    [MeetingType.planning]: "Planning"
}

export class EnumService {

    //#region State enums
    static convertSimpleStatusToString = (state: SimpleStatus) => {
        return simpleStateString[state]
    }

    static convertStringToSimpleStatus = (stringValue: string) => {
        const keys = GenericEnumService.getEnumDictionary(SimpleStatus) 

        return keys[stringValue] as SimpleStatus
    }


    static convertStandardStatusToString = (state: StandardStatus) => {
        return standardStateString[state]
    }

    static convertStringToStandardStatus = (stringValue: string) => {
        const keys = GenericEnumService.getEnumDictionary(StandardStatus) 

        return keys[stringValue]  as StandardStatus
    }

    static convertExtendedStatusToString = (state: ExtendedStatus) => {
        return extendadStateString[state]
    }

    static convertStringToExtendedStatus = (stringValue: string) => {
        const keys = GenericEnumService.getEnumDictionary(ExtendedStatus) 

        return keys[stringValue]  as ExtendedStatus
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

    //#region MeetingType enum

    static convertMeetingToString = (meetingType: MeetingType) => {
        return meetingEnumDescriptions[meetingType]
    }

    static convertStringToMeeting = (meetingTypeAsString: string) => {
        const keys = GenericEnumService.getEnumDictionary(MeetingType) 

        return keys[meetingTypeAsString] as MeetingType
    }


    //#endregion
}