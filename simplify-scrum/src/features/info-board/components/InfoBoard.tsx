import Omega from "../../../assets/img/omega.svg"

export function InfoBoard(){ 
    return (
    <div className="row">
        <div className="col-7">
            <div className="s-bg-form h-100 me-3 shadow s-info-incoming-meetings">
                <h3>
                    Incoming meetings for this sprint
                </h3>

                <ul>
                    <li>
                        <h6>
                            daily
                        </h6>
                    </li>
                    <li>
                        <h6>
                            refinement
                        </h6>
                    </li>
                    <li>
                        <h6>
                            custom
                        </h6>
                    </li>
                    <li>
                        <h6>
                            custom
                        </h6>
                    </li>
                </ul>

                <img src={Omega} className=" img-fluid w-50 position-relative s-info-image"/>
            </div>
        </div>
        <div className="col-5 flex-column justify-content-between">
            <div className="s-bg-critical shadow s-info-end-sprint ">
                <h4>
                    Sprint ends in three days
                </h4>
            </div>

            <div className="s-bg-daily shadow  s-info-goal-sprint ">
                <h4>
                    Goal of the sprint is to introduce design for the app
                </h4>
            </div>
        </div>
    </div>
    )
}