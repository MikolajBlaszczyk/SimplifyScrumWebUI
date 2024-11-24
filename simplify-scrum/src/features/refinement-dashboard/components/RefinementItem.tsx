import { MouseEvent } from "react"
import { Button, Color, SimpleButton } from "../../../components/ComponentsIndex"
import { Feature } from "../../backlog/data/Feature"

interface Props {
    feature: Feature
}

export function RefinementItem({feature}: Props){


    return(
        <div className="row w-100 h-100 border-bottom mb-2 mt-1 s-refinement-item  shadow-sm">
            <div className="col-3 d-flex align-items-center justify-content-start ps-3">
                <small className="m-0 ">
                    {feature.name}
                </small>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-start ps-3">
                <small className="m-0 ">
                    {feature.createdBy}
                </small>
            </div>
            <div className="col-3 d-flex  align-items-center justify-content-start ps-3">
                <small className="m-0 ">
                    {feature.projectGuid}
                </small>
            </div>
            <div className="col-3 d-flex justify-content-end">
                <SimpleButton 
                    type={Button.Transparent}
                    title={""} 
                    icon="bi-chevron-double-right"
                    fontColor={Color.Light}
                    iconOnTheRight={true}
                    onClick={() => {}} />
            </div>
            
        </div>
    )
}