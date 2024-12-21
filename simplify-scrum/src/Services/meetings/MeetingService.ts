import { HttpStatusCode } from "axios";
import { DayModel, Meeting, MeetingType, Schedule, ScheduleModel } from '../../data/CommonDataIndex';
import { RequestFactory } from "../api/RequestFactory";

const meetingApiUrl = `${process.env.REACT_APP_SIMPLIFY_API}/meetings` 



export class MeetingSerivce{

    public static async GetMeetings(): Promise<ScheduleModel>{
        try {
            const url = meetingApiUrl + "/current"
            const response = await RequestFactory.createGetRequest(url)
            
            response.data.days = response.data.days.map((day:DayModel) => DataMapper.mapDayDate(day))
            
            return response.data as ScheduleModel
        } catch(error) {
            console.log(error)
            return Schedule.empty()
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
            const response = await RequestFactory.createPostRequest(url, meeting) 

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

