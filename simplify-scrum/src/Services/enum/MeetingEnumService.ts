import { MeetingType } from "../../data/CommonDataIndex";

export class MeetingEnumService {
    static GetAllMeetingTypes() {
        return Object.values(MeetingType) 
    }
}