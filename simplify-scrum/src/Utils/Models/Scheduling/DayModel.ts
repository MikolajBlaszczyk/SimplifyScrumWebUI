import { MeetingModel } from "./MeetingModel";


export interface DayModel {
    date: Date;
    meetings: MeetingModel[];
}


export class DayFactory {
    private constructor() {}

    static todayWithNoMeetings(): DayModel{
        return {
            date: new Date(),
            meetings: []
        }
    }
}