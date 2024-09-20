import { Month } from "../Models/Scheduling/Month"
import { ScheduleModel } from "../Models/Scheduling/ScheduleModel"
import { DayModel } from "../Models/DayModel"
import { MeetingModel } from "../Models/Scheduling/MeetingModel"
import { MeetingType } from "../Models/Scheduling/MeetingType"

const currentDate = new Date()
const days: DayModel[] = [] 

for (let i = 1; i < currentDate.getDate() + 1 ; i++) {

    const meeting: MeetingModel = {
        id: `${i}`,
        name: `Meeting on day${i}`,
        description: "",
        leaderId: `Some leader ID`,
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), i, 10),
        duration: new Date(0, 0, 0, 1),
        type: MeetingType.custom
    }

    const day: DayModel = {
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
        meetings: [meeting]
    }
    
    days.push(day)
}



export const MockSchedule: ScheduleModel = {
    month: (currentDate.getMonth()) as Month,
    days: days
}