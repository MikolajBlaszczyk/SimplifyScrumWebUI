import { SimpleIcon } from "../../../../components/ComponentsIndex"
import { DayModel } from "../../../../data/CommonDataIndex"
import { Fonts } from "../../../../utils/UtilsIndex"


interface SimpleModalProps{
    body: React.ReactNode
    day: DayModel
    onClose: () => void
}

export default function SimpleModal(props: SimpleModalProps){

    return (
        <div className="modal modal-lg show fade" tabIndex={-1} style={{display: "block"}} role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <SimpleIcon icon={"bi-calendar-date-fill"} font={Fonts.H4}  />
                        <h5 className="modal-title ms-2 ">{props.day.date.toDateString()}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
                    </div>

                    <div className="modal-body">
                        {props.body}
                    </div>
                </div>
            </div>
        </div>
       
    )
}