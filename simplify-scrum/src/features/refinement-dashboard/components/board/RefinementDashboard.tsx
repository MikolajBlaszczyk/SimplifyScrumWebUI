import { MouseEvent, ReactElement, useEffect, useMemo, useState } from "react"
import { BacklogService, EnumService, SprintService } from "../../../../services/CommonServicesIndex"
import { Button, Card, Placeholder, SelectItem, StandardHeader, StandardTable } from "../../../../components/ComponentsIndex";
import { Fonts } from "../../../../utils/UtilsIndex";
import { v4 } from "uuid";
import { ExtendedStatus, Feature } from "../../../backlog/data/DataIndex";
import { useAlert } from "../../../../hooks/useAlert";
import { AlertStyle } from "../../../alerting/components/Alert";
import { DataLoader } from "../../../../data/CommonDataIndex";
import { useRefinement } from "../../../../hooks/useContexts";
import { RefinementAction } from "../../../../context/ContextsIndex";


export function RefinementDashboard(){
    const showAlert = useAlert()
    const { state, setState } = useRefinement()
    const [center, setCenter] = useState<ReactElement>(<Placeholder />)
    const [featuresLoader, setFeaturesLoader] = useState<DataLoader>(DataLoader.default())


    const fetchData = async () => {
        const activeProject = await SprintService.getCurrentProject()

        if(activeProject == null){
            showAlert(AlertStyle.Warning, "Your team is not in the process of developing a project", "No active project")
            return
        }

        const features = await BacklogService.getRefinementFeaturesForProject(activeProject.guid)
        const featuresForRefinement = features.filter(feature => feature.state === ExtendedStatus.ReadyForRefinement)
        if(featuresForRefinement.length === 0){
            setFeaturesLoader(DataLoader.dataFinishedLoading(featuresLoader, featuresForRefinement, true))
        } else if (featuresForRefinement.length !== 0){
            setFeaturesLoader(DataLoader.dataFinishedLoading(featuresLoader, featuresForRefinement, false))
        }
        
    }

    useEffect(() => {
        if(featuresLoader.placeholder){
            setCenter(<Placeholder />)
        
        } else if(featuresLoader.isEmpty){
            setCenter(
            <div className="d-flex justify-content-center pb-4 pt-4">
                <Card className="s-refinement-card" title={"Unavailable"} icon={"bi-x"} content={<span className="text-center">
                    There are no features for refinement
                </span>} />
            </div>
            )
        } else {
            setCenter(<div className="p-3">
                <StandardTable 
                swipeEnabled={true}
                headers={  ['Number', 'Name', "Status", "Points"] }
                valuesDefinition={
                    [
                        ...featuresLoader.data.map((feature: Feature, index: number) => {
                            return {
                                values: 
                                [
                                    index.toString(),
                                    feature.name,
                                    EnumService.convertExtendedStatusToString(feature.state),
                                    feature.points == -1 ? "Not refined" : feature.points.toString()
                                ],
                                columnValuesClassNames: [' s-no-column', ' ', ' s-status-column', ' '],
                                swipeProps: {
                                    onRightSwipeContent: "Refine",
                                    onSwipeRight: () =>{
                                        setState({...state, action: RefinementAction.Refine, itemGuid: feature.guid})
                                    }
                                }
                            }
                        })
                    ]
                } />                
            </div>)
        }
    }, [featuresLoader])

    useEffect(() => {
        fetchData()       
    }, [])
    

    return (center)
}