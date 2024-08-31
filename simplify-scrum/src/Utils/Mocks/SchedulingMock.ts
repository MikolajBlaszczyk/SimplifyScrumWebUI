import { DayApi, MeetingApi, MeetingType, Month, ScheduleApi } from "../Models/Scheduling"

const currentDate = new Date()
const days: DayApi[] = [] 

for (let i = 1; i < currentDate.getDate() + 1 ; i++) {

    const meeting: MeetingApi = {
        id: `${i}`,
        name: `Meeting on day${i}`,
        description: "",
        leaderId: `Some leader ID`,
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), i, 10),
        duration: new Date(0, 0, 0, 1),
        type: MeetingType.daily
    }

    const day: DayApi = {
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
        meetings: [meeting]
    }
    
    days.push(day)
}



export const MockSchedule: ScheduleApi = {
    month: (currentDate.getMonth()) as Month,
    days: days
}