import { useEffect, useState } from "react"
import {  SprintService } from "../../../../services/CommonServicesIndex"
import { GenericEnumService } from "../../../../services/enum/GenericEnumService"
import {  SimpleStatus } from "../../../backlog/data/State"
import { useLoading } from "../../../../hooks/useContexts"
import { ExtendedDataLoader } from "../../../../data/CommonDataIndex"
import { Feature } from "../../../backlog/data/Feature"
import { useAlert } from "../../../../hooks/useAlert"
import { AlertStyle } from "../../../alerting/components/Alert"
import { Placeholder } from "../../../../components/ComponentsIndex"
import { TaskBoard } from "./TaskBoard"

const headers = ["Features" , "To be done", "Doing", "Done"]

export function FeatureBoard(){ 
    const showAlert = useAlert()
    const {shouldReload, setShouldReload} = useLoading()
    const [featureLoader, setFeatureLoader] = useState<ExtendedDataLoader<Feature[]>>( ExtendedDataLoader.default())

    const fetchData = async () => {
        try{ 
            const features = await SprintService.getSprintActiveItems()

            if(features.length !== 0){
                setFeatureLoader(ExtendedDataLoader.dataFinishedLoading(featureLoader, features, false))
            } else {
                setFeatureLoader(ExtendedDataLoader.dataFinishedLoading(featureLoader, [], true))
            }
        } catch(err) { 
            console.log(err)
            showAlert(AlertStyle.Danger, "Could not load data", "Failure")
        }
    }

    useEffect(() => {
        fetchData()


    }, [shouldReload])


    if(featureLoader.placeholder == true){
        return (
            <div className="w-100 h-100 p-3 d-flex flex-column grid-container">
                <div className="w-100 d-flex ">
                    { headers.map(header => <div className="w-100 me-1 ms-1 grid-header">{header}</div>) }
                </div>
                <div>
                    <Placeholder />
                </div>
            </div>
        )
    }

    return (
    <div className="w-100 h-100 p-3 d-flex flex-column grid-container">
        <div className="w-100 d-flex ">
            { headers.map(header => <div className="w-100 me-1 ms-1 grid-header">{header}</div>) }
        </div>
      
            {
                featureLoader.isEmpty ? 
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <h3>
                        Work finished
                    </h3>
                </div>
                :
                featureLoader.data!.map(feature => {
                    return (
                        <TaskBoard feature={feature} />
                    )
                })
            }
    </div>
    )
}