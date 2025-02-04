import { MeetingSerivce } from "../../../services/CommonServicesIndex";
import { DateComparer } from "../../../utils/UtilsIndex";
import { Meeting } from "../../../data/CommonDataIndex";

export class InfoCenterService {
    static async getTodaysMeetings(): Promise<Meeting[]>{
        const today = new Date()

        const schedule = await MeetingSerivce.GetScheduleByDate(today)
        const day = schedule.days.find(day => DateComparer.areTheSameDay(day.date, today))
        
        return (day?.meetings) ?? []
    } 
}