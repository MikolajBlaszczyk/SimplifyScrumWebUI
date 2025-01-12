import { Meeting } from "./Meeting";
import exp from 'constants';


export interface DayModel {
    date: Date;
    meetings: Meeting[];
}


export class DayFactory {
    private constructor() {}

    static empty(date: Date): DayModel{
        return {
            date: date,
            meetings: []
        }
    }

    static todayWithNoMeetings(): DayModel{
        return {
            date: new Date(),
            meetings: []
        }
    }

    static createDaysForCurrentMonth(currentDate: Date): DayModel[]{
        const days = []
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()

        for(let i=1; i< daysInMonth; i++){
            const day: DayModel = {
                date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
                meetings: []
            }

            days.push(day)
        }

        return days;
    }
}