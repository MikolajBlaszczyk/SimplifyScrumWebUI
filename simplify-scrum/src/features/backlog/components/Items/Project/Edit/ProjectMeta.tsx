import { MouseEvent, useEffect, useState } from "react"
import { BacklogService } from "../../../../../../services/CommonServicesIndex"
import { Feature } from "../../../../data/Feature"
import { useAlert } from "../../../../../../hooks/HooksIndex"
import { AlertStyle } from "../../../../../alerting/components/Alert"
import { Button,  SimpleIcon, StandardList } from "../../../../../../components/ComponentsIndex"
import { v4 } from "uuid"

interface Props {
    guid?: string
}

export function ProjectMeta({guid}: Props){
    const showAlert = useAlert()
    const [features, setFeatures] = useState<Feature[]>([])

    const fetchData = async () => {
        if(guid == undefined || guid == '')
            return 

        try{
            const featureList =  await BacklogService.getFeaturesForProject(guid)
            setFeatures(featureList)
        } catch(err) {
            showAlert(AlertStyle.Danger, "Features were not retrieved", "Error")
        }
    }

    useEffect(() => {
        fetchData()
    }, []) 

    return (
        <div className="d-flex w-75  mt-3 mb-3 project-meta rounded" style={{maxHeight: '400px'}}>
            <section className="d-flex flex-column w-100">
              
                <div className="d-flex w-100 p-3">

                    <StandardList
                        title="Features"
                        content={
                            features.length == 0 ? 
                            [
                                <div className="d-flex flex-column w-100">
                                   No features in project
                                </div>
                            ]
                            :
                            features.map(feature => (
                                <div  key={v4()}>
                                    {feature?.name}
                                </div>
                            ))
                        } />
                    
                </div>
            </section>
        </div>
    )
}