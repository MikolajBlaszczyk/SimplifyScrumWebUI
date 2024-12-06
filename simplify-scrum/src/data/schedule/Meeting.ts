import { DateConverter } from "../../utils/UtilsIndex";
import { MeetingType } from "./MeetingType";


export interface Meeting {
    guid: string;
    name: string;
    description: string;
    leaderGuid: string;
    start: Date;
    duration: string;
    type: MeetingType;
    userGuids: string[]
}

export class MeetingFactory {
    private constructor(){}

    static createMeeting(name: string, description: string, type: MeetingType, leader: string, start: Date, duration: string, userGuids: string[], guid?: string): Meeting{
        return {
            guid: guid ?? "",
            name: name,
            description: description,
            leaderGuid: leader,
            start: start,
            duration: duration,
            type: type,
            userGuids: userGuids
        }
    }

    static get default(): Meeting{
        return {
            guid: "",
            name: "",
            description: "",
            leaderGuid: "",
            start: new Date(),
            duration: DateConverter.convertDateToTimeString(new Date(0,0,0,0,30)),
            type: MeetingType.daily,
            userGuids: []
        }
    }

    static copy(meeting: Meeting): Meeting{
        return {
            guid: meeting.guid,
            name: meeting.name,
            description: meeting.description,
            leaderGuid: meeting.leaderGuid,
            start: meeting.start,
            duration: meeting.duration,
            type: meeting.type,
            userGuids: meeting.userGuids
        }
    }
}
