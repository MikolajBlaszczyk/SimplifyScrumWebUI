import { useEffect } from "react"
import Omega from "../../../assets/img/omega.svg"
import { Card, CardColor, Placeholder } from "../../../components/ComponentsIndex"
import { Meeting } from "../../../data/CommonDataIndex"
import { Tooltip } from "bootstrap"

interface Props {
    isEmpty: boolean
    isPlaceholder: boolean
    meetings: Meeting[]
}

export function MeetingsBlock({isEmpty, isPlaceholder, meetings}: Props){ 
    let list 

      useEffect(() => {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))

    
            return () => {
                tooltipList.map(t => t.dispose())
                }
          }, [meetings]);

    if(meetings == null || meetings == undefined || meetings.length == 0){ 
        list = <div className="w-75 text-center">No Incoming Meetings</div>
    } else {
        list = (
            <ul style={{width: '70%'}} className="mt-2 d-flex justify-content-start align-items-center   s-info-meetings-list user-select-none  list-group " data-bs-toggle="tooltip" data-bs-custom-class="s-tooltip" data- data-bs-placement="left" title="Maximum of 5 next meetings. Having too much meetings can reduce productivity.">
                {
                    meetings?.slice(0, 5).map((meeting, index) => {
                        return (
                            <li className="list-group-item " key={index}>
                               {meeting.name}
                            </li>
                        )
                    })
                }
            </ul>
        )  
        
     
    }


    return (
         <Card 
            icon="bi-calendar-date"
            title={"Meetings"}
            color={CardColor.Primary}
            placeholder={isPlaceholder} 
            content={list}/>
    )
}