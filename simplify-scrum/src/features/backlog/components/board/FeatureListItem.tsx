import { MouseEvent } from "react"
import { EnumService } from "../../../../services/enum/StateEnumService"
import { Button,  SimpleButton } from "../../../../components/ComponentsIndex"
import { Feature } from "../../data/Feature"
import { Fonts } from "../../../../utils/UtilsIndex"

interface Props{ 
    feature: Feature
}

export function FeatureListItem({feature}:Props){
    const {title, state, points,} = feature
    return(
        <li className=" list-group-item list-group-item-action d-flex p-2 ">
            <div className="row w-100 me-0 ms-0">
                <div className="col-3 d-flex align-items-center justify-content-start">
                    <h6 className="m-0">{title}</h6>
                </div>
                <div className="col-5 d-flex justify-content-between align-items-center ">
                    <small className="m-0 w-100 ">{EnumService.convertExtendedStatusToString(state)}</small>
                    <small className="m-0">{points}</small>
                </div>
                <div className="col-4 d-flex justify-content-end">
                    <SimpleButton title={''} icon="bi-list" type={Button.Info} font={Fonts.Small} onClick={(e) => {}} />
                </div>
            </div>
        </li>
    )
}