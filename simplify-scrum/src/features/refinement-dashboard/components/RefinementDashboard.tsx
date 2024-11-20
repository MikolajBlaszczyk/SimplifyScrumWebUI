import { ReactElement, useEffect, useState } from "react"
import { BacklogService } from "../../../services/CommonServicesIndex"
import { RefinementItem } from "./RefinementItem"


export function RefinementDashboard(){
    const [items, setItems] = useState<ReactElement[]>([])
 

    useEffect(() => {
        BacklogService
            .getFeaturesForProject('')
            .then(features => {
                const mapped =  features.map(feature => (<RefinementItem feature={feature} />))
                setItems(mapped)
            })
            

       
    }, [])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-75 bg-dark  shadow rounded p-4">
            <h3 className="mb-4 align-self-start">
                To be refined... 
            </h3>
            <div className="row w-100 h-100  bg-dark-subtle p-2 ">
                <div className="col-3 d-flex flex-column justify-content-start ps-2">
                    <h6 className="m-0">
                        Title
                    </h6>
                </div>
                <div className="col-3 d-flex justify-content-start ps-2">
                    <h6 className="m-0">
                        Owner
                    </h6>
                </div>
                <div className="col-3 d-flex justify-content-start ps-2">
                    <h6 className="m-0">
                        Project Name
                    </h6>
                </div>
            </div>

            {items}
        </div>
    )
}