import { MouseEvent, useEffect, useState } from "react"
import { BacklogService } from "../../../../../../services/CommonServicesIndex"
import { Feature } from "../../../../data/Feature"
import { useAlert } from "../../../../../../hooks/HooksIndex"
import { AlertStyle } from "../../../../../alerting/components/Alert"
import { Button,  SimpleIcon } from "../../../../../../components/ComponentsIndex"
import { Fonts } from "../../../../../../utils/UtilsIndex"
import { features } from 'process';

interface Props {
    guid?: string
}

export function ProjectMeta({guid}: Props){
    const showAlert = useAlert()
    const [features, setFeatures] = useState<Feature[]>([])

    const fetchData = async () => {
        if(guid == undefined)
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
        <div className="d-flex w-100 h-100">
            <section className="d-flex flex-column w-100">
                <div className="d-flex w-100 justify-content-center mt-2 border-bottom">
                    <h4>Features</h4>
                </div>

                <div className="d-flex w-100">
                    <ul className="d-flex w-100 mt-2 list-group">
                        {
                            features.length == 0 ? 
                            (
                                <div className="d-flex flex-column w-100 align-items-center mt-4">
                                    <h5 >No features in project</h5>
                                </div>
                            )
                            :
                            features.map(feature => {
                            return (
                                <li className=" list-group-item">
                                    {feature.name}
                                </li>
                            )
                            })
                        }
                    </ul>
                </div>
            </section>
        </div>
    )
}