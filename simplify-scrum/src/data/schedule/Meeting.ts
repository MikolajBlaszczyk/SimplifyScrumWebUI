import { DateConverter } from "../../utils/UtilsIndex";
import { MeetingType } from "./MeetingType";


export interface Meeting {
    id: string;
    name: string;
    description: string;
    leaderId: string;
    start: Date;
    duration: string;
    type: MeetingType;
    userIdentifiers: string[]
}

export class MeetingFactory {
    private constructor(){}

    static get default(): Meeting{
        return {
            id: "",
            name: "",
            description: "",
            leaderId: "",
            start: new Date(),
            duration: DateConverter.convertDateToTimeString(new Date(0,0,0,0,30)),
            type: MeetingType.daily,
            userIdentifiers: []
        }
    }

    static copy(meeting: Meeting): Meeting{
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
