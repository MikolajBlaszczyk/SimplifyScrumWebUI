import { useEffect, useMemo, useState, act } from 'react';
import { DataLoader } from "../../../../../../data/CommonDataIndex";
import { BacklogService, EnumService } from "../../../../../../services/CommonServicesIndex";
import { useBacklog, useLoading } from "../../../../../../hooks/useContexts";
import { Placeholder, StandardHeaderProps, StandardTable, TabButtonsConfiguration } from "../../../../../../components/ComponentsIndex";
import { Board, BoardType } from "../../../board/Board";
import { BacklogAction, DetailType } from "../../../../../../context/BacklogContext";
import { v4 } from "uuid";
import { Feature } from "../../../../data/DataIndex";
import { DetailBoardContent } from "../../../board/DetailBoardContent";
import { FeatureMeta } from "../Edit/FeatureMeta";
import FeatureEdit from "../Edit/FeatureEdit";
import { useAlert } from '../../../../../../hooks/useAlert';
import { AlertStyle } from '../../../../../alerting/components/Alert';

export function BacklogFeatureCenter() {
    const showAlert = useAlert()
    const {state, setState} = useBacklog()
    const {shouldReload, setShouldReload} = useLoading()
    const [activeButton, setActiveButton] = useState(0)
    const [featuresLoader, setFeaturesLoader] = useState<DataLoader>(DataLoader.default())

  const headerConfig: StandardHeaderProps = useMemo(() => {
        if(state.action == BacklogAction.ShowFeatures) setActiveButton(1)
        if(state.action == BacklogAction.AddFeature) setActiveButton(2)
        if(state.action == BacklogAction.EditFeature) setActiveButton(3)
       
        const buttons: TabButtonsConfiguration[] = [
            {
                icon: "bi-box-seam-fill",
                onClick: () => {
                    setActiveButton(0)
                    setState({...state, action: BacklogAction.ShowProjects, parentGuid: undefined, item: undefined})
                }
            },
            {
                icon: "bi-card-list",
                onClick: () => {
                    setActiveButton(1)  
                    setState({...state, action: BacklogAction.ShowFeatures, item: undefined})
                }
            },
            {
                icon: "bi-plus-lg",
                onClick: () => {
                    setActiveButton(2)
                    setState({...state, action: BacklogAction.AddFeature, item: undefined})
                }
            },
            {
                icon: "bi-pen",
                disabled: !(activeButton === 3),
                onClick: () => {
                    setActiveButton(3)
                    setState({...state, action: BacklogAction.EditFeature})
                }
            }
        ]

        buttons.forEach((button, index) => { if(activeButton == index) button.isActive = true })

        return ({ title: "Features", buttonConfigs: buttons})
    }, [activeButton, state])


    const fetchData = async () => {
        const features = await BacklogService.getFeaturesForProject(state.parentGuid!)
        if(features.length == 0){
            setFeaturesLoader(prev => DataLoader.dataFinishedLoading(prev, features, true))
        }
        else{
            setFeaturesLoader(prev => DataLoader.dataFinishedLoading(prev, features, false))
        }           
    }

    const deleteFeature = async (guid: string) => {
        const isSuccess = await BacklogService.deleteFeature(guid)
        if(isSuccess){
            setShouldReload(shouldReload + 1)
        } else {
            showAlert(AlertStyle.Danger, "Failed to delete feature")
        }
    }

    const editFeature = async (guid: string) => {
        setState({...state, action: BacklogAction.EditFeature, item: {
            itemGuid: guid,
            itemType: DetailType.Feature
        }})
    }

    useEffect(() => {
        fetchData()
    }, [shouldReload]) 

    if(featuresLoader.placeholder !== false){
        return (
            <div className="container-fluid bg-dark mt-5 shadow border border-2 rounded s-board p-5 d-flex justify-content-center align-items-center position-relative" >
                <Placeholder />
            </div>
        )
    } 

    return (
        <Board 
        key={v4()}
        boardType={state.action == BacklogAction.ShowFeatures ? BoardType.Lines : BoardType.Details}
        headerConfig={headerConfig}>
            {
            state.action == BacklogAction.ShowFeatures
            ?
            <div className="d-flex h-100 flex-column w-100 h-100 rounded p-3">
                <StandardTable 
                    className="s-feature-table rounded-top "
                    swipeEnabled={true}
                    headers={['Number', 'Name', 'Status', 'Points']} 
                    footer = {<></>}
                    valuesDefinition={
                        Array.isArray(featuresLoader.data) 
                        ?
                        featuresLoader.data?.map((feature: Feature, index: number) => {
                                return{
                                    values: [
                                        `${index}`,
                                        feature.name,
                                        EnumService.convertExtendedStatusToString(feature.state) ,
                                        feature.points.toString()
                                    ],
                                    columnValuesClassNames: [' s-no-column', ' ', ' s-status-column', ' '],
                                    swipeProps: {
                                        onLeftSwipeContent: "Delete",
                                        onSwipeLeft: () => {
                                           deleteFeature(feature.guid)
                                        },
                                        onRightSwipeContent: "Edit",
                                        onSwipeRight: () => { editFeature(feature.guid)}
                                    }
                                } 
                            }) 
                        :
                        []
                    } />
            </div>
            : 
            <DetailBoardContent 
                childrenElements={
                    <FeatureMeta 
                        guid={state.item?.itemGuid} />
                }
                editElement={
                    <FeatureEdit 
                        guid={state.item?.itemGuid} 
                        projectGuid={state.parentGuid!}/>
                } />
            }
        </Board>
    )
}