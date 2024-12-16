import Omega from "../../../assets/img/omega.svg"
import { Placeholder } from "../../../components/ComponentsIndex"
import { Meeting } from "../../../data/CommonDataIndex"

interface Props {
    isEmpty: boolean
    isPlaceholder: boolean
    meetings: Meeting[]
}

export function MeetingsBlock({isEmpty, isPlaceholder, meetings}: Props){ 
    if(isPlaceholder == true){
        return (
            <div className="d-flex w-100 h-100 me-3 shadow s-info-incoming-meetings justify-content-center align-items-center opacity-50">
                <Placeholder />
            </div>
        )
    }

    return (
        <div className=" d-flex w-100 h-100 me-3 shadow s-info-incoming-meetings">
            {
                isEmpty ? 
                (
                    <div className="d-flex w-100 h-100 flex-column align-items-center mt-5" >
                        <h3 className=" mb-5">There are no incoming meetings</h3>
                        <img src={Omega} className=" img-fluid w-50 z-2 align-self-center mt-5 s-info-image"/>
                    </div>
                )
                :
                (
                    <>
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
                    </>
                )
            }
            
        </div>
    )
}