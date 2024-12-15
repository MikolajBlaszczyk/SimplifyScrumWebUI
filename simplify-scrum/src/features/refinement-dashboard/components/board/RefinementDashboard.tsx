import { ReactElement, useEffect, useMemo, useState } from "react"
import { BacklogService, PlanningService } from "../../../../services/CommonServicesIndex"
import { RefinementItem } from "./RefinementItem"
import { Button, SelectItem } from "../../../../components/ComponentsIndex";
import { Fonts } from "../../../../utils/UtilsIndex";
import { v4 } from "uuid";
import { ExtendedStatus } from "../../../backlog/data/DataIndex";


export function RefinementDashboard(){
    const [items, setItems] = useState<ReactElement[]>([])
    const [state, setState] = useState<ExtendedStatus>(ExtendedStatus.New)


    

    const fetchData = async () => {
        const activeProject = await PlanningService.getCurrentProject()
        const features = await BacklogService.getFeaturesForProject(activeProject.guid)
        setItems(features.map((feature) => <RefinementItem key={v4()} index={features.indexOf(feature)} feature={feature} />))
    }

    useEffect(() => {
        fetchData()       
    }, [])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-75 bg-dark  shadow rounded p-4">
            <h3 className="mb-4 align-self-start">
                To be refined... 
            </h3>
            <table className="table mb-0 d-flex flex-column overflow-hidden "> 
                <thead className="" style={{width: '100% !important'}} >
                    <tr className="d-flex w-100  "> 
                        <th className="col bg-dark-subtle">number</th>
                        <th className="col bg-dark-subtle">Name</th>
                        <th className="col bg-dark-subtle">Status</th>
                        <th className="col bg-dark-subtle">Points</th>
                    </tr>
                </thead>
                <tbody  style={{width: '100% !important'}}>   
                    {
                        items
                    }
                </tbody>
            </table>
            <div className="swipeable-row  d-flex justify-content-end w-100
             pe-2 bg-dark-subtle">
                {/* <SimpleButton
                        type={Button.Borderless}
                        title="Info"
                        fontColor={Color.Light}
                        font={Fonts.H5}
                        icon="bi-plus-lg" 
                        onClick={() =>{}}/> */}
            </div>            
        </div>
    )
}