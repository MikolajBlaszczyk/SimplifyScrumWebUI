import { MeetingType } from "./MeetingType";


export interface MeetingModel {
    id: string;
    name: string;
    description: string;
    leaderId: string;
    start: Date;
    duration: Date;
    type: MeetingType;
    userIdentifiers: string[]
}

export class MeetingFactory {
    private constructor(){}

    static get default(): MeetingModel{
        return {
            id: "",
            name: "",
            description: "",
            leaderId: "",
            start: new Date(),
            duration: new Date(0,0,0,0,30),
            type: MeetingType.daily,
            userIdentifiers: []
        }
    }

    static copy(meeting: MeetingModel): MeetingModel{
        return {
            id: meeting.id,
            name: meeting.name,
            description: meeting.description,
            leaderId: meeting.leaderId,
            start: meeting.start,
            duration: meeting.duration,
            type: meeting.type,
            userIdentifiers: meeting.userIdentifiers
        }
    }
}
