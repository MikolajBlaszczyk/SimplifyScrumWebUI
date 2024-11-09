import { useEffect, useMemo, useState } from "react"
import Omega from "../../../assets/img/omega.svg"
import { InfoCenterService } from "../services/InfoCenterService"
import { Meeting, Sprint, SprintModel } from "../../../data/CommonDataIndex"
import { BacklogService } from "../../../services/CommonServicesIndex"

export function InfoBoard(){ 
    const [meetings, setMeetings] = useState<Meeting[]>([])
    const [sprint, setSprint] = useState<Sprint>(SprintModel.default())
    const sprintEnd = useMemo(() => {
        const today = new Date()
        if(sprint.end.getMonth() == today.getMonth()) {
            return sprint.end.getDate() - today.getDate()
        }
        else  {
            const lastMonthDays = new Date(sprint.end.getFullYear(), sprint.end.getMonth(), 0).getDate() - today.getDate()
            return sprint.end.getDate() - lastMonthDays
        }
        
    }, [sprint])


    useEffect(() => {
        InfoCenterService
            .getTodaysMeetings()
            .then(data => setMeetings(data))

        BacklogService
            .getSprintInfo()
            .then(data => setSprint(data))
    }, [])

    return (
    <div className="row">
        <div className="col-8">
            <div className="s-bg-form h-100 me-3 shadow s-info-incoming-meetings">
                <h3>
                    Incoming meetings for this sprint
                </h3>

                <ul className="list-group list-group-flush mt-5">
                    {
                        meetings.map(meeting => {
                            return(
                                <li className="list-group-item bg-transparent text-black">
                                    <h5>
                                        {meeting.name}
                                    </h5>
                                </li>
                            )
                        })
                    }
                </ul>

                <img src={Omega} className=" img-fluid w-50 position-relative s-info-image"/>
            </div>
        </div>
        <div className="col-4 flex-column justify-content-between">
            <div className="s-bg-critical shadow s-info-end-sprint ">
                <h4>
                    Sprint ends in {sprintEnd}
                </h4>
            </div>

            <div className="s-bg-daily shadow  s-info-goal-sprint ">
                <h4>
                    Goal of the sprint is - {sprint.goal}
                </h4>
            </div>
        </div>
    </div>
    )
}