import { HttpStatusCode } from "axios";
import { DayModel, Meeting, MeetingType, Schedule, ScheduleModel } from '../../data/CommonDataIndex';
import { RequestFactory } from "../api/RequestFactory";
import { DayFactory } from '../../data/schedule/Day';

const meetingApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}/meetings` 



export class MeetingSerivce{

    

    public static async GetScheduleByDate(date: Date): Promise<ScheduleModel>{
        try {
            const url = meetingApiUrl + "/schedule?date=" + date.toDateString()
            const response = await RequestFactory.createGetRequest(url)
            
            response.data.days = response.data.days.map((day:DayModel) => DataMapper.mapDayDate(day))
            
            return response.data as ScheduleModel
        } catch(error) {
            console.log(error)
            return Schedule.empty()
        }
    }

   

    public static async GetMeetingsByDate(day: Date): Promise<DayModel>{
        try {
            const url = meetingApiUrl + "/date"
            const response = await RequestFactory.createPostRequest(url,  this.formatISOWithTimezone(day))
            
            
            return DataMapper.mapDayDate(response.data) as DayModel
        } catch(error) {
            console.log(error)
            return DayFactory.empty(new Date(day))
        }
    }


    static async getMeeting(guid: string): Promise<Meeting> {
        try {
            const url = meetingApiUrl + `/meeting?meetingGuid=${guid}`
            const response = await RequestFactory.createGetRequest(url)
            return response.data as Meeting
        } catch(error) {
            console.log(error)
            return null as unknown as Meeting
        }
    }

    static async add(meeting: Meeting){
        try {
            const url = meetingApiUrl + "/add" 
            const meetingData = DataMapper.createMeetingData(meeting)
            const response = await RequestFactory.createPostRequest(url, meetingData) 

            return response.data

        } catch(error) {
            console.log(error)
            return null as unknown as Meeting
        }
    }


    static async update(meeting: Meeting){
        try {
            const url = meetingApiUrl + "/update" 
            const meetingData = DataMapper.createMeetingData(meeting)
            const response = await RequestFactory.createPostRequest(url, meetingData) 

            return response.data

        } catch(error) {
            console.log(error)
        }
    }

    public static async DeleteMeeting(guid: string){
        try {
            const url = meetingApiUrl + "/delete?guid=" + guid
            const response = await RequestFactory.createDeleteRequest(url, null)
            return response.status == HttpStatusCode.Ok
        } catch(error) { 
            console.log(error)
            return false
        }
    }

    public static formatISOWithTimezone = (date: Date) => {
        const pad = (num: number) => String(num).padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        const timezoneOffset = -date.getTimezoneOffset();
        const sign = timezoneOffset >= 0 ? '+' : '-';
        const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
        const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
    }
} 

class DataMapper {
    static createMeetingData(meeting: Meeting) {
        return {
            GUID: meeting.guid,
            Name: meeting.name,
            Description: meeting.description,
            LeaderGuid: meeting.leaderGuid,
            Start: meeting.start, 
            Duration: meeting.duration,
            Type: MeetingType[meeting.type] ,
            UserGuids: meeting.userGuids
        };
    }

    static mapDayDate = (day: DayModel) => {
        return ({
            ...day,
            date: new Date(day.date)
        })
    }
}

